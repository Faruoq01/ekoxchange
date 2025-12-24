import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  online: [],
};

const supportReducer = createSlice({
  name: "support",
  initialState: initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.online = action.payload;
    },
  },
});

export const { setOnlineUsers } = supportReducer.actions;
export default supportReducer.reducer;
