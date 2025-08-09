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

// open routes
router.get("/getAllPlants", getAllPlants);
router.get("/getPlantById/:id", verifyToken, getPlantById);

// admin routes
router.post("/addPlant", verifyToken, addPlant);
router.patch("/addTrendingPlant/:id", addTrendingPlant);
module.exports = router;
