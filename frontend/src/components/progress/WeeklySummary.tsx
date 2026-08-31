import { Box, Grid, Typography } from "@mui/material";

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
  const cards = [
    {
      value: `${sessionsCompleted}/${totalSessions}`,
      label: "SESSIONS COMPLETED",
    },
    {
      value: caloriesBurned,
      label: "CALORIES BURNED",
    },
    {
      value: `${weekScore}%`,
      label: "WEEK SCORE",
      red: true,
    },
  ];

  return (
    <Grid container spacing={1.2}>
      {cards.map((card) => (
        <Grid
          key={card.label}
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Box
            sx={{
              height: 66,
              backgroundColor: "#ffffff",
              border: "1px solid #e0dbd4",
              borderRadius: "11px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(26,23,20,.05)",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: 1,
                fontFamily: "monospace",
                fontWeight: 900,
                color: card.red ? "#ef3030" : "#1a1714",
              }}
            >
              {card.value}
            </Typography>

            <Typography
              sx={{
                mt: 0.6,
                fontSize: 9,
                letterSpacing: 1,
                color: "#77716b",
                fontWeight: 700,
              }}
            >
              {card.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklySummary;