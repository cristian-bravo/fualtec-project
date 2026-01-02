import { useState } from 'react';
import { SubmissionDetailsModal } from '../components/submission-details-modal';
import { SatisfactionSubmission } from '../services/publicSubmissionsService';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { SatisfactionSubmissionsTable } from '../components/satisfaction-submissions-table';
import { SatisfactionSubmissionsCards } from '../components/satisfaction-submissions-cards';
import { useSatisfactionSubmissions } from '../hooks/useSatisfactionSubmissions';

const formatDate = (value?: string | null) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleString('es-EC', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPromedio = (value: string | number) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(parsed)) return '-';
  return `${parsed.toFixed(2)}/5`;
};

export const AdminSatisfactionSubmissionsPage = () => {
  const {
    items,
    loading,
    error,
    paginated,
    page,
    setPage,
    totalPages,
    searchInput,
    setSearchInput,
    applySearch,
    search,
  } = useSatisfactionSubmissions();
  const [selected, setSelected] = useState<SatisfactionSubmission | null>(null);
  const hasSearch = Boolean(search.trim());
  const emptyMessage = hasSearch
    ? 'No hay resultados para la busqueda.'
    : 'No hay evaluaciones registradas.';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Formulario de satisfaccion
            </h1>
            <span className="text-sm text-slate-500">({items.length})</span>
          </div>
          <p className="text-sm text-slate-600">
            Evaluaciones enviadas por clientes y visitantes.
          </p>
        </div>
        <div className="w-full sm:min-w-[360px] sm:w-auto">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={applySearch}
            placeholder="Buscar por nombre o correo"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <SatisfactionSubmissionsTable
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        formatDate={formatDate}
        formatPromedio={formatPromedio}
      />

      <SatisfactionSubmissionsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        formatDate={formatDate}
        formatPromedio={formatPromedio}
      />

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de evaluacion"
        onClose={() => setSelected(null)}
        rows={
          selected
            ? [
                { label: 'Nombre', value: selected.nombre },
                { label: 'Correo', value: selected.email },
                { label: 'Servicio', value: selected.servicio },
                { label: 'Promedio', value: formatPromedio(selected.promedio) },
                { label: 'Comentarios', value: selected.comentarios || '-' },
                { label: 'Mensaje final', value: selected.mensaje_final || '-' },
                { label: 'Fecha', value: formatDate(selected.created_at) },
              ]
            : []
        }
      />
    </div>
  );
};
