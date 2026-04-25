const mongoose = require("mongoose");

const PayerSchema = new mongoose.Schema({ name: String });
const PlatformSchema = new mongoose.Schema({ name: String });

const Payer = mongoose.model("Payer", PayerSchema);
const Platform = mongoose.model("Platform", PlatformSchema);

module.exports = { Payer, Platform };