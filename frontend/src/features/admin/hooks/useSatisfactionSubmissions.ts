import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { usePagination } from './usePagination';
import {
  SatisfactionSubmission,
  fetchSatisfactionSubmissions,
} from '../services/publicSubmissionsService';

export const useSatisfactionSubmissions = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<SatisfactionSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchSatisfactionSubmissions(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudieron cargar las evaluaciones.'))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.nombre, item.email, item.servicio].some((value) =>
        value.toLowerCase().includes(normalized)
      )
    );
  }, [items, search]);

  const { page, setPage, totalPages, paginated } = usePagination(filteredItems, 10);

  const applySearch = () => {
    setSearch(searchInput);
    setPage(1);
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
  };
};
