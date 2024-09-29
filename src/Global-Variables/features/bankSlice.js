// slices/balanceSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchBankDetails } from "../fetch/details"; // Assuming this is an async thunk

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    initialStatus: "",
    banks: [],
    totalBalance: 0,
    percentageHike: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        const { banks, stats } = action.payload;
        state.banks = banks;
        state.totalBalance = stats.totalBalance;
        state.percentageHike = stats.percentageHike;
        state.initialStatus = "Success";
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default balanceSlice.reducer;
