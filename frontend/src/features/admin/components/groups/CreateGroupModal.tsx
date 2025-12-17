import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  pdfs: { id: number; title?: string; filename: string }[];
  onSave: (payload: { name: string; periodo?: string }) => Promise<void>;
};

export const CreateGroupModal = ({
  open,
  onClose,
  pdfs,
  onSave,
}: Props) => {
  const [name, setName] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Crear nuevo grupo
            </h2>
            <p className="text-sm text-slate-500">
              Defina nombre y periodo del paquete de documentos.
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Nombre
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Ej. Certificados Enero"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Periodo
            </label>
            <input
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Ej. Enero 2025"
            />
          </div>

          {/* PDFs seleccionados */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">
              Archivos a agrupar ({pdfs.length})
            </p>
            <ul className="max-h-32 space-y-1 overflow-auto rounded-md border bg-slate-50 p-2 text-sm">
              {pdfs.map((pdf) => (
                <li key={pdf.id} className="truncate text-slate-700">
                  • {pdf.title || pdf.filename}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            disabled={saving || !name.trim()}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave({
                  name: name.trim(),
                  periodo: periodo.trim() || undefined,
                });
              } finally {
                setSaving(false);
              }
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};
