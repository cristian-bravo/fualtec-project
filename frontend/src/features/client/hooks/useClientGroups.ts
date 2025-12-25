import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess } from "@/lib/alerts";
import {
  ClientPublication,
  downloadClientGroup,
  fetchClientPublications,
} from "../services/clientService";

export const useClientGroups = () => {
  const { token, isAuthenticated } = useAuth();
  const [publications, setPublications] = useState<ClientPublication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

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

  const loadGroups = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchClientPublications(token);
      setPublications(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los grupos asignados.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const downloadGroup = useCallback(
    async (publication: ClientPublication) => {
      if (!token || !publication.group) return;
      setActionId(publication.id);
      try {
        const blob = await downloadClientGroup(token, publication.group.id);
        const name = publication.group.name || "grupo";
        triggerDownload(blob, `${name}.zip`);
        alertSuccess("Descarga iniciada.");
      } catch (error) {
        console.error(error);
        alertError("No se pudo descargar el grupo.");
      } finally {
        setActionId(null);
      }
    },
    [token]
  );

  return {
    isAuthenticated,
    isLoading,
    publications,
    actionId,
    reload: loadGroups,
    downloadGroup,
  };
};
