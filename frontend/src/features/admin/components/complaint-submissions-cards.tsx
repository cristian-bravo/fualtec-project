import { Download } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';
import { ComplaintSubmission } from '../services/publicSubmissionsService';

type ComplaintSubmissionsCardsProps = {
  items: ComplaintSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: ComplaintSubmission) => void;
  onDownload: (item: ComplaintSubmission) => void;
  downloadingId: number | null;
  formatDate: (value?: string | null) => string;
};

export const ComplaintSubmissionsCards = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  onDownload,
  downloadingId,
  formatDate,
}: ComplaintSubmissionsCardsProps) => {
  if (loading) {
    return (
      <p className="md:hidden text-center text-sm text-slate-500">
        Cargando registros...
      </p>
    );
  }

  if (!items.length) {
    return (
      <p className="md:hidden text-center text-sm text-slate-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="md:hidden space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition hover:bg-slate-50"
        >
          <h3 className="font-semibold text-slate-900 truncate" title={item.empresa}>
            {item.empresa}
          </h3>
          <p className="text-sm text-slate-600 truncate" title={item.nombre}>
            {item.nombre}
          </p>

          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p className="truncate" title={`${item.tipo_inconformidad} / ${item.tipo_queja}`}>
              <span className="font-semibold text-slate-700">Tipo:</span>{' '}
              {item.tipo_inconformidad} / {item.tipo_queja}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Fecha:</span>{' '}
              {formatDate(item.fecha_presentacion)}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                item.anexa_documento
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.anexa_documento ? 'Adjunto' : 'Sin adjunto'}
            </span>
            {item.anexa_documento && item.documento_path && (
              <Tooltip content="Descargar adjunto">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDownload(item);
                  }}
                  disabled={downloadingId === item.id}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-900 hover:text-white disabled:opacity-60"
                  aria-label="Descargar adjunto"
                >
                  <Download className="h-4 w-4" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
