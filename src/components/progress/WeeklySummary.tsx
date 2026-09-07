import {
  Box,
  Typography,
} from "@mui/material";

interface WeeklySummaryProps {
  sessionsCompleted: number;
  totalSessions: number;
  caloriesBurned: number;
  weekScore: number;
}

const WeeklySummary = ({
  sessionsCompleted,
  totalSessions,
  caloriesBurned,
  weekScore,
}: WeeklySummaryProps) => {
  const stats = [
    {
      value: `${sessionsCompleted}/${totalSessions}`,
      label: "SESSIONS",
    },
    {
      value: caloriesBurned,
      label: "CALORIES",
    },
    {
      value: `${weekScore}%`,
      label: "WEEK SCORE",
      accent: true,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #e0dbd4",
        borderRadius: {
          xs: "10px",
          md: "11px",
        },
        px: {
          xs: 0.5,
          md: 1,
        },
        py: {
          xs: 1,
          md: 1.15,
        },
        boxShadow:
          "0 2px 8px rgba(26,23,20,.04)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={stat.label}
            sx={{
              minWidth: 0,
              textAlign: "center",
              px: 0.5,
              borderLeft:
                index > 0
                  ? "1px solid #e8e3dd"
                  : "none",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 15,
                  md: 18,
                },
                lineHeight: 1,
                fontWeight: 900,
                fontFamily:
                  '"Roboto Mono", "Courier New", monospace',
                color: stat.accent
                  ? "#ef3030"
                  : "#1a1714",
              }}
            >
              {stat.value}
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: {
                  xs: 6.5,
                  md: 8,
                },
                letterSpacing: 0.7,
                color: "#77716b",
                fontWeight: 700,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WeeklySummary;