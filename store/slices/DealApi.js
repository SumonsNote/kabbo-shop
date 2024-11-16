import { apiSlice } from "../api/apiSlice";

export const dealApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDeals: builder.query({
      query: () => "/deal",
      providesTags: ["deals"],
    }),
    adddeal: builder.mutation({
      query: (deal) => ({
        url: "/deal",
        method: "POST",
        body: deal,
      }),
      invalidatesTags: ["deals"],
    }),
    updatedeal: builder.mutation({
      query: (deal) => ({
        url: `/deal`,
        method: "PUT",
        body: deal,
      }),
      invalidatesTags: ["deals"],
    }),
  }),
});

export const { useFetchDealsQuery, useAddDealMutation } = dealApi;
