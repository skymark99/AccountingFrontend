import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startPage: 1,
  endPage: 4,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setStartPage(state, action) {
      state.startPage = action.payload;
    },
    setEndPage(state, action) {
      state.endPage = action.payload;
    },
  },
});

export const { setStartPage, setEndPage } = paginationSlice.actions;

export default paginationSlice.reducer;
