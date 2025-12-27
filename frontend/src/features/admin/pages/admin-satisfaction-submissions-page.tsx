import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Table } from '../../../components/ui/table';
import { Tooltip } from '../../../components/ui/tooltip';
import { useAuth } from '../../../hooks/use-auth';
import {
  SatisfactionSubmission,
  fetchSatisfactionSubmissions,
} from '../services/publicSubmissionsService';
import { SubmissionDetailsModal } from '../components/submission-details-modal';

const formatDate = (value?: string | null) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleString('es-EC', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPromedio = (value: string | number) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(parsed)) return '-';
  return `${parsed.toFixed(2)}/5`;
};

export const AdminSatisfactionSubmissionsPage = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<SatisfactionSubmission[]>([]);
  const [selected, setSelected] = useState<SatisfactionSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchSatisfactionSubmissions(token)
      .then((data) => setItems(data))
      .catch(() => setError('No se pudieron cargar las evaluaciones.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Formulario de satisfaccion</h1>
          <p className="text-sm text-slate-600">Evaluaciones enviadas por clientes y visitantes.</p>
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
        headers={['Nombre', 'Correo', 'Servicio', 'Promedio', 'Fecha', '']}
        className="overflow-visible"
        colgroup={
          <>
            <col className="w-[20%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
            <col className="w-[12%]" />
            <col className="w-[18%]" />
            <col className="w-[6%]" />
          </>
        }
      >
        {loading ? (
          <tr>
            <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
              Cargando evaluaciones...
            </td>
          </tr>
        ) : items.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-6 text-center text-sm text-slate-500">
              No hay evaluaciones registradas.
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id} className="align-top">
              <td className="px-6 py-4 font-semibold text-slate-900">{item.nombre}</td>
              <td className="px-6 py-4 text-slate-600">{item.email}</td>
              <td className="px-6 py-4 text-slate-600">{item.servicio}</td>
              <td className="px-6 py-4 text-slate-600">{formatPromedio(item.promedio)}</td>
              <td className="px-6 py-4 text-slate-500">{formatDate(item.created_at)}</td>
              <td className="px-6 py-4 text-right">
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
              </td>
            </tr>
          ))
        )}
      </Table>

      <SubmissionDetailsModal
        isOpen={Boolean(selected)}
        title="Detalle de evaluacion"
        onClose={() => setSelected(null)}
        rows={
          selected
            ? [
                { label: 'Nombre', value: selected.nombre },
                { label: 'Correo', value: selected.email },
                { label: 'Servicio', value: selected.servicio },
                { label: 'Promedio', value: formatPromedio(selected.promedio) },
                { label: 'Comentarios', value: selected.comentarios || '-' },
                { label: 'Mensaje final', value: selected.mensaje_final || '-' },
                { label: 'Fecha', value: formatDate(selected.created_at) },
              ]
            : []
        }
      />
    </div>
  );
};
