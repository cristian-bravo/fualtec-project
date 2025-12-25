import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type AdminUser = {
  id: number;
  nombre: string;
  email: string;
  cedula?: string | null;
  rol?: string | null;
  estado?: string | null;
  email_verified_at?: string | null;
  last_login_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type UpdateUserPayload = {
  nombre?: string;
  email?: string;
  cedula?: string;
  rol?: "admin" | "cliente";
  estado?: "pendiente" | "aprobado" | "rechazado" | "inactivo";
  password?: string;
};

export async function fetchUsers(
  token: string,
  params?: { rol?: string; estado?: string }
): Promise<AdminUser[]> {
  const res = await axios.get(`${API_BASE}/admin/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return res.data ?? [];
}

export async function fetchUserById(
  token: string,
  userId: number
): Promise<AdminUser> {
  const res = await axios.get(`${API_BASE}/admin/usuarios/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function updateUser(
  token: string,
  userId: number,
  payload: UpdateUserPayload
): Promise<AdminUser> {
  const res = await axios.patch(
    `${API_BASE}/admin/usuarios/${userId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
