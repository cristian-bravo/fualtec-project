import { Eye } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';
import { ContactSubmission } from '../services/publicSubmissionsService';
import { ContactStatusToggle } from './contact-status-toggle';

type ContactSubmissionsCardsProps = {
  items: ContactSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: ContactSubmission) => void;
  onToggleResolved: (item: ContactSubmission, nextValue: boolean) => void;
  updatingId: number | null;
  formatDate: (value?: string | null) => string;
};

export const ContactSubmissionsCards = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  onToggleResolved,
  updatingId,
  formatDate,
}: ContactSubmissionsCardsProps) => {
  if (loading) {
    return (
      <p className="md:hidden text-center text-sm text-slate-500">
        Cargando solicitudes...
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
              <h3 className="font-semibold text-slate-900 truncate" title={item.nombre}>
                {item.nombre}
              </h3>
              <p className="text-sm text-slate-600 truncate" title={item.email}>
                {item.email}
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

          <div className="mt-3 text-sm text-slate-600">
            <p className="truncate" title={item.asunto}>
              <span className="font-semibold text-slate-700">Asunto:</span> {item.asunto}
            </p>
            <p className="mt-1 truncate" title={item.mensaje}>
              <span className="font-semibold text-slate-700">Mensaje:</span> {item.mensaje}
            </p>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            {formatDate(item.created_at)}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <Tooltip content="Ver contacto">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(item);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-blue-200 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                aria-label="Ver contacto"
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
