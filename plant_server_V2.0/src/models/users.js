const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    alternativeEmail: {
      type: String,
      unique: true,
      sparse: true, // allows multiple docs without the field
      trim: true,
      // ❌ No default here, so if you don't pass it, it won't exist
    },
    primaryNumber: {
      type: String,
      trim: true,
      default: "",
    },
    alternativeNumber: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
    },
    occupation: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    DOB: {
      year: { type: Number, default: null },
      month: { type: Number, default: null },
      day: { type: Number, default: null },
    },
    address: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    biography: {
      type: String,
      default: "",
    },
    providerId: {
      type: String, // Store unique provider ID from Google/GitHub
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      enum: ["google", "github", "local"],
      default: "local",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔑 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
