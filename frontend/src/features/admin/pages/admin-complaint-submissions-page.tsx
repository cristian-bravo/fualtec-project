import { useEffect, useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { Table } from '../../../components/ui/table';
import { Tooltip } from '../../../components/ui/tooltip';
import { useAuth } from '../../../hooks/use-auth';
import {
  ComplaintSubmission,
  downloadComplaintAttachment,
  fetchComplaintSubmissions,
} from '../services/publicSubmissionsService';
import { SubmissionDetailsModal } from '../components/submission-details-modal';

const formatDate = (value?: string | null) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString('es-EC', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const AdminComplaintSubmissionsPage = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<ComplaintSubmission[]>([]);
  const [selected, setSelected] = useState<ComplaintSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchComplaintSubmissions(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudieron cargar las quejas.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDownload = async (item: ComplaintSubmission) => {
    if (!token) return;
    try {
      setDownloadingId(item.id);
      await downloadComplaintAttachment(token, item.id, item.documento_nombre || 'adjunto');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quejas y apelaciones</h1>
          <p className="text-sm text-slate-600">Registros formales recibidos desde el portal.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
          <p className="text-lg font-semibold text-slate-900">{items.length}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Table
        headers={['Empresa', 'Solicitante', 'Tipo', 'Fecha', 'Adjunto', '']}
        className="overflow-visible"
        colgroup={
          <>
            <col className="w-[22%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[14%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
          </>
        }
      >
        {loading ? (
          <tr>
            <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
              Cargando registros...
            </td>
          </tr>
        ) : items.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
              No hay registros disponibles.
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id} className="align-top">
              <td className="px-6 py-4 font-semibold text-slate-900">{item.empresa}</td>
              <td className="px-6 py-4 text-slate-600">{item.nombre}</td>
              <td className="px-6 py-4 text-slate-600">
                {item.tipo_inconformidad} · {item.tipo_queja}
              </td>
              <td className="px-6 py-4 text-slate-500">{formatDate(item.fecha_presentacion)}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.anexa_documento ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.anexa_documento ? 'Si' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <Tooltip content="Ver detalle">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-900 hover:text-white"
                    aria-label="Ver detalle"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </Tooltip>
                {item.anexa_documento && item.documento_path && (
                  <Tooltip content="Descargar adjunto">
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      disabled={downloadingId === item.id}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-900 hover:text-white disabled:opacity-60"
                      aria-label="Descargar adjunto"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </Tooltip>
                )}
              </td>
            </tr>
          ))
        )}
      </Table>

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de queja"
        onClose={() => setSelected(null)}
        rows={
          selected
            ? [
                { label: 'Empresa', value: selected.empresa },
                { label: 'Solicitante', value: selected.nombre },
                { label: 'Cargo', value: selected.cargo },
                { label: 'Telefono', value: selected.telefono },
                { label: 'Correo', value: selected.email },
                { label: 'Direccion', value: selected.direccion },
                { label: 'Fecha', value: formatDate(selected.fecha_presentacion) },
                {
                  label: 'Tipo',
                  value: `${selected.tipo_inconformidad} · ${selected.tipo_queja}`,
                },
                { label: 'Relato', value: selected.relato },
              ]
            : []
        }
      />
    </div>
  );
};
