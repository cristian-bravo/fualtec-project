import { PublicationItem } from '../services/publicationService';

type PublicationsCardsProps = {
  items: PublicationItem[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: PublicationItem) => void;
  formatDate: (value?: string | null) => string;
};

export const PublicationsCards = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  formatDate,
}: PublicationsCardsProps) => {
  if (loading) {
    return (
      <p className="md:hidden text-center text-sm text-slate-500">
        Cargando informacion de la publicacion.
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
      {items.map((item) => {
        const creator = item.creator?.nombre || item.creator?.email || '-';
        const publisher = item.publisher?.nombre || item.publisher?.email || '-';

        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition hover:bg-slate-50"
          >
            <h3 className="font-semibold text-slate-900 truncate" title={item.name}>
              {item.name}
            </h3>
            <p className="text-sm text-slate-600 truncate" title={item.periodo || '-'}>
              Periodo: {item.periodo || '-'}
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              <p className="truncate" title={creator}>
                <span className="font-semibold text-slate-700">Creado por:</span> {creator}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Publicado:</span>{' '}
                {formatDate(item.published_at)}
              </p>
              <p className="truncate" title={publisher}>
                <span className="font-semibold text-slate-700">Publicado por:</span> {publisher}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
