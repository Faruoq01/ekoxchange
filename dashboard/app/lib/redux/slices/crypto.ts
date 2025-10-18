import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  walletBalances: [],
  feeList: [],
  rateList: [],
  cryptoList: [],
  reloadFee: false,
  reloadRate: false,
  singleFee: {},
  singleRate: {},
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
    setCryptoList: (state, action) => {
      state.cryptoList = action.payload;
    },
    setRateList: (state, action) => {
      state.rateList = action.payload;
    },
    setSingleRate: (state, action) => {
      state.singleRate = action.payload;
    },
    setSingleFee: (state, action) => {
      state.singleFee = action.payload;
    },
    setReloadFee: (state, action) => {
      state.reloadFee = action.payload;
    },
    setReloadRate: (state, action) => {
      state.reloadRate = action.payload;
    },
  },
});

export const {
  setWalletBalances,
  setFeeList,
  setCryptoList,
  setRateList,
  setReloadFee,
  setReloadRate,
  setSingleRate,
  setSingleFee,
} = cryptoReducer.actions;
export default cryptoReducer.reducer;
