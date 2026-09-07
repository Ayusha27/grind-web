import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DashboardData } from "../types/dashboard";

export interface DashboardStats {
  completedSets: number;
  totalSets: number;

  /**
   * Number of workout days where the user has
   * logged at least one set.
   */
  loggedDays: number;

  /**
   * Number of workout days where all planned
   * sets have been completed.
   */
  completedDays: number;

  totalDays: number;

  calories: number;
}

interface DashboardContextValue {
  dashboard: DashboardData | null;

  setDashboard: (
    dashboard: DashboardData
  ) => void;

  stats: DashboardStats;

  setStats: (
    stats: DashboardStats
  ) => void;
}

const DashboardContext =
  createContext<
    DashboardContextValue | undefined
  >(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({
  children,
}: DashboardProviderProps) => {
  const [
    dashboard,
    setDashboard,
  ] = useState<DashboardData | null>(
    null
  );

  const [
    stats,
    setStats,
  ] = useState<DashboardStats>({
    completedSets: 0,
    totalSets: 0,
    loggedDays: 0,
    completedDays: 0,
    totalDays: 5,
    calories: 0,
  });

  const value =
    useMemo(
      () => ({
        dashboard,
        setDashboard,
        stats,
        setStats,
      }),
      [
        dashboard,
        stats,
      ]
    );

  return (
    <DashboardContext.Provider
      value={value}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard =
  () => {
    const context =
      useContext(
        DashboardContext
      );

    if (!context) {
      throw new Error(
        "useDashboard must be used inside DashboardProvider"
      );
    }

    return context;
  };