import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const downloads = [
  {
    id: 1,
    usuario: 'maria@cliente.com',
    pdf: 'Plan de inspección Q2',
    ip: '190.168.10.4',
    agente: 'Chrome / Windows',
    fecha: '08/03/2024 10:12'
  }
];

export const AdminAuditPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Auditoría de descargas</h1>
        <p className="text-sm text-slate-600">Monitoree los eventos registrados y exporte reportes detallados.</p>
      </div>
      <Button variant="secondary">Exportar CSV</Button>
    </div>
    <Table headers={["Usuario", "Documento", "IP", "Agente", "Fecha"]}>
      {downloads.map((item) => (
        <tr key={item.id}>
          <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.usuario}</td>
          <td className="px-6 py-4 text-sm text-slate-600">{item.pdf}</td>
          <td className="px-6 py-4 text-sm text-slate-600">{item.ip}</td>
          <td className="px-6 py-4 text-sm text-slate-600">{item.agente}</td>
          <td className="px-6 py-4 text-sm text-slate-600">{item.fecha}</td>
        </tr>
      ))}
    </Table>
  </div>
);
