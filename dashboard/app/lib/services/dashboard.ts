import API from "./api";

export const DashboardService = {
  walletSummary: async () => {
    try {
      const response = await API.get(`/dashboard/wallet/summary`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  mintToken: async (param: { amount: string }) => {
    try {
      const response = await API.post(`/wallet/token/mint`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  burnToken: async (param: { amount: string }) => {
    try {
      const response = await API.post(`/wallet/token/burn`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenSupply: async () => {
    try {
      const response = await API.get(`/wallet/token/supply`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenCirculation: async () => {
    try {
      const response = await API.get(`/wallet/token/circulation`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenBalance: async () => {
    try {
      const response = await API.get(`/wallet/token/balance`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  mintTokenTransactions: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/wallet/token/mint/transactions?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  walletUsers: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/dashboard/wallet/users?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  burnTokenTransactions: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/wallet/token/burn/transactions?skip=${skip}&limit=${limit}`,
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
