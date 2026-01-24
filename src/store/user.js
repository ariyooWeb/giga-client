import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // Also save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      // Also remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
    },
    loadToken: (state) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                state.token = token;
            }
        }
    }
  },
});

export const { setToken, clearToken, loadToken } = userSlice.actions;
export default userSlice.reducer;
