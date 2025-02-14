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

// open routes
router.get("/getAllPlants", getAllPlants);
router.get("/getPlantById/:id", getPlantById);

// admin routes
router.post("/addPlant", addPlant);
router.patch("/addTrendingPlant/:id", addTrendingPlant);
module.exports = router;
