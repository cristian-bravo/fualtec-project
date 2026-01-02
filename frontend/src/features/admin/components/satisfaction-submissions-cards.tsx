import { SatisfactionSubmission } from '../services/publicSubmissionsService';

type SatisfactionSubmissionsCardsProps = {
  items: SatisfactionSubmission[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: SatisfactionSubmission) => void;
  formatDate: (value?: string | null) => string;
  formatPromedio: (value: string | number) => string;
};

export const SatisfactionSubmissionsCards = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  formatDate,
  formatPromedio,
}: SatisfactionSubmissionsCardsProps) => {
  if (loading) {
    return (
      <p className="md:hidden text-center text-sm text-slate-500">
        Cargando evaluaciones...
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
          <h3 className="font-semibold text-slate-900 truncate" title={item.nombre}>
            {item.nombre}
          </h3>
          <p className="text-sm text-slate-600 truncate" title={item.email}>
            {item.email}
          </p>

          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p className="truncate" title={item.servicio}>
              <span className="font-semibold text-slate-700">Servicio:</span> {item.servicio}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Promedio:</span>{' '}
              {formatPromedio(item.promedio)}
            </p>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            {formatDate(item.created_at)}
          </div>
        </div>
      ))}
    </div>
  );
};
