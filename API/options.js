const express = require("express");
const router = express.Router();
const { Payer, Platform } = require("../models/Options");

// GET all options
router.get("/payers", async (req, res) => {
    try { res.json(await Payer.find()); } catch (err) { res.status(500).json(err); }
});

router.get("/platforms", async (req, res) => {
    try { res.json(await Platform.find()); } catch (err) { res.status(500).json(err); }
});

// POST new options
router.post("/payers", async (req, res) => {
    try {
        const newPayer = new Payer({ name: req.body.name });
        await newPayer.save();
        res.status(201).json(newPayer);
    } catch (err) { res.status(400).json(err); }
});

router.post("/platforms", async (req, res) => {
    try {
        const newPlatform = new Platform({ name: req.body.name });
        await newPlatform.save();
        res.status(201).json(newPlatform);
    } catch (err) { res.status(400).json(err); }
});

module.exports = router;