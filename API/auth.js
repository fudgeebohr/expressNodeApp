const router = require("express").Router();
const User = require("../models/User");

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