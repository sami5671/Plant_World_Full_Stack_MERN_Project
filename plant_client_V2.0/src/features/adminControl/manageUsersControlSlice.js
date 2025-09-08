import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUser: [],
  totalUsers: 0,
  male: 0,
  female: 0,
};

const manageUsersSlice = createSlice({
  name: "manageUsers",
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUser = action.payload;

      // count male & female
      const male = state.users.filter((user) => user.gender == "male").length;
      const female = state.users.filter(
        (user) => user.gender == "female"
      ).length;

      state.male = male;
      state.female = female;

      // total users
      const users = action.payload.length;
      state.totalUsers = users;
    },
  },
});

export const { allUsers } = manageUsersSlice.actions;
export default manageUsersSlice.reducer;
