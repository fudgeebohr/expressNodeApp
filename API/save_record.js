const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

router.post("/", async (req, res) => {
    try {
        console.log("Data received from Postman:", req.body);
        
        const newRecord = new Tracker(req.body); 
        const savedRecord = await newRecord.save();
        
        res.status(201).json({ 
            message: "Record Saved to MongoDB!", 
            data: savedRecord 
        });
    } catch (err) {
        console.error("Save Error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;