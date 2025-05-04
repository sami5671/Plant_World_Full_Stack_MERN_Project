import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  plants: [],
  totalPrice: "",
  totalPriceAfterDiscount: "",
  freeShipping: "",
  totalCartItem: "",
};

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    cartItem: (state, action) => {
      state.cart = action.payload;
      state.plants = state.cart.plants;

      let totalPrice = 0;
      state.plants.forEach((item) => {
        const price = parseFloat(item.plant.newPrice);
        const quantity = item.quantity;
        totalPrice = totalPrice + price * quantity;

        // discount calculation
        if (totalPrice >= 30) {
          state.totalPriceAfterDiscount = (totalPrice - 4).toFixed(2);
          state.freeShipping = "";
        } else {
          state.totalPriceAfterDiscount = "";
          state.freeShipping = 30 - totalPrice;
        }
      });
      state.totalPrice = totalPrice.toFixed(2);
      state.totalCartItem = state.plants.length;
    },
  },
});

export const { cartItem } = cartSlice.actions;

export default cartSlice.reducer;
