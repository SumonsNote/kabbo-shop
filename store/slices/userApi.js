import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/user",
      providesTags: ["users"],
      // forceRefetch: true,
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   const users = await queryFulfilled;
      //   // Handle the fetched data if needed
      // },
    }),
    // fetchUserById: builder.query({
    //   query: (id) => `/users/${id}`,
    // }),
    // fetchUserByArea: builder.query({
    //   query: (area) => `/users/area/${area}`,
    // }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useFetchUserByAreaQuery,
  useAddUserMutation,
} = usersApi;
