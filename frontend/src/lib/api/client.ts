import axios from 'axios';
import { storage } from '../storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = storage.get('midominio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    const isAuthEndpoint = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot',
      '/auth/reset',
      '/auth/verify-email',
      '/auth/captcha'
    ].some((path) => url.includes(path));

    if ((status === 401 || status === 403) && !isAuthEndpoint) {
      window.location.href = '/client-access/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
