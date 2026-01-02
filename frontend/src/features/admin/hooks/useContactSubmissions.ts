import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { usePagination } from './usePagination';
import {
  ContactSubmission,
  fetchContactSubmissions,
  updateContactSubmissionStatus,
} from '../services/publicSubmissionsService';

type StatusFilter = 'all' | 'resolved' | 'pending';

export const useContactSubmissions = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchContactSubmissions(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudieron cargar las solicitudes de contacto.'))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    let list = items;

    if (statusFilter !== 'all') {
      const shouldBeResolved = statusFilter === 'resolved';
      list = list.filter((item) => Boolean(item.is_resolved) === shouldBeResolved);
    }

    if (!normalized) return list;

    return list.filter((item) =>
      [item.nombre, item.email, item.asunto, item.mensaje].some((value) =>
        value.toLowerCase().includes(normalized)
      )
    );
  }, [items, search, statusFilter]);

  const { page, setPage, totalPages, paginated } = usePagination(filteredItems, 10);

  const applySearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const applyFilter = (next: StatusFilter) => {
    setStatusFilter(next);
    setPage(1);
  };

  const toggleResolved = async (item: ContactSubmission, nextValue: boolean) => {
    if (!token) return;
    setUpdatingId(item.id);
    setError(null);
    try {
      await updateContactSubmissionStatus(token, item.id, nextValue);
      setItems((prev) =>
        prev.map((entry) =>
          entry.id === item.id ? { ...entry, is_resolved: nextValue } : entry
        )
      );
    } catch {
      setError('No se pudo actualizar el estado.');
    } finally {
      setUpdatingId(null);
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
    statusFilter,
    applyFilter,
    updatingId,
    toggleResolved,
  };
};
