import { apiSlice } from "../api/apiSlice";

export const manageOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/allOrders",
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ status, orderId }) => ({
        url: `/admin/orderStatusUpdate`,
        method: "PATCH",
        body: { status, orderId },
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } =
  manageOrderApi;
