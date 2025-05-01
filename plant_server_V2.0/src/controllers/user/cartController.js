const { apiResponse } = require("../../helpers");
const Cart = require("../../models/cart");
const Plant = require("../../models/plants");

const addToCart = async (req, res, next) => {
  try {
    const { user, plants } = req.body;
    const plantToAdd = plants[0];

    // Find the cart for the user
    let cart = await Cart.findOne({ user });

    if (cart) {
      const existingPlantIndex = cart.plants.findIndex(
        (item) => item.plant.toString() === plantToAdd.plant
      );

      if (existingPlantIndex !== -1) {
        // Increase the existing plant quantity
        cart.plants[existingPlantIndex].quantity += plantToAdd.quantity;
      } else {
        // Add the new plant to the cart
        cart.plants.push(plantToAdd);
      }

      // Save the updated cart
      await cart.save();
      return apiResponse(res, 200, true, "Added to Cart successfully");
    } else {
      // Create a new cart
      const newCart = new Cart({
        user,
        plants: [plantToAdd],
      });
      await newCart.save();
      return apiResponse(res, 200, true, "Added to Cart successfully");
    }
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, false, "Adding cart Error");
  }
};

const getCartItem = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cartItem = await Cart.findOne({ user: userId }).populate(
      "plants.plant"
    );
    console.log(cartItem);

    if (!cartItem) {
      return apiResponse(res, 200, true, "Cart not found for this user");
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    return apiResponse(res, 500, true, "Server Error");
  }
};

module.exports = {
  addToCart,
  getCartItem,
};
