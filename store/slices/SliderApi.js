import { apiSlice } from "../api/apiSlice";

export const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSliders: builder.query({
      query: () => "/slider",
      providesTags: ["sliders"],
    }),
    addslider: builder.mutation({
      query: (slider) => ({
        url: "/slider",
        method: "POST",
        body: slider,
      }),
      invalidatesTags: ["sliders"],
    }),
    updateslider: builder.mutation({
      query: (slider) => ({
        url: `/slider`,
        method: "PUT",
        body: slider,
      }),
      invalidatesTags: ["sliders"],
    }),
  }),
});

export const { useFetchSlidersQuery, useAddSliderMutation } = sliderApi;
