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
};
