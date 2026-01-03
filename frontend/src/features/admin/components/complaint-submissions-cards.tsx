import { Eye } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';
import { ComplaintSubmission } from '../services/publicSubmissionsService';
import { ContactStatusToggle } from './contact-status-toggle';

type ComplaintSubmissionsCardsProps = {
  items: ComplaintSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: ComplaintSubmission) => void;
  onToggleResolved: (item: ComplaintSubmission, nextValue: boolean) => void;
  updatingId: number | null;
  formatDate: (value?: string | null) => string;
};

export const ComplaintSubmissionsCards = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  onToggleResolved,
  updatingId,
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
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 truncate" title={item.empresa}>
                {item.empresa}
              </h3>
              <p className="text-sm text-slate-600 truncate" title={item.nombre}>
                {item.nombre}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Tooltip
                content={
                  item.is_resolved ? 'Marcar como pendiente' : 'Marcar como resuelto'
                }
              >
                <ContactStatusToggle
                  checked={Boolean(item.is_resolved)}
                  disabled={updatingId === item.id}
                  onChange={(next) => onToggleResolved(item, next)}
                />
              </Tooltip>
            </div>
          </div>

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
          </div>

          <div className="mt-3 flex items-center justify-end">
            <Tooltip content="Ver queja">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(item);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-blue-200 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                aria-label="Ver queja"
              >
                <Eye className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};
