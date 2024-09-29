import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import formatDate from "../../../Services/formatDate";
import { calculateDateRange, today } from "../../../Services/dateFormatter";

const URL = import.meta.env.VITE_URL;

// Thunk for fetching outstanding data
export const fetchOutstandingData = createAsyncThunk(
  "outstanding/fetchOutstandingData",
  async (_, { rejectWithValue, getState }) => {
    // Remove signal
    const state = getState();
    const {
      page,
      outStandingStartDate: startDate,
      outStandingEndDate: endDate,
      status,
      selectedCatagory: category,
      selectedParticular: particular,
      query,
    } = state.outstanding;

    try {
      let endpoint = `/v1/liability?type=outstanding&sort=-createdAt&page=${page}&startDate=${startDate}&endDate=${endDate}`;

      if (query) {
        endpoint += `&search=${query}`;
      }

      if (status !== "All Status") {
        endpoint += `&status=${status}`;
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
      return rejectWithValue("No Data Found");
    }
  }
);

const initialState = {
  outStanding: [],
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  selectedDate: "All",
  dateOptions: ["All", "Today", "Yesterday", "Last 30 Days", "Last 60 Days"],
  outStandingStartDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  outStandingEndDate: today(),
  status: "All Status",
  statusOptions: ["All Status", "Paid", "Unpaid", "Postponed", "Pending"],
  outstandingSelectedItems: [],
  outstatndingAllSelected: false,
  temp: 1,
  loading: false,
  error: null,
  selectedCatagory: "All Categories",
  selectedParticular: "All Particulars",
  query: "",
};

const outstandingSlice = createSlice({
  name: "outstanding",
  initialState,
  reducers: {
    setOutstandingQuery(state, action) {
      state.query = action.payload;
    },
    setOutSelectedCatagory(state, action) {
      state.selectedCatagory = action.payload;
      state.selectedParticular = "All Particulars";
    },
    setOutSelectedParticular(state, action) {
      state.selectedParticular = action.payload;
    },
    setOutstandingSelectedItems(state, action) {
      state.outstandingSelectedItems = action.payload;
    },
    setOutstandingAllSelected(state, action) {
      state.outstatndingAllSelected = action.payload;
    },
    setOutStandingCurrentPage(state, action) {
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
    setOutStandingStatus(state, action) {
      state.status = action.payload;
    },
    setOutStandingSelectedDate(state, action) {
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
          endDate = new Date(state.outStandingEndDate);
          break;
        }
        default: {
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(state.outStandingEndDate);
        }
      }
      state.outStandingStartDate = formatDate(startDate);
      state.outStandingEndDate = formatDate(endDate);
    },
    setoutStandingStartDate(state, action) {
      state.outStandingStartDate = action.payload;
      state.selectedDate = "Date";
    },
    setoutStandingEndDate(state, action) {
      state.outStandingEndDate = action.payload;
      state.selectedDate = "Date";
    },
    resetOutStanding(state) {
      state.outStanding = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
    },
    resetOutstandingDate(state) {
      state.outStandingStartDate = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 30))
      );
      state.outStandingEndDate = formatDate(new Date());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutstandingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutstandingData.fulfilled, (state, action) => {
        state.outStanding = action.payload;
        state.length = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchOutstandingData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setOutstandingAllSelected,
  setOutstandingSelectedItems,
  setOutStandingCurrentPage,
  resetOutStanding,
  setOutStandingStatus,
  resetOutstandingDate,
  setoutStandingEndDate,
  setoutStandingStartDate,
  setOutStandingSelectedDate,
  setOutSelectedParticular,
  setOutSelectedCatagory,
  setOutstandingQuery,
} = outstandingSlice.actions;

export default outstandingSlice.reducer;
