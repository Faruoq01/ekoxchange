import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  walletBalances: [],
  feeList: [],
  rateList: [],
  cryptoList: [],
  reloadFee: false,
  reloadRate: false,
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
} = cryptoReducer.actions;
export default cryptoReducer.reducer;
