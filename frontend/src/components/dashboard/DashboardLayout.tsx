import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import DashboardHeader from "./DashboardHeader";
import DashboardPeriodBar from "./DashboardPeriodBar";
import DashboardNavigation from "./DashboardNavigation";
import Footer from "../layout/Footer";
import {
  DashboardProvider,
  useDashboard,
} from "../../context/DashboardContext";
import { getDashboard } from "../../api/dashboardApi";

interface DashboardContentProps {
  month: number;
  week: number;
  periodResetKey: number;
  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
}

const DashboardContent = ({
  month,
  week,
  periodResetKey,
  onMonthChange,
  onWeekChange,
}: DashboardContentProps) => {
  const { setDashboard } = useDashboard();

  useEffect(() => {
    const loadDashboard = async () => {
      const response = await getDashboard();

      if (response.success) {
        setDashboard(response.data);
      }
    };

    void loadDashboard();
  }, [setDashboard]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f2ed" }}>
      <DashboardHeader />

      <DashboardPeriodBar
        month={month}
        week={week}
        onMonthChange={onMonthChange}
        onWeekChange={onWeekChange}
      />

      <DashboardNavigation />

      <Box component="main">
        <Outlet
            context={{
                month,
                week,
                periodResetKey,
            }}
            />
      </Box>

      <Footer variant="dashboard" />
    </Box>
  );
};

const DashboardLayout = () => {
  const [month, setMonth] = useState(1);
  const [week, setWeek] = useState(1);
  const [periodResetKey, setPeriodResetKey] = useState(0);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    setPeriodResetKey((previous) => previous + 1);
  };

  const handleWeekChange = (newWeek: number) => {
    setWeek(newWeek);
    setPeriodResetKey((previous) => previous + 1);
  };

  return (
    <DashboardProvider>
      <DashboardContent
        month={month}
        week={week}
        periodResetKey={periodResetKey}
        onMonthChange={handleMonthChange}
        onWeekChange={handleWeekChange}
      />
    </DashboardProvider>
  );
};

export default DashboardLayout;