import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
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
      // Calculate total price and other values
      const plants = state.cart.plants || [];
      let totalPrice = 0;

      plants.forEach((item) => {
        const price = parseFloat(item.plant?.newPrice || 0);
        const quantity = parseInt(item.quantity || 0);
        totalPrice += price * quantity;
      });

      state.totalPrice = totalPrice.toFixed(2);
      state.totalCartItem = plants.length;

      if (totalPrice >= 30) {
        state.totalPriceAfterDiscount = (totalPrice - 4).toFixed(2);
        state.freeShipping = "";
      } else {
        state.totalPriceAfterDiscount = "";
        state.freeShipping = (30 - totalPrice).toFixed(2);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.totalPrice = "";
      state.totalPriceAfterDiscount = "";
      state.freeShipping = "";
      state.totalCartItem = "";
    },
  },
});

export const { cartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
