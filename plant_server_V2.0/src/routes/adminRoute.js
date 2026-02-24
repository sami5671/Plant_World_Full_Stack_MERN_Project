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

// get all users
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/deleteUser/:uid/:userId", verifyToken, checkFirebaseAdmin, deleteUser);

// plants control
router.patch("/updatePlantInfo", verifyToken, verifyRoles(["admin", "moderator"]), updatePlantInfo);
router.delete("/deleteProduct/:id", verifyToken, verifyRoles(["admin", "moderator"]), deletePlantInfo);

// orders
router.get("/allOrders", verifyToken, verifyRoles(["admin", "moderator"]), getAllOrders);
router.patch("/orderStatusUpdate", verifyToken, verifyRoles(["admin", "moderator"]), updateOrderStatus);
// export
module.exports = router;
