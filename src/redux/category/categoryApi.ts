import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from './category';
// import { ProductType, ProductAddType, CategoryType, Product } from './product';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: ['Category'],
    }),
    // getSingleProduct: builder.query<ProductType, number>({
    //   query: (id) => `/products/${id}`,
    //   providesTags: ['Product'],
    // }),
    // addSingleProduct: builder.mutation<void, ProductAddType>({
    //   query: (product) => ({
    //     url: `/products`,
    //     method: 'POST',
    //     body: product,
    //   }),
    //   invalidatesTags: ['Product'],
    // }),
    // updateProduct: builder.mutation<void, ProductType>({
    //   query: ({ _id, ...rest }) => ({
    //     url: `/products/${_id}`,
    //     method: 'PUT',
    //     body: rest,
    //   }),
    //   invalidatesTags: ['Product'],
    // }),
    // deleteProduct: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Product'],
    // }),
    // filterByTitle: builder.query<Product, string>({
    //   query: (name) => ({
    //     url: `/products/?name=${name}`,
    //     providesTags: ['Product'],
    //   }),
    // }),
    // getAllCategory: builder.query<CategoryType[], void>({
    //   query: () => ({
    //     url: `/categories`,
    //     providesTags: ['Product'],
    //   }),
    // }),
    // getProductByCategory: builder.query<ProductType[], number>({
    //   query: (id) => ({
    //     url: `/categories/${id}/products`,
    //     providesTags: ['Product'],
    //   }),
    // }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
