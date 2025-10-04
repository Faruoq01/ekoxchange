import API from "./api";

export const UserService = {
  getAllUsers: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/users/admins?page=${skip}&limit=${limit}`,
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
