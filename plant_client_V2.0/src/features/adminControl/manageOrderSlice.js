import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  filteredOrders: [],
};

const manageOrderSlice = createSlice({
  name: "manageOrder",
  initialState,
  reducers: {
    allOrders: (state, action) => {
      state.orders = action.payload.data;
      state.filteredOrders = action.payload.data;
    },
    searchByOrderId: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter((order) =>
          order._id.toLowerCase().includes(searchTerm)
        );
      }
    },
    searchByEmail: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter((order) =>
          order.orderInfo.billerEmail.toLowerCase().includes(searchTerm)
        );
      }
    },
    sortOrders: (state, action) => {
      const option = action.payload.value;

      if (option === "lowToHigh") {
        state.filteredOrders = [...state.filteredOrders].sort(
          (a, b) => a.orderInfo.paidAmount - b.orderInfo.paidAmount
        );
      } else if (option === "highToLow") {
        state.filteredOrders = [...state.filteredOrders].sort(
          (a, b) => b.orderInfo.paidAmount - a.orderInfo.paidAmount
        );
      } else {
        state.filteredOrders = state.orders;
      }
    },
  },
});

export const { allOrders, searchByOrderId, searchByEmail, sortOrders } =
  manageOrderSlice.actions;
export default manageOrderSlice.reducer;
