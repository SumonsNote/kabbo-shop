import { apiSlice } from "../api/apiSlice";

export const customersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCustomers: builder.query({
      query: () => "/customer",
      providesTags: ["customers"],
    }),
    fetchSingleCustomers: builder.query({
      query: (id) => `/customer/${id}`,
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: "/customer",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["customers"],
    }),

    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customer`,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: ["customers"],
    }),
  }),
});

export const { useFetchCustomersQuery } = customersApi;
