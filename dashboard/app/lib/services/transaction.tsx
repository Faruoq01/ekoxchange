import API from "./api";

export const TransactionService = {
  buyOrder: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/admin/crypto-management/buy-order/list?skip=${skip}&limit=${limit}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  sellOrder: async (skip: number, limit: number) => {
    try {
      const response = await API.get(`/sell/admin/list/${skip}/${limit}`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
