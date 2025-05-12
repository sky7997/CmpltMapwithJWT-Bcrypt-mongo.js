const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/reglogdat");
const cookieParser = require("cookie-parser");
const router = express.Router();
const SECRET = process.env.JWT_SECRET; // ideally use process.env.JWT_SECRET

router.use(cookieParser());

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(501).json({ error: "Failed to fetch users" });
  }
});

// Register
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(501).json({ error: "Failed to save user" });
  }
});

// Login
router.post("/loginn", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1d" });

    // Set token in a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // Token expires in 1 day
    });

    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Protected Route
router.get("/protected", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const user = jwt.verify(token, SECRET);
    res.json({ message: "Protected data", user });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
