const mongoose = require("mongoose");
const User = require("../src/models/users");
require("dotenv").config({ path: "./.env" });

async function testSignup() {
  try {
    const uri = process.env.DEV_DATABASE_URL;
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Mimic the user's request body
    const reqBody = {
      "email": "sami67@gmail.com",
      "password": "123456sami!@#",
      "name": "sami671"
    };

    // Before cleanup, check if user exists and delete it to ensure a fresh test
    await User.deleteOne({ email: reqBody.email });
    console.log("Cleanup: Deleted existing user with email", reqBody.email);

    // Logic from signUp controller (simplified)
    const { fullName, name, email, password } = reqBody;
    const finalFullName = fullName || name;

    if (!finalFullName || !email || !password) {
      console.log("❌ Validation failed: Name, Email, and Password are required!");
      return;
    }

    const newUser = new User({
      fullName: finalFullName,
      email,
      password, // Model will hash it
    });

    const savedUser = await newUser.save();
    console.log("✅ User saved successfully!");
    console.log("Saved User Object (should be hashed):", savedUser.password);
    
    // Test login logic to ensure hashing worked
    const isMatch = await savedUser.comparePassword(reqBody.password);
    console.log("Login check (bcrypt compare):", isMatch ? "✅ SUCCESS" : "❌ FAILED");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.code === 11000) console.log("Duplicate key error (expected if cleanup failed)");
  }
}

testSignup();
