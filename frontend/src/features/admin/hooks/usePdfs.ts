import { useCallback, useEffect, useState, useMemo  } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  alertError,
  alertSuccess,
  confirmDelete,
} from "@/lib/alerts";
import {
  fetchPdfs,
  uploadPdfs,
  getPdfBlob,
  deletePdf,
  deletePdfsBulk,
  PdfItem,
} from "../services/pdfService";

export type ViewerState = {
  title: string;
  url: string;
} | null;

export const usePdfs = () => {
  const [status, setStatus] = useState<'all' | 'grouped' | 'ungrouped'>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { token, isAuthenticated } = useAuth();

  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(pdfs.length / perPage);

const paginated = useMemo(() => {
  const start = (page - 1) * perPage;
  return pdfs.slice(start, start + perPage);
}, [pdfs, page]);
  const [isUploading, setIsUploading] = useState(false);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerPdf, setViewerPdf] = useState<ViewerState>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onChangeStatus = (v: 'all' | 'grouped' | 'ungrouped') => {
  setStatus(v);
  setPage(1);
  };

  const onSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  // Cargar lista inicial
  
const loadPdfs = useCallback(
  async (silent = false) => {
    if (!token) return;

    if (!silent) setIsLoading(true);

    try {
      const data = await fetchPdfs(token, { status, search });
      setPdfs(data);
    } catch (err) {
      console.error(err);
      alertError("No se pudieron cargar los PDFs.");
    } finally {
      if (!silent) setIsLoading(false);
    }
  },
  [token, status, search]
);



  useEffect(() => {
    if (!token) return;
    loadPdfs(true);
  }, [token, status, debouncedSearch, loadPdfs]);

 useEffect(() => {
  const t = setTimeout(() => {
    setDebouncedSearch(search);
    setPage(1);
  }, 300);

  return () => clearTimeout(t);
}, [search]);


  // Subir desde PdfUpload
  const handleUpload = useCallback(
    async (files: File[], grupo: string = "General"): Promise<boolean> => {
      if (!token) {
        alertError("Sesión inválida.");
        return false;
      }

      if (!files.length) {
        alertError("Seleccione archivos PDF.");
        return false;
      }

      setIsUploading(true);
      try {
        const created = await uploadPdfs(token, files, grupo);
        // Insertar al inicio
        setPdfs((prev) => [...created, ...prev]);
        alertSuccess("PDFs subidos correctamente.");
        return true;
      } catch (err: any) {
        console.error(err);
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.errors?.files?.[0] ||
          "Error subiendo los PDFs.";
        alertError(message);
        return false;
      } finally {
        setIsUploading(false);
      }
    },
    [token]
  );

  
  // Abrir visor
  const handleView = useCallback(
    async (pdf: PdfItem) => {
      if (!token) return;

      try {
        const blob = await getPdfBlob(token, pdf.id);
        const url = URL.createObjectURL(blob);

        setViewerPdf({
          title: pdf.title || pdf.filename,
          url,
        });
        setViewerOpen(true);
      } catch (err) {
        console.error(err);
        alertError("No se pudo cargar el PDF.");
      }
    },
    [token]
  );

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    setViewerPdf((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  // Eliminar individual
  const handleDelete = useCallback(
    async (pdf: PdfItem) => {
      if (!token) return;

      const confirmed = await confirmDelete(
        `¿Seguro que desea eliminar el PDF "${pdf.title || pdf.filename}"?`
      );
      if (!confirmed) return;

      try {
        await deletePdf(token, pdf.id);
        setPdfs((prev) => prev.filter((p) => p.id !== pdf.id));
        setSelectedIds((prev) => prev.filter((id) => id !== pdf.id));
        alertSuccess("PDF eliminado correctamente.");
      } catch (err) {
        console.error(err);
        alertError("No se pudo eliminar el PDF.");
      }
    },
    [token]
  );

  // Selección múltiple
  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      // si ya están todos, vacía
      if (prev.length === pdfs.length) return [];
      // selecciona todos los ids actuales
      return pdfs.map((p) => p.id);
    });
  }, [pdfs]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Bulk delete
const handleBulkDelete = useCallback(async () => {
  if (!token || selectedIds.length === 0) return;

  const confirmed = await confirmDelete(
    `¿Seguro que desea eliminar ${selectedIds.length} PDFs seleccionados?`
  );
  if (!confirmed) return;

  try {
    await deletePdfsBulk(token, selectedIds);

    console.log("Bulk OK");
    console.log("Ids Eliminados: ", selectedIds);

    setPdfs(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    alertSuccess("PDFs eliminados correctamente.");
  } catch (err) {
    console.error("ERROR BULK:", err);
    alertError("No se pudieron eliminar los PDFs seleccionados.");
  }
}, [token, selectedIds]);


  // Placeholder para agrupado (individual o múltiple)
  const handleGroup = useCallback((pdf: PdfItem) => {
    console.log("Agrupar individual ->", pdf.id);
  }, []);

  const handleBulkGroup = useCallback(() => {
    if (!selectedIds.length) return;
    console.log("Agrupar múltiple ->", selectedIds);
  }, [selectedIds]);

  return {
    // auth
    isAuthenticated,

    // data
    pdfs,
    isLoading,
    isUploading,

    // visor
    viewerOpen,
    viewerPdf,
    handleView,
    closeViewer,

    // upload
    handleUpload,

    // delete
    handleDelete,
    handleBulkDelete,

    // selección múltiple
    selectedIds,
    toggleSelect,
    selectAll,
    clearSelection,
    handleGroup,
    handleBulkGroup,

    paginated,
    page,
    setPage,
    totalPages,
    reload: loadPdfs,

    status,
    onChangeStatus,
    search,
    onSearchChange,
    setSearch

  };
};
