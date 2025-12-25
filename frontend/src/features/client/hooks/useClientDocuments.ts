import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess } from "@/lib/alerts";
import {
  ClientDocument,
  downloadClientDocumentsZip,
  downloadClientDocument,
  fetchClientDocuments,
} from "../services/clientService";

export const useClientDocuments = (groupId?: number) => {
  const { token, isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const loadDocuments = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchClientDocuments(token, { groupId });
      setDocuments(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los documentos.");
    } finally {
      setIsLoading(false);
    }
  }, [token, groupId]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const downloadDocument = useCallback(
    async (doc: ClientDocument) => {
      if (!token) return;
      setActionId(doc.id);
      try {
        const blob = await downloadClientDocument(token, doc.id);
        triggerDownload(blob, `${doc.title || "documento"}.pdf`);
        alertSuccess("Descarga iniciada.");
      } catch (error) {
        console.error(error);
        alertError("No se pudo descargar el documento.");
      } finally {
        setActionId(null);
      }
    },
    [token]
  );

  const viewDocument = useCallback(
    async (doc: ClientDocument) => {
      if (!token) return null;
      setActionId(doc.id);
      try {
        const blob = await downloadClientDocument(token, doc.id);
        const url = window.URL.createObjectURL(blob);
        return url;
      } catch (error) {
        console.error(error);
        alertError("No se pudo abrir el documento.");
        return null;
      } finally {
        setActionId(null);
      }
    },
    [token]
  );

  const downloadSelected = useCallback(
    async (ids: number[], filename = "documentos-seleccionados.zip") => {
      if (!token || ids.length === 0) return;
      setIsBulkLoading(true);
      try {
        const blob = await downloadClientDocumentsZip(token, ids);
        triggerDownload(blob, filename);
        alertSuccess("Descarga iniciada.");
      } catch (error) {
        console.error(error);
        alertError("No se pudo descargar la carpeta.");
      } finally {
        setIsBulkLoading(false);
      }
    },
    [token]
  );

  return {
    isAuthenticated,
    documents,
    isLoading,
    actionId,
    isBulkLoading,
    reload: loadDocuments,
    downloadDocument,
    viewDocument,
    downloadSelected,
  };
};
