import { apiClient } from './client';
import type {
  AuthLoginPayload,
  AuthLoginResponse,
  AuthRegisterPayload,
  AuthRegisterResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthUser
} from '../../types/auth';

export const authApi = {
  register: async (payload: AuthRegisterPayload): Promise<AuthRegisterResponse> => {
    const { data } = await apiClient.post<AuthRegisterResponse>('/auth/register', payload);
    return data;
  },
  login: async (payload: AuthLoginPayload): Promise<AuthLoginResponse> => {
    const { data } = await apiClient.post<AuthLoginResponse>('/auth/login', payload);
    return data;
  },
  forgot: async (payload: ForgotPasswordPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>('/auth/forgot', payload);
    return data;
  },
  reset: async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>('/auth/reset', payload);
    return data;
  },
  me: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  }
};
