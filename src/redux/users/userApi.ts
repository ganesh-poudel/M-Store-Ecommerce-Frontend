import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UpdateQueryType, UserRegistrationType, UserType} from './user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => `/users`,
      providesTags: ['User'],
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    addUser: builder.mutation<UserType, UserRegistrationType>({
      query: (user) => ({
        url: `/users`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<void, UpdateQueryType>({
      query: ({ id, rest }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyGetSingleUserQuery,
} = usersApi;
