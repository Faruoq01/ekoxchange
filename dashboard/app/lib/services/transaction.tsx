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

  sendTransactions: async (skip: number, limit: number) => {
    try {
      const response = await API.get(`/transactions/send/${skip}/${limit}`);
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  gasEstimate: async (param: GasEstimateType) => {
    try {
      const response = await API.post(
        `/admin/crypto-management/buy-order/transfer/gas`,
        param
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  manualWithdrawal: async (param: GasEstimateType) => {
    try {
      const response = await API.post(
        `/admin/crypto-management/buy-order/transfer`,
        param
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};

interface GasEstimateType {
  chain: string | undefined;
  tokenAddress: string | undefined;
  recipient: string | undefined;
  amount: string | undefined;
  decimals: number | undefined;
}
