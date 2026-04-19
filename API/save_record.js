const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

router.get("/", async (req, res) => {
    try {
        const records = await Tracker.find().sort({ dateCreated: -1 });
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;