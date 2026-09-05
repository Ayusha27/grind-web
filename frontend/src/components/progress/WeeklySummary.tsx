import { Box, Typography } from "@mui/material";

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
      color: "#1a1714",
    },
    {
      value: caloriesBurned,
      label: "CALORIES BURNED",
      color: "#1a1714",
    },
    {
      value: `${weekScore}%`,
      label: "WEEK SCORE",
      color: "#ef3030",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #e0dbd4",
        borderRadius: "12px",
        boxShadow:
          "0 4px 14px rgba(26,23,20,.05)",
        overflow: "hidden",

        /*
         * Always keep three columns.
         *
         * This means the layout stays compact
         * even on mobile screens.
         */
        display: "grid",
        gridTemplateColumns:
          "repeat(3, minmax(0, 1fr))",
      }}
    >
      {cards.map((card, index) => (
        <Box
          key={card.label}
          sx={{
            minWidth: 0,

            minHeight: {
              xs: 66,
              sm: 72,
              md: 78,
            },

            px: {
              xs: 0.5,
              sm: 1,
              md: 1.5,
            },

            py: {
              xs: 1,
              sm: 1.2,
              md: 1.5,
            },

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            /*
             * Divider between the three sections.
             */
            borderLeft:
              index === 0
                ? "none"
                : "1px solid #e0dbd4",
          }}
        >
          {/* VALUE */}

          <Typography
            sx={{
              fontSize: {
                xs: 17,
                sm: 19,
                md: 20,
              },

              lineHeight: 1,
              fontFamily: "monospace",
              fontWeight: 900,

              color: card.color,

              textAlign: "center",

              whiteSpace: "nowrap",
            }}
          >
            {card.value}
          </Typography>

          {/* LABEL */}

          <Typography
            sx={{
              mt: {
                xs: 0.5,
                sm: 0.6,
                md: 0.6,
              },

              fontSize: {
                xs: 7,
                sm: 8,
                md: 9,
              },

              lineHeight: 1.2,

              letterSpacing: {
                xs: 0.6,
                sm: 0.8,
                md: 1,
              },

              color: "#77716b",

              fontWeight: 700,

              textAlign: "center",

              whiteSpace: "nowrap",
            }}
          >
            {card.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WeeklySummary;