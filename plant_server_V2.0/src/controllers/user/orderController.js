const { apiResponse } = require("../../helpers");
const Order = require("../../models/order");
const Cart = require("../../models/cart");

const makeOrder = async (req, res) => {
  try {
    const orderData = req.body?.orderData;
    console.log("Received order data:", orderData);

    if (!orderData || Object.keys(orderData).length === 0) {
      return res.status(400).json({ message: "Order data is required." });
    }

    const { orderInfo, userId, cartId, plantIdWithQuantity, transactionId } =
      orderData;

    console.log(plantIdWithQuantity);

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }

    console.log("Transaction ID:", transactionId);

    const newOrder = new Order({
      transactionId,
      orderInfo,
      userId,
      plantIdWithQuantity,
    });

    const savedOrder = await newOrder.save();

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
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getUserOrderedItems = async (req, res) => {
  const userId = req.params.userId;
  //   console.log("User ID:", userId);

  try {
    const orders = await Order.find({ userId }).populate(
      "plantIdWithQuantity.plantId"
    );

    if (!orders || orders.length === 0) {
      return apiResponse(res, 404, false, "No orders found for this user", []);
    }
    // console.log(orders);
    return apiResponse(
      res,
      200,
      true,
      "User orders fetched successfully",
      orders
    );
  } catch (error) {
    // console.error("Error fetching orders:", error);
    return apiResponse(res, 500, false, "Server error", null);
  }
};

const getOrderDetails = async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.find({ _id }).populate(
      "plantIdWithQuantity.plantId"
    );

    if (!order || order.length === 0) {
      return apiResponse(res, 404, false, "No orders found for this user", []);
    }
    // console.log(order);
    return apiResponse(
      res,
      200,
      true,
      "User order fetched successfully",
      order
    );
  } catch (error) {
    // console.error("Error fetching orders:", error);
    return apiResponse(res, 500, false, "Server error", null);
  }
};
module.exports = {
  makeOrder,
  getUserOrderedItems,
  getOrderDetails,
};
