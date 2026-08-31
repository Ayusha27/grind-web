import { Box, Typography } from "@mui/material";

interface WorkoutTabsProps {
  activeTab: "workout" | "diet" | "progress";
}

const WorkoutTabs = ({
  activeTab,
}: WorkoutTabsProps) => {
  const tabs = [
    {
      id: "workout",
      label: "🏆 WORKOUT",
    },
    {
      id: "diet",
      label: "🍽 DIET",
    },
    {
      id: "progress",
      label: "📊 PROGRESS",
    },
  ];

  return (
    <Box
      sx={{
        height: 58,
        px: {
          xs: 2.5,
          md: 4,
        },

        backgroundColor: "#151513",

        display: "flex",
        alignItems: "stretch",

        borderBottom: "1px solid #292725",
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;

        return (
          <Box
            key={tab.id}
            sx={{
              px: {
                xs: 2,
                md: 3,
              },

              display: "flex",
              alignItems: "center",

              borderBottom: active
                ? "3px solid #ff5c35"
                : "3px solid transparent",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: active ? 900 : 700,
                letterSpacing: 1,
                color: active
                  ? "#ffffff"
                  : "#66625f",
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default WorkoutTabs;