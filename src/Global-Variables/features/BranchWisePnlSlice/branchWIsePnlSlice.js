import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatDate from "../../../Services/formatDate";
import { calculateDateRange, today } from "../../../Services/dateFormatter";
import { branches, dateOptions } from "../../../data/generalDatas";

// Ensure URL is properly defined and imported
const URL = import.meta.env.VITE_URL; // Update this with your actual backend URL

export const fetchBranchWise = createAsyncThunk(
  "branchwise/fetchBranchWise",
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}${endpoint}`, {
        withCredentials: true,
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const fetchBranchTransaction = createAsyncThunk(
  "branchwise/fetchBranchTransaction",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        curBranch,
        page,
        selectedCategory,
        selectedParticular,
        branchWiseStartDate: startDate,
        branchWiseEndDate: endDate,
        query,
      } = getState().branchwise;

      let endpoint = `/v1/transaction?branch=${curBranch}&page=${page}&startDate=${startDate}&endDate=${endDate}`;

      if (query) {
        endpoint += `&search=${query}`;
      }

      if (selectedCategory !== "All Categories") {
        endpoint += `&catagory=${selectedCategory}`;
      }

      if (selectedParticular !== "All Particulars") {
        endpoint += `&particular=${selectedParticular}`;
      }
      const response = await axios.get(`${URL}${endpoint}`, {
        withCredentials: true,
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const fetchBranchYearlyPnl = createAsyncThunk(
  "branchwise/fetchBranchYearlyPnl",
  async (_, { getState, rejectWithValue }) => {
    try {
      const branch = getState().branchwise.curBranch;
      const response = await axios.get(
        `${URL}/v1/branch/yearly-pnl?branch=${branch}`,
        { withCredentials: true }
      );
      return response.data.stats; // Changed from docs to stats based on your backend response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const fetchBranchChart = createAsyncThunk(
  "branchwise/fetchBranchChart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const branch = getState().branchwise.curBranch;
      const response = await axios.get(
        `${URL}/v1/branch/all-month-pnl?branch=${branch}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  branchData: [],
  transactionData: [],
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  selectedDate: "All",
  dateOptions,
  branchWiseStartDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  branchWiseEndDate: today(),
  curBranch: "Kozhikode",
  branches,
  temp: 1,

  query: "",

  selectedCategory: "All Categories",
  selectedParticular: "All Particulars",

  branchLoading: false,
  branchError: null,

  transactionLoading: false,
  transactionError: null,

  yearlyPnlLoading: false,
  yearlyPnlError: null,

  chartLoading: false,
  chartError: null,

  yearlyPnl: {},

  dataset1: [],
  dataset2: [],

  branchwisePNLSelectedItems: [],
  branchWisePNLAllSelected: false,
};

const branchwiseSlice = createSlice({
  name: "branchwise",
  initialState,
  reducers: {
    setBranchQuery(state, action) {
      state.query = action.payload;
    },
    setBranchSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedParticular = "All Particulars";
    },
    setBranchSelectedParticular(state, action) {
      state.selectedParticular = action.payload;
    },

    setBranchWisePNLAllSelected(state, action) {
      state.branchWisePNLAllSelected = action.payload;
    },
    setBranchWisePNLSelectedItems(state, action) {
      state.branchwisePNLSelectedItems = action.payload;
    },
    setCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setBranchData(state, action) {
      state.length = action.payload.length;
      state.branchData = action.payload;
    },
    setBranchCurrentPage(state, action) {
      if (state.currentPage < action.payload) {
        if ((action.payload - 1) % 4 === 0) {
          state.page += 1;
          state.startPage = 0;
          state.temp = 1;
        } else {
          state.temp += 1;
        }
      }
      if (state.currentPage > action.payload) {
        if (action.payload % 4 === 0) {
          state.page -= 1;
          state.startPage = 0;
          state.temp = 4;
        } else {
          state.temp -= 1;
        }
      }
      state.currentPage = action.payload;
      state.startPage = 6 * (state.temp - 1);
    },
    setBranchWiseSelectedDate(state, action) {
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
          endDate = new Date(state.branchWiseEndDate);
          break;
        }
        default: {
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(state.branchWiseEndDate);
        }
      }
      state.branchWiseStartDate = formatDate(startDate);
      state.branchWiseEndDate = formatDate(endDate);
    },
    setBranchWiseStartDate(state, action) {
      state.branchWiseStartDate = action.payload;
      state.selectedDate = "All";
    },
    setBranchWiseEndDate(state, action) {
      state.branchWiseEndDate = action.payload;
      state.selectedDate = "All";
    },
    resetBranchWise(state) {
      state.transactionData = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBranchWise actions
      .addCase(fetchBranchWise.pending, (state) => {
        state.branchLoading = true;
        state.branchError = null;
      })
      .addCase(fetchBranchWise.fulfilled, (state, action) => {
        state.branchLoading = false;
        state.branchData = action.payload;
      })
      .addCase(fetchBranchWise.rejected, (state, action) => {
        state.branchLoading = false;
        state.branchError = action.payload || "An error occurred";
      })

      // Handle fetchBranchTransaction actions
      .addCase(fetchBranchTransaction.pending, (state) => {
        state.transactionLoading = true;
        state.transactionError = null;
      })
      .addCase(fetchBranchTransaction.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.transactionData = action.payload;
      })
      .addCase(fetchBranchTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = action.payload || "An error occurred";
      })

      // Handle fetchBranchYearlyPnl actions
      .addCase(fetchBranchYearlyPnl.pending, (state) => {
        state.yearlyPnlLoading = true;
        state.yearlyPnlError = null;
      })
      .addCase(fetchBranchYearlyPnl.fulfilled, (state, action) => {
        state.yearlyPnlLoading = false;
        state.yearlyPnl = action.payload;
      })
      .addCase(fetchBranchYearlyPnl.rejected, (state, action) => {
        state.yearlyPnlLoading = false;
        state.yearlyPnlError = action.payload || "An error occurred";
      })

      // Handle fetchBranchChart actions
      .addCase(fetchBranchChart.pending, (state) => {
        state.chartLoading = true;
        state.chartError = null;
      })
      .addCase(fetchBranchChart.fulfilled, (state, action) => {
        state.chartLoading = false;
        state.dataset1 = action.payload.map((obj) => obj.totalExpense);
        state.dataset2 = action.payload.map((obj) => obj.totalIncome);
      })
      .addCase(fetchBranchChart.rejected, (state, action) => {
        state.chartLoading = false;
        state.chartError = action.payload || "An error occurred";
      });
  },
});

export const {
  setBranchData,
  setBranchCurrentPage,
  resetBranchWise,
  setCurBranch,
  setBranchWisePNLSelectedItems,
  setBranchWisePNLAllSelected,
  setBranchSelectedCategory,
  setBranchSelectedParticular,
  setBranchWiseSelectedDate,
  setBranchWiseStartDate,
  setBranchWiseEndDate,
  setBranchQuery,
} = branchwiseSlice.actions;

export default branchwiseSlice.reducer;
