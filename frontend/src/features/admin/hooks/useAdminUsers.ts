import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess, confirmAction } from "@/lib/alerts";
import { AdminUser, fetchUsers, updateUser } from "../services/userService";

const APPROVED_STATES = new Set(["aprobado", "inactivo"]);

const normalizeState = (estado?: string | null) => estado ?? "aprobado";

export const useAdminUsers = () => {
  const { token, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const loadUsers = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchUsers(token);
      const filtered = data.filter((user) =>
        APPROVED_STATES.has(normalizeState(user.estado))
      );
      setUsers(filtered);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los usuarios.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const toggleStatus = useCallback(
    async (user: AdminUser) => {
      if (!token) return;
      const current = normalizeState(user.estado);
      const next = current === "inactivo" ? "aprobado" : "inactivo";
      const actionLabel = next === "inactivo" ? "desactivar" : "activar";

      const confirmed = await confirmAction(
        `Desea ${actionLabel} a ${user.nombre}?`,
        `Si, ${actionLabel}`
      );
      if (!confirmed) return;

      setActionId(user.id);
      try {
        const updated = await updateUser(token, user.id, { estado: next });
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? updated : item))
        );
        alertSuccess(
          next === "inactivo"
            ? "Usuario deshabilitado."
            : "Usuario habilitado."
        );
      } catch (error: any) {
        console.error(error);
        const message =
          error?.response?.data?.message || "No se pudo actualizar el usuario.";
        alertError(message);
      } finally {
        setActionId(null);
      }
    },
    [token]
  );

  return {
    isAuthenticated,
    users,
    isLoading,
    actionId,
    reload: loadUsers,
    toggleStatus,
  };
};
