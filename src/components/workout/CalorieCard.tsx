import { Box, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface CalorieCardProps {
  minimumCalories: number;
  maximumCalories: number;
  earnedCalories: number;
}

const CalorieCard = ({
  minimumCalories,
  maximumCalories,
  earnedCalories,
}: CalorieCardProps) => {
  return (
    <Box
      sx={{
        minHeight: 82,
        px: {
          xs: 2,
          sm: 2.5,
        },

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,

        border: "2px solid #ffc1b4",
        borderRadius: "14px",

        backgroundColor: "#fffdfc",
      }}
    >
      {/* Left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: { xs: 38, sm: 44 },
            height: { xs: 38, sm: 44 },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            backgroundColor: "transparent",
          }}
        >
          <WhatshotIcon sx={{ color: "#ff7417", fontSize: { xs: 22, sm: 26 } }} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 20,
                sm: 24,
              },
              lineHeight: 1,
              fontWeight: 900,
              color: "#e93320",
            }}
          >
            {minimumCalories}–{maximumCalories} kcal
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 12,
              color: "#6d6863",
            }}
          >
            Estimated range · Workout Day
          </Typography>
        </Box>
      </Box>

      {/* Earned */}
      <Box
        sx={{
          flexShrink: 0,
          px: {
            xs: 1.2,
            sm: 1.5,
          },
          py: 0.7,

          borderRadius: 10,

          backgroundColor: "#fff0ed",

          color: "#ed3021",

          fontSize: {
            xs: 10,
            sm: 12,
          },

          fontWeight: 800,
        }}
      >
        Earned: {earnedCalories} kcal
      </Box>
    </Box>
  );
};

export default CalorieCard;