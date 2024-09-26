import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const getCalcBudget = createAsyncThunk(
  "budgetPlanner/getCalcBudget",
  async (_, { rejectWithValue }) => {
    try {
      let url = `${URL}/v1/event?sort=-updatedAt`;
      const response = await axios.get(url, { withCredentials: true });
      console.log(response.data.docs);
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
  branchData: [],
};

const budgetPlannerSlice = createSlice({
  name: "branchwise",
  initialState,
  reducers: {
    setCurSelectedBranch: (state, action) => {
      state.curSelectedBranch = action.payload;
      if (state.curSelectedBranch !== "All Branch") {
        state.branchData = state.data.filter(
          (obj) => obj.branchName === state.curSelectedBranch
        );
      } else {
        state.branchData = state.data;
      }
      console.log(state.branchData, "branchData redux");
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
        state.branchData = action.payload;
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
