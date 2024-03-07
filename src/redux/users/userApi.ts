import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateQueryType, UserRegistrationType, UserType, UserUpdate } from "./user";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<UserType, UserRegistrationType>({
      query: (user) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<void, UpdateQueryType>({
      query: ({ id, rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyGetSingleUserQuery
} = usersApi;
