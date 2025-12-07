import { useRef, useState, useEffect, DragEvent, ChangeEvent } from "react";
import axios from "axios";
import { Table } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../hooks/use-auth";

const API_BASE = "http://127.0.0.1:8000";

// 🟩 función para dividir archivos en lotes
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

type PdfItem = {
  id: number;
  title: string;
  filename: string;
  storage_path: string;
  grupo?: string | null;
  vigente?: boolean;
};


type ViewerState = {
  title: string;
  url: string;
} | null;

export const AdminPdfsPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerPdf, setViewerPdf] = useState<ViewerState>(null);

  const { token, isAuthenticated } = useAuth();
  const fileInput = useRef<HTMLInputElement>(null);

  // 🔐 Si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesión para gestionar PDFs.
      </div>
    );
  }

  // 👉 Drag & Drop múltiple
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files || []);

    const pdfFiles = files.filter((f) => {
      return (
        f.type === "application/pdf" &&
        f.name.toLowerCase().endsWith(".pdf")
      );
    });

    if (!pdfFiles.length || pdfFiles.length !== files.length) {
      alert("Solo se permiten archivos PDF (.pdf)");
      setIsUploading(false);
      return;
    }

    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const newOnes = pdfFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...newOnes];
    });

    setIsUploading(false);
  };


  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // 👉 Input manual múltiple
const handleManualUpload = (event: ChangeEvent<HTMLInputElement>) => {
  // extraer archivos
  const files = Array.from(event.target.files || []);

  // filtrar estrictamente solo PDF reales
    const pdfFiles = files.filter((f) => {
      return (
        f.type === "application/pdf" &&
        f.name.toLowerCase().endsWith(".pdf")
      );
    });

    // si ninguno es PDF
    if (!pdfFiles.length) {
      alert("Solo se permiten archivos PDF (.pdf)");
      // reset por si se quedó bloqueado
      setIsUploading(false);
      return;
    }

    // si hay mezcla (PDF + otros)
    if (pdfFiles.length !== files.length) {
      alert("Solo se permiten archivos PDF (.pdf)");
      setIsUploading(false);
      return;
    }

    // agregar sin duplicados
    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const newOnes = pdfFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...newOnes];
    });

    // reset upload state (MUY IMPORTANTE)
    setIsUploading(false);
  };


  // 👉 Subir múltiples PDFs con UNA SOLA llamada
// 👉 Subir múltiples PDFs con UNA SOLA llamada
// 👉 Subir múltiples PDFs con UNA SOLA llamada
const uploadPdfs = async () => {
  if (!selectedFiles.length) {
    alert("Seleccione archivos.");
    return;
  }

  if (!token) {
    alert("Sesión inválida.");
    return;
  }

  setIsUploading(true);

  try {
    // dividir en lotes de 5 archivos
    const chunks = chunkArray(selectedFiles, 5);

    for (let i = 0; i < chunks.length; i++) {
      const formData = new FormData();

      // archivos del lote actual
      chunks[i].forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      // metadatos (puedes mantener estáticos por ahora)
      formData.append("grupo", "General");
      

    

      const response = await axios.post(
        `${API_BASE}/api/admin/pdfs/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            console.log(`Lote ${i + 1}: ${percent}%`);
          },
        }
      );

      const created = response.data.data || [];
      setPdfs(prev => [...created, ...prev]);
    }

    setSelectedFiles([]);
    alert("PDFs subidos correctamente.");
  } catch (err: any) {


  alert("Error subiendo los PDFs.");
}

};




  // 👉 Obtener lista de PDFs
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}/api/admin/pdfs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPdfs(res.data.data || res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // 👉 Ver PDF inline (modal con embed)
const handleView = async (pdf: PdfItem) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE}/api/admin/pdfs/${pdf.id}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    setViewerPdf({
      title: pdf.title || pdf.filename,
      url,
    });

    setViewerOpen(true);
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar el PDF.");
  }
};



const closeViewer = () => {
  if (viewerPdf?.url) {
    URL.revokeObjectURL(viewerPdf.url);
  }
  setViewerPdf(null);
  setViewerOpen(false);
};


  // 👉 Eliminar PDF
  const handleDelete = async (pdf: PdfItem) => {
    if (!token) return;

    const confirmed = window.confirm(
      `¿Seguro que desea eliminar el PDF "${pdf.title || pdf.filename}"?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/api/admin/pdfs/${pdf.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPdfs((prev) => prev.filter((p) => p.id !== pdf.id));
      alert("PDF eliminado correctamente.");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el PDF.");
    }
  };

  // 👉 Agrupar (placeholder)
  const handleGroup = (pdf: PdfItem) => {
    console.log("Agrupar ->", pdf.id);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Título */}
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-slate-900">Gestión de PDFs</h1>
        <p className="text-sm text-slate-600">
          Suba archivos PDF, gestione versiones y prepare la documentación para
          su futura agrupación y publicación.
        </p>
      </div>

      {/* DROPZONE */}
      <div
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex min-h-[130px] items-center justify-center rounded-xl border-2 border-dashed transition cursor-pointer
          ${
            isDragging
              ? "border-primary bg-blue-50"
              : "border-slate-300 bg-white"
          }`}
        onClick={() => fileInput.current?.click()}
      >
        <div className="text-center px-4">
          <p className="text-sm text-slate-600">
            Arrastre y suelte aquí uno o varios archivos PDF o{" "}
            <span className="text-primary underline">
              selecciónelos manualmente
            </span>
            .
          </p>
          {selectedFiles.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              Archivos seleccionados: {selectedFiles.length}
            </p>
          )}
        </div>

        <input
          ref={fileInput}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={handleManualUpload}
        />
      </div>

      {/* LISTA previa */}
      {selectedFiles.length > 0 && (
        <div className="rounded-lg border bg-slate-50 p-3">
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Archivos listos para subir:
          </p>
          <ul className="max-h-40 overflow-y-auto text-sm text-slate-700 mb-3 space-y-1">
            {selectedFiles.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between gap-2 rounded-md bg-white px-3 py-1 shadow-sm"
              >
                <span className="truncate">{file.name}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={uploadPdfs}
            className="w-full sm:w-auto"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Subir PDFs seleccionados"}
          </Button>
        </div>
      )}

      {/* TABLA Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border bg-white">
        <Table
            headers={["Título", "Grupo", "Estado", "Acciones"]}
        >
          {pdfs.map((pdf) => (
            <tr key={pdf.id}>
              <td className="px-6 py-4 font-semibold whitespace-nowrap">
                {pdf.title || pdf.filename}
              </td>
              <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                {pdf.grupo || "  "}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    pdf.vigente
                      ? "bg-green-50 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pdf.vigente ? "Agrupado" : "No agrupado"}
                </span>
              </td>


              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {/* Agrupar */}
                  <button
                    onClick={() => handleGroup(pdf)}
                    className="group relative inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 hover:bg-slate-100 transition"
                  >
                    <svg
                      className="h-4 w-4 text-slate-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 7.5 12 3l8.25 4.5L12 12 3.75 7.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 12 8.25 4.5 8.25-4.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 16.5 8.25 4.5 8.25-4.5"
                      />
                    </svg>
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                      Agrupar
                    </span>
                  </button>

                  {/* Ver */}
                  <button
                    onClick={() => handleView(pdf)}
                    className="group relative inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 hover:bg-slate-100 transition"
                  >
                    <svg
                      className="h-4 w-4 text-slate-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s2.25-6.75 9.75-6.75S21.75 12 21.75 12 19.5 18.75 12 18.75 2.25 12 2.25 12z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                      Ver
                    </span>
                  </button>

                  {/* Eliminar */}
                  <button
                    onClick={() => handleDelete(pdf)}
                    className="group relative inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 hover:bg-red-50 transition"
                  >
                    <svg
                      className="h-4 w-4 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75v7.5m4.5-7.5v7.5M4.5 6.75h15m-1.5 0-.73 11.02A2.25 2.25 0 0 1 15.02 20H8.98a2.25 2.25 0 0 1-2.25-2.23L6.02 6.75m3.23-2.25h5.5a1.5 1.5 0 0 1 1.5 1.5v.75h-8.5v-.75a1.5 1.5 0 0 1 1.5-1.5z"
                      />
                    </svg>
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                      Eliminar
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Móvil: Tarjetas */}
      <div className="space-y-4 sm:hidden">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {pdf.title || pdf.filename}
            </h3>

            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Categoría:</span>{" "}
                {pdf.grupo || "Sin grupo"}
              </p>
              <p>
                <span className="font-medium text-slate-800">Estado:</span>{" "}
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    pdf.vigente
                      ? "bg-green-50 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pdf.vigente ? "Agrupado" : "No agrupado"}
                </span>
              </p>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                variant="secondary"
                className="flex-1 py-2 text-sm"
                onClick={() => handleGroup(pdf)}
              >
                Agrupar
              </Button>
              <Button
                variant="ghost"
                className="flex-1 py-2 text-sm"
                onClick={() => handleView(pdf)}
              >
                Ver
              </Button>
              <Button
                variant="ghost"
                className="flex-1 py-2 text-sm text-red-600"
                onClick={() => handleDelete(pdf)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL VISOR PDF */}
      {viewerOpen && viewerPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative flex h-[80vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {viewerPdf.title}
              </h2>
              <button
                onClick={closeViewer}
                className="rounded-full border border-slate-300 bg-white p-1 hover:bg-slate-100"
              >
                <svg
                  className="h-4 w-4 text-slate-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido PDF */}
            <div className="flex-1 overflow-hidden">
              <embed
                src={viewerPdf.url}
                type="application/pdf"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
