const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    // console.log("Connected to MongoDB successfully!");
    console.log(`✅ Connected to MongoDB: ${conn.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
