import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const getCalcBudget = createAsyncThunk(
  "budgetPlanner/getCalcBudget",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const curSelectedBranch = state.budget.curSelectedBranch;

      let url = `${URL}/v1/event`;
      if (curSelectedBranch !== "All Branch") {
        url += `?branchName=${encodeURIComponent(curSelectedBranch)}`;
      }

      const response = await axios.get(url, { withCredentials: true });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  curSelectedBranch: "All Branch",
  allBranch: [
    "All Branch",
    "Kozhikode",
    "Kannur",
    "Kottayam",
    "Kochi",
    "Manjeri",
    "Corporate",
    "Directors",
  ],
  loading: false,
  error: null,
  data: [],
};

const budgetPlannerSlice = createSlice({
  name: "branchwise",
  initialState,
  reducers: {
    setCurSelectedBranch: (state, action) => {
      state.curSelectedBranch = action.payload;
    },
    refreshBudgetPlanner: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalcBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCalcBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCalcBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
        state.data = [];
      });
  },
});

export const { setCurSelectedBranch, refreshBudgetPlanner } =
  budgetPlannerSlice.actions;

export default budgetPlannerSlice.reducer;
