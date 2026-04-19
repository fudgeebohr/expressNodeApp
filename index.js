require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDBConnection Error:", error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

const saveRecord = require('./API/save_record');

app.use("/save_record", saveRecord);

const PORT = process.env.PORT || 5000;