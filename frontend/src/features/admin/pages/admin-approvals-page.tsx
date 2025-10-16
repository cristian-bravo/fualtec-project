import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const pendingUsers = [
  { id: 1, nombre: 'María González', email: 'maria@cliente.com', cedula: 'V-12345678' },
  { id: 2, nombre: 'José Pérez', email: 'jose@cliente.com', cedula: 'V-98765432' }
];

export const AdminApprovalsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Solicitudes pendientes</h1>
      <p className="text-sm text-slate-600">Revise y apruebe los registros enviados por clientes.</p>
    </div>
    <Table headers={["Nombre", "Correo", "Cédula", "Acciones"]}>
      {pendingUsers.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 font-semibold text-slate-900">{user.nombre}</td>
          <td className="px-6 py-4 text-slate-600">{user.email}</td>
          <td className="px-6 py-4 text-slate-600">{user.cedula}</td>
          <td className="px-6 py-4 space-x-3">
            <Button>Aprobar</Button>
            <Button variant="danger">Rechazar</Button>
          </td>
        </tr>
      ))}
    </Table>
  </div>
);
