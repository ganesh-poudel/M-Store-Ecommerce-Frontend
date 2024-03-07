import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitalLoginStateType, UserLoginResponseType } from "./auth";
import { UserType } from "../users/user";

// let userState: UserType | null = null;
// const data = localStorage.getItem("userInformation");
// if (data !== null) {
//   userState = JSON.parse(data);
// }

let accessToken = "";
const data = localStorage.getItem("accessToken");
if (data !== null && data !== "undefined") {
  accessToken = JSON.parse(data);
}

let currentUser: UserType | null = null;
const userData = localStorage.getItem("currentUser");
if (userData !== null) {
  currentUser = JSON.parse(userData);
}

const initialState: InitalLoginStateType = {
  accessToken: accessToken,
  isAuthenticated: false,
  role: null,
  user: currentUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      console.log("login token", state.accessToken);
    },
    logout: (state) => {
      state.accessToken = "";
      state.user = null;
      state.isAuthenticated = false;
    //   localStorage.removeItem("accessToken");
    //  window.localStorage.removeItem("favItem");
    //   localStorage.removeItem("shopCart");
    //   localStorage.clear();
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { saveLoginToken, logout, setUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
