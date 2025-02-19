require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 3001;
const PORT = process.env.PORT || 3000;

let db, usersCollection;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

// Database connection
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db("mend");
    usersCollection = db.collection("Users");

    // Logging available collections
    const collections = await db.listCollections().toArray();
    console.log("Collections in mend:");
    collections.forEach(collection => console.log(`- ${collection.name}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Initialize database connection
connectToDatabase();

// Server initialization
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
