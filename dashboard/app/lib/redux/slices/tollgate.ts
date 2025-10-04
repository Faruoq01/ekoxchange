import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  tollgates: [],
  singleTollgate: {},
  reload: false,
};

const tollgateReducer = createSlice({
  name: "tollgate",
  initialState: initialState,
  reducers: {
    setTollgates: (state, action) => {
      state.tollgates = action.payload;
    },
    setSingleTollgate: (state, action) => {
      state.singleTollgate = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setTollgates, setSingleTollgate, setReload } =
  tollgateReducer.actions;
export default tollgateReducer.reducer;
