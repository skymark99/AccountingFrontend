import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatDate from "../../../Services/formatDate";
import { calculateDateRange, today } from "../../../Services/dateFormatter";

const URL = import.meta.env.VITE_URL;

export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const {
        page,
        reminderStartDate: startDate,
        reminderEndDate: endDate,
        status,
        selectedCatagory: category,
        selectedParticular: particular,
        query,
      } = state.reminders;
      let endpoint;
      endpoint =
        status === "Status"
          ? `/v1/reminders?sort=-updatedAt&page=${page}&startDate=${startDate}&endDate=${endDate}`
          : `/v1/reminders?sort=-updatedAt&page=${page}&startDate=${startDate}&endDate=${endDate}&status=${status}`;

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
  reminders: [],
  totalReminders: 0,
  totalOutstanding: 0,
  length: 0,
  page: 1,
  currentPage: 1,
  startPage: 0,
  loading: true,
  error: null,
  selectedDate: "All",
  dateOptions: ["All", "Today", "Yesterday", "Last 30 Days", "Last 60 Days"],
  reminderStartDate: today(),
  reminderEndDate: formatDate(new Date(new Date().getFullYear(), 11, 0)),
  status: "Status",
  temp: 1,
  reminderSelectedItems: [],
  reminderAllSelected: false,
  selectedCatagory: "All Categories",
  selectedParticular: "All Particulars",
  query: "",
};

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    setReminderQuery(state, action) {
      state.query = action.payload;
    },
    setReminderSelectedCatagory(state, action) {
      state.selectedCatagory = action.payload;
      state.selectedParticular = "All Particulars";
    },
    setReminderSelectedParticular(state, action) {
      state.selectedParticular = action.payload;
    },
    setReminderAllSelected(state, action) {
      state.reminderAllSelected = action.payload;
    },
    setReminderSelectedItems(state, action) {
      state.reminderSelectedItems = action.payload;
    },
    setReminderStatus(state, action) {
      state.status = action.payload;
    },
    setReminders(state, action) {
      state.length = action.payload.length;
      state.reminders = action.payload;
    },
    setRemindersCurrentPage(state, action) {
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
    setReminderSelectedDate(state, action) {
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
          endDate = new Date(state.reminderEndDate);
          break;
        }
        default: {
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(state.reminderEndDate);
        }
      }
      state.reminderStartDate = formatDate(startDate);
      state.reminderEndDate = formatDate(endDate);
    },
    setReminderStartDate(state, action) {
      state.reminderStartDate = action.payload;
      state.selectedDate = "Date";
    },
    setReminderEndDate(state, action) {
      state.reminderEndDate = action.payload;
      state.selectedDate = "Date";
    },
    resetReminders(state) {
      state.reminders = [];
      state.length = 0;
      state.page = 1;
      state.currentPage = 1;
      state.startPage = 0;
      state.temp = 1;
      state.reminderAllSelected = false;
    },
    resetReminderDates(state) {
      state.reminderStartDate = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 30))
      );
      state.reminderEndDate = formatDate(new Date());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = action.payload;
        state.length = action.payload.length;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const {
  setReminders,
  setRemindersCurrentPage,
  resetReminders,
  setReminderStatus,
  setReminderStartDate,
  setReminderEndDate,
  setReminderSelectedDate,
  resetReminderDates,
  setReminderSelectedItems,
  setReminderAllSelected,
  setReminderSelectedCatagory,
  setReminderSelectedParticular,
  setReminderQuery,
} = reminderSlice.actions;

export default reminderSlice.reducer;
