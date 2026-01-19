import { Modal } from '../../../components/ui/modal';
import { Button } from '../../../components/ui/button';
import { Table } from '../../../components/ui/table';
import { PdfViewerModal } from '../components/pdfs/PdfViewerModal';
import { SearchBar } from '../components/search-bar';
import { PaginationControls } from '../components/pagination-controls';
import { PublicationsTable } from '../components/publications-table';
import { PublicationsCards } from '../components/publications-cards';
import { useAdminPublications } from '../hooks/useAdminPublications';

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

export const AdminPublicationsPage = () => {
  const {
    isAuthenticated,
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
    detailOpen,
    setDetailOpen,
    detailLoading,
    detailError,
    detail,
    openDetail,
    viewer,
    handleViewPdf,
    closeViewer,
  } = useAdminPublications();

  const hasSearch = Boolean(search.trim());
  const emptyMessage = hasSearch
    ? 'No hay resultados para la búsqueda.'
    : 'No hay publicaciones registradas.';

  const detailCreator = detail?.creator?.nombre || detail?.creator?.email || '-';
  const detailPublisher = detail?.publisher?.nombre || detail?.publisher?.email || '-';
  const detailPublishedAt = formatDate(detail?.published_at || null);
  const detailUsers = detail?.linked_users || [];

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesión para ver las publicaciones.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Historial de publicaciones
            </h1>
            <span className="text-sm text-slate-500">({items.length})</span>
          </div>
          <p className="text-sm text-slate-600">
            Consulte los grupos publicados y programe nuevas ventanas de disponibilidad.
          </p>
        </div>
        <div className="w-full sm:min-w-[360px] sm:w-auto">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={applySearch}
            placeholder="Buscar por grupo o período"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <PublicationsTable
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={(item) => openDetail(item.id)}
        formatDate={formatDate}
      />

      <PublicationsCards
        items={paginated}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={(item) => openDetail(item.id)}
        formatDate={formatDate}
      />

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={detail?.name || 'Detalle de publicación'}
        description={
          detail
            ? `Período ${detail.periodo || 'Sin período'} - Publicado ${formatDate(
                detail.published_at
              )}`
            : 'Cargando información de la publicación.'
        }
      >
        {detailError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {detailError}
          </div>
        )}

        {detailLoading && (
          <div className="py-4 text-center text-sm text-slate-500">
            Cargando PDFs del grupo...
          </div>
        )}

        {!detailLoading && detail && (
          <div className="space-y-4">
            <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:grid-cols-3">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Creado por
                </span>
                <div className="font-semibold text-slate-700">{detailCreator}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Publicado
                </span>
                <div className="font-semibold text-slate-700">{detailPublishedAt}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Publicado por
                </span>
                <div className="font-semibold text-slate-700">{detailPublisher}</div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 px-4 py-3">
              <div className="text-xs font-semibold text-slate-700">Usuarios enlazados</div>
              {detailUsers.length === 0 ? (
                <div className="mt-2 text-xs text-slate-500">
                  No hay usuarios enlazados.
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {detailUsers.map((user) => (
                    <span
                      key={user.id}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {user.nombre || user.email}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Table headers={['Título', '']}>
              {detail.pdfs.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-4 text-center text-sm text-slate-500"
                  >
                    No hay PDFs asociados a este grupo.
                  </td>
                </tr>
              )}

              {detail.pdfs.map((pdf) => (
                <tr key={pdf.id}>
                  <td className="px-6 py-3">
                    <div className="text-sm font-semibold text-slate-900 break-words">
                      {pdf.title || pdf.filename}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button variant="ghost" onClick={() => handleViewPdf(pdf)}>
                      Ver PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </Modal>

      <PdfViewerModal
        open={!!viewer}
        title={viewer?.title || ''}
        url={viewer?.url || ''}
        onClose={closeViewer}
      />
    </div>
  );
};
