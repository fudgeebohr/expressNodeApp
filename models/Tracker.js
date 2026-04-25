const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, required: true }, // Monthly Amortization
  totalMonths: { type: Number, required: true },
  paidMonths: { type: Number, default: 0 },
  platform: { 
    type: String
  },
  payer: { 
    type: String
  },
  archived: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tracker", TrackerSchema);