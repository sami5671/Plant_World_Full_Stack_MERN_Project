import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: ({ orderData }) => ({
        url: "/user/saveOrder",
        method: "POST",
        body: { orderData },
      }),
      // invalidatesTags: (result, error, { orderData }) => [
      //   { type: "Carts", id: orderData.userId },
      // ],
    }),
    getUserOrder: builder.query({
      query: ({ userId }) => ({
        url: `/user/userOrderItem/${userId}`,
        method: "GET",
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ id }) => ({
        url: `/user/orderDetails/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMakeOrderMutation,
  useGetUserOrderQuery,
  useGetOrderDetailsQuery,
} = orderApi;
