import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface Theme {
  color: "light" | "dark";
}

const initialState: Theme = {
  color: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.color = state.color === "light" ? "dark" : "light";
    },

    setMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.color = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { toggle, setMode } = themeSlice.actions;
