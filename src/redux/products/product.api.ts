import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType, ProductAddType } from "./product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductType[], void>({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query<ProductType, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    addSingleProduct: builder.mutation<void, ProductAddType>({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, ProductType>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddSingleProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
} = productsApi;
