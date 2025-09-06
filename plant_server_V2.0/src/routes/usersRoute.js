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
  updatePassword,
} = require("../controllers/user/userProfileController");
const { verifyToken } = require("../middlewares/authMiddlewares");

// user routes
router.post("/cart", verifyToken, addToCart);
router.get("/userCartItem/:userId", getCartItem);
router.put("/updateCartQuantity", verifyToken, updateCartQuantity);
router.post("/create-payment-intent", generateClientSecret);
router.post("/saveOrder", verifyToken, makeOrder);
router.get("/userOrderItem/:userId", verifyToken, getUserOrderedItems);
router.get("/orderDetails/:id", verifyToken, getOrderDetails);
router.get("/userProfileInfo/:id", verifyToken, getUserProfile);
router.patch("/updateProfileInfo", verifyToken, updateUserProfile);
router.patch("/updatePassword", verifyToken, updatePassword);
module.exports = router;
