import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/plant/getAllPlants",
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (plantId) => ({
        url: `/plant/getPlantById/${plantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
