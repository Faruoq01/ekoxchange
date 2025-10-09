import API from "./api";

export const RoleService = {
  getRoles: async (skip: number, limit: number) => {
    try {
      const response = await API.get(`/roles/list?skip=${skip}&limit=${limit}`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
