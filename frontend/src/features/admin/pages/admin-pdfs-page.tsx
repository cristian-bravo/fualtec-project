import { PdfViewerModal } from "../components/pdfs/PdfViewerModal";
import { PdfUpload } from "../components/pdfs/PdfUpload";
import { PdfTable } from "../components/pdfs/PdfTable";
import { usePdfs } from "../hooks/usePdfs";

export const AdminPdfsPage = () => {
  const {
    isAuthenticated,
    paginated,
    pdfs,        // ← nuevo
    page,        // ← nuevo
    setPage,     // ← nuevo
    isLoading,
    isUploading,
    viewerOpen,
    viewerPdf,
    handleView,
    closeViewer,
    handleUpload,
    handleDelete,
    handleBulkDelete,
    selectedIds,
    toggleSelect,
    selectAll,
    clearSelection,
    handleGroup,
    handleBulkGroup,
  } = usePdfs();
  const totalPages = Math.ceil(pdfs.length / 10);

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesión para gestionar PDFs.
      </div>
    );
  }

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="relative space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Título */}
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-slate-900">
          Gestión de PDFs
        </h1>
        <p className="text-sm text-slate-600">
          Suba archivos PDF, gestione versiones y prepare la
          documentación para su futura agrupación y publicación.
        </p>
      </div>

      {/* Upload / Dropzone */}
      <PdfUpload onUpload={handleUpload} isUploading={isUploading} />

      {/* Tabla + tarjetas */}
      <PdfTable
        pdfs={paginated}
        selectedIds={selectedIds}
        onToggleRow={toggleSelect}
        onToggleAll={selectAll}
        onView={handleView}
        onDelete={handleDelete}
        onGroup={handleGroup}
        isLoading={isLoading}
      />

<div className="flex items-center justify-end gap-1 mt-6 text-sm">
  
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
  >
    ←
  </button>

  {[...Array(totalPages)].map((_, i) => {
    const p = i + 1;
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      return (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`
            px-3 py-1.5 rounded border text-gray-700
            ${p === page
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-100"}
          `}
        >
          {p}
        </button>
      );
    }
    if (Math.abs(p - page) === 2) {
      return <span className="px-2" key={p}>…</span>;
    }
    return null;
  })}

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
  >
    →
  </button>

</div>


      

      {/* Toolbar flotante selección múltiple */}
      {hasSelection && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-2 text-white shadow-xl backdrop-blur-sm">
            <span className="text-xs sm:text-sm">
              {selectedIds.length} seleccionado
              {selectedIds.length > 1 ? "s" : ""}
            </span>

            <button
              type="button"
              className="text-xs sm:text-sm rounded-full border border-white/30 px-3 py-1 hover:bg-white/10 transition"
              onClick={handleBulkGroup}
            >
              Agrupar
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm rounded-full border border-red-400 px-3 py-1 hover:bg-red-500/90 hover:border-red-500 bg-red-500/80 transition"
              onClick={handleBulkDelete}
            >
              Eliminar
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm rounded-full border border-white/20 px-2 py-1 hover:bg-white/10 transition hidden sm:inline-flex"
              onClick={clearSelection}
            >
              Limpiar
            </button>
          </div>
        </div>
      )}

      {/* MODAL VISOR PDF */}
      <PdfViewerModal
        open={viewerOpen && !!viewerPdf}
        title={viewerPdf?.title || ""}
        url={viewerPdf?.url || ""}
        onClose={closeViewer}
      />
    </div>
  );
};
