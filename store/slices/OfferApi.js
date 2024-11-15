import { apiSlice } from "../api/apiSlice";

export const offerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOffers: builder.query({
      query: () => "/offer",
      providesTags: ["offers"],
    }),
    addoffer: builder.mutation({
      query: (offer) => ({
        url: "/offer",
        method: "POST",
        body: offer,
      }),
      invalidatesTags: ["offers"],
    }),
    updateoffer: builder.mutation({
      query: (offer) => ({
        url: `/offer`,
        method: "PUT",
        body: offer,
      }),
      invalidatesTags: ["offers"],
    }),
  }),
});

export const { useFetchOffersQuery, useAddOfferMutation } = offerApi;
