import { createSlice } from "@reduxjs/toolkit";
const savedAuth = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth")) : null;

const initialState = {
  user: savedAuth?.user || null,
  accessToken: savedAuth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
      localStorage.removeItem("auth");
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        auth.user = { ...auth.user, ...action.payload };
        localStorage.setItem("auth", JSON.stringify(auth));
      }
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
