import API from "./api";

export const SupportService = {
  getAllTickets: async (skip: number, limit: number, status: string) => {
    try {
      const response = await API.get(
        `/support/ticket/admin/get?skip=${skip}&limit=${limit}&status=${status}`,
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
