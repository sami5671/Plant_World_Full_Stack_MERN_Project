import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log(result);

          // save to local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data,
            })
          );
          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // nothing to do here
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log(result);

          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data,
            })
          );

          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // nothing to do here
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
