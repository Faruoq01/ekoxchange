import API from "./api";

export const UserService = {
  getWalletUsers: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/admin/user/wallet-users/get?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
