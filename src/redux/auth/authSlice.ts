import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitalLoginStateType } from './auth';
import { UserType } from '../users/user';

const initialState: InitalLoginStateType = {
  accessToken: '',
  isAuthenticated: false,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveLoginToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      console.log('login token', state.accessToken);
    },
    logout: (state) => {
      state.accessToken = '';
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      console.log('user ...', state.user);
    },
  },
});

export const { saveLoginToken, logout, setUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
