import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { usePagination } from './usePagination';
import {
  fetchPublicationDetail,
  fetchPublications,
  PublicationItem,
} from '../services/publicationService';
import { GroupDetail } from '../services/groupService';
import { getPdfBlob, PdfItem } from '../services/pdfService';

export const useAdminPublications = () => {
  const { token, isAuthenticated } = useAuth();
  const [items, setItems] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detail, setDetail] = useState<GroupDetail | null>(null);

  const [viewer, setViewer] = useState<{ title: string; url: string } | null>(
    null
  );

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchPublications(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudo cargar el historial de publicaciones.'))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      const creator = item.creator?.nombre || item.creator?.email || '';
      const publisher = item.publisher?.nombre || item.publisher?.email || '';
      return [item.name, item.periodo || '', creator, publisher].some((value) =>
        value.toLowerCase().includes(normalized)
      );
    });
  }, [items, search]);

  const { page, setPage, totalPages, paginated } = usePagination(filteredItems, 10);

  const applySearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const openDetail = async (groupId: number) => {
    if (!token) return;
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    setDetailOpen(true);
    try {
      const data = await fetchPublicationDetail(token, groupId);
      setDetail(data);
    } catch {
      setDetailError('No se pudo cargar el detalle de la publicación.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleViewPdf = async (pdf: PdfItem) => {
    if (!token) return;
    try {
      const blob = await getPdfBlob(token, pdf.id);
      const url = URL.createObjectURL(blob);
      setViewer({
        title: pdf.title || pdf.filename,
        url,
      });
    } catch {
      setError('No se pudo abrir el PDF.');
    }
  };

  const closeViewer = () => {
    if (viewer?.url) {
      URL.revokeObjectURL(viewer.url);
    }
    setViewer(null);
  };

  return {
    isAuthenticated,
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
    detailOpen,
    setDetailOpen,
    detailLoading,
    detailError,
    detail,
    openDetail,
    viewer,
    handleViewPdf,
    closeViewer,
  };
};
