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
    filterByTrending: (state, action) => {
      const plantType = action.payload.value;
      if (plantType === "all") {
        state.filteredProducts = state.products;
      } else if (plantType === "trending") {
        state.filteredProducts = state.products.filter(
          (product) => product.trending === true
        );
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.trending === false
        );
      }
    },
    manageTrending: (state, action) => {
      const plantId = action.payload.data;
      const productIndex = state.products.findIndex(
        (product) => product._id === plantId
      );
      if (productIndex !== -1) {
        state.filteredProducts[productIndex].trending =
          !state.filteredProducts[productIndex].trending;
      }
    },
  },
});

export const {
  allPlants,
  searchByName,
  searchById,
  manageTrending,
  filterByTrending,
} = manageProductSlice.actions;
export default manageProductSlice.reducer;
