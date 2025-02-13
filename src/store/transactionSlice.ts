import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "../api/axiosInstance";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
}

interface TransactionState {
  transactions: Transaction[];
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

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (
    {
      page,
      limit,
      type,
      id,
    }: { page: number; limit: number; type?: string; id?: string },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, string | number> = { page, limit };
      if (type) params.type = type;
      if (id) params.id = id;
      const response = await api.get("/my-transactions", { params });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

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
