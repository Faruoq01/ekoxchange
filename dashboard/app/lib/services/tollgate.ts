import API from "./api";

export const TollgateService = {
  create: async (param: any) => {
    try {
      const response = await API.post(`/tollgate/create`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  listTollgates: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/tollgate/list?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  update: async (id: string, param: any) => {
    try {
      const response = await API.patch(`/tollgate/update/${id}`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await API.delete(`/tollgate/delete/${id}`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
