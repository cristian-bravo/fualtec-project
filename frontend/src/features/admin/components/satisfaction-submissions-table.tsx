import { Table } from '../../../components/ui/table';
import { SatisfactionSubmission } from '../services/publicSubmissionsService';

type SatisfactionSubmissionsTableProps = {
  items: SatisfactionSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: SatisfactionSubmission) => void;
  formatDate: (value?: string | null) => string;
  formatPromedio: (value: string | number) => string;
};

export const SatisfactionSubmissionsTable = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  formatDate,
  formatPromedio,
}: SatisfactionSubmissionsTableProps) => (
  <div className="hidden md:block overflow-x-auto rounded-lg border bg-white">
    <Table
      headers={['Nombre', 'Correo', 'Servicio', 'Promedio', 'Fecha']}
      className="overflow-visible"
      colgroup={
        <>
          <col className="w-[20%]" />
          <col className="w-[22%]" />
          <col className="w-[24%]" />
          <col className="w-[14%]" />
          <col className="w-[20%]" />
        </>
      }
    >
      {loading ? (
        <tr>
          <td colSpan={5} className="px-6 py-6 text-center text-sm text-slate-500">
            Cargando evaluaciones...
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
              <div className="truncate" title={item.servicio}>
                {item.servicio}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">{formatPromedio(item.promedio)}</td>
            <td className="px-6 py-4 text-slate-500">{formatDate(item.created_at)}</td>
          </tr>
        ))
      )}
    </Table>
  </div>
);
