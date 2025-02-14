import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/authApi";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/authTypes";
import { RootState } from "./store";
import { extractErrorMessage } from "../util/errorUtils";

interface AuthState {
  id: string | null;
  name: string | null;
  balance: number;
  currency: string;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  balance: 0,
  currency: "€",
  accessToken: localStorage.getItem("accessToken") ?? null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, "Login failed"));
    }
  }
);

export const register = createAsyncThunk<void, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      await registerUser(payload);
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, "Registration failed"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken");
      state.id = null;
      state.name = null;
      state.balance = 0;
      state.currency = "€";
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    updateBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.balance = action.payload.balance;
          state.currency = action.payload.currency;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateBalance } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
