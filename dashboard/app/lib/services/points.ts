import API from "./api";

export const PointsWalletService = {
  pointSummary: async () => {
    try {
      const response = await API.get(`/dashboard/points/summary`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  mintToken: async (param: { amount: string }) => {
    try {
      const response = await API.post(`/points/token/mint`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  burnToken: async (param: { amount: string }) => {
    try {
      const response = await API.post(`/points/token/burn`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenSupply: async () => {
    try {
      const response = await API.get(`/points/token/supply`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenCirculation: async () => {
    try {
      const response = await API.get(`/points/token/circulation`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  tokenBalance: async () => {
    try {
      const response = await API.get(`/points/token/balance`, {
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
        `/points/mint/transactions?skip=${skip}&limit=${limit}`,
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
        `/points/burn/transactions?skip=${skip}&limit=${limit}`,
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
