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
      const cartItem = await Cart.findOne({ user: user }).populate(
        "plants.plant"
      );
      return apiResponse(
        res,
        200,
        true,
        "Added to Cart successfully",
        cartItem
      );
    } else {
      // Create a new cart
      const newCart = new Cart({
        user,
        plants: [plantToAdd],
      });
      await newCart.save();
      const cartItem = await Cart.findOne({ user: user }).populate(
        "plants.plant"
      );

      return apiResponse(
        res,
        200,
        true,
        "Added to Cart successfully",
        cartItem
      );
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
    // console.log(cartItem);

    if (!cartItem) {
      return apiResponse(res, 400, false, "Cart not found for this user");
    } else {
      return apiResponse(res, 200, true, "cart found successfully", cartItem);
    }
  } catch (error) {
    return apiResponse(res, 500, true, "Server Error");
  }
};

const updateCartQuantity = async (req, res) => {
  const { plantId, userId, action } = req.body;
  // console.log(plantId, userId, action);

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return apiResponse(res, 404, "Cart not found");

    const plantIndex = cart.plants.findIndex(
      (item) => item.plant.toString() === plantId
    );

    if (plantIndex === -1)
      return apiResponse(res, 404, "Plant not found in cart");

    if (action === "plus") {
      cart.plants[plantIndex].quantity += 1;
    } else if (action === "minus") {
      cart.plants[plantIndex].quantity -= 1;
      if (cart.plants[plantIndex].quantity < 1) {
        cart.plants.splice(plantIndex, 1);
      }
    }

    await cart.save();

    const cartItem = await Cart.findOne({ user: userId }).populate(
      "plants.plant"
    );

    return apiResponse(res, 202, "Cart updated", cartItem);
  } catch (error) {
    console.error(error);
    apiResponse(res, 500, "Server error");
  }
};

module.exports = {
  addToCart,
  getCartItem,
  updateCartQuantity,
};
