import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/plant/addPlant",
        method: "POST",
        body: data,
      }),
    }),
    addTrendingProduct: builder.mutation({
      query: ({ plantId }) => ({
        url: `/plant/addTrendingPlant/${plantId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useAddProductMutation, useAddTrendingProductMutation } =
  productsApi;
