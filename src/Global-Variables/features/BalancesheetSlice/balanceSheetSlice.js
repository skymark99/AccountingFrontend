// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchBalanceSheet = createAsyncThunk(
  "dashboard/fetchBalanceSheet",
  async () => {
    const response = await axios.get(`${URL}/v1/transaction/balance-sheet`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const initialState = {
  data: [],
  initialStatus: "",
  loading: false,
  error: null,
};

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalanceSheet.fulfilled, (state, action) => {
        state.loading = false;
        state.initialStatus = "Success";
        state.data = action.payload.formattedResult;
      })
      .addCase(fetchBalanceSheet.rejected, (state, action) => {
        state.loading = false;
        state.initialStatus = "Failed";
        state.error = action.error.message;
      });
  },
});

export default dashBoardSlice.reducer;
