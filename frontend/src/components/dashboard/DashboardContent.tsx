import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getDashboard } from "../../api/dashboardApi";
import { useDashboard } from "../../context/DashboardContext";
import Footer from "../layout/Footer";
import DashboardHeader from "./DashboardHeader";
import DashboardNavigation from "./DashboardNavigation";
import DashboardPeriodBar from "./DashboardPeriodBar";

interface DashboardContentProps {
  month: number;
  week: number;
  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
}

const DashboardContent = ({
  month,
  week,
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
        <Outlet context={{ month, week }} />
      </Box>

      <Footer variant="dashboard" />
    </Box>
  );
};

export default DashboardContent;