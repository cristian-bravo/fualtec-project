import axios from 'axios';

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export type ContactSubmission = {
  id: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  is_resolved?: boolean;
  created_at?: string | null;
};

export type SatisfactionSubmission = {
  id: number;
  nombre: string;
  email: string;
  servicio: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  promedio: string | number;
  comentarios?: string | null;
  mensaje_final?: string | null;
  is_resolved?: boolean;
  created_at?: string | null;
};

export type ComplaintSubmission = {
  id: number;
  empresa: string;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha_presentacion: string;
  tipo_queja: string;
  tipo_inconformidad: string;
  anexa_documento: boolean;
  relato: string;
  documento_nombre?: string | null;
  documento_path?: string | null;
  is_resolved?: boolean;
  created_at?: string | null;
};

export async function fetchContactSubmissions(token: string): Promise<ContactSubmission[]> {
  const res = await axios.get(`${API_BASE}/admin/contact-submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ?? [];
}

export async function updateContactSubmissionStatus(
  token: string,
  id: number,
  isResolved: boolean
): Promise<{ id: number; is_resolved: boolean; message?: string }> {
  const res = await axios.patch(
    `${API_BASE}/admin/contact-submissions/${id}`,
    { is_resolved: isResolved },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchSatisfactionSubmissions(token: string): Promise<SatisfactionSubmission[]> {
  const res = await axios.get(`${API_BASE}/admin/satisfaction-submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ?? [];
}

export async function updateSatisfactionSubmissionStatus(
  token: string,
  id: number,
  isResolved: boolean
): Promise<{ id: number; is_resolved: boolean; message?: string }> {
  const res = await axios.patch(
    `${API_BASE}/admin/satisfaction-submissions/${id}`,
    { is_resolved: isResolved },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchComplaintSubmissions(token: string): Promise<ComplaintSubmission[]> {
  const res = await axios.get(`${API_BASE}/admin/complaint-submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ?? [];
}

export async function updateComplaintSubmissionStatus(
  token: string,
  id: number,
  isResolved: boolean
): Promise<{ id: number; is_resolved: boolean; message?: string }> {
  const res = await axios.patch(
    `${API_BASE}/admin/complaint-submissions/${id}`,
    { is_resolved: isResolved },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function downloadComplaintAttachment(
  token: string,
  complaintId: number,
  filename?: string
) {
  const res = await axios.get(
    `${API_BASE}/admin/complaint-submissions/${complaintId}/attachment`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'documento';
  link.click();
  window.URL.revokeObjectURL(url);
}
