import { apiSlice } from "../../api/apiSlice";

export const stripePayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({ price }) => ({
        url: "/user/create-payment-intent",
        method: "POST",
        body: { price },
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = stripePayApi;
