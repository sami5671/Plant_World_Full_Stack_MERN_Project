const { apiResponse } = require("../../helpers");
const Order = require("../../models/order");
const Cart = require("../../models/cart");

const makeOrder = async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData || Object.keys(orderData).length === 0) {
      return res.status(400).json({ message: "Order data is required." });
    }

    // save order to DB
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    // Remove the cart from the database
    const cartId = orderData?.cartId;
    if (cartId) {
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) {
        console.warn(`Cart with ID ${cartId} not found or already deleted.`);
      }
    }

    return apiResponse(
      res,
      201,
      true,
      "Order placed successfully.",
      savedOrder
    );
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  makeOrder,
};
