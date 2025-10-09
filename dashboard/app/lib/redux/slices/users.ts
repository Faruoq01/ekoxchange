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
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
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
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setWalletUserList, setAdminUserList, setSingleUser, setReload } =
  userReducer.actions;
export default userReducer.reducer;
