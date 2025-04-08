import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import { getTherapeuticAdvice } from "./openai.js";
import { listModels } from "./openai.js";

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || uuidv4();

let db, usersCollection, journalCollection;

// ===== MIDDLEWARE SETUP =====
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Ensures the user is authenticated before proceeding.
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized: Please log in." });
}

// ===== DATABASE CONNECTION =====

/**
 * Connects to MongoDB and sets up collection variables.
 */
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db("mend");
    usersCollection = db.collection("Users");
    journalCollection = db.collection("Journal");

    const collections = await db.listCollections().toArray();
    console.log("Collections in mend:");
    collections.forEach((collection) => console.log(`- ${collection.name}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
connectToDatabase();
listModels();

// ===== HELPER FUNCTIONS =====

/**
 * Gets a user by their local userId or Google ID.
 */
async function getUserByStringId(id) {
  try {
    const user = await usersCollection.findOne({
      $or: [{ googleId: id }, { userId: id }],
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by identifier:", error);
    return null;
  }
}

/**
 * Adds a new user or links Google ID to an existing local user.
 * Hashes password for local users.
 */
async function addUser(userData) {
  try {
    const { email, authMethod } = userData;
    let existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      if (
        authMethod === "google" &&
        !existingUser.googleId &&
        userData.googleId
      ) {
        await usersCollection.updateOne(
          { email },
          { $set: { googleId: userData.googleId, updatedAt: new Date() } },
        );
        existingUser = await usersCollection.findOne({ email });
      }
      return existingUser;
    }

    const newUser = {
      userId: uuidv4(),
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: email,
      authMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (authMethod === "google") {
      newUser.googleId = userData.googleId;
    } else if (authMethod === "local") {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      newUser.password = hashedPassword;
    }

    await usersCollection.insertOne(newUser);
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// ===== PASSPORT AUTHENTICATION SETUP =====

/**
 * Configures Passport Google OAuth 2.0 strategy.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await getUserByStringId(profile.id);
        if (!user) {
          user = await addUser({
            authMethod: "google",
            googleId: profile.id,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email: profile.emails?.[0]?.value || "",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

/**
 * Serializes user to session.
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

/**
 * Deserializes user from session.
 */
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ===== SESSION & PASSPORT MIDDLEWARE =====
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, secure: false, sameSite: "lax" },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// ===== AUTHENTICATION ROUTES =====

/**
 * GET /auth/google
 * Initiates Google authentication.
 */
app.get( "/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * GET /auth/google/callback
 * Handles Google callback.
 */
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login?error=google_auth_failed" }),
  (req, res) => {
    try {
      res.redirect("http://localhost:5173/dashboard");
    } catch (error) {
        console.error("Error during google callback redirect:", error);
        res.redirect("http://localhost:5173/login?error=redirect_failed");
    }
  },
);

/**
 * POST /auth/local/register
 * Handles local user registration.
 */
app.post("/auth/local/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User with this email already exists." });
    }

    const localUserData = {
      authMethod: "local",
      firstName,
      lastName,
      email,
      password,
    };
    const user = await addUser(localUserData);

    req.login(user, (err) => {
      if (err) {
        console.error("Login error after registration:", err);
        return res
          .status(500)
          .json({ error: "Login error after registration" });
      }
      const { password: _, ...userResponse } = user;
      return res.status(201).json(userResponse);
    });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.message.includes("Error adding user")) {
        return res.status(500).json({ error: "Failed to create user profile." });
    }
    return res.status(500).json({ error: "An unexpected error occurred during registration." });
  }
});

/**
 * POST /auth/local/login
 * Handles local user login.
 */
app.post("/auth/local/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
       console.log(`Login attempt failed for email: ${email} - User not found.`);
      return res.status(401).json({ error: "Invalid email or password." });
    }

     if (!user.password) {
        console.log(`Login attempt failed for email: ${email} - User has no local password (likely Google auth).`);
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       console.log(`Login attempt failed for email: ${email} - Invalid password.`);
      return res.status(401).json({ error: "Invalid email or password." });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ error: "Error logging in user" });
      }
      const { password: _, ...userResponse } = user;
      return res.json(userResponse);
    });
  } catch (error) {
    console.error("Error during local login:", error);
    return res.status(500).json({ error: "An unexpected error occurred during login." });
  }
});

/**
 * GET /auth/check
 * Checks current session authentication status.
 */
app.get("/auth/check", (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { password: _, ...userResponse } = req.user;
            res.json({ user: userResponse });
        } else {
            res.status(401).json({ user: null });
        }
    } catch (error) {
        console.error("Error during auth check:", error);
        res.status(500).json({ error: "An unexpected error occurred checking authentication status." });
    }
});

/**
 * GET /profile
 * Example protected route returning user profile.
 */
app.get("/profile", ensureAuthenticated, (req, res) => {
  const { password: _, ...userResponse } = req.user;
  res.json(userResponse);
});

/**
 * GET /logout
 * Logs out the user and destroys the session.
 */
app.get("/logout", (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
            console.error("Error during logout:", err);
            }
            req.session.destroy((destroyErr) => {
            res.clearCookie("connect.sid", { path: '/' });

            if (destroyErr) {
                console.error("Error destroying session:", destroyErr);
                return res.status(500).json({ error: "Logout completed but session cleanup failed on server." });
            }
             if (err) {
                 return res.status(500).json({ error: "Session destroyed but initial logout failed on server." });
             }

            res.status(200).json({ message: "Logout successful" });
            });
        });
    } catch (error) {
        console.error("Unexpected error during logout process:", error);
         res.status(500).json({ error: "An unexpected error occurred during logout." });
    }
});

// ===== DEPRECATED/UNUSED ROUTES (Example) =====
/**
 * POST /analyze-journal (Likely deprecated)
 * @deprecated Use POST /journal/:journalId/analyze instead.
 */
app.post("/analyze-journal", async (req, res) => {
  console.warn("Deprecated route /analyze-journal called");
  const { journalText } = req.body;
  if (!journalText) {
    return res.status(400).json({ error: "Journal text is required." });
  }
  try {
    const advice = await getTherapeuticAdvice(journalText);
    res.json({ advice });
  } catch (error) {
    res.status(500).json({ error: "Error processing journal entry." });
  }
});

// ===== JOURNAL ROUTES =====

/**
 * GET /journal/dates
 * Fetches distinct dates with entries for the user.
 */
app.get("/journal/dates", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  console.log(`[GET /journal/dates] Fetching dates for userId: ${userId}`);

  try {
    const results = await journalCollection.aggregate([
      { $match: { userId } },
      { $project: { dateString: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } } },
      { $group: { _id: "$dateString" } },
      { $sort: { _id: 1 } }
    ]).toArray();

    const datesWithEntries = results.map(item => item._id);
    console.log(`[GET /journal/dates] Found dates:`, datesWithEntries);
    res.json({ dates: datesWithEntries });

  } catch (error) {
    console.error("[GET /journal/dates] Error fetching journal dates:", error);
    res.status(500).json({ error: "Failed to fetch journal dates" });
  }
});

/**
 * GET /journal/date/:date
 * Fetches entries for a specific date.
 */
app.get("/journal/date/:date", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const dateParam = req.params.date;
  console.log(`[GET /journal/date] Querying for userId: ${userId}, Date range: ${dateParam}`);

  try {
    const startDate = new Date(`${dateParam}T00:00:00.000Z`);
    const endDate = new Date(`${dateParam}T23:59:59.999Z`);

    const entries = await journalCollection
      .find({
        userId: userId,
        date: { $gte: startDate, $lte: endDate }
      })
      .sort({ date: -1 })
      .toArray();

    console.log(`[GET /journal/date] Found ${entries.length} entries.`);
    res.json(entries);

  } catch (error) {
    console.error("[GET /journal/date] Error fetching journals by date:", error);
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});

/**
 * GET /journal/:journalId
 * Fetches a specific entry by ID.
 */
console.log("Registering route: GET /journal/:journalId");
app.get("/journal/:journalId", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const { journalId } = req.params;

  try {
    const journal = await journalCollection.findOne({ userId, journalId });
    if (!journal) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(journal);
  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ error: "Failed to fetch journal entry" });
  }
});

/**
 * PUT /journal/:journalId
 * Updates an existing entry's content.
 */
console.log("Registering route: PUT /journal/:journalId");
app.put("/journal/:journalId", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const { journalId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required for update." });
  }

  try {
    const existingEntry = await journalCollection.findOne({ userId, journalId });
    if (!existingEntry) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    const updateResult = await journalCollection.updateOne(
      { userId, journalId },
      { $set: { content: content, updatedAt: new Date() } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Journal entry not found during update" });
    }

    const updatedJournalEntry = await journalCollection.findOne({ userId, journalId });

    res.json({ message: "Journal updated", journalEntry: updatedJournalEntry });

  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ error: "Failed to update journal entry" });
  }
});

/**
 * POST /journal/:journalId/analyze
 * Triggers AI analysis for an entry.
 */
console.log("Registering route: POST /journal/:journalId/analyze");
app.post("/journal/:journalId/analyze", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const { journalId } = req.params;

  try {
    const journalEntry = await journalCollection.findOne({ userId, journalId });
    if (!journalEntry || !journalEntry.content) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    
    const analysisResult = await getTherapeuticAdvice(journalEntry.content);

    const updateResult = await journalCollection.updateOne(
      { userId, journalId },
      { $set: { analysis: analysisResult, updatedAt: new Date() } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Journal entry not found during analysis update" });
    }

    const updatedJournalEntry = await journalCollection.findOne({ userId, journalId });

    res.json({ message: "Analysis complete", journalEntry: updatedJournalEntry });

  } catch (error) {
    console.error("Error during journal analysis:", error);
    if (error.message?.includes("OpenAI") || error.code) {
        res.status(502).json({ error: "Failed to get analysis from AI service. Please try again later." });
    } else {
        res.status(500).json({ error: "Failed to analyze journal entry" });
    }
  }
});

/**
 * POST /journal
 * Creates a new journal entry.
 */
console.log("Registering route: POST /journal");
app.post("/journal", ensureAuthenticated, async (req, res) => {
  const { date, content } = req.body;

  if (!date || !content) {
    return res.status(400).json({ error: "Date and content are required." });
  }

  const dateToSave = new Date(date);
  console.log(`[POST /journal] Received date string: ${date}, Parsed as Date object: ${dateToSave.toISOString()}`);

  const journalEntry = {
    journalId: uuidv4(),
    userId: req.user.userId || req.user.googleId,
    date: dateToSave,
    content,
    analysis: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await journalCollection.insertOne(journalEntry);
    console.log(`[POST /journal] Saved entry with date: ${journalEntry.date.toISOString()}`);
    res.status(201).json({ message: "Journal created", journalEntry });
  } catch (error) {
    console.error("Error creating journal:", error);
    res.status(500).json({ error: "Failed to create journal entry" });
  }
});


// ===== SERVER INITIALIZATION =====
console.log("Starting server initialization...");
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

