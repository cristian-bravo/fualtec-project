import { Table } from "@/components/ui/table";
import { Tooltip } from "@/components/ui/tooltip";
import { PdfItem } from "../../services/pdfService";
import { Eye, Trash2 } from "lucide-react";


type PdfTableProps = {
  pdfs: PdfItem[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  onView: (pdf: PdfItem) => void;
  onDelete: (pdf: PdfItem) => void;
  isLoading?: boolean;
  viewLabel?: string;
  deleteLabel?: string;
};

export const PdfTable: React.FC<PdfTableProps> = ({
  pdfs,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onView,
  onDelete,
  isLoading = false,
  viewLabel = "Ver",
  deleteLabel = "Eliminar",
}) => {
  const allSelected =
    pdfs.length > 0 && selectedIds.length === pdfs.length;

  return (
    <div className="hidden sm:block overflow-x-auto rounded-lg border bg-white">
      <Table
        headers={["", "Título", "Grupo", "Estado", ""]}
        className="overflow-visible"
        colgroup={
          <>
            <col className="w-[40px]" />
            <col className="w-[45%]" />
            <col className="w-[33%]" />
            <col className="w-[12%]" />
            <col className="w-[150px]" />
          </>
        }
      >
        {isLoading && (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-sm text-center text-slate-500">
              Cargando PDFs...
            </td>
          </tr>
        )}

        {!isLoading && pdfs.length === 0 && (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-sm text-center text-slate-500">
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
                className={`cursor-pointer border-b transition select-none ${
                  checked ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <td
                  className="px-4 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleRow(pdf.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                </td>

                <td className="px-6 py-3 font-medium text-gray-900 truncate">
                  {pdf.title || pdf.filename}
                </td>

                <td className="px-6 py-3 text-gray-600">
                  {pdf.grupo || "—"}
                </td>

                <td className="px-6 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      pdf.vigente
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {pdf.vigente ? "Agrupado" : "No agrupado"}
                  </span>
                </td>

                <td
                  className="px-6 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
              <div className="flex justify-end gap-2">
                <Tooltip content={viewLabel}>
                  <button
                    onClick={() => onView(pdf)}
                    className="flex h-9 w-9 items-center justify-center rounded-full
                              border border-blue-200 text-blue-600
                              hover:bg-blue-50 hover:shadow-sm transition"
                    aria-label={viewLabel}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </Tooltip>

                <Tooltip content={deleteLabel}>
                  <button
                    onClick={() => onDelete(pdf)}
                    className="flex h-9 w-9 items-center justify-center rounded-full
                              border border-red-200 text-red-600
                              hover:bg-red-50 hover:shadow-sm transition"
                    aria-label={deleteLabel}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </Tooltip>
              </div>
                </td>
              </tr>
            );
          })}
      </Table>

      <div className="border-t bg-slate-50 px-4 py-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
          className="h-4 w-4 rounded border-slate-300"
        />
        <span className="text-xs text-slate-600">
          {allSelected
            ? "Deseleccionar todos"
            : "Seleccionar todos los visibles"}
        </span>
      </div>
    </div>
  );
};
