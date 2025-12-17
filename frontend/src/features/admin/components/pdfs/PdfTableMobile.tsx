import { PdfItem } from "../../services/pdfService";

type Props = {
  pdfs: PdfItem[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onView: (pdf: PdfItem) => void;
  onDelete: (pdf: PdfItem) => void;
  isLoading?: boolean;
};

export const PdfTableMobile = ({
  pdfs,
  selectedIds,
  onToggleRow,
  onView,
  onDelete,
  isLoading = false,
}: Props) => {
  if (isLoading) {
    return (
      <p className="sm:hidden text-center text-sm text-slate-500">
        Cargando PDFs...
      </p>
    );
  }

  if (!pdfs.length) {
    return (
      <p className="sm:hidden text-center text-sm text-slate-500">
        No hay PDFs registrados.
      </p>
    );
  }

  return (
    <div className="sm:hidden space-y-4">
      {pdfs.map((pdf) => {
        const checked = selectedIds.includes(pdf.id);

        return (
          <div
            key={pdf.id}
            onClick={() => onToggleRow(pdf.id)}
            onDoubleClick={() => onView(pdf)}
            className={`cursor-pointer rounded-lg border p-4 transition ${
              checked
                ? "bg-blue-50 border-blue-300"
                : "bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="mt-1 h-4 w-4 pointer-events-none"
              />

              <div className="flex-1">
                <h3 className="font-semibold truncate">
                  {pdf.title || pdf.filename}
                </h3>

                <p className="text-sm text-slate-600">
                  Grupo: {pdf.grupo || "—"}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                    pdf.vigente
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {pdf.vigente ? "Agrupado" : "No agrupado"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                className="flex-1 rounded-md border py-2 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(pdf);
                }}
              >
                Ver
              </button>

              <button
                className="flex-1 rounded-md border border-red-200 py-2 text-sm text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(pdf);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
