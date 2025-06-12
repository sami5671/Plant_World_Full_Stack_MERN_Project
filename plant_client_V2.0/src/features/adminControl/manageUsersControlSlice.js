import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUser: [],
  totalUsers: 0,
};

const manageUsersSlice = createSlice({
  name: "manageUsers",
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUser = action.payload;
    },

    // calculate users
    calculateUser: (state, action) => {
      // console.log(action.payload);
      const users = action.payload.length;
      state.totalUsers = users;
    },
  },
});

export const { allUsers, calculateUser } = manageUsersSlice.actions;
export default manageUsersSlice.reducer;
