import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => "/product",
      providesTags: ["products"],
    }),
    fetchSingleProducts: builder.query({
      query: (id) => `/product/${id}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/product`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useFetchProductsQuery,
  useUpdateProductMutation,
} = productsApi;
