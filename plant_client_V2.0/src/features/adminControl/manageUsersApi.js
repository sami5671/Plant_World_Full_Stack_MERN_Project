import { apiSlice } from "../api/apiSlice";

export const manageUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = manageUsersApi;
