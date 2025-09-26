const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
