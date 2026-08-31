import { Box, Stack, Typography } from "@mui/material";

interface CalorieBannerProps {
  minCalories?: number;
  maxCalories?: number;
  earnedCalories?: number;
}

const CalorieBanner = ({
  minCalories = 250,
  maxCalories = 350,
  earnedCalories = 0,
}: CalorieBannerProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #ffb8a8",
        borderRadius: "10px",
        backgroundColor: "#fff",
        px: 2,
        py: 1.25,
      }}
    >
      <Stack
        direction="row"
        sx={{
            alignItems: "center",
            justifyContent: "space-between",
        }} 
      >
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            alignItems: "center",
            }}
        >
          <Typography
            sx={{
              fontSize: 23,
              lineHeight: 1,
            }}
          >
            🔥
          </Typography>

          <Box>
            <Typography
              sx={{
                color: "#ff5a36",
                fontSize: 16,
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              {minCalories}–{maxCalories} kcal
            </Typography>

            <Typography
              sx={{
                color: "#777",
                fontSize: 9,
                mt: 0.3,
              }}
            >
              Estimated range · Workout Day
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            backgroundColor: "#fff1ed",
            borderRadius: "14px",
            px: 1.5,
            py: 0.5,
          }}
        >
          <Typography
            sx={{
              color: "#ff5a36",
              fontSize: 9,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Earned: {earnedCalories} kcal
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CalorieBanner;