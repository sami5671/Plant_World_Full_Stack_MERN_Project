const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    previousPrice: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    plantType: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        _id: false,
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
