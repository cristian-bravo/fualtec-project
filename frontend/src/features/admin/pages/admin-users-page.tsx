import { UsersTable } from "../components/users/UsersTable";
import { useAdminUsers } from "../hooks/useAdminUsers";

export const AdminUsersPage = () => {
  const { isAuthenticated, users, isLoading, actionId, toggleStatus } =
    useAdminUsers();

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para revisar usuarios.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
        <p className="text-sm text-slate-600">
          Gestione roles, estados y accesos de clientes y administradores.
        </p>
      </div>

      <UsersTable
        users={users}
        isLoading={isLoading}
        actionId={actionId}
        onToggleStatus={toggleStatus}
      />
    </div>
  );
};
