import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import betReducer from "./betSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bets: betReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
