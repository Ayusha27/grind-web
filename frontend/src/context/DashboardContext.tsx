import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DashboardData } from "../types/dashboard";

interface DashboardStats {
  completedSets: number;
  totalSets: number;
  completedDays: number;
  totalDays: number;
  calories: number;
}

interface DashboardContextValue {
  dashboard: DashboardData | null;
  setDashboard: (dashboard: DashboardData) => void;

  stats: DashboardStats;
  setStats: (stats: DashboardStats) => void;
}

const DashboardContext =
  createContext<DashboardContextValue | undefined>(undefined);

export const DashboardProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [stats, setStats] = useState<DashboardStats>({
    completedSets: 0,
    totalSets: 0,
    completedDays: 0,
    totalDays: 0,
    calories: 0,
  });

  const value = useMemo(
    () => ({
      dashboard,
      setDashboard,
      stats,
      setStats,
    }),
    [dashboard, stats]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
};