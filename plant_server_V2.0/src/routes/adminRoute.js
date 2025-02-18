// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getAllUsers } = require("../controllers/admin/UsersController");
const {
  updatePlantInfo,
  deletePlantInfo,
} = require("../controllers/admin/PlantController");

// get all users
router.get("/users", getAllUsers);
router.patch("/updatePlantInfo", updatePlantInfo);
router.delete("/deleteProduct/:id", deletePlantInfo);

// export
module.exports = router;
