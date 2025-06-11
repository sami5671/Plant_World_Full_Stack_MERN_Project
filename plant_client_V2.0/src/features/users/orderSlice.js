import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  filteredOrder: [],
};

const orderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    orderItem: (state, action) => {
      const filterProduct = (state.filteredOrder = action.payload.filter(
        (item) => item?.orderInfo?.orderStatus?.toLowerCase() === "delivered"
      ));
      state.order = filterProduct;
      state.filteredOrder = filterProduct;
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
  },
});

export const {
  orderItem,
  searchByOrderId,
  searchByPlantName,
  sortOrdersByPrice,
} = orderSlice.actions;
export default orderSlice.reducer;
