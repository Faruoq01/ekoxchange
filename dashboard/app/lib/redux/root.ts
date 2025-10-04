import { combineReducers } from "@reduxjs/toolkit";
import authCleanReducer from "./slices/auth";
import userReducer from "./slices/users";

export const rootReducer = combineReducers({
  auth: authCleanReducer,
  users: userReducer,
});
