import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allPlants: (state, action) => {
      state.products = action.payload.data;
      state.filteredProducts = action.payload.data;
    },
    searchByName: (state, action) => {
      const searchedTerm = action.payload.toLowerCase();
      if (searchedTerm === "") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(searchedTerm)
        );
      }
    },
    filterByCategory: (state, action) => {
      const selectedCategory = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.category === selectedCategory
      );
    },
    filterByPrice: (state, action) => {
      const price = Number(action.payload);
      if (price <= 0) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => Number(product.newPrice) <= price
        );
      }
    },
  },
});

export const { allPlants, searchByName, filterByCategory, filterByPrice } =
  productSlice.actions;

export default productSlice.reducer;
