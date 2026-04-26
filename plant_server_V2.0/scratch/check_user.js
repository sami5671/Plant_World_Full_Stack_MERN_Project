const mongoose = require("mongoose");
const User = require("../src/models/users");
require("dotenv").config({ path: "./.env" });

async function checkUser() {
  try {
    const uri = process.env.DEV_DATABASE_URL;
    await mongoose.connect(uri);
    const user = await User.findOne({ email: "sami56@gmail.com" });
    if (user) {
      console.log("User exists:", user.email, "FullName:", user.fullName);
    } else {
      console.log("User does not exist.");
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

checkUser();
