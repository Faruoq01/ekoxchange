import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  indexes: [],
  singleIndex: {},
  reload: false,
};

const indexReducer = createSlice({
  name: "indexes",
  initialState: initialState,
  reducers: {
    setIndexes: (state, action) => {
      state.indexes = action.payload;
    },
    setSingleIndex: (state, action) => {
      state.singleTollgate = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setIndexes, setSingleIndex, setReload } = indexReducer.actions;
export default indexReducer.reducer;
