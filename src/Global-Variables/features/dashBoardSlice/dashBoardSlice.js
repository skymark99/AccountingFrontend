// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/v1/branch/month-wise-pnl`, {
        withCredentials: true,
      });
      if (!response.data) {
        throw new Error("No data received from the server");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An Error Occured"
      );
    }
  }
);

const initialState = {
  initialStatus: "",
  income: 0,
  expense: 0,
  profit: 0,
  expenseArr: [],
  incomeArr: [],
  topPerformer: "",
  topPerformerProfit: 0,
  totalOutstanding: 0,
  loading: false,
  error: null,
};

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        const stats = action.payload.stats;
        state.initialStatus = "Success";

        if (!stats || stats.length === 0) {
          state.error = "No branch data available";
          return;
        }

        const data = stats.reduce(
          (acc, branch) => {
            acc.income += branch.income || 0; // Default to 0 if undefined
            acc.expense += branch.expense || 0;
            acc.profit += branch.profit || 0;

            if (acc.topPerformerProfit < branch.profit) {
              acc.topPerformer = branch.branchName || acc.topPerformer;
              acc.topPerformerProfit = branch.profit;
            }

            acc.expenseArr.push(branch.expense || 0);
            acc.incomeArr.push(branch.income || 0);
            return acc;
          },
          {
            income: 0,
            expense: 0,
            profit: 0,
            topPerformer: stats[0]?.branchName || "Unknown",
            topPerformerProfit: stats[0]?.profit || 0,
            expenseArr: [],
            incomeArr: [],
          }
        );

        const formattedIncome = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(data.income);
        const formattedExpense = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(data.expense);

        const totalOutstanding =
          action.payload.outstandingTotal?.totalOutstanding || 0;

        const formattedOutstanding = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(totalOutstanding);

        state.expenseArr = data.expenseArr;
        state.incomeArr = data.incomeArr;
        state.totalOutstanding = formattedOutstanding;
        state.income = formattedIncome;
        state.expense = formattedExpense;
        state.profit = data.profit;
        state.topPerformer = data.topPerformer;
        state.topPerformerProfit = data.topPerformerProfit;
        state.initialStatus = action.payload.status;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while fetching data";
      });
  },
});

export default dashBoardSlice.reducer;
