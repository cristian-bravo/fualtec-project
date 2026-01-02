import { Table } from '../../../components/ui/table';
import { PublicationItem } from '../services/publicationService';

type PublicationsTableProps = {
  items: PublicationItem[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (item: PublicationItem) => void;
  formatDate: (value?: string | null) => string;
};

export const PublicationsTable = ({
  items,
  loading,
  emptyMessage,
  onSelect,
  formatDate,
}: PublicationsTableProps) => (
  <div className="hidden md:block overflow-x-auto rounded-lg border bg-white">
    <Table
      headers={['Grupo', 'Periodo', 'Creado por', 'Publicado', 'Publicado por']}
      className="overflow-visible"
      colgroup={
        <>
          <col className="w-[26%]" />
          <col className="w-[14%]" />
          <col className="w-[22%]" />
          <col className="w-[16%]" />
          <col className="w-[22%]" />
        </>
      }
    >
      {loading ? (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
            Cargando informacion de la publicacion.
          </td>
        </tr>
      ) : items.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
            {emptyMessage}
          </td>
        </tr>
      ) : (
        items.map((item) => {
          const creator = item.creator?.nombre || item.creator?.email || '-';
          const publisher = item.publisher?.nombre || item.publisher?.email || '-';
          return (
            <tr
              key={item.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => onSelect(item)}
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                <div className="truncate" title={item.name}>
                  {item.name}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600">
                <div className="truncate" title={item.periodo || '-'}>
                  {item.periodo || '-'}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600">
                <div className="truncate" title={creator}>
                  {creator}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600">
                {formatDate(item.published_at)}
              </td>
              <td className="px-6 py-4 text-slate-600">
                <div className="truncate" title={publisher}>
                  {publisher}
                </div>
              </td>
            </tr>
          );
        })
      )}
    </Table>
  </div>
);
