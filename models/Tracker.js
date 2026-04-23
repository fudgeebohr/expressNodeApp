const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, required: true }, // Monthly Amortization
  totalMonths: { type: Number, required: true },
  paidMonths: { type: Number, default: 0 },
  platform: { 
    type: String, 
    enum: ['SPayLater', 'TikTok PayLater', 'GLoan'], 
    default: 'SPayLater' 
  },
  payer: { 
    type: String, 
    enum: ['Kenneth', 'Joy', 'Shane', 'Group (Thesis)'], 
    default: 'Kenneth' 
  },
  archived: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tracker", TrackerSchema);