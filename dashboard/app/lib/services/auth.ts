import API from "./api";

export const AuthService = {
  login: async (param: any) => {
    try {
      const response = await API.post(`/admin/auth/login`, param);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getAuthUser: async () => {
    try {
      const response = await API.get(`/admin/auth/get`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  logout: async () => {
    try {
      const response = await API.post(`/admin/auth/logout`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
