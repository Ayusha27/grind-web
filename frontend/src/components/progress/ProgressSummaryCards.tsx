import { Box, Grid, Typography } from "@mui/material";

interface ProgressSummaryCardsProps {
  monthScore: number;
  sessionsCompleted: number;
  totalSessions: number;
  caloriesBurned: number;
  activeWeeks: number;
  totalWeeks: number;
  bestWeekScore: number;
}

const ProgressSummaryCards = ({
  monthScore,
  sessionsCompleted,
  totalSessions,
  caloriesBurned,
  activeWeeks,
  totalWeeks,
  bestWeekScore,
}: ProgressSummaryCardsProps) => {
  const cards = [
    {
      title: "MONTH SCORE",
      value: `${monthScore}%`,
      subtitle: `${sessionsCompleted}/${totalSessions} sessions`,
      footer: "🏃 Keep going",
      dark: true,
    },
    {
      title: "WORKOUTS DONE",
      value: sessionsCompleted,
      subtitle: (
        <>
          Out of{" "}
          <strong style={{ color: "#16803d" }}>
            {totalSessions} planned sessions
          </strong>
        </>
      ),
      dark: false,
    },
    {
      title: "CALORIES BURNED",
      value: caloriesBurned,
      subtitle: (
        <>
          Avg{" "}
          <strong style={{ color: "#16803d" }}>
            {caloriesBurned} kcal
          </strong>{" "}
          per session
        </>
      ),
      dark: false,
    },
    {
      title: "ACTIVE WEEKS",
      value: `${activeWeeks}/${totalWeeks}`,
      subtitle: (
        <>
          Best:{" "}
          <strong style={{ color: "#16803d" }}>
            {bestWeekScore}% week score
          </strong>
        </>
      ),
      dark: false,
    },
  ];

  return (
    <Grid container spacing={1.5}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Box
            sx={{
              minHeight: 112,
              p: 1.5,
              borderRadius: "12px",
              border: "1px solid",
              borderColor: card.dark ? "#1a1714" : "#e0dbd4",
              backgroundColor: card.dark ? "#1a1714" : "#ffffff",
              boxShadow: "0 4px 14px rgba(26,23,20,.06)",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: 23,
                lineHeight: 1,
                fontWeight: 900,
                fontFamily: "monospace",
                color: card.dark ? "#ffffff" : "#1a1714",
              }}
            >
              {card.value}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 9,
                letterSpacing: 1.2,
                color: card.dark ? "#85817d" : "#77716b",
                fontWeight: 700,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              component="div"
              sx={{
                mt: 0.8,
                fontSize: 10,
                color: card.dark ? "#aaa49e" : "#77716b",
              }}
            >
              {card.subtitle}
            </Typography>

            {card.footer && (
              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 10,
                  color: "#ff5c35",
                  fontWeight: 700,
                }}
              >
                {card.footer}
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProgressSummaryCards;