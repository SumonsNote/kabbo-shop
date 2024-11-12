import { apiSlice } from "../api/apiSlice";

export const stocksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStocks: builder.query({
      query: () => "/stock",
      providesTags: ["stocks"],
    }),
    fetchSingleStock: builder.query({
      query: (id) => `/stock/${id}`,
    }),
    addStock: builder.mutation({
      query: (stock) => ({
        url: "/stock",
        method: "POST",
        body: stock,
      }),
      invalidatesTags: ["stocks"],
    }),

    updateStock: builder.mutation({
      query: (stock) => ({
        url: `/stock`,
        method: "PUT",
        body: stock,
      }),
      invalidatesTags: ["stocks"],
    }),
  }),
});

export const {
  useFetchStocksQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useFetchSingleStockQuery,
} = stocksApi;
