const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: "General" },
  status: { type: String, default: "Pending" },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tracker", TrackerSchema);