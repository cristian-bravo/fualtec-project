import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type AdminUser = {
  id: number;
  nombre: string;
  email: string;
  rol?: string | null;
  estado?: string | null;
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
