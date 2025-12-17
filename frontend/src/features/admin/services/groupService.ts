import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type CreateGroupPayload = {
  name: string;
  periodo?: string;
};

export async function createGroup(
  token: string,
  payload: CreateGroupPayload
): Promise<{ id: number }> {
  const res = await axios.post(
    `${API_BASE}/admin/groups`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function addPdfsToGroup(
  token: string,
  groupId: number,
  pdfIds: number[]
): Promise<{ added: number }> {
  const res = await axios.post(
    `${API_BASE}/admin/groups/${groupId}/items`,
    { pdfIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function publishGroup(
  token: string,
  groupId: number
): Promise<{ published_at: string }> {
  const res = await axios.post(
    `${API_BASE}/admin/groups/${groupId}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
