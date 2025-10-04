import { combineReducers } from "@reduxjs/toolkit";
import authCleanReducer from "./slices/auth";
import dashboardReducer from "./slices/dashboard";
import userReducer from "./slices/users";
import trackerReducer from "./slices/trackers";
import algorithmReducer from "./slices/algorithm";
import tollgateReducer from "./slices/tollgate";
import indexReducer from "./slices/indexing";

export const rootReducer = combineReducers({
  auth: authCleanReducer,
  dashboard: dashboardReducer,
  users: userReducer,
  tracker: trackerReducer,
  algorithm: algorithmReducer,
  tollgate: tollgateReducer,
  index: indexReducer,
});
