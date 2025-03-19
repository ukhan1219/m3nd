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
        // For Google, we pass the relevant fields to addUser
        const googleUserData = {
          authMethod: "google",
          googleId: profile.id,
          firstName: profile.name?.givenName || "",
          lastName: profile.name?.familyName || "",
          email:
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : "",
        };
        let user = await getUserByStringId(profile.id);
        if (user) {
          console.log("User exists, logging in");
        } else {
          user = await addUser(googleUserData);
        }
        return done(null, user);
      } catch (error) {
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
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
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
  const authMethod = req.user ? req.user.authMethod : null;
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

      res.redirect("/");
    });
  });
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
