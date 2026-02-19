import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userListNeedsRefresh: false, // New state for triggering user list refresh
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
    },
    triggerUserListRefresh: (state) => { // New reducer to toggle refresh flag
      state.userListNeedsRefresh = !state.userListNeedsRefresh;
    }
  },
});

export const { setToken, clearToken, loadToken, triggerUserListRefresh } = userSlice.actions;
export default userSlice.reducer;
