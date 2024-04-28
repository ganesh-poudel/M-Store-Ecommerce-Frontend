import { createApi } from '@reduxjs/toolkit/query/react';
import { Order } from '../order/Order';
import { baseQuery } from '../auth/authApi';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: `/orders`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
  }),
  //other method will be added soon
});

export const { useGetAllOrdersQuery } = ordersApi;
