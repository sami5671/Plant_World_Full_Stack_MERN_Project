// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { addPlant, addTrendingPlant } = require("../controllers/admin/PlantController");
const { getAllPlants, getPlantById } = require("../controllers/plants/plantsController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verifyRoles } = require("../middlewares/verifyRolesMiddleware");

// open routes
router.get("/getAllPlants", getAllPlants);
router.get("/getPlantById/:id", getPlantById);

// admin routes
router.post("/addPlant", verifyToken, verifyRoles(["admin", "moderator"]), addPlant);
router.patch("/addTrendingPlant/:id", verifyToken, verifyRoles(["admin", "moderator"]), addTrendingPlant);
module.exports = router;
