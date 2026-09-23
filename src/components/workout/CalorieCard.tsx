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

        border:
          "2px solid rgba(255, 92, 53, 0.35)",

        borderRadius: "14px",

        backgroundColor: "#FFFFFF",
      }}
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: 1.5,

          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 38,
              sm: 44,
            },

            height: {
              xs: 38,
              sm: 44,
            },

            flexShrink: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "10px",

            backgroundColor:
              "rgba(255, 92, 53, 0.08)",
          }}
        >
          <WhatshotIcon
            sx={{
              color: "#FF5C35",

              fontSize: {
                xs: 22,
                sm: 26,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          {/* CALORIE RANGE */}

          <Typography
            sx={{
              fontFamily:
                "'JetBrains Mono', monospace",

              fontSize: {
                xs: 16,
                sm: 19,
              },

              lineHeight: 1,

              fontWeight: 700,

              color: "#13131A",

              whiteSpace: "nowrap",
            }}
          >
            {minimumCalories}–
            {maximumCalories} kcal
          </Typography>

          {/* DESCRIPTION */}

          <Typography
            sx={{
              mt: 0.4,

              fontFamily:
                "'Archivo', sans-serif",

              fontSize: {
                xs: 9,
                sm: 10,
              },

              lineHeight: 1.3,

              fontWeight: 400,

              color: "#4C4A49",
            }}
          >
            Estimated range · Workout Day
          </Typography>
        </Box>
      </Box>

      {/* =====================================================
          EARNED
      ===================================================== */}

      <Box
        sx={{
          flexShrink: 0,

          px: {
            xs: 1.2,
            sm: 1.5,
          },

          py: 0.7,

          borderRadius: "10px",

          backgroundColor:
            "rgba(255, 92, 53, 0.08)",

          color: "#FF5C35",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily:
              "'Archivo', sans-serif",

            fontSize: {
              xs: 9,
              sm: 10,
            },

            fontWeight: 600,

            whiteSpace: "nowrap",
          }}
        >
          Earned:{" "}
        </Typography>

        <Typography
          component="span"
          sx={{
            fontFamily:
              "'JetBrains Mono', monospace",

            fontSize: {
              xs: 10,
              sm: 12,
            },

            fontWeight: 700,

            whiteSpace: "nowrap",
          }}
        >
          {earnedCalories} kcal
        </Typography>
      </Box>
    </Box>
  );
};

export default CalorieCard;