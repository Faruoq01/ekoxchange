import API from "./api";

export const IndexService = {
  create: async (param: any) => {
    try {
      const response = await API.post(`/indexing/create`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  listIndexings: async (skip: number, limit: number) => {
    try {
      const response = await API.get(
        `/indexing/list?skip=${skip}&limit=${limit}`,
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
      const response = await API.patch(`/indexing/update/${id}`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await API.delete(`/indexing/delete/${id}`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
