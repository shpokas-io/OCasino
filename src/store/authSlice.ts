import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/authApi";

interface UserState {
  id: string | null;
  name: string | null;
  balance: number;
  currency: string;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("user");
let userData = {
  id: null,
  name: null,
  balance: 0,
  currency: "EUR",
  accessToken: null,
};
if (storedUser) {
  try {
    userData = JSON.parse(storedUser);
  } catch (err) {
    console.error("Error parsing user data:", err);
  }
}

const initialState: UserState = {
  id: userData.id,
  name: userData.name,
  balance: userData.balance,
  currency: userData.currency,
  accessToken: userData.accessToken,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
      confirmPassword,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await registerUser({ name, email, password, confirmPassword });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      state.id = null;
      state.name = null;
      state.balance = 0;
      state.currency = "EUR";
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
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: action.payload.id,
            name: action.payload.name,
            balance: action.payload.balance,
            currency: action.payload.currency,
            accessToken: action.payload.accessToken,
          })
        );
      })
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
