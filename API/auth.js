const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      username, 
      password: hashedPassword 
    });
    
    await newUser.save();
    res.status(201).json({ message: "User registered with secure password!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (isMatch) {
    res.json({ success: true, token: "session-active" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;