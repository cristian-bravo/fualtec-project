import { Table } from '../../../components/ui/table';
import { Tooltip } from '../../../components/ui/tooltip';
import { Download } from 'lucide-react';
import { ComplaintSubmission } from '../services/publicSubmissionsService';

type ComplaintSubmissionsTableProps = {
  items: ComplaintSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: ComplaintSubmission) => void;
  onDownload: (item: ComplaintSubmission) => void;
  downloadingId: number | null;
  formatDate: (value?: string | null) => string;
};

export const ComplaintSubmissionsTable = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  onDownload,
  downloadingId,
  formatDate,
}: ComplaintSubmissionsTableProps) => (
  <div className="hidden md:block overflow-x-auto rounded-lg border bg-white">
    <Table
      headers={['Empresa', 'Solicitante', 'Tipo', 'Fecha', 'Adjunto']}
      className="overflow-visible"
      colgroup={
        <>
          <col className="w-[24%]" />
          <col className="w-[20%]" />
          <col className="w-[26%]" />
          <col className="w-[14%]" />
          <col className="w-[16%]" />
        </>
      }
    >
      {loading ? (
        <tr>
          <td colSpan={5} className="px-6 py-6 text-center text-sm text-slate-500">
            Cargando registros...
          </td>
        </tr>
      ) : items.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-6 py-6 text-center text-sm text-slate-500">
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
              <div className="truncate" title={item.empresa}>
                {item.empresa}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">
              <div className="truncate" title={item.nombre}>
                {item.nombre}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">
              <div className="truncate" title={`${item.tipo_inconformidad} / ${item.tipo_queja}`}>
                {item.tipo_inconformidad} / {item.tipo_queja}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-500">
              {formatDate(item.fecha_presentacion)}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.anexa_documento
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.anexa_documento ? 'Si' : 'No'}
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
            </td>
          </tr>
        ))
      )}
    </Table>
  </div>
);
