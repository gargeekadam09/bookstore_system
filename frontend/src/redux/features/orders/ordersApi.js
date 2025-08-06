import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/orders`
})

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery,
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/',
                method: 'POST',
                body: newOrder
            }),
            invalidatesTags: ['Orders']
        }),
        getOrdersByEmail: builder.query({
            query: (email) => `/email/${email}`,
            providesTags: ['Orders']
        }),
        getAllOrders: builder.query({
            query: () => '/',
            providesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const { useCreateOrderMutation, useGetOrdersByEmailQuery, useGetAllOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
export default ordersApi;