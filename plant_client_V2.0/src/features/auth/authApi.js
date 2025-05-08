import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../../firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";

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
          localStorage.setItem("auth", JSON.stringify({ user: result.data }));
          dispatch(userLoggedIn({ user: result.data }));
        } catch (err) {
          console.error("Registration error:", err);
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
          localStorage.setItem("auth", JSON.stringify({ user: result.data }));
          dispatch(userLoggedIn({ user: result.data }));
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/socialLogin",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("auth", JSON.stringify({ user: result.data }));
          dispatch(userLoggedIn({ user: result.data }));
        } catch (err) {
          console.error("Social login error:", err);
        }
      },
    }),
    googleLogin: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const { displayName, email, photoURL, uid } = result.user;

          return dispatch(
            authApi.endpoints.socialLogin.initiate({
              name: displayName,
              email,
              avatar: photoURL,
              providerId: uid,
              provider: "google",
            })
          ).unwrap();
        } catch (error) {
          console.error("Google login failed:", error);
          return { error };
        }
      },
    }),
    githubLogin: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        try {
          const result = await signInWithPopup(auth, githubProvider);
          const { displayName, email, photoURL, uid } = result.user;

          return dispatch(
            authApi.endpoints.socialLogin.initiate({
              name: displayName,
              email,
              avatar: photoURL,
              providerId: uid,
              provider: "github",
            })
          ).unwrap();
        } catch (error) {
          console.error("GitHub login failed:", error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useGithubLoginMutation,
  useSocialLoginMutation,
} = authApi;
