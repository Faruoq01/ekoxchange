import API from "./api";

export const AuthService = {
  register: async (param: any) => {
    try {
      const response = await API.post(
        `/users/tenant/super-admin/create`,
        param,
        { withCredentials: true }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  login: async (param: any) => {
    try {
      const response = await API.post(`/auth/login`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getAuthUser: async () => {
    try {
      const response = await API.get(`/auth/session/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  logout: async () => {
    try {
      const response = await API.post(
        `/auth/logout`,
        {},
        { withCredentials: true }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  verifyEmailOTP: async (param: any) => {
    try {
      const response = await API.post(`/auth/email/verification`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  resendEmailOTP: async (param: any) => {
    try {
      const response = await API.post(`/auth/resend/otp`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
