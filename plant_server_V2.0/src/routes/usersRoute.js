// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addToCart,
  getCartItem,
} = require("../controllers/user/cartController");

// add to cart
router.post("/cart", addToCart);
router.get("/userCartItem/:userId", getCartItem);

module.exports = router;
