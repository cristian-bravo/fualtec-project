import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const users = [
  { id: 1, nombre: 'Ana Torres', email: 'ana@cliente.com', rol: 'cliente', estado: 'aprobado' },
  { id: 2, nombre: 'Luis Romero', email: 'luis@cliente.com', rol: 'cliente', estado: 'pendiente' },
  { id: 3, nombre: 'Carla Medina', email: 'carla@midominio.com', rol: 'admin', estado: 'aprobado' }
];

export const AdminUsersPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
      <p className="text-sm text-slate-600">Gestione roles, estados y accesos de clientes y administradores.</p>
    </div>
    <Table headers={["Nombre", "Correo", "Rol", "Estado", "Acciones"]}>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 font-semibold text-slate-900">{user.nombre}</td>
          <td className="px-6 py-4 text-slate-600">{user.email}</td>
          <td className="px-6 py-4 text-slate-600">{user.rol}</td>
          <td className="px-6 py-4">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              user.estado === 'aprobado' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
            }`}>
              {user.estado}
            </span>
          </td>
          <td className="px-6 py-4 space-x-3">
            <Button variant="secondary">Editar</Button>
            <Button variant="danger">Desactivar</Button>
          </td>
        </tr>
      ))}
    </Table>
  </div>
);
