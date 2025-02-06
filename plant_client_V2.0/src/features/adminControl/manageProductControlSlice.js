import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
};

const manageProductSlice = createSlice({
  name: "manageProducts",
  initialState,
  reducers: {
    allPlants: (state, action) => {
      state.products = action.payload.data;
      state.filteredProducts = action.payload.data;
    },
    searchByName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    searchById: (state, action) => {
      const searchTerm = action.payload;
      if (searchTerm === "") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product._id === searchTerm
        );
      }
    },
  },
});

export const { allPlants, searchByName, searchById } =
  manageProductSlice.actions;
export default manageProductSlice.reducer;
