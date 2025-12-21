import { PdfTable } from "../../pdfs/PdfTable";
import { PdfTableMobile } from "../../pdfs/PdfTableMobile";
import { PdfItem } from "../../../services/pdfService";

type Props = {
  pdfs: PdfItem[];
  paginatedPdfs: PdfItem[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  onView: (pdf: PdfItem) => void;
  onRemove: (pdf: PdfItem) => void;
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
};

export const CurrentGroupPdfsSection = ({
  pdfs,
  paginatedPdfs,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onView,
  onRemove,
  isLoading,
  page,
  totalPages,
  onPageChange,
  perPage,
}: Props) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          PDFs en el grupo
        </h2>
      </div>

      <PdfTable
        pdfs={paginatedPdfs}
        selectedIds={selectedIds}
        onToggleRow={onToggleRow}
        onToggleAll={onToggleAll}
        onView={onView}
        onDelete={onRemove}
        isLoading={isLoading}
        viewLabel="Ver PDF"
        deleteLabel="Quitar del grupo"
      />

      <PdfTableMobile
        pdfs={paginatedPdfs}
        selectedIds={selectedIds}
        onToggleRow={onToggleRow}
        onView={onView}
        onDelete={onRemove}
        isLoading={isLoading}
        viewLabel="Ver PDF"
        deleteLabel="Quitar"
        iconOnlyActions
      />

      {pdfs.length > perPage && (
        <div className="mt-4 flex items-center justify-end gap-1 text-sm">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
          >
            {"<"}
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const p = i + 1;
            if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1.5 rounded border text-gray-700 ${
                    p === page
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
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>
      )}
    </section>
  );
};
