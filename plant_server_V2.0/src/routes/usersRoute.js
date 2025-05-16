// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addToCart,
  getCartItem,
  updateCartQuantity,
} = require("../controllers/user/cartController");
const { makeOrder } = require("../controllers/user/paymentController");

// add to cart
router.post("/cart", addToCart);
router.get("/userCartItem/:userId", getCartItem);
router.put("/updateCartQuantity", updateCartQuantity);
// router.post("/create-payment-intent");
router.post("/saveOrder", makeOrder);

module.exports = router;
