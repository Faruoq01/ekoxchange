import API from "./api";

export const CryptoService = {
  getWalletBalances: async () => {
    try {
      const response = await API.get(`admin/crypto-management/wallet-balances`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getFeeRecords: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `fee-manager/list?skip=${skip}&limit=${limit}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getRateRecords: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `rate-manager/list?skip=${skip}&limit=${limit}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getCryptoAsset: async (skip: number, limit: number) => {
    try {
      const response = await API.get(`chain/tokens/list/${skip}/${limit}`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  createFee: async (params: any) => {
    try {
      const response = await API.post(`/fee-manager/create`, params);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  updateFee: async (id: string, params: any) => {
    try {
      const response = await API.put(`/fee-manager/update/${id}`, params);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  createRate: async (params: any) => {
    try {
      const response = await API.post(`/rate-manager/create`, params);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  updateRate: async (id: string, params: any) => {
    try {
      const response = await API.put(`/rate-manager/update/${id}`, params);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
