import { useState } from 'react';
import { SubmissionDetailsModal } from '../components/submission-details-modal';
import { ComplaintSubmission } from '../services/publicSubmissionsService';
import { useComplaintSubmissions } from '../hooks/useComplaintSubmissions';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { ComplaintSubmissionsTable } from '../components/complaint-submissions-table';
import { ComplaintSubmissionsCards } from '../components/complaint-submissions-cards';

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
    downloadingId,
    handleDownload,
  } = useComplaintSubmissions();
  const [selected, setSelected] = useState<ComplaintSubmission | null>(null);
  const hasSearch = Boolean(search.trim());
  const emptyMessage = hasSearch
    ? 'No hay resultados para la busqueda.'
    : 'No hay registros disponibles.';

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
        <div className="w-full sm:min-w-[360px] sm:w-auto">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={applySearch}
            placeholder="Buscar por empresa o solicitante"
          />
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
        onDownload={handleDownload}
        downloadingId={downloadingId}
        formatDate={formatDate}
      />

      <ComplaintSubmissionsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onDownload={handleDownload}
        downloadingId={downloadingId}
        formatDate={formatDate}
      />

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de queja"
        onClose={() => setSelected(null)}
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
                { label: 'Relato', value: selected.relato },
              ]
            : []
        }
      />
    </div>
  );
};



