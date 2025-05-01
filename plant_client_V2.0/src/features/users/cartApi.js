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
    }),
    getUserCartItem: builder.query({
      query: (userId) => ({
        url: `/user/userCartItem/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserCartItemQuery, useAddCartMutation } = cartApi;
