// external imports

// internal imports
const { apiResponse } = require("../../helpers");
const Plant = require("../../models/plants");

const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    return apiResponse(res, 200, true, "Plants fetched successfully!", plants);
  } catch (error) {
    return apiResponse(res, 500, false, "Error fetching plants.");
  }
};

const getPlantById = async (req, res, next) => {
  const plantId = req.params.id;
  try {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return apiResponse(res, 404, false, "Plant not found");
    } else {
      return apiResponse(res, 200, true, "Plant fetched successfully!", plant);
    }
  } catch (error) {
    return apiResponse(res, 500, false, "Error fetching plant.");
  }
};

module.exports = {
  getAllPlants,
  getPlantById,
};
