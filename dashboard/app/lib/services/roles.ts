import API from "./api";

export const RoleService = {
  getPermissions: async () => {
    try {
      const response = await API.get(`permission/list`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  createRole: async (param: any) => {
    try {
      const response = await API.post(`roles/create`, param);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  updateRole: async (id: string, param: any) => {
    try {
      console.log(param, "param");
      const response = await API.put(`roles/update/${id}`, param);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getRoles: async (skip: number, limit: number) => {
    try {
      const response = await API.get(`/roles/list?skip=${skip}&limit=${limit}`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
