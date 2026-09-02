import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface DashboardStats {
  completedSets: number;
  totalSets: number;
  completedDays: number;
  totalDays: number;
  calories: number;
}

interface DashboardContextValue {
  stats: DashboardStats;
  setStats: (stats: DashboardStats) => void;
}

const DashboardContext =
  createContext<DashboardContextValue | undefined>(
    undefined
  );

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({
  children,
}: DashboardProviderProps) => {
  const [stats, setStats] = useState<DashboardStats>({
    completedSets: 0,
    totalSets: 0,
    completedDays: 0,
    totalDays: 5,
    calories: 0,
  });

  const value = useMemo(
    () => ({
      stats,
      setStats,
    }),
    [stats]
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