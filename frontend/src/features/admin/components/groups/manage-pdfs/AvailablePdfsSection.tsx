import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { PdfItem } from "../../../services/pdfService";

type Props = {
  availablePdfs: PdfItem[];
  paginatedPdfs: PdfItem[];
  selectedIds: number[];
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  status: "all" | "grouped" | "ungrouped";
  onChangeStatus: (value: "all" | "grouped" | "ungrouped") => void;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;
  onView: (pdf: PdfItem) => void;
  isLoading: boolean;
  isAdding: boolean;
  onAddSelected: () => void;
  perPage: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const AvailablePdfsSection = ({
  availablePdfs,
  paginatedPdfs,
  selectedIds,
  searchValue,
  onSearchValueChange,
  onSearch,
  status,
  onChangeStatus,
  onToggleSelect,
  onToggleSelectAll,
  onView,
  isLoading,
  isAdding,
  onAddSelected,
  perPage,
  page,
  totalPages,
  onPageChange,
}: Props) => {
  const totalAvailable = availablePdfs.length;
  const resolvedTotalPages = Math.max(1, Math.ceil(totalAvailable / perPage));
  const resolvedPage = Math.min(page, resolvedTotalPages);
  const allVisibleSelected =
    paginatedPdfs.length > 0 &&
    paginatedPdfs.every((pdf) => selectedIds.includes(pdf.id));

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Agregar PDFs existentes
          </h2>
          <p className="text-sm text-slate-600">
            Solo se muestran los PDFs que no pertenecen a este grupo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              placeholder="Buscar PDF..."
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={onSearch}
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="inline-flex gap-1 bg-slate-100 p-1 rounded-lg">
          {[
            { id: "all", label: "Todos" },
            { id: "grouped", label: "Agrupados" },
            { id: "ungrouped", label: "No agrupados" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                onChangeStatus(opt.id as "all" | "grouped" | "ungrouped")
              }
              className={`px-3 py-1 text-sm rounded-md transition ${
                status === opt.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>


      <Table
        headers={["", "Titulo", "Grupo", "Estado", ""]}
        colgroup={
          <>
            <col className="w-[40px]" />
            <col className="w-[45%]" />
            <col className="w-[33%]" />
            <col className="w-[12%]" />
            <col className="w-[150px]" />
          </>
        }
        className="rounded-b-none"
      >
        {isLoading && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              Cargando PDFs disponibles...
            </td>
          </tr>
        )}

        {!isLoading && availablePdfs.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              No hay PDFs disponibles para agregar.
            </td>
          </tr>
        )}

        {!isLoading &&
          paginatedPdfs.map((pdf) => {
            const checked = selectedIds.includes(pdf.id);

            return (
              <tr
                key={pdf.id}
                onClick={() => onToggleSelect(pdf.id)}
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
                    onChange={() => onToggleSelect(pdf.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                </td>
                <td className="px-6 py-3 font-medium text-slate-900 truncate">
                  {pdf.title || pdf.filename}
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {pdf.grupo || "Sin grupo"}
                </td>
                <td className="px-6 py-3 text-center">
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
                  <div className="flex justify-end">
                    <div className="relative group">
                      <button
                        type="button"
                        onClick={() => onView(pdf)}
                        className="flex h-9 w-9 items-center justify-center rounded-full
                                  border border-blue-200 text-blue-600
                                  hover:bg-blue-50 hover:shadow-sm transition"
                        aria-label="Ver PDF"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <span
                        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                                  rounded bg-slate-900 px-2 py-1 text-xs text-white
                                  opacity-0 group-hover:opacity-100 transition"
                      >
                        Ver PDF
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
      </Table>

      {!isLoading && availablePdfs.length > 0 && (
        <div className="-mt-px flex items-center gap-2 rounded-b-lg border border-slate-200 bg-slate-50 px-4 py-2">
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={onToggleSelectAll}
            className="h-4 w-4 rounded border-slate-300"
          />
          <span className="text-xs text-slate-600">
            {allVisibleSelected
              ? "Deseleccionar todos"
              : "Seleccionar todos los visibles"}
          </span>
        </div>
      )}

      {totalAvailable > perPage && (
        <div className="mt-4 flex items-center justify-end gap-1 text-sm">
          <button
            disabled={resolvedPage === 1}
            onClick={() => onPageChange(resolvedPage - 1)}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
          >
            {"<"}
          </button>

          {[...Array(resolvedTotalPages)].map((_, i) => {
            const p = i + 1;
            if (
              p === 1 ||
              p === resolvedTotalPages ||
              Math.abs(p - resolvedPage) <= 1
            ) {
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1.5 rounded border text-gray-700 ${
                    p === resolvedPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              );
            }
            if (Math.abs(p - page) === 2) {
              return (
                <span className="px-2" key={p}>
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            disabled={resolvedPage === resolvedTotalPages}
            onClick={() => onPageChange(resolvedPage + 1)}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {selectedIds.length} seleccionado
          {selectedIds.length === 1 ? "" : "s"}
        </p>
        <Button
          disabled={selectedIds.length === 0}
          isLoading={isAdding}
          onClick={onAddSelected}
        >
          Agregar al grupo
        </Button>
      </div>
    </section>
  );
};
