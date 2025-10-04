import axios from "axios";
import toast from "react-hot-toast";
import { store } from "../redux/store";
import { AppEnv } from "../env";
import { logoutUserOut, setIsLoggedIn } from "../redux/slices/auth";

const API = axios.create({
  baseURL: `${AppEnv.api.base_url}/api/v1`,
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
      store.dispatch(setIsLoggedIn(false));
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
