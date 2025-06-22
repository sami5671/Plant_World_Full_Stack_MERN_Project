import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../../firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";

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
          // console.log(result);
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
          // console.log(result);
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
          // console.log(result);
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

          // --- Geolocation + Nominatim for current physical location ---

          // Helper to get current position
          const getPosition = () =>
            new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
            );

          let currentAddress = null;
          try {
            const position = await getPosition();
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const nominatimRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
              {
                headers: {
                  "User-Agent": "Plant-World0V2/1.0 (samialam5671@gmail.com)",
                  "Accept-Language": "en",
                },
              }
            );
            const locationData = await nominatimRes.json();
            currentAddress = locationData.display_name || null;
          } catch (geoError) {
            // console.warn("Geolocation or Nominatim failed:", geoError);
          }

          // console.log("Current address from Nominatim:", currentAddress);

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
          console.log(result);
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
