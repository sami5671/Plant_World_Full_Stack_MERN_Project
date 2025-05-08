import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: ({ user, plantId, quantity }) => ({
        url: "/user/cart",
        method: "POST",
        body: {
          user,
          plants: [
            {
              plant: plantId,
              quantity,
            },
          ],
        },
      }),
      invalidatesTags: ["Carts"],
    }),
    getUserCartItem: builder.query({
      query: (userId) => ({
        url: `/user/userCartItem/${userId}`,
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    updateCartItem: builder.mutation({
      query: ({ plantId, userId, action }) => ({
        url: `/user/updateCartQuantity`,
        method: "PUT",
        body: {
          plantId,
          userId,
          action,
        },
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useGetUserCartItemQuery,
  useAddCartMutation,
  useUpdateCartItemMutation,
} = cartApi;
