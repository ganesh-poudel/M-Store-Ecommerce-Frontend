import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType, ProductAddType, CategoryType, Product, Filter } from './product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product, void>({
      query: () => ({
        url: `/products`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    getSingleProduct: builder.query<ProductType, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Products'],
    }),
    addSingleProduct: builder.mutation<void, ProductAddType>({
      query: (product) => ({
        url: `/products`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<void, ProductType>({
      query: ({ _id, ...rest }) => ({
        url: `/products/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    filterByTitle: builder.query<Product, string>({
      query: (name) => ({
        url: `/products/?name=${name}`,
        providesTags: ['Product'],
      }),
    }),
    // getAllCategory: builder.query<CategoryType[], void>({
    //   query: () => ({
    //     url: `/categories`,
    //     providesTags: ['Product'],
    //   }),
    // }),
    // getProductByFilter: builder.query<ProductType[], number>({
    //   query: (id) => ({
    //     url: `/categories/${id}/products`,
    //     providesTags: ['Product'],
    //   }),
    // }),
    getProductByFilter: builder.query<Product, Partial<Filter>>({
      query: (args) => ({
        url: `/products/?category=${args.category}&min_price=${args.min_price}&size=${args.size}`,
        providesTags: ['Product'],
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useAddSingleProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useFilterByTitleQuery,
  // useGetAllCategoryQuery,
  useGetProductByFilterQuery,
  useLazyGetProductByFilterQuery,
} = productsApi;
