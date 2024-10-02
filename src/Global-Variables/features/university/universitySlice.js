import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatDate from "../../../Services/formatDate";
import { calculateDateRange, today } from "../../../Services/dateFormatter";
import { dateOptions } from "../../../data/generalDatas";

const URL = import.meta.env.VITE_URL;

export const fetchUniversity = createAsyncThunk(
  "university/fetchUniversity",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const {
        page,
        universityStartDate: startDate,
        universityEndDate: endDate,
        status,
        query,
      } = state.university;
      let endpoint;
      endpoint =
        status === "All Status"
          ? `/v1/university?type=university&sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}`
          : `/v1/university?type=university&sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}&status=${status}`;

      if (query) {
        endpoint += `&search=${query}`;
      }

      const response = await axios.get(`${URL}${endpoint}`, {
        withCredentials: true,
      });
      return response.data.docs;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return rejectWithValue("Request canceled");
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  universities: [],
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  loading: true,
  error: null,
  selectedDate: "All",
  dateOptions,
  universityStartDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  universityEndDate: today(),
  status: "All Status",
  temp: 1,
  universitySelectedItems: [],
  universityAllSelected: false,
  query: "",
};

const universitySlice = createSlice({
  name: "liability",
  initialState,
  reducers: {
    setUniversityQuery(state, action) {
      state.query = action.payload;
    },
    setUniversityAllSelected(state, action) {
      state.liabilityAllSelected = action.payload;
    },
    setUniversitySelectedItems(state, action) {
      state.laibilitySelectedItems = action.payload;
    },
    setUniversityStatus(state, action) {
      state.status = action.payload;
    },
    setUniversity(state, action) {
      state.length = action.payload.length;
      state.liability = action.payload;
    },
    setUniversityCurrentPage(state, action) {
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
    setUniversitySelectedDate(state, action) {
      state.selectedDate = action.payload;

      const date = today();
      let startDate = new Date(date);
      let endDate = new Date(date);

      switch (state.selectedDate) {
        case "Today":
          break;
        case "Yesterday": {
          const { startDate: yesterday } = calculateDateRange(1);
          startDate = new Date(yesterday);
          endDate = new Date(yesterday);
          break;
        }
        case "Last 30 Days": {
          const { startDate: thirtyDays } = calculateDateRange(30);
          startDate = new Date(thirtyDays);
          break;
        }
        case "Last 60 Days": {
          const { startDate: sixty } = calculateDateRange(60);
          startDate = new Date(sixty);
          break;
        }
        case "All": {
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(state.liabilityEndDate);
          break;
        }
        default: {
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(state.liabilityEndDate);
        }
      }
      state.liabilityStartDate = formatDate(startDate);
      state.liabilityEndDate = formatDate(endDate);
    },
    setUniversityStartDate(state, action) {
      state.liabilityStartDate = action.payload;
      state.selectedDate = "All";
    },
    setUniversityEndDate(state, action) {
      state.liabilityEndDate = action.payload;
      state.selectedDate = "All";
    },
    resetUniversity(state) {
      state.liability = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
      state.temp = 1;
    },
    resetUniversityDates(state) {
      state.liabilityStartDate = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 30))
      );
      state.liabilityEndDate = formatDate(new Date());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUniversity.fulfilled, (state, action) => {
        state.loading = false;
        state.liability = action.payload;
        state.length = action.payload.length;
      })
      .addCase(fetchUniversity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const {
  setUniversity,
  setUniversityCurrentPage,
  resetUniversity,
  setUniversityStatus,
  setUniversityStartDate,
  setUniversityEndDate,
  setUniversitySelectedDate,
  resetUniversityDates,
  setUniversitySelectedItems,
  setUniversityAllSelected,
  setUniversityQuery,
} = universitySlice.actions;

export default universitySlice.reducer;
