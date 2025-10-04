import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  walletSummary: {
    totalSupply: 0,
    availableBalance: 0,
    circulatingSupply: 0,
  },
  pointSummary: {
    totalSupply: 0,
    availableBalance: 0,
    circulatingSupply: 0,
  },
  tokenSupply: 0,
  tokenBalance: 0,
  tokenCirculation: 0,
  tokenTransaction: [],

  pointSupply: 0,
  pointBalance: 0,
  pointCirculation: 0,
  pointsTransactions: [],
  reload: false,
  walletUser: [],
};

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setWallet: (state, action) => {
      state.walletSummary = action.payload;
    },
    setPoint: (state, action) => {
      state.pointSummary = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setTokenSupply: (state, action) => {
      state.tokenSupply = action.payload;
    },
    setTokenBalance: (state, action) => {
      state.tokenBalance = action.payload;
    },
    setTokenCirculation: (state, action) => {
      state.tokenCirculation = action.payload;
    },
    setPointSupply: (state, action) => {
      state.pointSupply = action.payload;
    },
    setPointBalance: (state, action) => {
      state.pointBalance = action.payload;
    },
    setPointCirculation: (state, action) => {
      state.pointCirculation = action.payload;
    },
    setTokenTransaction: (state, action) => {
      state.tokenTransaction = action.payload;
    },
    setPointTransaction: (state, action) => {
      state.pointsTransactions = action.payload;
    },
    setWalletUsers: (state, action) => {
      state.walletUser = action.payload;
    },
  },
});

export const {
  setWallet,
  setPoint,
  setReload,
  setTokenSupply,
  setPointSupply,
  setPointBalance,
  setPointCirculation,
  setTokenTransaction,
  setPointTransaction,
  setTokenBalance,
  setTokenCirculation,
  setWalletUsers,
} = dashboardReducer.actions;
export default dashboardReducer.reducer;
