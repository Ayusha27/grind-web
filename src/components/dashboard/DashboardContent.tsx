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

  /**
   * =======================================================
   * LOAD DASHBOARD DATA
   * =======================================================
   *
   * Dashboard data is still required by the Workout,
   * Diet and Progress pages.
   *
   * Header statistics are no longer loaded here because
   * the header no longer displays them.
   */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard();

        if (response.success) {
          setDashboard(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );
      }
    };

    void loadDashboard();
  }, [setDashboard]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f2ed",
      }}
    >
      {/* ===================================================
          HEADER
          =================================================== */}

      <DashboardHeader />

      {/* ===================================================
          MONTH / WEEK PERIOD BAR
          =================================================== */}

      <DashboardPeriodBar
        month={month}
        week={week}
        onMonthChange={onMonthChange}
        onWeekChange={onWeekChange}
      />

      {/* ===================================================
          DASHBOARD NAVIGATION
          =================================================== */}

      <DashboardNavigation />

      {/* ===================================================
          PAGE CONTENT
          =================================================== */}

      <Box component="main">
        <Outlet
          context={{
            month,
            week,
            periodResetKey,
            onMonthChange,
            onWeekChange,
          }}
        />
      </Box>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <Footer variant="dashboard" />
    </Box>
  );
};

export default DashboardContent;