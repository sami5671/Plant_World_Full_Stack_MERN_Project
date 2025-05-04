// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addToCart,
  getCartItem,
  updateCartQuantity,
} = require("../controllers/user/cartController");

// add to cart
router.post("/cart", addToCart);
router.get("/userCartItem/:userId", getCartItem);
router.put("/updateCartQuantity", updateCartQuantity);

module.exports = router;
