/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseInterface {
  _id: string;
  title: string;
  description?: string;
  clientName: string;
  clientEmail?: string;
  caseType: "civil" | "criminal" | "contract" | "corporate" | "other";
  status: "draft" | "active" | "closed";
  filedAt: string;
  owner: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  username:string
}


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1/';

const api: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};

export const getUser = (): UserInterface | null => {
  if (typeof window === "undefined") return null;
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const setUser = (user: UserInterface): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("userData", JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userData");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const getUserFromToken = (): User | null => {
  const user = getUser();
  if (!user) return null;

  return {
    id: user._id,
    email: user.email,
    username:user.username
  };
};

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('auth/', credentials);
      const { token } = response.data;

      if (token) {
        setToken(token);
        const user = await authService.me();
        return { token, user };
      }

      throw new Error('No token received');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  me: async (): Promise<UserInterface> => {
    try {
      const response = await api.get('auth/me');
      const user = response.data.user;
      setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  register: async (userData: { username: string; email: string; password: string; bio?: string }) => {
    try {
      const response = await api.post('user/', userData);
      const data = await response.data
      if (data.success) {
        return data.success
      } else {
        alert("Failed to register user")
        console.log(`Failed to register user ${data.message || data.error}`)
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
};

export const caseService = {
  getAll: async (): Promise<CaseInterface[]> => {
    try {
      const response = await api.get('case/user/', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return response.data.cases;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cases');
    }
  },

  getById: async (id: string): Promise<CaseInterface> => {
    try {
      const response = await api.get(`case/user/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return response.data.case;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch case');
    }
  },

  create: async (caseData: Partial<CaseInterface>): Promise<CaseInterface> => {
    try {
      const response = await api.post('case', caseData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return response.data.tit;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create case');
    }
  },

  update: async (id: string, caseData: Partial<CaseInterface>): Promise<CaseInterface> => {
    try {
      const response = await api.patch(`case/${id}`, caseData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return response.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update case');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`case/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete case');
    }
  },
};

export { api };

export const apiClient = {
  get: async (url: string) => {
    const response = await api.get(url);
    return response.data;
  },
  post: async (url: string, data: any) => {
    const response = await api.post(url, data);
    return response.data;
  },
  patch: async (url: string, data: any) => {
    const response = await api.patch(url, data);
    return response.data;
  },
  delete: async (url: string) => {
    const response = await api.delete(url);
    return response.data;
  },
};