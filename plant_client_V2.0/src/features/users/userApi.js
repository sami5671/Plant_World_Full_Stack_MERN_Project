import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfileInfo: builder.query({
      query: ({ userId }) => ({
        url: `/user/userProfileInfo/${userId}`,
        method: "GET",
      }),
    }),
    // update profile info
    updateUserProfileInfo: builder.mutation({
      query: (data) => ({
        url: `/user/updateProfileInfo`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserProfileInfoQuery, useUpdateUserProfileInfoMutation } =
  userApi;
