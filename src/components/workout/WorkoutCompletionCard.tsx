import { Box, Typography } from "@mui/material";

interface WorkoutCompletionCardProps {
  dayNumber: number;
  month: number;
  week: number;
  earnedCalories: number;
}

const WorkoutCompletionCard = ({
  dayNumber,
  month,
  week,
  earnedCalories,
}: WorkoutCompletionCardProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          sm: 3,
          md: 3.5,
        },
        py: {
          xs: 2.2,
          sm: 2.5,
        },

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 2,

        border: "2px solid #62e899",
        borderRadius: "20px",

        backgroundColor: "#eafff1",

        boxSizing: "border-box",
      }}
    >
      {/* Left side */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            mr: 1.5,

            fontSize: {
              xs: 30,
              sm: 34,
            },

            lineHeight: 1,
          }}
        >
          🔥
        </Typography>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: {
                xs: 20,
                sm: 24,
              },

              lineHeight: 1.1,

              fontWeight: 900,

              color: "#16763d",
            }}
          >
            Day {dayNumber} Crushed!
          </Typography>

          <Typography
            sx={{
              mt: 0.35,

              fontSize: {
                xs: 12,
                sm: 14,
              },

              lineHeight: 1.2,

              color: "#16823f",
            }}
          >
            Synced to Month {month} · Week {week} automatically.
          </Typography>
        </Box>
      </Box>

      {/* Calories */}
      <Box
        sx={{
          flexShrink: 0,

          textAlign: "right",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 26,
            },

            lineHeight: 1,

            fontWeight: 900,

            color: "#ef2525",
          }}
        >
          {earnedCalories} kcal
        </Typography>

        <Typography
          sx={{
            mt: 0.5,

            fontSize: {
              xs: 10,
              sm: 12,
            },

            lineHeight: 1,

            letterSpacing: 1.2,

            color: "#68635e",
          }}
        >
          EST. BURNED
        </Typography>
      </Box>
    </Box>
  );
};

export default WorkoutCompletionCard;