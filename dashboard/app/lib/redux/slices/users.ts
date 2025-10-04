import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  users: [],
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
    setUserList: (state, action) => {
      state.users = action.payload;
    },
    setSingleUser: (state, action) => {
      state.user = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setUserList, setSingleUser, setReload } = userReducer.actions;
export default userReducer.reducer;
