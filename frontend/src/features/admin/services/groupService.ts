import axios from "axios";
import { PdfItem } from "./pdfService";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type GroupSummary = {
  id: number;
  name: string;
  periodo?: string | null;
  publicado: boolean;
  published_at?: string | null;
  items_count?: number;
  creator?: {
    id: number;
    nombre: string;
    email: string;
  } | null;
  publisher?: {
    id: number;
    nombre: string;
    email: string;
  } | null;
};

export type GroupDetail = GroupSummary & {
  pdfs: PdfItem[];
  linked_users?: {
    id: number;
    nombre: string;
    email: string;
  }[];
};

export type CreateGroupPayload = {
  name: string;
  periodo?: string;
};

export async function fetchGroups(token: string): Promise<GroupSummary[]> {
  const res = await axios.get(`${API_BASE}/admin/groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchGroupDetail(
  token: string,
  groupId: number
): Promise<GroupDetail> {
  const res = await axios.get(`${API_BASE}/admin/groups/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data ?? {};
  const pdfs =
    Array.isArray(data.pdfs)
      ? data.pdfs
      : Array.isArray(data.items)
        ? data.items
            .map((item: { pdf?: PdfItem }) => item.pdf)
            .filter((pdf: PdfItem | undefined): pdf is PdfItem => !!pdf)
        : Array.isArray(data.data?.pdfs)
          ? data.data.pdfs
          : [];

  return {
    ...data,
    pdfs,
  } as GroupDetail;
}

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

export async function removePdfFromGroup(
  token: string,
  groupId: number,
  pdfId: number
): Promise<void> {
  await axios.delete(`${API_BASE}/admin/groups/${groupId}/items/${pdfId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function publishGroup(
  token: string,
  groupId: number,
  userIds: number[]
): Promise<{ published_at: string }> {
  const res = await axios.post(
    `${API_BASE}/admin/groups/${groupId}/publish`,
    { user_ids: userIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function unpublishGroup(
  token: string,
  groupId: number
): Promise<{ message: string }> {
  const res = await axios.post(
    `${API_BASE}/admin/groups/${groupId}/unpublish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchAvailablePdfsForGroup(
  token: string,
  groupId: number,
  search?: string
): Promise<PdfItem[]> {
  const res = await axios.get(
    `${API_BASE}/admin/groups/${groupId}/available-pdfs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search,
      },
    }
  );

  return res.data;
}
