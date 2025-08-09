import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../../firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { getCurrentAddress } from "./getCurrentAddress";
import { getToken } from "../../api/auth";

googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
googleProvider.addScope("https://www.googleapis.com/auth/user.gender.read");
googleProvider.addScope("https://www.googleapis.com/auth/user.birthday.read");
googleProvider.addScope("https://www.googleapis.com/auth/user.addresses.read");

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
          const email = result?.data?.email;

          // GET JWT TOKEN
          const { token } = await getToken(email);
          // console.log("JWT Access Token:", token);

          localStorage.setItem(
            "auth",
            JSON.stringify({ user: result.data, token })
          );
          dispatch(userLoggedIn({ user: result.data, token: token }));
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
          // console.log(result);
          const email = result?.data?.email;

          // GET JWT TOKEN
          const { token } = await getToken(email);
          // console.log("JWT Access Token:", token);

          localStorage.setItem(
            "auth",
            JSON.stringify({ user: result.data, token })
          );
          dispatch(userLoggedIn({ user: result.data, token: token }));
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
          // console.log(result.data);
          const email = result?.data?.email;
          // console.log(email);

          // GET JWT TOKEN
          const { token } = await getToken(email);
          // console.log("JWT Access Token:", token);

          localStorage.setItem(
            "auth",
            JSON.stringify({ user: result.data, token })
          );
          dispatch(userLoggedIn({ user: result.data, token: token }));
        } catch (err) {
          console.error("Social login error:", err);
        }
      },
    }),
    googleLogin: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          // console.log(result.data);
          const { displayName, email, photoURL, uid } = result.user;

          // Get access token
          const accessToken = result._tokenResponse.oauthAccessToken;

          // Call Google People API using accessToken
          const res = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=genders,birthdays",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const extraData = await res.json();
          const gender = extraData.genders?.[0]?.value ?? null;
          const birthday = extraData.birthdays?.[0]?.date ?? null;

          // ---opencage data for current physical location ---

          const currentAddress = await getCurrentAddress();
          // console.log(currentAddress);

          return dispatch(
            authApi.endpoints.socialLogin.initiate({
              fullName: displayName,
              email,
              gender,
              DOB: birthday,
              avatar: photoURL,
              address: currentAddress,
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
          // console.log(result);
          const { displayName, email, photoURL, uid } = result.user;
          // console.log(email, screenName);

          // ---open cage data for current physical location ---

          const currentAddress = await getCurrentAddress();
          // console.log(currentAddress);

          return dispatch(
            authApi.endpoints.socialLogin.initiate({
              fullName: displayName,
              email,
              avatar: photoURL,
              address: currentAddress,
              providerId: uid,
              provider: "github",
            })
          ).unwrap();
        } catch (error) {
          // console.error("GitHub login failed:", error);
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
