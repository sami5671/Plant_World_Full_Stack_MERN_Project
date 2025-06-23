// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addToCart,
  getCartItem,
  updateCartQuantity,
} = require("../controllers/user/cartController");
const {
  generateClientSecret,
} = require("../controllers/user/paymentController");
const {
  makeOrder,
  getUserOrderedItems,
  getOrderDetails,
} = require("../controllers/user/orderController");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user/userProfileController");

// add to cart
router.post("/cart", addToCart);
router.get("/userCartItem/:userId", getCartItem);
router.put("/updateCartQuantity", updateCartQuantity);
router.post("/create-payment-intent", generateClientSecret);
router.post("/saveOrder", makeOrder);
router.get("/userOrderItem/:userId", getUserOrderedItems);
router.get("/orderDetails/:id", getOrderDetails);
router.get("/userProfileInfo/:id", getUserProfile);
router.patch("/updateProfileInfo", updateUserProfile);
module.exports = router;
