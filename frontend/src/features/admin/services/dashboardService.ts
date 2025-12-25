import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type DashboardStats = {
  total_users: number;
  approved_users: number;
  pending_users: number;
  pdf_count: number;
  group_count: number;
  storage_used_bytes: number;
  storage_limit_bytes: number;
};

export async function fetchDashboardStats(
  token: string
): Promise<DashboardStats> {
  const res = await axios.get(`${API_BASE}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
