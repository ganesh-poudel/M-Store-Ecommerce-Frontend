import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Category } from './category';


export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: ['Category'],
    }),
    // Other method to be added soon
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
