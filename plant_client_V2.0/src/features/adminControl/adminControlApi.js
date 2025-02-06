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
  }),
});

export const { useAddProductMutation } = productsApi;
