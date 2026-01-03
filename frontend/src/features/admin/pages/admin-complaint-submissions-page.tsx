import { useState } from 'react';
import { SubmissionDetailsModal } from '../components/submission-details-modal';
import { ComplaintSubmission } from '../services/publicSubmissionsService';
import { useComplaintSubmissions } from '../hooks/useComplaintSubmissions';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { ComplaintSubmissionsTable } from '../components/complaint-submissions-table';
import { ComplaintSubmissionsCards } from '../components/complaint-submissions-cards';
import { Tooltip } from '../../../components/ui/tooltip';
import { ContactStatusToggle } from '../components/contact-status-toggle';

const formatDate = (value?: string | null) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString('es-EC', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const AdminComplaintSubmissionsPage = () => {
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
    downloadingId,
    handleDownload,
  } = useComplaintSubmissions();
  const [selected, setSelected] = useState<ComplaintSubmission | null>(null);
  const hasFilters = statusFilter !== 'all' || Boolean(search.trim());
  const emptyMessage = hasFilters
    ? 'No hay resultados para los filtros aplicados.'
    : 'No hay registros disponibles.';

  const handleToggleResolved = (item: ComplaintSubmission, nextValue: boolean) => {
    setSelected((prev) =>
      prev && prev.id === item.id ? { ...prev, is_resolved: nextValue } : prev
    );
    toggleResolved(item, nextValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Quejas y apelaciones</h1>
            <span className="text-sm text-slate-500">({items.length})</span>
          </div>
          <p className="text-sm text-slate-600">Registros formales recibidos desde el portal.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[360px]">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={applySearch}
            placeholder="Buscar por empresa o solicitante"
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

      <ComplaintSubmissionsTable
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onToggleResolved={handleToggleResolved}
        updatingId={updatingId}
        formatDate={formatDate}
      />

      <ComplaintSubmissionsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onToggleResolved={handleToggleResolved}
        updatingId={updatingId}
        formatDate={formatDate}
      />

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de queja"
        onClose={() => setSelected(null)}
        actions={
          selected ? (
            <Tooltip
              content={
                selected.is_resolved ? 'Marcar como pendiente' : 'Marcar como resuelto'
              }
            >
              <ContactStatusToggle
                checked={Boolean(selected.is_resolved)}
                disabled={updatingId === selected.id}
                onChange={(next) => handleToggleResolved(selected, next)}
              />
            </Tooltip>
          ) : null
        }
        rows={
          selected
            ? [
                { label: 'Empresa', value: selected.empresa },
                { label: 'Solicitante', value: selected.nombre },
                { label: 'Cargo', value: selected.cargo },
                { label: 'Telefono', value: selected.telefono },
                { label: 'Correo', value: selected.email },
                { label: 'Direccion', value: selected.direccion },
                { label: 'Fecha', value: formatDate(selected.fecha_presentacion) },
                {
                  label: 'Tipo',
                  value: `${selected.tipo_inconformidad} / ${selected.tipo_queja}`,
                },
                {
                  label: 'Adjunto',
                  value: selected.anexa_documento ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-800">
                        {selected.documento_nombre || 'Documento adjunto'}
                      </span>
                      {selected.documento_path && (
                        <Tooltip content="Descargar adjunto">
                          <button
                            type="button"
                            onClick={() => handleDownload(selected)}
                            disabled={downloadingId === selected.id}
                            className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white disabled:opacity-60"
                          >
                            Descargar
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  ) : (
                    'Sin adjunto'
                  ),
                },
                {
                  label: 'Estado',
                  value: selected.is_resolved ? 'Resuelto' : 'Pendiente',
                },
                { label: 'Relato', value: selected.relato },
              ]
            : []
        }
      />
    </div>
  );
};



