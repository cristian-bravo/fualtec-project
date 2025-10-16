export type UserState = 'pendiente' | 'aprobado' | 'rechazado' | 'inactivo';

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  cedula?: string;
  rol: 'admin' | 'cliente';
  estado: UserState;
  last_login_at?: string | null;
}

export interface AuthRegisterPayload {
  nombre: string;
  email: string;
  cedula: string;
  password: string;
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
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
