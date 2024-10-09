import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatDate from "../../../Services/formatDate";
import { calculateDateRange, today } from "../../../Services/dateFormatter";
import { dateOptions } from "../../../data/generalDatas";

const URL = import.meta.env.VITE_URL;

export const fetchTotal = createAsyncThunk("liability/fetchTotal", async () => {
  const response = await axios.get(`${URL}/v1/liability/total`, {
    withCredentials: true,
  });
  return response.data;
});

export const fetchLiability = createAsyncThunk(
  "liability/fetchLiability",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const {
        page,
        liabilityStartDate: startDate,
        liabilityEndDate: endDate,
        status,
        selectedCatagory: category,
        selectedParticular: particular,
        query,
      } = state.liability;
      let endpoint;
      endpoint =
        status === "All Status"
          ? `/v1/liability?type=liability&sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}`
          : `/v1/liability?type=liability&sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}&status=${status}`;

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
      if (axios.isCancel(error)) {
        return rejectWithValue("Request canceled");
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  liability: [],
  totalLiability: 0,
  totalOutstanding: 0,
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  loading: true,
  error: null,
  selectedDate: "All",
  dateOptions,
  liabilityStartDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  liabilityEndDate: today(),
  status: "All Status",
  temp: 1,
  laibilitySelectedItems: [],
  liabilityAllSelected: false,
  selectedCatagory: "All Categories",
  selectedParticular: "All Particulars",
  query: "",
};

const liabilitySlice = createSlice({
  name: "liability",
  initialState,
  reducers: {
    setLiabilityQuery(state, action) {
      state.query = action.payload;
    },
    setLiabSelectedCatagory(state, action) {
      state.selectedCatagory = action.payload;
      state.selectedParticular = "All Particulars";
    },
    setLiabSelectedParticular(state, action) {
      state.selectedParticular = action.payload;
    },
    setLiabilityAllSelected(state, action) {
      state.liabilityAllSelected = action.payload;
    },
    setLaibilitySelectedItems(state, action) {
      state.laibilitySelectedItems = action.payload;
    },
    setLiabilityStatus(state, action) {
      state.status = action.payload;
    },
    setLiability(state, action) {
      state.length = action.payload.length;
      state.liability = action.payload;
    },
    setLiabilityCurrentPage(state, action) {
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
    setLiabilitySelectedDate(state, action) {
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
    setliabilityStartDate(state, action) {
      state.liabilityStartDate = action.payload;
      state.selectedDate = "All";
    },
    setliabilityEndDate(state, action) {
      state.liabilityEndDate = action.payload;
      state.selectedDate = "All";
    },
    resetLiability(state) {
      state.liability = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
      state.temp = 1;
    },
    resetLiabilityDates(state) {
      state.liabilityStartDate = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 30))
      );
      state.liabilityEndDate = formatDate(new Date());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.loading = false;

        const { liability, outstanding } = action.payload;
        const formattedLiablity = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(liability);
        const formattedOutstanding = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(outstanding);

        state.totalLiability = formattedLiablity || 0;
        state.totalOutstanding = formattedOutstanding || 0;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLiability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiability.fulfilled, (state, action) => {
        state.loading = false;
        state.liability = action.payload;
        state.length = action.payload.length;
      })
      .addCase(fetchLiability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const {
  setLiability,
  setLiabilityCurrentPage,
  resetLiability,
  setLiabilityStatus,
  setliabilityStartDate,
  setliabilityEndDate,
  setLiabilitySelectedDate,
  resetLiabilityDates,
  setLaibilitySelectedItems,
  setLiabilityAllSelected,
  setLiabSelectedCatagory,
  setLiabSelectedParticular,
  setLiabilityQuery,
} = liabilitySlice.actions;

export default liabilitySlice.reducer;
