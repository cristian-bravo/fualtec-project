import axios from "axios";
import { GroupDetail, GroupSummary } from "./groupService";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type PublicationItem = GroupSummary;

export async function fetchPublications(
  token: string
): Promise<PublicationItem[]> {
  const res = await axios.get(`${API_BASE}/admin/publications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchPublicationDetail(
  token: string,
  groupId: number
): Promise<GroupDetail> {
  const res = await axios.get(`${API_BASE}/admin/publications/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
