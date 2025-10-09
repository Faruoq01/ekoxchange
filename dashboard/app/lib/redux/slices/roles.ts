import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  roleList: [],
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
    setPermissions: (state, action) => {
      state.permissionList = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setRoles, setPermissions, setReload } = roleReducer.actions;
export default roleReducer.reducer;
