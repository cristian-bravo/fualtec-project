import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { alertError } from "@/lib/alerts";
import { DashboardStats, fetchDashboardStats } from "../services/dashboardService";

export const useAdminDashboard = () => {
  const { token, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchDashboardStats(token);
      setStats(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los indicadores.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    isAuthenticated,
    stats,
    isLoading,
    reload: loadStats,
  };
};
