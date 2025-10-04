import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  trackers: [],
  stats: {},
  reload: false,
};

const trackerReducer = createSlice({
  name: "trackers",
  initialState: initialState,
  reducers: {
    setTrackers: (state, action) => {
      state.trackers = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setTrackers, setStats, setReload } = trackerReducer.actions;
export default trackerReducer.reducer;
