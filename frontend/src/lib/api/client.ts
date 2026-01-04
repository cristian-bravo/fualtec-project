import axios from 'axios';
import { storage } from '../storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = storage.get('midominio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData && config.headers) {
    if (typeof (config.headers as any).delete === 'function') {
      (config.headers as any).delete('Content-Type');
    } else {
      delete (config.headers as Record<string, string>)['Content-Type'];
    }
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
