import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/plant/addPlant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    addTrendingProduct: builder.mutation({
      query: ({ plantId }) => ({
        url: `/plant/addTrendingPlant/${plantId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductInfo: builder.mutation({
      query: (data) => ({
        url: `/admin/updatePlantInfo`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ plantId }) => ({
        url: `/admin/deleteProduct/${plantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useAddTrendingProductMutation,
  useUpdateProductInfoMutation,
  useDeleteProductMutation,
} = productsApi;
