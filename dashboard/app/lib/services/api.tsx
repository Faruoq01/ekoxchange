import axios from "axios";
import toast from "react-hot-toast";
import { store } from "../redux/store";
import { AppEnv } from "../env";
import { logoutUserOut } from "../redux/slices/auth";

const API = axios.create({
  baseURL: `${AppEnv.api.base_url}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Do something with error response
    if (error.response.data.statusCode === 401) {
      toast.error("Session expired");
      store.dispatch(logoutUserOut({}));
      window.location.href = "/";
    } else {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(message);
    }
  }
);

export default API;
