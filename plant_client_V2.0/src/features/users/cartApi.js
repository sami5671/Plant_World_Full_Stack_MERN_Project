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
  }),
});

export const { useAddCartMutation } = cartApi;
