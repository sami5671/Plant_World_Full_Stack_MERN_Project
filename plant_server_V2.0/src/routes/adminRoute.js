// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getAllUsers,
  deleteUser,
} = require("../controllers/admin/UsersController");
const {
  updatePlantInfo,
  deletePlantInfo,
} = require("../controllers/admin/PlantController");
const { checkFirebaseAdmin } = require("../middlewares/firebaseCheckAdmin");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin/OrdersController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verifyAdmin } = require("../middlewares/adminMiddlewares");

// get all users
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete(
  "/deleteUser/:uid/:userId",
  verifyToken,
  checkFirebaseAdmin,
  deleteUser
);
router.patch("/updatePlantInfo", verifyToken, verifyAdmin, updatePlantInfo);
router.delete("/deleteProduct/:id", verifyToken, verifyAdmin, deletePlantInfo);

// orders
router.get("/allOrders", verifyToken, verifyAdmin, getAllOrders);
router.patch("/orderStatusUpdate", verifyToken, verifyAdmin, updateOrderStatus);
// export
module.exports = router;
