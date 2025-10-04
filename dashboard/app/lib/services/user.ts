import API from "./api";

export const UserService = {
  createUser: async (params: any) => {
    try {
      const url =
        params.roles === "superAdmin"
          ? "/users/super-admin/create"
          : "/users/admin/create";

      const payload = {
        firstname: params.firstname,
        lastname: params.lastname,
        phone: params?.phone,
        email: params.email,
        password: params.password,
      };

      const response = await API.post(url, payload, {
        withCredentials: true,
      });
      return { error: false, payload: response };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  updateUser: async (params: any, id: string) => {
    try {
      const response = await API.put(`/users/update/${id}`, params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
