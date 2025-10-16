import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const documents = [
  {
    id: 1,
    title: 'Informe de integridad tanque TK-24',
    categoria: 'Integridad',
    publicadoEn: '05/03/2024',
    vigente: true
  },
  {
    id: 2,
    title: 'Plan de inspección submarina Q2',
    categoria: 'Inspección',
    publicadoEn: '20/02/2024',
    vigente: true
  },
  {
    id: 3,
    title: 'Auditoría operativa Estación Norte',
    categoria: 'Auditoría',
    publicadoEn: '12/01/2024',
    vigente: false
  }
];

export const ClientDocumentsPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-slate-900">Documentos asignados</h1>
      <p className="text-sm text-slate-600">
        Descargue los informes publicados para su organización. Los enlaces cuentan con expiración controlada.
      </p>
    </div>
    <Table headers={["Título", "Categoría", "Publicado", "Estado", "Acciones"]}>
      {documents.map((doc) => (
        <tr key={doc.id}>
          <td className="px-6 py-4 font-medium text-slate-900">{doc.title}</td>
          <td className="px-6 py-4 text-slate-600">{doc.categoria}</td>
          <td className="px-6 py-4 text-slate-600">{doc.publicadoEn}</td>
          <td className="px-6 py-4">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              doc.vigente ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {doc.vigente ? 'Vigente' : 'Histórico'}
            </span>
          </td>
          <td className="px-6 py-4">
            <Button>Descargar</Button>
          </td>
        </tr>
      ))}
    </Table>
  </div>
);
