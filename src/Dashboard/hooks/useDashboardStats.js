import { useState, useEffect, useCallback } from "react";
import { getAdminDashboardStats } from "../services/dashboardService";

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAdminDashboardStats();

      setStats(data);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refresh: loadStats,
  };
};

export default useDashboardStats;