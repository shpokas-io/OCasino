import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeBet, getBets, cancelBet } from "../api/betApi";

interface BetState {
  // TODO: FIX TYPE ANY
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bets: any[];
  loading: boolean;
  error: string | null;
}
const initialState: BetState = {
  bets: [],
  loading: false,
  error: null,
};

export const fetchBets = createAsyncThunk(
  "bets/fetchBets",
  async ({
    page,
    limit,
    status,
  }: {
    page: number;
    limit: number;
    status?: string;
  }) => {
    return await getBets(page, limit, status);
  }
);

export const createBet = createAsyncThunk(
  "bets/createBet",
  async (amount: number) => {
    return await placeBet(amount);
  }
);

export const removeBet = createAsyncThunk(
  "bets/removeBet",
  async (betId: string) => {
    return await cancelBet(betId);
  }
);

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBets.fulfilled, (state, action) => {
        state.loading = false;
        state.bets = action.payload.data;
      })
      .addCase(fetchBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred"; // ✅ Ensure error is always a string
      });
  },
});

export default betSlice.reducer;
