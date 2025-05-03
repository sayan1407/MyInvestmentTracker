import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const investmentAPI = createApi({
  reducerPath: "apiInvestment",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  tagTypes : ["Investments"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getInvestments: builder.query({
      query: () => ({
        url : "investments",
        method : "GET",
        params : {}
      }),
      transformResponse : (res) => res.sort((a,b) => b.id - a.id),
      providesTags : ["Investments"]
    }),
    addInvestment: builder.mutation({
      query: (investment) => ({
        url : "investments",
        method : "POST",
        body : investment
      }) ,
      invalidatesTags : ["Investments"]
    }),
    updateInvestment: builder.mutation({
      query: (destination) => ({
        url : `investments/${destination.id}`,
        method : "PUT",
        body : destination
      }) ,
      invalidatesTags : ["Investments"]
    }),
    deleteInvestment: builder.mutation({
      query: ({id}) => ({
        url : `investments/${id}`,
        method : "DELETE",
        body : id
      }) ,
      invalidatesTags : ["Investments"]
    })
  }),
});
export const { useGetInvestmentsQuery,
useAddInvestmentMutation,
useUpdateInvestmentMutation,
useDeleteInvestmentMutation

 } = investmentAPI;