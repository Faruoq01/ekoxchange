import API from "./api";

export const AnalyticsService = {
  getUserCount: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/user/total?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getTradeVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/trade-volume/total?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getCryptoFlow: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/crypto-flow/total?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getDailyUserVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/user/daily?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getWeeklyUserVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/user/weekly?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getMonthlyUserVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.post(
        `/analytics/user/monthly?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getDailyTransactionVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/transaction/daily?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getWeeklyTransactionVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.get(
        `/analytics/transaction/weekly?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getMonthlyTransactionVolume: async (startDate: string, endDate: string) => {
    try {
      const response = await API.post(
        `/analytics/transaction/monthly?startDate=${startDate}&endDate=${endDate}`
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
