import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthType, UserLoginResponseType, UserLoginType } from "./auth";
import { UserType } from "../users/user";
import { AppState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.escuelajs.co/api/v1/auth",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).authReducer.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const getTokenFromLocalStorage = () => {
  let token = "";
  const data = localStorage.getItem("accessToken");
  if (data !== null) {
    token = JSON.parse(data);
  }
  return token;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<UserLoginResponseType, UserLoginType>({
      query: (loginCedentials) => ({
        url: `/login`,
        method: "POST",
        body: loginCedentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    userSession: builder.query<UserType, void>({
      query: () => ({
        url: `/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        providesTags: ["Auth"],
      }),

      // updateUser: builder.mutation<void, UserType>({
      //   query: ({ id, ...rest }) => ({
      //     url: `/users/${id}`,
      //     method: "PUT",
      //     body: rest,
      //   }),
      //   invalidatesTags: ["User"],
      // }),
      // deleteUser: builder.mutation<void, number>({
      //   query: (id) => ({
      //     url: `/users/${id}`,
      //     method: "DELETE",
      //   }),
      //   invalidatesTags: ["User"],
      // }),
    }),
  }),
});

export const { useLoginMutation, useUserSessionQuery, useLazyUserSessionQuery } = authApi;
