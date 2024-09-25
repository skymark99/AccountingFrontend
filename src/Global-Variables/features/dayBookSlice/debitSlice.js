import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

export const fetchDebits = createAsyncThunk(
  "debits/fetchDebits",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {
        currentDayBookBranch: branch,
        dayBookStartDate: startDate,
        dayBookEndDate: endDate,
        selectedCatagory: category,
        selectedParticular: particular,
        query,
      } = state.daybook;

      const { page } = state.debit;
      let endpoint;
      endpoint =
        branch === "All Branch"
          ? `/v1/transaction?sort=-createdAt&page=${page}&type=Debit&startDate=${startDate}&endDate=${endDate}`
          : `/v1/transaction?sort=-createdAt&page=${page}&type=Debit&branch=${branch}&startDate=${startDate}&endDate=${endDate}`;

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
      console.error("Error fetching debits:", error);
      return rejectWithValue("Failed to fetch debits. Please try again.");
    }
  }
);
const initialState = {
  debits: [],
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  loading: false,
  error: null,
};

const debitSlice = createSlice({
  name: "debit",
  initialState,
  reducers: {
    setDebits(state, action) {
      state.length = action.payload.length;
      if (state.debits[0]?._id !== action.payload[0]._id) {
        state.debits = state.debits.concat(action.payload);
      } else {
        state.debits = action.payload;
      }
    },
    setDebitsCurrentPage(state, action) {
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
    resetDebits(state) {
      state.debits = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
      state.temp = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDebits.fulfilled, (state, action) => {
        state.loading = false;
        state.debits = action.payload;
        state.length = action.payload.length;
      })
      .addCase(fetchDebits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpectd Error";
      });
  },
});

export const { setDebits, setDebitsCurrentPage, resetDebits } =
  debitSlice.actions;

export default debitSlice.reducer;
