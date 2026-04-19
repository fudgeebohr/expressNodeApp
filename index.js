require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./API/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  });

const saveRecord = require('./API/save_record');

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/save_record", saveRecord);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});