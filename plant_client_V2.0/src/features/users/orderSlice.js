import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  filteredOrder: [],
  trendingProducts: [],
  totalTrendingProduct: 0,
  totalBuy: 0,
  totalOrders: 0,
  pendingOrders: 0,
};

const orderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    orderItem: (state, action) => {
      // set all orders to state
      state.order = action.payload;
      // set filtered orders to state
      const filterProduct = (state.filteredOrder = action.payload.filter(
        (item) => item?.orderInfo?.orderStatus?.toLowerCase() === "delivered"
      ));
      state.filteredOrder = filterProduct;

      // calculate total buy amount
      const totalBuy = filterProduct.reduce(
        (total, item) => total + item?.orderInfo?.paidAmount,
        0
      );
      state.totalBuy = totalBuy;

      // calculate total orders
      state.totalOrders = action.payload.length;
      // calculate pending orders
      const pendingOrders = action.payload.filter(
        (item) => item?.orderInfo?.orderStatus?.toLowerCase() !== "delivered"
      );
      state.pendingOrders = pendingOrders.length;
    },
    searchByOrderId: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredOrder = state.order;
      } else {
        state.filteredOrder = state.order.filter((order) =>
          order._id.toLowerCase().includes(searchTerm)
        );
      }
    },
    searchByPlantName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredOrder = state.order;
      } else {
        state.filteredOrder = state.order.filter((order) =>
          order.plantIdWithQuantity.some((item) =>
            item.plantId?.name?.toLowerCase().includes(searchTerm)
          )
        );
      }
    },
    sortOrdersByPrice: (state, action) => {
      const option = action.payload.value;

      if (option === "lowToHigh") {
        state.filteredOrder = [...state.filteredOrder].sort(
          (a, b) => a.orderInfo.paidAmount - b.orderInfo.paidAmount
        );
      } else if (option === "highToLow") {
        state.filteredOrder = [...state.filteredOrder].sort(
          (a, b) => b.orderInfo.paidAmount - a.orderInfo.paidAmount
        );
      } else {
        state.filteredOrder = state.order;
      }
    },
    // trending products
    trendingItems: (state, action) => {
      state.trendingProducts = action.payload.data.filter(
        (product) => product.trending === true
      );
      state.totalTrendingProduct = state.trendingProducts.length;
    },
  },
});

export const {
  orderItem,
  searchByOrderId,
  searchByPlantName,
  sortOrdersByPrice,
  trendingItems,
} = orderSlice.actions;
export default orderSlice.reducer;
