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

router.post("/", async (req, res) => {
    const { itemName, amount, totalMonths, paidMonths, platform, payer } = req.body;

    if (!itemName || !amount || !totalMonths) {
        return res.status(400).json({ error: "itemName, amount, and totalMonths are required" });
    }

    try {
        const newRecord = new Tracker(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json({ message: "Record Saved!", data: savedRecord });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

module.exports = router;