import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactions } from "../api/transactionApi";
import { TransactionApiResponse } from "../types/transactionTypes";
import { RootState } from "./store";

interface TransactionState {
  transactions: TransactionApiResponse["data"];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  filterType: string;
  filterId: string;
}

const initialState: TransactionState = {
  transactions: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  filterType: "",
  filterId: "",
};

export const fetchTransactions = createAsyncThunk<
  TransactionApiResponse,
  { page: number; limit: number; type?: string; id?: string }
>("transactions/fetchTransactions", async (params, { rejectWithValue }) => {
  try {
    return await getTransactions(
      params.page,
      params.limit,
      params.type,
      params.id
    );
    //TODO: Add better error handling
  } catch (error: unknown) {
    return rejectWithValue("Failed to fetch transactions");
  }
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionPage(state, action) {
      state.page = action.payload;
    },
    setTransactionLimit(state, action) {
      state.limit = action.payload;
    },
    setFilterType(state, action) {
      state.filterType = action.payload;
    },
    setFilterId(state, action) {
      state.filterId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTransactionPage,
  setTransactionLimit,
  setFilterType,
  setFilterId,
} = transactionSlice.actions;
export const selectTransactionsState = (state: RootState) => state.transactions;
export default transactionSlice.reducer;
