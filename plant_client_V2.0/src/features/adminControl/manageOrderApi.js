import { apiSlice } from "../api/apiSlice";

export const manageOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/allOrders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ status, orderId }) => ({
        url: `/admin/orderStatusUpdate`,
        method: "PATCH",
        body: { status, orderId },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } =
  manageOrderApi;
