import API from "./api";

export const TrackerService = {
  getStats: async () => {
    try {
      const response = await API.get(`/trackers/stats`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getTrackerList: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/trackers/list?page=${skip}&limit=${limit}`,
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
