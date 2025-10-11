import API from "./api";

export const UserService = {
  createUser: async (params: any) => {
    try {
      const url =
        params.roleIds[0] === "super_admin_virtual_id"
          ? "/admin/user/super-admin/create"
          : "/admin/user/admin-user/create";

      const payload = {
        firstname: params.firstname,
        lastname: params.lastname,
        phone: params?.phone,
        email: params.email,
        gender: params?.gender,
        ...(params.roleIds[0] !== "super_admin_virtual_id" && {
          roleIds: params.roleIds,
        }),
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
      const url =
        params.roleIds[0] === "super_admin_virtual_id"
          ? `/admin/user/super-admin/update/${id}`
          : `/admin/user/admin-user/update/${id}`;

      const response = await API.put(url, params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
