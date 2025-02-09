import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUser: [],
};

const manageUsersSlice = createSlice({
  name: "manageUsers",
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUser = action.payload;
    },
  },
});

export const { allUsers } = manageUsersSlice.actions;
export default manageUsersSlice.reducer;
