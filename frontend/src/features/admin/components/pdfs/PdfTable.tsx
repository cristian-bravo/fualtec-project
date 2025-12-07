import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PdfItem } from "../../services/pdfService";

type PdfTableProps = {
  pdfs: PdfItem[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  onView: (pdf: PdfItem) => void;
  onDelete: (pdf: PdfItem) => void;
  onGroup: (pdf: PdfItem) => void;
  isLoading?: boolean;
};

export const PdfTable: React.FC<PdfTableProps> = ({
  pdfs,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onView,
  onDelete,
  onGroup,
  isLoading = false,
}) => {
  const allSelected =
    pdfs.length > 0 && selectedIds.length === pdfs.length;

  return (
    <div className="space-y-4">
      {/* Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border bg-white">
        <Table
        headers={[
            "",
            "Título",
            "Grupo",
            "Estado",
            "Acciones",
        ]}
        >

          {isLoading && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-sm text-slate-500 text-center"
              >
                Cargando PDFs...
              </td>
            </tr>
          )}

          {!isLoading && pdfs.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-sm text-slate-500 text-center"
              >
                No hay PDFs registrados.
              </td>
            </tr>
          )}

          {!isLoading &&
            pdfs.map((pdf) => {
              const checked = selectedIds.includes(pdf.id);
              return (
                <tr key={pdf.id} className="hover:bg-slate-50">
                  {/* checkbox */}
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                      checked={checked}
                      onChange={() => onToggleRow(pdf.id)}
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold whitespace-nowrap">
                    {pdf.title || pdf.filename}
                  </td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {pdf.grupo || " "}
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
                        onClick={() => onGroup(pdf)}
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
                        onClick={() => onView(pdf)}
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
                        onClick={() => onDelete(pdf)}
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
              );
            })}
        </Table>

        {/* checkbox general en header */}
        <div className="border-t px-4 py-2 flex items-center gap-2 bg-slate-50">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            checked={allSelected}
            onChange={onToggleAll}
          />
          <span className="text-xs text-slate-600">
            {allSelected
              ? "Deseleccionar todos"
              : "Seleccionar todos los visibles"}
          </span>
        </div>
      </div>

      {/* Móvil: tarjetas */}
      <div className="space-y-4 sm:hidden">
        {isLoading && (
          <p className="text-sm text-slate-500 text-center">
            Cargando PDFs...
          </p>
        )}
        {!isLoading && pdfs.length === 0 && (
          <p className="text-sm text-slate-500 text-center">
            No hay PDFs registrados.
          </p>
        )}

        {!isLoading &&
          pdfs.map((pdf) => {
            const checked = selectedIds.includes(pdf.id);
            return (
              <div
                key={pdf.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                    checked={checked}
                    onChange={() => onToggleRow(pdf.id)}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {pdf.title || pdf.filename}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                      <p>
                        <span className="font-medium text-slate-800">
                          Categoría:
                        </span>{" "}
                        {pdf.grupo || "Sin grupo"}
                      </p>
                      <p>
                        <span className="font-medium text-slate-800">
                          Estado:
                        </span>{" "}
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
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 py-2 text-sm"
                    onClick={() => onGroup(pdf)}
                  >
                    Agrupar
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 py-2 text-sm"
                    onClick={() => onView(pdf)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 py-2 text-sm text-red-600"
                    onClick={() => onDelete(pdf)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
