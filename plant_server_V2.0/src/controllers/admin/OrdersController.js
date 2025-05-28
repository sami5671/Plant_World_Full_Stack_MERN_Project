const { apiResponse } = require("../../helpers");
const Order = require("../../models/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("plantIdWithQuantity.plantId");

    if (!orders || orders.length === 0) {
      return apiResponse(res, 404, false, "No orders found", []);
    }
    // console.log(orders);
    return apiResponse(res, 200, true, "Orders fetched successfully", orders);
  } catch (error) {
    // console.error("Error fetching orders:", error);
    return apiResponse(res, 500, false, "Server error", null);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    console.log(status, orderId);
    if (!status || !orderId) {
      return apiResponse(res, 400, false, "Missing status or orderId");
    }
    const order = await Order.findById(orderId);
    console.log(order);
    if (!order) {
      return apiResponse(res, 404, false, "Order not found");
    }

    order.orderInfo.orderStatus = status;
    await order.save();

    // console.log(order);
    return apiResponse(
      res,
      200,
      true,
      "Order status updated successfully",
      order
    );
  } catch (error) {
    return apiResponse(res, 500, false, "Internal Server Error");
  }
};
module.exports = { getAllOrders, updateOrderStatus };
