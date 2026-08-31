import { Box, Typography } from "@mui/material";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

type DashboardTab =
  | "workout"
  | "diet"
  | "progress";

interface NavigationTab {
  id: DashboardTab;
  label: string;
  icon: string;
  path: string;
}

const TABS: NavigationTab[] = [
  {
    id: "workout",
    label: "WORKOUT",
    icon: "🏆",
    path: "/client/dashboard/workout",
  },
  {
    id: "diet",
    label: "DIET",
    icon: "🍽",
    path: "/client/dashboard/diet",
  },
  {
    id: "progress",
    label: "PROGRESS",
    icon: "📊",
    path: "/client/dashboard/progress",
  },
];

const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      component="nav"
      sx={{
        height: 58,
        px: {
          xs: 1,
          sm: 2,
          md: 4,
        },
        backgroundColor: "#151513",
        display: "flex",
        alignItems: "stretch",
        borderBottom: "1px solid #292725",
      }}
    >
      {TABS.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <Box
            key={tab.id}
            component="button"
            onClick={() => navigate(tab.path)}
            sx={{
              border: 0,
              background: "transparent",
              cursor: "pointer",

              px: {
                xs: 1.5,
                sm: 2,
                md: 3,
              },

              display: "flex",
              alignItems: "center",

              borderBottom: isActive
                ? "3px solid #ff5c35"
                : "3px solid transparent",

              "&:hover": {
                backgroundColor: "#1b1a18",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 13,
                },
                fontWeight: isActive ? 900 : 700,
                letterSpacing: 1,
                color: isActive
                  ? "#ffffff"
                  : "#66625f",
              }}
            >
              {tab.icon} {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default DashboardNavigation;