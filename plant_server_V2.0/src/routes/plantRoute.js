// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  addPlant,
  addTrendingPlant,
} = require("../controllers/admin/PlantController");
const { getAllPlants } = require("../controllers/plants/plantsController");

// add plant route
router.post("/addPlant", addPlant);
router.get("/getAllPlants", getAllPlants);
router.patch("/addTrendingPlant/:id", addTrendingPlant);

module.exports = router;
