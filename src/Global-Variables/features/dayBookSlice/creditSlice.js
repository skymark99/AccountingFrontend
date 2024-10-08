import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchCredits = createAsyncThunk(
  "credits/fetchCredits",
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

      const { page } = state.credit;
      let endpoint;
      endpoint =
        branch === "All Branch"
          ? `/v1/transaction?sort=-createdAt&page=${page}&type=Credit&startDate=${startDate}&endDate=${endDate}`
          : `/v1/transaction?sort=-createdAt&page=${page}&type=Credit&branch=${branch}&startDate=${startDate}&endDate=${endDate}`;

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
      return rejectWithValue("Failed to fetch Credits. Please try again.");
    }
  }
);

const initialState = {
  credits: [],
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  loading: false,
  error: null,
};

const creditslice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCredits(state, action) {
      state.length = action.payload.length;
      state.credits = action.payload;
    },
    setCreditsCurrentPage(state, action) {
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
    resetCredits(state) {
      state.credits = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpected error";
      });
  },
});

export const { setCredits, setCreditsCurrentPage, resetCredits } =
  creditslice.actions;

export default creditslice.reducer;
