import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError } from "@/lib/alerts";
import {
  ClientDocument,
  ClientPublication,
  fetchClientDocuments,
  fetchClientPublications,
} from "../services/clientService";

export const useClientDashboard = () => {
  const { token, isAuthenticated, user } = useAuth();
  const [publications, setPublications] = useState<ClientPublication[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [pubs, docs] = await Promise.all([
        fetchClientPublications(token),
        fetchClientDocuments(token),
      ]);
      setPublications(pubs);
      setDocuments(docs);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los datos del cliente.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const latestPublication = useMemo(() => {
    return publications
      .filter((item) => item.published_at)
      .sort((a, b) => {
        const left = new Date(a.published_at as string).getTime();
        const right = new Date(b.published_at as string).getTime();
        return right - left;
      })[0];
  }, [publications]);

  return {
    isAuthenticated,
    isLoading,
    user,
    publications,
    documents,
    latestPublication,
    reload: loadData,
  };
};
