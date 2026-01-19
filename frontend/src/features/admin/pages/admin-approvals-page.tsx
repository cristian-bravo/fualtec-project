import { useEffect, useState } from "react";
import { Table } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../hooks/use-auth";
import { alertError, alertSuccess, confirmAction } from "@/lib/alerts";
import {
  ApprovalUser,
  approveUser,
  fetchPendingApprovals,
  rejectUser,
} from "../services/approvalService";

export const AdminApprovalsPage = () => {
  const { token, isAuthenticated } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<ApprovalUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const loadApprovals = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchPendingApprovals(token);
      setPendingUsers(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar las solicitudes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleApprove = async (user: ApprovalUser) => {
    if (!token) return;
    if (!user.email_verified_at) {
      alertError("El usuario debe verificar su correo antes de aprobar.");
      return;
    }

    const confirmed = await confirmAction(
      `Aprobar a ${user.nombre}?`,
      "Si, aprobar"
    );
    if (!confirmed) return;

    setActionId(user.id);
    try {
      await approveUser(token, user.id);
      setPendingUsers((prev) => prev.filter((item) => item.id !== user.id));
      alertSuccess("Usuario aprobado correctamente.");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo aprobar el usuario.";
      alertError(message);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (user: ApprovalUser) => {
    if (!token) return;
    const confirmed = await confirmAction(
      `Rechazar a ${user.nombre}?`,
      "Si, rechazar"
    );
    if (!confirmed) return;

    setActionId(user.id);
    try {
      await rejectUser(token, user.id);
      setPendingUsers((prev) => prev.filter((item) => item.id !== user.id));
      alertSuccess("Usuario rechazado.");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo rechazar el usuario.";
      alertError(message);
    } finally {
      setActionId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesión para revisar solicitudes.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Solicitudes pendientes
        </h1>
        <p className="text-sm text-slate-600">
          Revise y apruebe los registros enviados por clientes.
        </p>
      </div>
      <Table headers={["Nombre", "Correo", "Cédula", "Verificación", "Acciones"]}>
        {isLoading && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              Cargando solicitudes...
            </td>
          </tr>
        )}

        {!isLoading && pendingUsers.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              No hay solicitudes pendientes.
            </td>
          </tr>
        )}

        {!isLoading &&
          pendingUsers.map((user) => {
            const isVerified = Boolean(user.email_verified_at);
            return (
              <tr key={user.id} className="align-middle">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {user.nombre}
                </td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{user.cedula}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      isVerified
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {isVerified ? "Verificado" : "Sin verificar"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
                    <Button
                      isLoading={actionId === user.id}
                      disabled={!isVerified || actionId === user.id}
                      onClick={() => handleApprove(user)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="danger"
                      isLoading={actionId === user.id}
                      disabled={actionId === user.id}
                      onClick={() => handleReject(user)}
                    >
                      Rechazar
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
      </Table>
    </div>
  );
};
