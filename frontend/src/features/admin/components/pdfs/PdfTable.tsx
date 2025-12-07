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
      <tr
        key={pdf.id}
        onClick={() => onToggleRow(pdf.id)}
        onDoubleClick={() => onView(pdf)}
        className={`
          border-b last:border-none cursor-pointer
          transition select-none
          ${checked ? "bg-blue-50" : "hover:bg-slate-50"}
        `}
      >
        {/* checkbox */}
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
            checked={checked}
            onChange={() => onToggleRow(pdf.id)}
          />
        </td>

        {/* título */}
        <td className="px-6 py-3 font-medium text-gray-900 truncate max-w-[280px]">
          {pdf.title || pdf.filename}
        </td>

        {/* grupo */}
        <td className="px-6 py-3 text-gray-600">
          {pdf.grupo || "—"}
        </td>

        {/* estado */}
        <td className="px-6 py-3">
          <span
            className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                pdf.vigente
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }
            `}
          >
            {pdf.vigente ? "Agrupado" : "No agrupado"}
          </span>
        </td>

        {/* acciones */}
        <td
          className="px-6 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-end gap-2">



            {/* Ver */}
            <button
              onClick={() => onView(pdf)}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:shadow-sm transition"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s2.25-6.75 9.75-6.75S21.75 12 21.75 12 19.5 18.75 12 18.75 2.25 12 2.25 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* Eliminar */}
            <button
              onClick={() => onDelete(pdf)}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-red-200 text-red-600 bg-white hover:bg-red-50 hover:shadow-sm transition"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75v7.5m4.5-7.5v7.5M4.5 6.75h15m-1.5 0-.73 11.02A2.25 2.25 0 0 1 15.02 20H8.98a2.25 2.25 0 0 1-2.25-2.23L6.02 6.75m3.23-2.25h5.5a1.5 1.5 0 0 1 1.5 1.5v.75h-8.5v-.75a1.5 1.5 0 0 1 1.5-1.5z" />
              </svg>
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
