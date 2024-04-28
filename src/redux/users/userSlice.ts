import { createSlice } from "@reduxjs/toolkit";

import { InitialState} from "./user";

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
