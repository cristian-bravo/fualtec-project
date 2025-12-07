import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { alertError } from "@/lib/alerts";

type PdfUploadProps = {
  onUpload: (files: File[], grupo?: string) => Promise<boolean>;
  isUploading: boolean;
};

export const PdfUpload: React.FC<PdfUploadProps> = ({
  onUpload,
  isUploading,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files || []);

    const pdfFiles = files.filter(
      (f) =>
        f.type === "application/pdf" &&
        f.name.toLowerCase().endsWith(".pdf")
    );

    if (!pdfFiles.length || pdfFiles.length !== files.length) {
      alertError("Solo se permiten archivos PDF (.pdf)");
      return;
    }

    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const newOnes = pdfFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...newOnes];
    });
  };

  const handleManualUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const pdfFiles = files.filter(
      (f) =>
        f.type === "application/pdf" &&
        f.name.toLowerCase().endsWith(".pdf")
    );

    if (!pdfFiles.length) {
      alertError("Solo se permiten archivos PDF (.pdf)");
      return;
    }

    if (pdfFiles.length !== files.length) {
      alertError("Solo se permiten archivos PDF (.pdf)");
      return;
    }

    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const newOnes = pdfFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...newOnes];
    });

    // limpia el input para poder volver a elegir los mismos nombres si hace falta
    event.target.value = "";
  };

  const handleClickDropzone = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = async () => {
    if (!selectedFiles.length) {
      alertError("Seleccione archivos PDF antes de subir.");
      return;
    }

    const ok = await onUpload(selectedFiles, "General");
    if (ok) {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="space-y-3">
      {/* DROPZONE */}
      <div
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClickDropzone}
        className={`flex min-h-[130px] items-center justify-center rounded-xl border-2 border-dashed transition cursor-pointer
          ${
            isDragging
              ? "border-primary bg-blue-50"
              : "border-slate-300 bg-white"
          }`}
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
          ref={fileInputRef}
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
            onClick={handleUploadClick}
            className="w-full sm:w-auto"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Subir PDFs seleccionados"}
          </Button>
        </div>
      )}
    </div>
  );
};
