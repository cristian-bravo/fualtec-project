import { PdfViewerModal } from "../components/pdfs/PdfViewerModal";
import { PdfUpload } from "../components/pdfs/PdfUpload";
import { PdfTable } from "../components/pdfs/PdfTable";
import { usePdfs } from "../hooks/usePdfs";
import { CreateGroupModal } from "../components/groups/CreateGroupModal";
import { useState } from "react";
import { createGroup, addPdfsToGroup } from "../services/groupService";
import { useAuth } from "@/hooks/use-auth";
import { alertSuccess, alertError } from "@/lib/alerts";
import { PdfTableMobile } from "../components/pdfs/PdfTableMobile";
import { ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react";



export const AdminPdfsPage = () => {
  const {
    isAuthenticated,
    paginated,
    pdfs,        // ← nuevo
    page,        // ← nuevo
    setPage,     // ← nuevo
    totalPages, // ← nuevo
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
    reload,

    status,
    onChangeStatus,
    search,
    setSearch, 
    onSearchChange,
  } = usePdfs();
  
  const [searchInput, setSearchInput] = useState("");

  const applySearch = () => {
    setSearch(searchInput); // setSearch viene del hook
    setPage(1);
  };

  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const { token } = useAuth();

  

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
{/* Header 75% / 25% */}
<div className="grid grid-cols-4 gap-4 items-center">
  {/* 75% */}
  <div className="col-span-3 flex flex-col gap-2 text-center sm:text-left">
    <h1 className="text-2xl font-bold text-slate-900">
      Gestión de PDFs
    </h1>
    <p className="text-sm text-slate-600">
      Suba archivos PDF, gestione versiones y prepare la
      documentación para su futura agrupación y publicación.
    </p>
  </div>

  {/* 25% */}
  <div className="col-span-1 flex items-center justify-center">
    <div className="w-full flex flex-col gap-3">

{/* Buscador */}
<div className="flex items-center gap-2">
  <div className="relative flex-1">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      <Search className="h-4 w-4" />
    </span>
    <input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") applySearch();
      }}
      placeholder="Buscar PDF..."
      className="w-full pl-9 pr-3 py-2 text-sm border rounded-md
                 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  <button
    onClick={applySearch}
    className="px-4 py-2 text-sm font-medium rounded-md
               bg-blue-600 text-white hover:bg-blue-700
               transition"
  >
    Buscar
  </button>
</div>


      {/* Radio */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg justify-center">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'grouped', label: 'Agrupados' },
          { id: 'ungrouped', label: 'No agrupados' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => onChangeStatus(opt.id as any)}
            className={`px-3 py-1 text-sm rounded-md transition
              ${status === opt.id
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-white'}`}
          >
            {opt.label}
          </button>
        ))}
            </div>

          </div>
        </div>
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
        //onGroup={handleGroup}
        isLoading={isLoading}
      />
      {/* Tabla + mobiles */}
        <PdfTableMobile
          pdfs={paginated}
          selectedIds={selectedIds}
          onToggleRow={toggleSelect}
          onView={handleView}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

<div className="flex items-center justify-end gap-1 mt-6 text-sm">
  
    <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="inline-flex items-center justify-center px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
    aria-label="Anterior"
  >
    <ChevronLeft className="h-4 w-4" />
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
      return (
        <span className="px-2 text-slate-400" key={p}>
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }
    return null;
  })}

    <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="inline-flex items-center justify-center px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
    aria-label="Siguiente"
  >
    <ChevronRight className="h-4 w-4" />
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
              onClick={() => setGroupModalOpen(true)}
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
      <CreateGroupModal
        open={groupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        pdfs={pdfs.filter(p => selectedIds.includes(p.id))}
        onSave={async ({ name, periodo }) => {
          if (!token) {
            alertError("Sesión inválida.");
            return;
          }

          try {
            const { id } = await createGroup(token, { name, periodo });
            await addPdfsToGroup(token, id, selectedIds);

            await reload();  
            setGroupModalOpen(false);
            clearSelection();
            alertSuccess("Grupo creado correctamente.");
          } catch (e: any) {
  console.error(e);

  const message =
    e?.response?.data?.errors?.pdfs?.[0] ||
    e?.response?.data?.message ||
    "Error al crear el grupo.";

  alertError(message);
}
        }}
      />

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
