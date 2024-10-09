import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchBankDetails = createAsyncThunk(
  "balance/fetchBalanceDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/v1/bank`, {
        withCredentials: true,
      });
      const res = await axios.get(`${URL}/v1/bank/balance`, {
        withCredentials: true,
      });
      return { banks: response.data.docs, stats: res.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching balance details
export const fetchTransaction = createAsyncThunk(
  "balance/fetchBalanceDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/v1/transaction`, {
        withCredentials: true,
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
