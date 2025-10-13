import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  walletUsers: {
    data: [],
    total: 0,
  },
  adminUsers: {
    data: [],
    total: 0,
  },
  user: {},
  singleAdminUser: {},
  walletUserLogs: [],
  walletUserBalances: [],
  walletUsersTransactions: [],
  reload: false,
};

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setAdminUserList: (state, action) => {
      state.adminUsers = action.payload;
    },
    setWalletUserList: (state, action) => {
      state.walletUsers = action.payload;
    },
    setSingleUser: (state, action) => {
      state.user = action.payload;
    },
    setSingleAdminUser: (state, action) => {
      state.singleAdminUser = action.payload;
    },
    setWalletUserLogs: (state, action) => {
      state.walletUserLogs = action.payload;
    },
    setWalletUserBalances: (state, action) => {
      state.walletUserBalances = action.payload;
    },
    setWalletUserTransactions: (state, action) => {
      state.walletUsersTransactions = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const {
  setWalletUserList,
  setAdminUserList,
  setSingleUser,
  setReload,
  setSingleAdminUser,
  setWalletUserLogs,
  setWalletUserBalances,
  setWalletUserTransactions,
} = userReducer.actions;
export default userReducer.reducer;
