import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeBet, getBets, cancelBet } from "../api/betApi";

interface Bet {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  winAmount?: number | null;
  userChoice?: string;
}

interface BetState {
  bets: Bet[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}
const initialState: BetState = {
  bets: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

export const fetchBets = createAsyncThunk(
  "bets/fetchBets",
  async (
    {
      page,
      limit,
      status,
      betId,
    }: { page: number; limit: number; status?: string; betId?: string },
    { rejectWithValue }
  ) => {
    try {
      return await getBets({ page, limit, status, betId });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch bets"
      );
    }
  }
);

export const createBet = createAsyncThunk(
  "bets/createBet",
  async (
    { amount, color }: { amount: number; color: string },
    { rejectWithValue }
  ) => {
    try {
      return await placeBet(amount, color);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place bet"
      );
    }
  }
);

export const removeBet = createAsyncThunk(
  "bets/removeBet",
  async (betId: string, { rejectWithValue }) => {
    try {
      return await cancelBet(betId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel bet"
      );
    }
  }
);

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBets.fulfilled, (state, action) => {
        state.loading = false;
        state.bets = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createBet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeBet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBet.fulfilled, (state, action) => {
        state.loading = false;
        const canceledBetId = action.payload.transactionId;
        const idx = state.bets.findIndex((b) => b.id === canceledBetId);
        if (idx >= 0) {
          state.bets[idx].status = "canceled";
        }
      })
      .addCase(removeBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setLimit } = betSlice.actions;
export default betSlice.reducer;
