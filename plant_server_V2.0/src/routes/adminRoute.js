// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getAllUsers, deleteUser } = require("../controllers/admin/UsersController");
const { updatePlantInfo, deletePlantInfo } = require("../controllers/admin/PlantController");
const { checkFirebaseAdmin } = require("../middlewares/firebaseCheckAdmin");
const { getAllOrders, updateOrderStatus } = require("../controllers/admin/OrdersController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verifyAdmin } = require("../middlewares/adminMiddlewares");
const { verifyRoles } = require("../middlewares/verifyRolesMiddleware");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations
 */

// get all users
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

router.delete("/deleteUser/:uid/:userId", verifyToken, checkFirebaseAdmin, deleteUser);

// plants control
/**
 * @swagger
 * /admin/updatePlantInfo:
 *   patch:
 *     summary: Update plant information
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plant info updated
 */
router.patch("/updatePlantInfo", verifyToken, verifyRoles(["admin", "moderator"]), updatePlantInfo);

/**
 * @swagger
 * /admin/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a plant
 *     tags: [Admin]
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
 *         description: Plant deleted
 */
router.delete("/deleteProduct/:id", verifyToken, verifyRoles(["admin", "moderator"]), deletePlantInfo);

// orders
/**
 * @swagger
 * /admin/allOrders:
 *   get:
 *     summary: Get all orders
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/allOrders", verifyToken, verifyRoles(["admin", "moderator"]), getAllOrders);

/**
 * @swagger
 * /admin/orderStatusUpdate:
 *   patch:
 *     summary: Update order status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.patch("/orderStatusUpdate", verifyToken, verifyRoles(["admin", "moderator"]), updateOrderStatus);

// export
module.exports = router;
