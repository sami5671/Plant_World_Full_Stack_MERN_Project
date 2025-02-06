import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/plant/getAllPlants",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
