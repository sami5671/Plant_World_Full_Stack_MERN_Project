require("dotenv").config();
const mongoose = require("mongoose");
const connectToDatabase = require("./database"); // Adjust path if needed

const MONGO_URI = "mongodb://localhost:27017/plantWorld";

const fixOrderIndexes = async () => {
  await connectToDatabase(MONGO_URI);

  const db = mongoose.connection;

  try {
    const indexes = await db.collection("orders").indexes();

    // Drop incorrect index if it exists
    const oldIndex = indexes.find(
      (index) => index.name === "orderInfo.transactionId_1"
    );

    if (oldIndex) {
      await db.collection("orders").dropIndex("orderInfo.transactionId_1");
      console.log("✅ Dropped old index: orderInfo.transactionId_1");
    } else {
      console.log("ℹ️ Old index not found. Nothing to drop.");
    }

    // Create correct unique index with sparse option
    await db
      .collection("orders")
      .createIndex(
        { "orderInfo.transactionId": 1 },
        { unique: true, sparse: true }
      );
    console.log("✅ Created unique sparse index on: orderInfo.transactionId");

    console.log("🎉 Index repair completed.");
  } catch (err) {
    console.error("❌ Failed to update indexes:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
};

fixOrderIndexes();
