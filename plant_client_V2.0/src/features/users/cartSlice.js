import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  totalPriceAfterDiscount: 0,
  freeShipping: 0,
  shippingDiscount: 0,
  shippingHandling: 0,
  totalCartItem: 0,
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

      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalCartItem = plants.length;

      if (totalPrice >= 30) {
        state.totalPriceAfterDiscount = parseFloat((totalPrice - 4).toFixed(2));
        state.freeShipping = 0;
        state.shippingDiscount = 4.0;
        state.shippingHandling = 0;
      } else {
        state.totalPriceAfterDiscount = parseFloat((totalPrice + 4).toFixed(2));
        state.freeShipping = parseFloat((30 - totalPrice).toFixed(2));
        state.shippingDiscount = 0;
        state.shippingHandling = 4.0;
      }
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { cartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
