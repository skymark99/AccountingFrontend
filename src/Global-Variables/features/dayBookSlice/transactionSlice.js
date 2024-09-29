import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { page } = state.transactions;
      const {
        currentDayBookBranch: branch,
        dayBookStartDate: startDate,
        dayBookEndDate: endDate,
        selectedCatagory: category,
        selectedParticular: particular,
        query,
      } = state.daybook;

      let endpoint =
        branch === "All Branch"
          ? `/v1/transaction?sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}`
          : `/v1/transaction?sort=-createdAt&page=${page}&branch=${branch}&startDate=${startDate}&endDate=${endDate}`;

      if (query) {
        endpoint += `&search=${query}`;
      }

      if (category !== "All Categories") {
        endpoint += `&catagory=${category}`;
      }
      if (particular !== "All Particulars") {
        endpoint += `&particular=${particular}`;
      }

      const response = await axios.get(`${URL}${endpoint}`, {
        withCredentials: true,
      });
      return response.data.docs;
    } catch (error) {
      if (error.name === "CanceledError") {
        return rejectWithValue("Request was cancelled");
      }
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  transactions: [],
  length: 0,
  page: 1,
  currentPage: 1,
  disableBtn: false,
  startPage: 0,
  temp: 1,
  error: null,
  loading: false,
  initialStatus: "",
};

// Transactions slice with reducers and extra reducers for async actions
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      const newPage = action.payload; // The page number user clicked

      // Handling forward page navigation
      if (state.currentPage < newPage) {
        if ((newPage - 1) % 4 === 0) {
          state.page += 1;
          state.temp = 1;
        } else {
          state.temp = ((newPage - 1) % 4) + 1;
        }
      }

      // Handling backward page navigation
      if (state.currentPage > newPage) {
        if (newPage % 4 === 0) {
          state.page -= 1;
          state.temp = 4;
        } else {
          state.temp = newPage % 4;
        }
      }

      // Update currentPage and calculate startPage
      state.currentPage = newPage;
      state.startPage = 6 * (state.temp - 1);
    },
    resetTransactions(state) {
      state.transactions = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.disableBtn = false;
      state.startPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.initialStatus = "Success";
        state.length = action.payload.length;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setCurrentPage, resetTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
