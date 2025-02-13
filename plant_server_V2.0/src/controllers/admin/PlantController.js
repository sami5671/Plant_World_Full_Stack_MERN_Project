// external imports

// internal imports
const { apiResponse } = require("../../helpers");
const Plant = require("../../models/plants");

const addPlant = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    return apiResponse(res, 201, true, "Plant added successfully!");
  } catch (error) {
    return apiResponse(res, 500, false, "Error adding plant.");
  }
};

const addTrendingPlant = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return apiResponse(res, 400, false, "Plant ID is required");
    }

    // Find plant by ID
    const plant = await Plant.findById(id);

    if (!plant) {
      return apiResponse(res, 404, false, "Plant not found");
    }

    // Toggle trending status (ensure default is `false` if undefined)
    const newTrendingStatus = plant.trending === true ? false : true;

    // Update plant in the database
    const updatedPlant = await Plant.findByIdAndUpdate(
      id,
      {
        $set: { trending: newTrendingStatus },
      },
      { new: true }
    );
    return apiResponse(
      res,
      200,
      true,
      `Plant trending status updated to ${newTrendingStatus}`,
      id
    );
  } catch (error) {
    return apiResponse(res, 500, false, "Error updating trending plant.");
  }
};

module.exports = {
  addPlant,
  addTrendingPlant,
};
