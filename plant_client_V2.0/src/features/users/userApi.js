import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfileInfo: builder.query({
      query: ({ userId }) => ({
        url: `/user/userProfileInfo/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
    // update profile info
    updateUserProfileInfo: builder.mutation({
      query: (data) => ({
        url: `/user/updateProfileInfo`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `/user/updatePassword`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUserProfileInfoQuery,
  useUpdateUserProfileInfoMutation,
  useUpdateUserPasswordMutation,
} = userApi;
