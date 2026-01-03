import { useState } from 'react';
import { SubmissionDetailsModal } from '../components/submission-details-modal';
import { SatisfactionSubmission } from '../services/publicSubmissionsService';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { SatisfactionSubmissionsTable } from '../components/satisfaction-submissions-table';
import { SatisfactionSubmissionsCards } from '../components/satisfaction-submissions-cards';
import { useSatisfactionSubmissions } from '../hooks/useSatisfactionSubmissions';
import { SatisfactionRating } from '../components/satisfaction-rating';

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
    statusFilter,
    applyFilter,
    updatingId,
    toggleResolved,
  } = useSatisfactionSubmissions();
  const [selected, setSelected] = useState<SatisfactionSubmission | null>(null);
  const hasFilters = statusFilter !== 'all' || Boolean(search.trim());
  const emptyMessage = hasFilters
    ? 'No hay resultados para los filtros aplicados.'
    : 'No hay evaluaciones registradas.';
  const headerRows = selected
    ? [
        {
          label: 'Nombre',
          value: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="text-sm text-slate-800">{selected.nombre}</div>
              <div className="text-sm text-slate-800">{selected.email}</div>
            </div>
          ),
        },
        {
          label: 'Servicio',
          value: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="text-sm text-slate-800">{selected.servicio}</div>
              <div className="text-sm text-slate-800">
                {formatPromedio(selected.promedio)}
              </div>
            </div>
          ),
        },
      ]
    : [];
  const questionRows = selected
    ? [
        {
          label: '1. Los servicios entregados cumplieron con tus expectativas y estandares?',
          value: <SatisfactionRating value={selected.p1} />,
        },
        {
          label: '2. Como calificarias nuestra capacidad para resolver problemas y responder a tus necesidades?',
          value: <SatisfactionRating value={selected.p2} />,
        },
        {
          label: '3. Como calificarias el profesionalismo y competencia tecnica de nuestro personal?',
          value: <SatisfactionRating value={selected.p3} />,
        },
        {
          label: '4. Que tan satisfecho estas con la rapidez de nuestra respuesta a consultas?',
          value: <SatisfactionRating value={selected.p4} />,
        },
        {
          label: '5. Que tan satisfecho estas con las medidas de seguridad en el servicio?',
          value: <SatisfactionRating value={selected.p5} />,
        },
      ]
    : [];

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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[360px]">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={applySearch}
            placeholder="Buscar por nombre o correo"
          />
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'resolved', label: 'Resueltos' },
              { id: 'pending', label: 'Pendientes' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  applyFilter(option.id as 'all' | 'resolved' | 'pending')
                }
                className={`px-3 py-1 text-sm rounded-md transition ${
                  statusFilter === option.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
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
        onToggleResolved={toggleResolved}
        updatingId={updatingId}
        formatDate={formatDate}
        formatPromedio={formatPromedio}
      />

      <SatisfactionSubmissionsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onToggleResolved={toggleResolved}
        updatingId={updatingId}
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
                ...headerRows,
                ...questionRows,
                { label: 'Comentarios', value: selected.comentarios || '-' },
                { label: 'Mensaje final', value: selected.mensaje_final || '-' },
                {
                  label: 'Estado',
                  value: selected.is_resolved ? 'Resuelto' : 'Pendiente',
                },
                { label: 'Fecha', value: formatDate(selected.created_at) },
              ]
            : []
        }
      />
    </div>
  );
};
