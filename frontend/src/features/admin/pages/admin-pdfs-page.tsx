import { PdfViewerModal } from "../components/pdfs/PdfViewerModal";
import { PdfUpload } from "../components/pdfs/PdfUpload";
import { PdfTable } from "../components/pdfs/PdfTable";
import { usePdfs } from "../hooks/usePdfs";

export const AdminPdfsPage = () => {
  const {
    isAuthenticated,
    pdfs,
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
        pdfs={pdfs}
        selectedIds={selectedIds}
        onToggleRow={toggleSelect}
        onToggleAll={selectAll}
        onView={handleView}
        onDelete={handleDelete}
        onGroup={handleGroup}
        isLoading={isLoading}
      />

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
