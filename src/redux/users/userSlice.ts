import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, UserType } from "./user";

// let userState: UserType | null = null;
// const data = localStorage.getItem("userInformation");
// if (data !== null) {
//   userState = JSON.parse(data);
// }

const initialState: InitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
  },
});

export const { resetUsers } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
