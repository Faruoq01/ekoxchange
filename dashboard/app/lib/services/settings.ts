import API from "./api";

export const SettingsService = {
  saveAndUpdateGeneralSettings: async (param: IGeneralSettings) => {
    try {
      const response = await API.post(`/settings/general`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  saveAndUpdateSecuritySettings: async (param: ISecuritySettings) => {
    try {
      const response = await API.post(`/settings/security`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  saveAndUpdateComplianceSettings: async (param: IComplianceSettings) => {
    try {
      const response = await API.post(`/settings/compliance`, param, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getGeneralSettings: async () => {
    try {
      const response = await API.get(`/settings/general/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getSecuritySettings: async () => {
    try {
      const response = await API.get(`/settings/security/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },

  getComplianceSettings: async () => {
    try {
      const response = await API.get(`/settings/compliance/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
  getBanner: async () => {
    try {
      const response = await API.get(`/banner/get`, {
        withCredentials: true,
      });
      return { error: false, payload: response?.data };
    } catch (e: any) {
      return { error: true, payload: e.message };
    }
  },
};

interface IGeneralSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  statusBanner: string;
  maintenanceMode: boolean;
}

interface ISecuritySettings {
  enforce2FA: boolean;
  lockoutDuration: number;
  maxFailedAttempts: number;
  minPasswordLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  sessionTimeout: string;
}

interface IComplianceSettings {
  termsContent: string;
  termsPublished: boolean;
  privacyContent: string;
  privacyPublished: boolean;
  riskContent: string;
  riskPublished: boolean;
  amlContent: string;
  amlPublished: boolean;
}
