import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const publications = [
  { id: 1, grupo: 'Publicación Operativa Q1', publicadoEn: '08/03/2024', responsable: 'cmedina', periodo: '2024-Q1' },
  { id: 2, grupo: 'Actualización HSE', publicadoEn: '25/02/2024', responsable: 'cmedina', periodo: '2024-Q1' }
];

export const AdminPublicationsPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-slate-900">Historial de publicaciones</h1>
      <p className="text-sm text-slate-600">
        Consulte los grupos publicados y programe nuevas ventanas de disponibilidad.
      </p>
    </div>
    <Table headers={["Grupo", "Periodo", "Publicado", "Responsable", "Acciones"]}>
      {publications.map((item) => (
        <tr key={item.id}>
          <td className="px-6 py-4 font-semibold text-slate-900">{item.grupo}</td>
          <td className="px-6 py-4 text-slate-600">{item.periodo}</td>
          <td className="px-6 py-4 text-slate-600">{item.publicadoEn}</td>
          <td className="px-6 py-4 text-slate-600">{item.responsable}</td>
          <td className="px-6 py-4">
            <Button variant="ghost">Ver detalle</Button>
          </td>
        </tr>
      ))}
    </Table>
  </div>
);
