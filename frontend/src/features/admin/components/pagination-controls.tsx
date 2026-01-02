import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-1 text-sm">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex items-center justify-center px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-4 w-4" />
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
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          );
        }
        if (Math.abs(p - page) === 2) {
          return (
            <span className="px-2 text-slate-400" key={p}>
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }
        return null;
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex items-center justify-center px-3 py-1.5 rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:border-gray-200 hover:bg-gray-100"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
