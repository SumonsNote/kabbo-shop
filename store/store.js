import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import colorSliceReducer from "./slices/colorSlice";
import filterSliceReducer from "./slices/filterSlice";
// configure store for redux

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterSliceReducer,
    color: colorSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
