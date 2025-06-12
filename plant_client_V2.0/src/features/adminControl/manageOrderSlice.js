import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  filteredOrders: [],
  ordersChart: [],
  filteredOrdersChart: [],
  totalOrders: 0,
  totalEarnings: 0,
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

    // for graph and chart
    orderGraphChart: (state, action) => {
      const allOrders = action.payload.data;

      // Store all orders
      state.ordersChart = allOrders;
      // Determine the latest year from data
      const latestYear = Math.max(
        ...allOrders.map((order) => new Date(order.createdAt).getFullYear())
      );
      // Filter only latest year’s orders
      const latestYearOrders = allOrders.filter((order) => {
        const orderYear = new Date(order.createdAt).getFullYear();
        return orderYear === latestYear;
      });
      // Store filtered orders for the latest year
      state.filteredOrdersChart = latestYearOrders;

      // console.log(" Latest Year:", latestYear);
      // console.log(" Orders in Latest Year:", latestYearOrders.length);

      // calculating the total earnings , orders
      state.totalOrders = state.filteredOrdersChart.length;
      // Calculate total earnings from paidAmount
      state.totalEarnings = state.filteredOrdersChart.reduce((total, order) => {
        return total + (Number(order?.orderInfo?.paidAmount) || 0);
      }, 0);

      // console.log(state.totalEarnings);
    },
    yearBasedGraphChart: (state, action) => {
      const selectedYear = action.payload.value;
      const allOrders = state.ordersChart;

      const filteredOrders = allOrders.filter((order) => {
        const orderYear = new Date(order.createdAt).getFullYear();
        return orderYear === selectedYear;
      });
      state.filteredOrdersChart = filteredOrders;

      // calculate orders, earnings of the year
      state.totalOrders = state.filteredOrdersChart.length;
      // Calculate total earnings from paidAmount
      state.totalEarnings = state.filteredOrdersChart.reduce((total, order) => {
        return total + (Number(order?.orderInfo?.paidAmount) || 0);
      }, 0);
    },
  },
});

export const {
  allOrders,
  searchByOrderId,
  searchByEmail,
  sortOrders,
  orderGraphChart,
  yearBasedGraphChart,
} = manageOrderSlice.actions;
export default manageOrderSlice.reducer;
