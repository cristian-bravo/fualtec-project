import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type ApprovalUser = {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  estado?: string | null;
  email_verified_at?: string | null;
};

export async function fetchPendingApprovals(
  token: string
): Promise<ApprovalUser[]> {
  const res = await axios.get(`${API_BASE}/admin/approvals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ?? [];
}

export async function approveUser(
  token: string,
  userId: number
): Promise<{ status: string }> {
  const res = await axios.post(
    `${API_BASE}/admin/approvals/${userId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function rejectUser(
  token: string,
  userId: number
): Promise<{ status: string }> {
  const res = await axios.post(
    `${API_BASE}/admin/approvals/${userId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
