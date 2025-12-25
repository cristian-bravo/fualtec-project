import { Link } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AdminUser } from "../../services/userService";
import { UserStatusBadge } from "./UserStatusBadge";

type Props = {
  users: AdminUser[];
  isLoading: boolean;
  actionId: number | null;
  onToggleStatus: (user: AdminUser) => void;
};

const roleLabels: Record<string, string> = {
  admin: "Admin",
  cliente: "Cliente",
};

export const UsersTable = ({
  users,
  isLoading,
  actionId,
  onToggleStatus,
}: Props) => (
  <Table headers={["Nombre", "Correo", "Rol", "Estado", "Acciones"]}>
    {isLoading && (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
          Cargando usuarios...
        </td>
      </tr>
    )}

    {!isLoading && users.length === 0 && (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
          No hay usuarios aprobados.
        </td>
      </tr>
    )}

    {!isLoading &&
      users.map((user) => {
        const isDisabled = user.estado === "inactivo";
        return (
          <tr key={user.id} className="align-middle">
            <td className="px-6 py-4 font-semibold text-slate-900">
              {user.nombre}
            </td>
            <td className="px-6 py-4 text-slate-600">{user.email}</td>
            <td className="px-6 py-4 text-slate-600">
              {roleLabels[user.rol ?? ""] ?? user.rol ?? "-"}
            </td>
            <td className="px-6 py-4 text-center">
              <UserStatusBadge estado={user.estado} />
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Link to={`/client-access/admin/usuarios/${user.id}`}>
                  <Button variant="secondary">Editar</Button>
                </Link>
                <Button
                  variant={isDisabled ? "primary" : "danger"}
                  isLoading={actionId === user.id}
                  onClick={() => onToggleStatus(user)}
                >
                  {isDisabled ? "Activar" : "Desactivar"}
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
  </Table>
);
