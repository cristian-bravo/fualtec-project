export type UserState = 'pendiente' | 'aprobado' | 'rechazado' | 'inactivo';

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  cedula?: string;
  rol: 'admin' | 'cliente' | 'super_admin';
  is_super_admin?: boolean;
  estado: UserState;
  last_login_at?: string | null;
}

export interface AuthRegisterPayload {
  nombre: string;
  email: string;
  cedula: string;
  password: string;
  captcha_token: string;
  captcha_answer: string;
}

export interface AuthRegisterResponse {
  id: number;
  estado: UserState;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  user: AuthUser;
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
  captcha_token: string;
  captcha_answer: string;
}

export interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
}

export interface CaptchaResponse {
  token: string;
  question: string;
}
