import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const storedTheme = localStorage.getItem("theme") as Theme | null;
const initialState: { value: Theme } = {
  value: storedTheme ? storedTheme : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.value);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.value = action.payload;
      localStorage.setItem("theme", state.value);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
