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

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyParser.json());

// Database connection
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db("mend");
    usersCollection = db.collection("Users");
    journalCollection = db.collection("Journal");

    // Logging available collections
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

//  HELPER FUNCTIONS
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

async function addUser(userData) {
  try {
    const { email, authMethod } = userData;
    let existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      console.log("User with this email already exists.");
      // If the existing user was created locally and doesn't have a googleId,
      // and the current request is Google-based, update it.
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

    // Create a new user object
    const newUser = {
      userId: uuidv4(), // custom unique id
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
      // Hash the password for local users
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      newUser.password = hashedPassword;
    }

    await usersCollection.insertOne(newUser);
    console.log("New user added:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

//  PASSPORT GOOGLE AUTHENTICATION
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile);
        let user = await getUserByStringId(profile.id);
        if (user) {
          console.log("User exists, logging in");
        } else {
          user = await addUser({
            authMethod: "google",
            googleId: profile.id,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : "",
          });
          console.log("New user added:", user);
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, null);
      }
    },
  ),
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//  SESSION SETUP
app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { 
      maxAge: 1000 * 60 * 60,
      secure: false,       // Required for localhost
      sameSite: "lax",     // Proper sameSite policy
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//  API ROUTES
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  },
);

app.post("/auth/local/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
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
        return res
          .status(500)
          .json({ error: "Login error after registration" });
      }
      return res.json(user);
    });
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/auth/local/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error logging in user" });
      }
      return res.json(user);
    });
  } catch (error) {
    console.error("Error during local login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/auth/check", (req, res) => {
  if (req.isAuthenticated()) {
    // Send back whichever information you need (for example, the user’s id).
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(JSON.stringify(req.user, null, 2));
    res.json(req.user);
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Internal Server Error");
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.clearCookie("connect.sid");
      // Send a success response instead of redirecting.
      res.status(200).json({ message: "Logout successful" });
    });
  });
});


app.post("/analyze-journal", async (req, res) => {
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

app.post("/journal", ensureAuthenticated, async (req, res) => {
  const { date, content, analysis } = req.body;

  if (!date || !content) {
    return res.status(400).json({ error: "Date and content are required." });
  }

  const journalEntry = {
    journalId: uuidv4(),
    userId: req.user.userId || req.user.googleId,
    date: new Date(date), // stores journal date
    content,
    analysis: analysis || (await getTherapeuticAdvice(content)),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await journalCollection.insertOne(journalEntry);
    res.status(201).json({ message: "Journal created", journalEntry });
  } catch (error) {
    console.error("Error creating journal:", error);
    res.status(500).json({ error: "Failed to create journal entry" });
  }
});

app.get("/journal", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const { date, journalId } = req.query;

  const query = { userId };
  if (journalId) query.journalId = journalId;
  if (date) {
    const d = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    query.date = { $gte: d, $lte: end };
  }

  try {
    const entries = await journalCollection.find(query).sort({ date: -1 }).toArray();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.status(500).json({ error: "Failed to fetch journals" });
  }
});

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

app.get("/journal/date/:date", ensureAuthenticated, async (req, res) => {
  const userId = req.user.userId || req.user.googleId;
  const date = new Date(req.params.date);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const entries = await journalCollection
      .find({ userId, date: { $gte: date, $lte: endOfDay } })
      .sort({ date: -1 })
      .toArray();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching journals by date:", error);
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

