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

module.exports = { getAllOrders };
