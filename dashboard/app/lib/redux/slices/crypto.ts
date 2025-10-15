import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  walletBalances: [],
  feeList: [],
  rateList: [],
};

const cryptoReducer = createSlice({
  name: "crypto",
  initialState: initialState,
  reducers: {
    setWalletBalances: (state, action) => {
      state.walletBalances = action.payload;
    },
    setFeeList: (state, action) => {
      state.feeList = action.payload;
    },
    setRateList: (state, action) => {
      state.rateList = action.payload;
    },
  },
});

export const { setWalletBalances, setFeeList, setRateList } =
  cryptoReducer.actions;
export default cryptoReducer.reducer;
