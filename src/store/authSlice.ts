import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../api/authApi";

interface UserState {
  id: string | null;
  name: string | null;
  balance: number;
  currency: string;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  balance: 0,
  currency: "EUR",
  accessToken: localStorage.getItem("accessToken") ?? null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async({ email, password}: { email:string; password: string}, { rejectWithValue}) => {
    try {
      const response = await loginUser({ email, password});
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error: any) { //TODO: Fix any
return rejectWithValue(error.response?.data?,message || "Login failed");
    } 
  }
)
