import { createSlice } from "@reduxjs/toolkit";
const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  accessToken: savedAuth?.token || null,
  user: undefined,
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
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
