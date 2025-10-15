import { combineReducers } from "@reduxjs/toolkit";
import authCleanReducer from "./slices/auth";
import userReducer from "./slices/users";
import roleReducer from "./slices/roles";
import cryptoReducer from "./slices/crypto";

export const rootReducer = combineReducers({
  auth: authCleanReducer,
  users: userReducer,
  roles: roleReducer,
  crypto: cryptoReducer,
});
