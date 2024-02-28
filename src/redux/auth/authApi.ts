import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoginResponseType, UserLoginType } from "./auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/auth" }),
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
});

export const { useLoginMutation } = authApi;
