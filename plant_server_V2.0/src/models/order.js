const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    orderInfo: {
      billerName: {
        type: String,
        required: true,
        trim: true,
      },
      billerEmail: {
        type: String,
        required: true,
        trim: true,
      },
      billerZipCode: {
        type: String,
        required: true,
      },
      billerPhone: {
        type: String,
        required: true,
      },
      shippingAddress: {
        type: String,
        required: true,
      },
      receiverName: {
        type: String,
        required: true,
        trim: true,
      },
      receiverEmail: {
        type: String,
        required: true,
        trim: true,
      },
      receiverZipCode: {
        type: String,
        required: true,
      },
      receiverPhone: {
        type: String,
        required: true,
      },
      paidAmount: {
        type: Number,
        required: true,
      },
      orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
      paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid",
      },
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plantIdWithQuantity: [
      {
        _id: false,
        plantId: {
          type: mongoose.Types.ObjectId,
          ref: "Plant",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    cartId: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
