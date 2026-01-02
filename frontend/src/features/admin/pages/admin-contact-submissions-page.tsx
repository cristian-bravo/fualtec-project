import { useState } from 'react';
import { SubmissionDetailsModal } from '../components/submission-details-modal';
import { ContactSubmission } from '../services/publicSubmissionsService';
import { useContactSubmissions } from '../hooks/useContactSubmissions';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { ContactSubmissionsTable } from '../components/contact-submissions-table';
import { ContactSubmissionsCards } from '../components/contact-submissions-cards';

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

export const AdminContactSubmissionsPage = () => {
  const {
    items,
    loading,
    error,
    search,
    paginated,
    page,
    setPage,
    totalPages,
    searchInput,
    setSearchInput,
    applySearch,
    statusFilter,
    applyFilter,
    updatingId,
    toggleResolved,
  } = useContactSubmissions();
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const hasFilters = statusFilter !== 'all' || Boolean(search.trim());
  const emptyMessage = hasFilters
    ? 'No hay resultados para los filtros aplicados.'
    : 'No hay solicitudes registradas.';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Solicitudes de contacto
            </h1>
            <span className="text-sm text-slate-500">({items.length})</span>
          </div>
          <p className="text-sm text-slate-600">
            Solicitudes recibidas desde el portal publico.
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

      <ContactSubmissionsTable
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onToggleResolved={toggleResolved}
        updatingId={updatingId}
        formatDate={formatDate}
      />

      <ContactSubmissionsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onToggleResolved={toggleResolved}
        updatingId={updatingId}
        formatDate={formatDate}
      />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de contacto"
        onClose={() => setSelected(null)}
        rows={
          selected
            ? [
                { label: 'Nombre', value: selected.nombre },
                { label: 'Correo', value: selected.email },
                { label: 'Asunto', value: selected.asunto },
                { label: 'Mensaje', value: selected.mensaje },
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
