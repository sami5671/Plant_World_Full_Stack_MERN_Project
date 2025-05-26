import { apiSlice } from "../api/apiSlice";

export const manageOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/allOrders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = manageOrderApi;
