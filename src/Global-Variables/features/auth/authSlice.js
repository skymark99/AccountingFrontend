import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getInitialTime } from "../../../Components/Coundown/countdownActions";

const URL = import.meta.env.VITE_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/v1/user/login`, userData, {
        withCredentials: true,
      });

      return response?.data?.envelop?.currentUser;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          return thunkAPI.rejectWithValue(
            "Too many requests. Please try again later."
          );
        } else {
          return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
      } else {
        return thunkAPI.rejectWithValue("Check you email or password");
      }
    }
  }
);

export const fetchLogs = createAsyncThunk(
  "user/logs",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${URL}/v1/logs?user=${userId}&limit=500`,
        { withCredentials: true }
      );
      return response.data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  user: null,
  email: null,
  isNewPassword: false,
  logs: [],
  logsLoading: false,
  logsError: null,
  time: getInitialTime(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTime(state, action) {
      state.time = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsNewPassword(state, action) {
      state.isNewPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.name;
        state.email = action.payload?.email;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch logs
      .addCase(fetchLogs.pending, (state) => {
        state.logsLoading = true;
        state.logsError = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logsLoading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.logsLoading = false;
        state.logsError = action.payload;
      });
  },
});

export const { setIsLoggedIn, setUser, setIsNewPassword, setTime } =
  authSlice.actions;

export default authSlice.reducer;
