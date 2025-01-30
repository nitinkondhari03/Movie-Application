import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  role: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        credentials
      );
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      return { user: data, token, role: data.role };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        userData
      );

      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for user-details
export const userdetails = createAsyncThunk("auth/user", async (thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8080/api/user-details", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const { data } = response.data;
    console.log(data);
    return { user: data, role: data.role };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const userlogout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8080/api/logout");
    const data = response.data;
    localStorage.removeItem("token");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userdetails.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(userdetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(userlogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userlogout.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("token");
      })
      .addCase(userlogout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
