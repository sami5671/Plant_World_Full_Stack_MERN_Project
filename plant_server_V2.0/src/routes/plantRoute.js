// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addPlant,
  addTrendingPlant,
} = require("../controllers/admin/PlantController");
const {
  getAllPlants,
  getPlantById,
} = require("../controllers/plants/plantsController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verifyAdmin } = require("../middlewares/adminMiddlewares");

// open routes
router.get("/getAllPlants", getAllPlants);
router.get("/getPlantById/:id", getPlantById);

// admin routes
router.post("/addPlant", verifyToken, verifyAdmin, addPlant);
router.patch(
  "/addTrendingPlant/:id",
  verifyToken,
  verifyAdmin,
  addTrendingPlant
);
module.exports = router;
