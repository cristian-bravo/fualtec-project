import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { usePagination } from './usePagination';
import {
  ComplaintSubmission,
  downloadComplaintAttachment,
  fetchComplaintSubmissions,
} from '../services/publicSubmissionsService';

export const useComplaintSubmissions = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<ComplaintSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchComplaintSubmissions(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudieron cargar las quejas.'))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [
        item.empresa,
        item.nombre,
        item.email,
        item.tipo_queja,
        item.tipo_inconformidad,
      ].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [items, search]);

  const { page, setPage, totalPages, paginated } = usePagination(filteredItems, 10);

  const applySearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleDownload = async (item: ComplaintSubmission) => {
    if (!token) return;
    try {
      setDownloadingId(item.id);
      await downloadComplaintAttachment(token, item.id, item.documento_nombre || 'adjunto');
    } catch {
      setError('No se pudo descargar el adjunto.');
    } finally {
      setDownloadingId(null);
    }
  };

  return {
    items,
    loading,
    error,
    search,
    page,
    setPage,
    totalPages,
    paginated,
    searchInput,
    setSearchInput,
    applySearch,
    downloadingId,
    handleDownload,
  };
};
