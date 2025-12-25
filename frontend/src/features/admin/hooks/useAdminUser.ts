import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess } from "@/lib/alerts";
import {
  AdminUser,
  fetchUserById,
  updateUser,
  UpdateUserPayload,
} from "../services/userService";

export const useAdminUser = (userId?: number) => {
  const { token } = useAuth();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadUser = useCallback(async () => {
    if (!token || !userId) return;
    setIsLoading(true);
    try {
      const data = await fetchUserById(token, userId);
      setUser(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudo cargar el usuario.");
    } finally {
      setIsLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const saveUser = useCallback(
    async (payload: UpdateUserPayload) => {
      if (!token || !userId) return null;
      setIsSaving(true);
      try {
        const updated = await updateUser(token, userId, payload);
        setUser(updated);
        alertSuccess("Usuario actualizado correctamente.");
        return updated;
      } catch (error: any) {
        console.error(error);
        const message =
          error?.response?.data?.message || "No se pudo actualizar el usuario.";
        alertError(message);
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [token, userId]
  );

  return {
    user,
    isLoading,
    isSaving,
    reload: loadUser,
    saveUser,
  };
};
