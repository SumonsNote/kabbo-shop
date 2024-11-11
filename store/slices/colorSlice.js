import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "",
  image: "",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    addColor: (state, action) => {
      return action.payload;
    },
  },
});

export default colorSlice.reducer;
export const { addColor } = colorSlice.actions;
