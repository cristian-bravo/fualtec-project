import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type ClientGroup = {
  id: number;
  name: string;
  periodo?: string | null;
  items_count?: number | null;
};

export type ClientPublication = {
  id: number;
  published_at?: string | null;
  group: ClientGroup | null;
};

export type ClientDocument = {
  id: number;
  title: string;
  categoria?: string | null;
  group: ClientGroup | null;
  publicado_en?: string | null;
  vigente: boolean;
};

export async function fetchClientPublications(
  token: string
): Promise<ClientPublication[]> {
  const res = await axios.get(`${API_BASE}/client/publications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ?? [];
}

export async function fetchClientDocuments(
  token: string,
  params?: { groupId?: number }
): Promise<ClientDocument[]> {
  const res = await axios.get(`${API_BASE}/client/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params?.groupId ? { group_id: params.groupId } : undefined,
  });

  return res.data ?? [];
}

export async function downloadClientDocument(
  token: string,
  id: number
): Promise<Blob> {
  const response = await axios.get(`${API_BASE}/client/documents/${id}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  return new Blob([response.data], { type: "application/pdf" });
}

export async function downloadClientGroup(
  token: string,
  groupId: number
): Promise<Blob> {
  const response = await axios.get(
    `${API_BASE}/client/documents/groups/${groupId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return new Blob([response.data], { type: "application/zip" });
}

export async function downloadClientDocumentsZip(
  token: string,
  ids: number[]
): Promise<Blob> {
  const response = await axios.post(
    `${API_BASE}/client/documents/bulk-download`,
    { ids },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return new Blob([response.data], { type: "application/zip" });
}
