import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface Theme {
  color: "light" | "dark";
}
const themeStorageLocal=():"light"|"dark"=>{
  const theme=localStorage.getItem("theme");
  return theme==="dark"?"dark":"light"

}

const initialState: Theme = {
  color: themeStorageLocal(),
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.color = state.color === "light" ? "dark" : "light";
      localStorage.setItem("theme",state.color)
    },

    setMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.color = action.payload;
      localStorage.setItem("theme",action.payload)
    },
  },
});

export default themeSlice.reducer;

export const { toggle, setMode } = themeSlice.actions;
