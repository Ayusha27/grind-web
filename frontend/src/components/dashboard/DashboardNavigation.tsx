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
        width: "100%",
        height: {
          xs: 52,
          md: 58,
        },

        backgroundColor: "#151513",

        borderBottom:
          "1px solid #292725",

        display: "flex",
        alignItems: "stretch",

        px: {
          xs: 1.5,
          sm: 3,
          md: 5,
        },

        overflowX: "auto",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        scrollbarWidth: "none",
      }}
    >
      {TABS.map((tab) => {
        const isActive =
          location.pathname === tab.path;

        return (
          <Box
            key={tab.id}
            component="button"
            type="button"
            onClick={() => navigate(tab.path)}
            sx={{
              position: "relative",

              height: "100%",

              minWidth: {
                xs: 105,
                sm: 125,
                md: 145,
              },

              px: {
                xs: 1.5,
                sm: 2.5,
                md: 3,
              },

              border: 0,
              outline: "none",

              backgroundColor:
                "transparent",

              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: isActive
                ? "#ffffff"
                : "#66625f",

              transition:
                "color 150ms ease, background-color 150ms ease",

              "&:hover": {
                color: "#ffffff",
                backgroundColor:
                  "rgba(255,255,255,0.025)",
              },

              "&:focus-visible": {
                outline:
                  "1px solid #ff5c35",
                outlineOffset: -2,
              },

              "&::after": {
                content: '""',

                position: "absolute",

                left: 0,
                right: 0,
                bottom: 0,

                height: 3,

                backgroundColor:
                  isActive
                    ? "#ff5c35"
                    : "transparent",

                transition:
                  "background-color 150ms ease",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  color: isActive
                    ? "#ffffff"
                    : "#66625f",
                }}
              >
                {tab.icon}
              </Box>

              <Typography
                component="span"
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 11,
                    md: 12,
                  },

                  lineHeight: 1,

                  fontWeight:
                    isActive ? 800 : 700,

                  letterSpacing: {
                    xs: 0.8,
                    md: 1,
                  },

                  color: "inherit",

                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DashboardNavigation;