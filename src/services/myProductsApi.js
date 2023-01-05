import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const myProductsApi = createApi({
  // Set the baseUrl for every endpoint below
  reducerPath: 'myRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/scandiPHP/' } ),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url:``,
        
      }),
      providesTags: ['Request'],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: ``,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: data
      }),
      invalidatesTags: ['Request'],
    }),
    deleteProducts: builder.mutation({
      query: (data) => ({
        url: ``,
        method: 'Delete',
        headers: { 'Content-Type': 'application/json'},
        
        body: data
      }),
      invalidatesTags: ['Request'],
      
    }),
  }),
})

export const { useGetProductsQuery,useAddProductMutation,useDeleteProductsMutation} = myProductsApi