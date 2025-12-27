import { apiClient } from '../../../lib/api/client';

export type ContactSubmissionPayload = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
};

export type SatisfactionSubmissionPayload = {
  nombre: string;
  email: string;
  servicio: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  comentarios?: string | null;
  mensaje_final?: string | null;
};

export type ComplaintSubmissionPayload = FormData;

export type SubmissionResponse = {
  id: number;
  message: string;
};

export const publicFormsService = {
  submitContact: async (payload: ContactSubmissionPayload): Promise<SubmissionResponse> => {
    const { data } = await apiClient.post<SubmissionResponse>('/public/contact', payload);
    return data;
  },
  submitSatisfaction: async (payload: SatisfactionSubmissionPayload): Promise<SubmissionResponse> => {
    const { data } = await apiClient.post<SubmissionResponse>('/public/satisfaction', payload);
    return data;
  },
  submitComplaint: async (payload: ComplaintSubmissionPayload): Promise<SubmissionResponse> => {
    const { data } = await apiClient.post<SubmissionResponse>('/public/complaints', payload);
    return data;
  },
};
