import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {},
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
  },
});

export const { logoutUserOut, setUser } = authReducer.actions;
export default authReducer.reducer;
