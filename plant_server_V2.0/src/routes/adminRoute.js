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

// get all users
router.get("/users", getAllUsers);
router.delete("/deleteUser/:uid/:userId", checkFirebaseAdmin, deleteUser);
router.patch("/updatePlantInfo", updatePlantInfo);
router.delete("/deleteProduct/:id", deletePlantInfo);

// orders
router.get("/allOrders", getAllOrders);
router.patch("/orderStatusUpdate", updateOrderStatus);
// export
module.exports = router;
