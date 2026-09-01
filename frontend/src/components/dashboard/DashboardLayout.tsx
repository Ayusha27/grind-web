import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import DashboardHeader from "./DashboardHeader";
import DashboardNavigation from "./DashboardNavigation";
import DashboardPeriodBar from "./DashboardPeriodBar";
import Footer from "../layout/Footer";
import { DashboardProvider } from "../../context/DashboardContext";


const DashboardLayout = () => {
    console.log("🔥 DASHBOARD LAYOUT IS RENDERING");
  const [month, setMonth] = useState(1);
  const [week, setWeek] = useState(1);

  return (
     <DashboardProvider>
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f2ed",
      }}
    >
      <DashboardHeader />

      <DashboardPeriodBar
        month={month}
        week={week}
        onMonthChange={setMonth}
        onWeekChange={setWeek}
      />

      <DashboardNavigation/>

      <Box component="main">
        <Outlet
          context={{
            month,
            week,
          }}
        />
      </Box>

      {/* Dashboard footer */}
      <Footer variant="dashboard" />
    </Box>
    </DashboardProvider>
  );
};

export default DashboardLayout;