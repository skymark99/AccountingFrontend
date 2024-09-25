import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchCatagory = createAsyncThunk(
  "catagory/fetchCatagory",
  async () => {
    const response = await axios.get(`${URL}/v1/catagory`, {
      withCredentials: true,
    });
    return response.data.docs;
  }
);

const initialState = {
  catagories: [],
  particulars: [],
};

const catagorySlice = createSlice({
  name: "catagory",
  initialState,
  reducers: {
    resetCatagory(state) {
      state.catagories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatagory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatagory.fulfilled, (state, action) => {
        state.loading = false;
        state.catagories = action.payload;
      })
      .addCase(fetchCatagory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCatagory } = catagorySlice.actions;

export default catagorySlice.reducer;
