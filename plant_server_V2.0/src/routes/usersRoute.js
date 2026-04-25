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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations including cart, payments, and profile
 */

// user routes
/**
 * @swagger
 * /user/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post("/cart", verifyToken, addToCart);

/**
 * @swagger
 * /user/userCartItem/{userId}:
 *   get:
 *     summary: Get cart items for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get("/userCartItem/:userId", verifyToken, getCartItem);

/**
 * @swagger
 * /user/updateCartQuantity:
 *   put:
 *     summary: Update quantity of an item in the cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantity updated
 */
router.put("/updateCartQuantity", verifyToken, updateCartQuantity);

/**
 * @swagger
 * /user/create-payment-intent:
 *   post:
 *     summary: Generate a client secret for payment
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Payment intent created
 */
router.post("/create-payment-intent", generateClientSecret);

/**
 * @swagger
 * /user/saveOrder:
 *   post:
 *     summary: Place a new order
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed
 */
router.post("/saveOrder", verifyToken, makeOrder);

/**
 * @swagger
 * /user/userOrderItem/{userId}:
 *   get:
 *     summary: Get orders for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get("/userOrderItem/:userId", verifyToken, getUserOrderedItems);

/**
 * @swagger
 * /user/orderDetails/{id}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get("/orderDetails/:id", verifyToken, getOrderDetails);

/**
 * @swagger
 * /user/userProfileInfo/{id}:
 *   get:
 *     summary: Get user profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile info
 */
router.get("/userProfileInfo/:id", verifyToken, getUserProfile);

/**
 * @swagger
 * /user/updateProfileInfo:
 *   patch:
 *     summary: Update user profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.patch("/updateProfileInfo", verifyToken, updateUserProfile);

/**
 * @swagger
 * /user/updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated
 */
router.patch("/updatePassword", verifyToken, updatePassword);

module.exports = router;
