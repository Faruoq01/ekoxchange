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

  updateUser: async (id: string, params: any) => {
    try {
      // ✅ Safely check if roleIds exist and are valid
      const isSuperAdmin =
        Array.isArray(params?.roleIds) &&
        params.roleIds[0] === "super_admin_virtual_id";

      const url = isSuperAdmin
        ? `/admin/user/super-admin/update/${id}`
        : `/admin/user/admin-user/update/${id}`;

      // ✅ Safe payload construction
      const payload = {
        firstname: params?.firstname,
        lastname: params?.lastname,
        phone: params?.phone,
        email: params?.email,
        gender: params?.gender,
        ...(Array.isArray(params?.roleIds) && !isSuperAdmin
          ? { roleIds: params.roleIds }
          : {}),
      };

      const response = await API.put(url, payload, {
        withCredentials: true,
      });

      return { error: false, payload: response?.data };
    } catch (e: any) {
      console.error("❌ updateUser error:", e);
      return { error: true, payload: e.message };
    }
  },

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
  getAdminUsers: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `admin/user/admin-users/get?skip=${skip}&limit=${limit}`,
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
