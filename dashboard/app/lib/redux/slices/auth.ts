import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const status = Cookies.get("loda-payment-auth-status");

const initialState: any = {
  user: {},
  isLoggedIn: status ? JSON.parse(status) : false,
};

const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUserOut: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { logoutUserOut, setIsLoggedIn, setUser } = authReducer.actions;
export default authReducer.reducer;
