import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search } from "lucide-react";
import { Table } from "../../../components/ui/table";
import { PdfViewerModal } from "../../admin/components/pdfs/PdfViewerModal";
import { Button } from "../../../components/ui/button";
import { Tooltip } from "../../../components/ui/tooltip";
import { useAuth } from "../../../hooks/use-auth";
import { alertError, alertSuccess } from "../../../lib/alerts";
import { downloadClientGroup, type ClientDocument } from "../services/clientService";
import { useClientDocuments } from "../hooks/useClientDocuments";

type LocationState = {
  groupName?: string;
  groupPeriodo?: string;
  publishedAt?: string;
};

const formatDate = (value?: string | null) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const ClientGroupDocumentsPage = () => {
  const params = useParams();
  const groupId = Number(params.groupId);
  const { state } = useLocation();
  const meta = (state || {}) as LocationState;
  const { token } = useAuth();
  const {
    isAuthenticated,
    documents,
    isLoading,
    actionId,
    isBulkLoading,
    downloadDocument,
    viewDocument,
    downloadSelected,
  } = useClientDocuments(Number.isFinite(groupId) ? groupId : undefined);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isGroupDownloading, setIsGroupDownloading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState("");
  const [viewerUrl, setViewerUrl] = useState("");

  const filteredDocuments = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return documents;
    return documents.filter((doc) => {
      const title = doc.title?.toLowerCase() || "";
      const category = doc.categoria?.toLowerCase() || "";
      return title.includes(term) || category.includes(term);
    });
  }, [documents, searchTerm]);

  const totalDocuments = documents.length;
  const filteredCount = filteredDocuments.length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / perPage));

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredDocuments.slice(start, start + perPage);
  }, [filteredDocuments, page, perPage]);

  const filteredIds = useMemo(
    () => filteredDocuments.map((doc) => doc.id),
    [filteredDocuments]
  );

  const isAllSelected =
    filteredIds.length > 0 && filteredIds.every((id) => selectedIds.includes(id));

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (isAllSelected) {
        return prev.filter((id) => !filteredIds.includes(id));
      }
      const next = new Set(prev);
      filteredIds.forEach((id) => next.add(id));
      return Array.from(next);
    });
  };

  const clearSelection = () => setSelectedIds([]);

  const handleDownloadSelected = () => {
    if (!selectedIds.length) return;
    const name = meta.groupName || `grupo-${groupId}`;
    downloadSelected(selectedIds, `${name}-seleccionados.zip`);
  };

  const handleDownloadGroup = async () => {
    if (!token || !Number.isFinite(groupId)) return;
    setIsGroupDownloading(true);
    try {
      const blob = await downloadClientGroup(token, groupId);
      const name = meta.groupName || `grupo-${groupId}`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      alertSuccess("Descarga iniciada.");
    } catch (error) {
      console.error(error);
      alertError("No se pudo descargar el grupo.");
    } finally {
      setIsGroupDownloading(false);
    }
  };

  const handleOpenViewer = async (doc: ClientDocument) => {
    const url = await viewDocument(doc);
    if (!url) return;
    setViewerTitle(doc.title || "Documento");
    setViewerUrl(url);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    if (viewerUrl) {
      window.URL.revokeObjectURL(viewerUrl);
    }
    setViewerUrl("");
    setViewerTitle("");
  };

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para revisar documentos.
      </div>
    );
  }

  if (!Number.isFinite(groupId)) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Grupo invalido.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        
    <div className="flex items-center gap-4">
      <Link
        to="/client-access/app/documentos"
        className="flex items-center self-stretch text-slate-400 transition hover:text-slate-700"
        aria-label="Volver"
        title="Volver"
      >
        <ArrowLeft className="h-9 w-9" />
      </Link>

      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
          {meta.groupName || `Grupo ${groupId}`}
        </h1>
        <p className="text-sm text-slate-600">
          {meta.groupPeriodo || "Periodo no definido"} – Publicado:{" "}
          {formatDate(meta.publishedAt)}
        </p>
      </div>
    </div>

        <div className="relative inline-flex group pr-6">
          <button
            onClick={handleDownloadGroup}
            disabled={isGroupDownloading}
            className="flex items-center justify-center rounded-lg
                      border border-blue-200 bg-blue-50 p-3
                      text-blue-600 transition
                      hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
            aria-label="Descargar todo"
          >
            <Download className="h-6 w-6" />
          </button>

          <span
            className="pointer-events-none absolute left-1/2 top-full mt-2
                      -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1
                      text-xs text-white opacity-0 transition group-hover:opacity-100"
          >
            Descargar todo
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full sm:max-w-sm gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar documento..."
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <Button
            onClick={() => setSearchTerm(searchInput.trim())}
            className="px-4"
          >
            Buscar
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* <Button
            variant="secondary"
            disabled={!selectedIds.length || isBulkLoading}
            isLoading={isBulkLoading}
            onClick={handleDownloadSelected}
          >
            Descargar seleccionados
          </Button> */}
          {/* <Button
            variant="ghost"
            disabled={!selectedIds.length}
            onClick={clearSelection}
          >
            Limpiar
          </Button> */}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <div>
          <p className="text-sm text-slate-600">
            {totalDocuments} documentos
          </p>
          {searchTerm.trim() !== "" && (
            <p className="text-xs text-slate-500">
              Mostrando: {filteredCount}
            </p>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
          />
          Seleccionar todo
        </label>
      </div>

      <Table
        headers={["Selección", "Documento", "Categoría", "Publicado", "Acciones"]}
        className="overflow-visible"
        colgroup={
          <>
            <col style={{ width: "6%" }} />
            <col style={{ width: "46%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "12%" }} />
          </>
        }
      >
        {isLoading && (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
              Cargando documentos...
            </td>
          </tr>
        )}

        {!isLoading && filteredDocuments.length === 0 && (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
              No hay documentos publicados en este grupo.
            </td>
          </tr>
        )}

        {!isLoading &&
          paginatedDocuments.map((doc) => {
            const isSelected = selectedIds.includes(doc.id);
            const isRowLoading = actionId === doc.id;
            return (
              <tr
                key={doc.id}
                className={`align-middle cursor-pointer transition hover:bg-slate-50 ${
                  isSelected ? "bg-blue-50/60" : ""
                }`}
                onClick={() => toggleSelect(doc.id)}
                onDoubleClick={() => handleOpenViewer(doc)}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(doc.id)}
                    onClick={(event) => event.stopPropagation()}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  <span className="block truncate">{doc.title}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="block truncate">{doc.categoria || "General"}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {formatDate(doc.publicado_en)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip content="Ver documento">
                      <button
                        type="button"
                        aria-label="Ver documento"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenViewer(doc);
                        }}
                        disabled={isRowLoading}
                        className={`rounded-md border border-slate-200 bg-white p-2 text-red-600 transition hover:border-red-200 hover:text-red-700 ${isRowLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Descargar documento">
                      <button
                        type="button"
                        aria-label="Descargar documento"
                        onClick={(event) => {
                          event.stopPropagation();
                          downloadDocument(doc);
                        }}
                        disabled={isRowLoading}
                        className={`rounded-md border border-slate-200 bg-white p-2 text-blue-600 transition hover:border-blue-200 hover:text-blue-700 ${isRowLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
          })}
      </Table>

      {filteredCount > perPage && (
        <div className="flex items-center justify-end gap-1 text-sm text-slate-600">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-50"
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const current = index + 1;
            if (
              current === 1 ||
              current === totalPages ||
              Math.abs(current - page) <= 1
            ) {
              return (
                <button
                  key={current}
                  onClick={() => setPage(current)}
                  className={`rounded border px-3 py-1.5 ${
                    current === page
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {current}
                </button>
              );
            }
            if (Math.abs(current - page) === 2) {
              return (
                <span key={current} className="px-2 text-slate-400">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-2 text-white shadow-xl backdrop-blur-sm">
            <span className="text-xs sm:text-sm">
              {selectedIds.length} seleccionado
              {selectedIds.length > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              className="text-xs sm:text-sm rounded-full border border-white/30 px-3 py-1 hover:bg-white/10 transition"
              onClick={handleDownloadSelected}
              disabled={isBulkLoading}
            >
              Descargar
            </button>
            <button
              type="button"
              className="text-xs sm:text-sm rounded-full border border-white/20 px-2 py-1 hover:bg-white/10 transition"
              onClick={clearSelection}
            >
              Limpiar
            </button>
          </div>
        </div>
      )}

      <PdfViewerModal
        open={viewerOpen && !!viewerUrl}
        title={viewerTitle}
        url={viewerUrl}
        onClose={closeViewer}
      />
    </div>
  );
};

