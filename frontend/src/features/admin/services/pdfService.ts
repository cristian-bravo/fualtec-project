import axios from "axios";

export type PdfItem = {
  id: number;
  title: string;
  filename: string;
  storage_path: string;
  grupo?: string | null;
  vigente?: boolean;
};

// Usa tu base actual, con opción a env si luego quieres
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// util interno para dividir en lotes
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export async function fetchPdfs(
  token: string,
  params?: {
    status?: 'all' | 'grouped' | 'ungrouped';
    search?: string;
    page?: number;
  }
): Promise<PdfItem[]> {
  const res = await axios.get(`${API_BASE}/admin/pdfs`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  if (Array.isArray(res.data)) {
    return res.data as PdfItem[];
  }

  const firstPage = (res.data?.data || []) as PdfItem[];
  const lastPage = Number(res.data?.last_page || 1);

  if (lastPage <= 1) {
    return firstPage;
  }

  const all: PdfItem[] = [...firstPage];

  for (let page = 2; page <= lastPage; page += 1) {
    const pageRes = await axios.get(`${API_BASE}/admin/pdfs`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...params, page },
    });
    const pageData = (pageRes.data?.data || []) as PdfItem[];
    all.push(...pageData);
  }

  return all;
}


export async function uploadPdfs(
  token: string,
  files: File[],
  grupo: string = "General"
): Promise<PdfItem[]> {
  const createdAll: PdfItem[] = [];
  const chunks = chunkArray(files, 5);

  for (let i = 0; i < chunks.length; i++) {
    const formData = new FormData();

    chunks[i].forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    formData.append("grupo", grupo);

    const response = await axios.post(
      `${API_BASE}/admin/pdfs/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (e) => {
          if (!e.total) return;
          const percent = Math.round((e.loaded * 100) / e.total);
          console.log(`Lote ${i + 1}: ${percent}%`);
        },
      }
    );

    const created = (response.data.data || []) as PdfItem[];
    createdAll.push(...created);
  }

  return createdAll;
}

export async function getPdfBlob(token: string, id: number): Promise<Blob> {
  const response = await axios.get(
    `${API_BASE}/admin/pdfs/${id}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return new Blob([response.data], { type: "application/pdf" });
}

export async function deletePdf(token: string, id: number): Promise<void> {
  await axios.delete(`${API_BASE}/admin/pdfs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deletePdfsBulk(
  token: string,
  ids: number[]
): Promise<void> {
await axios({
  method: 'DELETE',
  url: `${API_BASE}/admin/pdfs/bulk`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  data: { ids },
});

}
