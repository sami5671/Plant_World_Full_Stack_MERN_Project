import { apiSlice } from "../api/apiSlice";

export const subscriberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data) => ({
        url: "/subscriber/subscribe",
        method: "POST",
        body: data,
      }),
    }),
    getAllSubscribers: builder.query({
      query: () => "/subscriber/all",
    }),
  }),
});

export const { useSubscribeMutation, useGetAllSubscribersQuery } = subscriberApi;
