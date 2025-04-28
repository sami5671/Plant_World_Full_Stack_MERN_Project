import { apiSlice } from "../api/apiSlice";

export const manageUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ uid, userId, idToken }) => ({
        url: `/admin/deleteUser/${uid}/${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = manageUsersApi;
