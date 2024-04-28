import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserLoginResponseType, UserLoginType } from './auth';
import { UserType } from '../users/user';
import { AppState } from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).authReducer.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const getTokenFromLocalStorage = () => {
  let token = '';
  const data = localStorage.getItem('accessToken');
  if (data !== null) {
    token = JSON.parse(data);
  }
  return token;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<UserLoginResponseType, UserLoginType>({
      query: (loginCedentials) => ({
        url: `/users/login`,
        method: 'POST',
        body: loginCedentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    userSession: builder.query<UserType, void>({
      query: () => ({
        url: `/users/profile`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        providesTags: ['Auth'],
      }),
    }),
  }),
});

export const { useLoginMutation, useUserSessionQuery, useLazyUserSessionQuery } = authApi;

