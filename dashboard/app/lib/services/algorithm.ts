import API from "./api";

export const AlgorithmService = {
  getRoutes: async () => {
    try {
      const response = await API.get(`/geolocations/routes/list`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getStates: async () => {
    try {
      const response = await API.get(`/geolocations/states/list`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getCabVariables: async (
    skip: number,
    limit: number,
    state: string,
    cabTypeName: string,
    tripType: string
  ) => {
    try {
      const url =
        state === "All States"
          ? `/variables/cab/list?skip=${skip}&limit=${limit}&cabType=${cabTypeName}`
          : `/variables/cab/list?skip=${skip}&limit=${limit}&state=${state}&cabType=${cabTypeName}`;

      const trip =
        tripType === "All Filters" ? url : url + `&tripType=${tripType}`;
      const response = await API.get(trip, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getTruckVariables: async (
    skip: number,
    limit: number,
    state: string,
    truckTypeName: string,
    tripType: string
  ) => {
    try {
      const url =
        state === "All States"
          ? `/variables/truck/list?skip=${skip}&limit=${limit}&truckType=${truckTypeName}`
          : `/variables/truck/list?skip=${skip}&limit=${limit}&state=${state}&truckType=${truckTypeName}`;

      const trip =
        tripType === "All Filters" ? url : url + `&tripType=${tripType}`;

      const response = await API.get(trip, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getTricycleVariables: async (
    skip: number,
    limit: number,
    state: string,
    tricycleTypeName: string,
    tripType: string
  ) => {
    try {
      const url =
        state === "All States"
          ? `/variables/tricycle/list?skip=${skip}&limit=${limit}&tricycleType=${tricycleTypeName}`
          : `/variables/tricycle/list?skip=${skip}&limit=${limit}&state=${state}&tricycleType=${tricycleTypeName}`;

      const trip =
        tripType === "All Filters" ? url : url + `&tripType=${tripType}`;
      const response = await API.get(trip, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  createCabVariables: async (params: any) => {
    try {
      const response = await API.post("/variables/cab/create", params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  activateCabVariables: async (param: { id: string; isActive: boolean }[]) => {
    try {
      const response = await API.patch(`/variables/cab/activate`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  updateCabVariables: async (params: any, id: string) => {
    try {
      const response = await API.put(`/variables/cab/update/${id}`, params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  deleteCabVariables: async (id: string) => {
    try {
      const response = await API.delete(`/variables/cab/delete/${id}`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  createTruckVariables: async (params: any) => {
    try {
      const response = await API.post("/variables/truck/create", params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  updateTruckVariables: async (params: any, id: string) => {
    try {
      const response = await API.put(`/variables/truck/update/${id}`, params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  activateTruckVariables: async (
    param: { id: string; isActive: boolean }[]
  ) => {
    try {
      const response = await API.patch(`/variables/truck/activate`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  deleteTruckVariables: async (id: string) => {
    try {
      const response = await API.delete(`/variables/truck/delete/${id}`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  createTricycleVariables: async (params: any) => {
    try {
      const response = await API.post("/variables/tricycle/create", params, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  updateTricycleVariables: async (params: any, id: string) => {
    try {
      const response = await API.put(
        `/variables/tricycle/update/${id}`,
        params,
        {
          withCredentials: true,
        }
      );
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  activateTricycleVariables: async (
    param: { id: string; isActive: boolean }[]
  ) => {
    try {
      const response = await API.patch(`/variables/tricycle/activate`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  deleteTricycleVariables: async (id: string) => {
    try {
      const response = await API.delete(`/variables/tricycle/delete/${id}`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  calculateCabPrice: async (param: any) => {
    try {
      const response = await API.post(`/pricing/cab/`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  calculateTricyclePrice: async (param: any) => {
    try {
      const response = await API.post(`/pricing/tricycle/`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  calculateTruckPrice: async (param: any) => {
    try {
      const response = await API.post(`/pricing/truck/`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};
