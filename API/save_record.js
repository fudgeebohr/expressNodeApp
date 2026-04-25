const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");
const mongoose = require("mongoose");

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

router.put("/pay/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Tracker.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    record.paidMonths += 1;

    if (record.paidMonths >= record.totalMonths) {
      record.archived = true;
    }

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // findByIdAndUpdate is the most efficient way to update a document in Mongoose
    const updatedRecord = await Tracker.findByIdAndUpdate(
      id, 
      updatedData, 
      { new: true } // This option returns the modified document rather than the original
    );

    if (!updatedRecord) return res.status(404).json({ message: "Record not found" });

    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/archive/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const archivedRecord = await Tracker.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true }
    );

    if (!archivedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Deleted successfully", data: archivedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;