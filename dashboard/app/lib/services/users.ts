import API from "./api";

export const UserService = {
  createUser: async (params: any) => {
    try {
      const url = `/admin/user/admin-user/create`;

      const payload = {
        firstname: params.firstname,
        lastname: params.lastname,
        phone: params?.phone,
        email: params.email,
        gender: params?.gender,
        ...(params.roleIds[0] === "super_admin_virtual_id" && {
          isSuperAdmin: true,
        }),
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
      const url = `/admin/user/admin-user/update/${id}`;

      // ✅ Safe payload construction
      const payload = {
        firstname: params?.firstname,
        lastname: params?.lastname,
        phone: params?.phone,
        email: params?.email,
        gender: params?.gender,
        ...(params.roleIds[0] === "super_admin_virtual_id" && {
          isSuperAdmin: true,
        }),
        ...(params.roleIds[0] !== "super_admin_virtual_id" && {
          roleIds: params.roleIds,
        }),
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
  changeStatus: async (id: string, isActive: boolean) => {
    try {
      const url = isActive
        ? `/admin/user/admin-user/deactivate/${id}`
        : `/admin/user/admin-user/activate/${id}`;
      const response = await API.put(url, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  changeWalletUserStatus: async (id: string, isActive: boolean) => {
    try {
      const url = `/admin/user/status/${id}`;
      const response = await API.put(
        url,
        { isActive },
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getWalletUserLogs: async (id: string, skip: number, limit: number) => {
    try {
      const response = await API.get(
        `audit/logs/${id}/list?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getWalletUserBalances: async (id: string) => {
    try {
      const response = await API.get(`admin/user/wallet-users/${id}/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getWalletUserTransactions: async (id: string) => {
    try {
      const response = await API.get(
        `/dashboard/admin/user-transactions/${id}/get`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  sendMessage: async (params: any) => {
    try {
      const response = await API.post(`admin/user/messaging`, params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  reset2fa: async (id: string) => {
    try {
      const response = await API.patch(
        `/admin/settings/wallet-user/${id}/reset2fa`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  resetPassword: async (id: string) => {
    try {
      const response = await API.patch(
        `/admin/settings/wallet-user/${id}/password`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  syncUserTransactions: async (id: string, param: { days: number }) => {
    try {
      const response = await API.post(`/transactions/sync/${id}`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
