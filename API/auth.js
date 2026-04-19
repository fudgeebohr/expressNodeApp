const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username taken" });

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }); // Simple check for now
  if (user) {
    res.json({ success: true, token: "fake-jwt-token" }); // Replace with real JWT later
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;