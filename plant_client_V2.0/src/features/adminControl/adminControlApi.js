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
    updateProductInfo: builder.mutation({
      query: (data) => ({
        url: `/admin/updatePlantInfo`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ plantId }) => ({
        url: `/admin/deleteProduct/${plantId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useAddTrendingProductMutation,
  useUpdateProductInfoMutation,
  useDeleteProductMutation,
} = productsApi;
