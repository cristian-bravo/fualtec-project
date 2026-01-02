import { Eye } from 'lucide-react';
import { Table } from '../../../components/ui/table';
import { Tooltip } from '../../../components/ui/tooltip';
import { ContactSubmission } from '../services/publicSubmissionsService';
import { ContactStatusToggle } from './contact-status-toggle';

type ContactSubmissionsTableProps = {
  items: ContactSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: ContactSubmission) => void;
  onToggleResolved: (item: ContactSubmission, nextValue: boolean) => void;
  updatingId: number | null;
  formatDate: (value?: string | null) => string;
};

export const ContactSubmissionsTable = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  onToggleResolved,
  updatingId,
  formatDate,
}: ContactSubmissionsTableProps) => (
  <div className="hidden md:block overflow-hidden">
    <Table
      headers={['Nombre', 'Correo', 'Asunto', 'Mensaje', 'Fecha', '']}
      className="overflow-visible"
      colgroup={
        <>
          <col className="w-[16%]" />
          <col className="w-[20%]" />
          <col className="w-[14%]" />
          <col className="w-[24%]" />
          <col className="w-[12%]" />
          <col className="w-[14%]" />
        </>
      }
    >
      {loading ? (
        <tr>
          <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
            Cargando solicitudes...
          </td>
        </tr>
      ) : items.length === 0 ? (
        <tr>
          <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
            {emptyMessage}
          </td>
        </tr>
      ) : (
        items.map((item) => (
          <tr
            key={item.id}
            className="align-top cursor-pointer hover:bg-slate-50"
            onClick={() => onSelect(item)}
          >
            <td className="px-6 py-4 font-semibold text-slate-900">
              <div className="truncate" title={item.nombre}>
                {item.nombre}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">
              <div className="truncate" title={item.email}>
                {item.email}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">
              <div className="truncate" title={item.asunto}>
                {item.asunto}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">
              <div className="truncate" title={item.mensaje}>
                {item.mensaje}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-500">
              {formatDate(item.created_at)}
            </td>
            <td className="px-6 py-4">
              <div className="flex w-full items-center justify-end gap-2">
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
            </td>
          </tr>
        ))
      )}
    </Table>
  </div>
);
