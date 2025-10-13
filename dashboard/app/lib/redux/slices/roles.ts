import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  roleList: [],
  singleRole: {},
  permissionList: [],
  reload: false,
};

const roleReducer = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roleList = action.payload;
    },
    setSingleRole: (state, action) => {
      state.singleRole = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissionList = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setRoles, setPermissions, setSingleRole, setReload } =
  roleReducer.actions;
export default roleReducer.reducer;
