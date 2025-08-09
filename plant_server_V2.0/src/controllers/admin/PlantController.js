// external imports

// internal imports

// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../../configs/cloudinary");
const { apiResponse } = require("../../helpers");
const Plant = require("../../models/plants");

const addPlant = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const newPlant = new Plant(req.body);
    // console.log(req.body);
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

const updatePlantInfo = async (req, res, next) => {
  const {
    id,
    name,
    description,
    previousPrice,
    newPrice,
    stock,
    color,
    plantType,
    material,
    category,
  } = req.body;

  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
          previousPrice: previousPrice,
          newPrice: newPrice,
          stock: stock,
          color: color,
          plantType: plantType,
          material: material,
          category: category,
          description: description,
        },
      },
      { new: true }
    );
    return apiResponse(res, 200, true, `${name} plant updated successfully`);
  } catch (error) {
    return apiResponse(res, 500, false, "Error updating plant.");
  }
};

const deletePlantInfo = async (req, res, next) => {
  const plantId = req.params.id;

  try {
    // find the plant and images public IDs
    const plant = await Plant.findById(plantId);
    const publicIds = plant.images.map((img) => img.publicId);
    console.log(publicIds);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }
    await Plant.findByIdAndDelete(plantId);
    return apiResponse(res, 200, true, "Plant deleted successfully");
  } catch (error) {
    // console.log(error);
    return apiResponse(res, 500, false, "Error deleting plant.");
  }
};

module.exports = {
  addPlant,
  addTrendingPlant,
  updatePlantInfo,
  deletePlantInfo,
};
