import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Models } from "appwrite";

interface AuthState {
  status: boolean;
  userDetails: Models.User<Models.Preferences> | null;
}


const initialState: AuthState = {
  status: false,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<Models.User<Models.Preferences>>
    ) => {
      state.status = true;
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userDetails = null;
    },
  },
});

export default authSlice.reducer;
export const{login,logout}=authSlice.actions
