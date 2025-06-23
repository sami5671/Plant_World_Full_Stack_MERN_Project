const mongoose = require("mongoose");

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
      trim: true,
      default: "",
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

const User = mongoose.model("User", userSchema);

module.exports = User;
