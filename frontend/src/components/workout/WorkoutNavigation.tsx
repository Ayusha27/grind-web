import { Box, Button, Stack, Typography } from "@mui/material";

interface WorkoutNavigationProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const WorkoutNavigation = ({
  selectedDay,
  onDayChange,
}: WorkoutNavigationProps) => {
  const days = [
    {
      number: 1,
      label: "MONDAY - LOWER BODY STRENGTH",
    },
    {
      number: 2,
      label: "TUESDAY - UPPER BODY PUSH",
    },
    {
      number: 3,
      label: "WEDNESDAY - FULL BODY CONDITIONING",
    },
    {
      number: 4,
      label: "THURSDAY - UPPER BODY PULL",
    },
    {
      number: 5,
      label: "FRIDAY - GLUTES AND HIIT",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#171716",
        color: "#fff",
      }}
    >
      {/* Month / Week */}
      <Box
        sx={{
          height: 58,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #292929",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: 1.5,
              color: "#777",
              textTransform: "uppercase",
            }}
          >
            Logging to
          </Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 90,
              height: 34,
              borderRadius: 1.5,
              color: "#fff",
              borderColor: "#3a3a3a",
              textTransform: "none",
              fontSize: 13,
            }}
          >
            Month 1
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 75,
              height: 34,
              borderRadius: 1.5,
              color: "#fff",
              borderColor: "#3a3a3a",
              textTransform: "none",
              fontSize: 13,
            }}
          >
            Week 3
          </Button>
        </Stack>

        <Typography
          sx={{
            fontSize: 11,
            color: "#ff5b3d",
          }}
        >
          • Auto-syncing to Progress
        </Typography>
      </Box>

      {/* Main tabs */}
      <Box
        sx={{
          height: 64,
          px: 3,
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid #292929",
        }}
      >
        <Box
          sx={{
            width: 105,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "3px solid #ff5938",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.8,
            }}
          >
            🏋️ WORKOUT
          </Typography>
        </Box>

        <Box
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#666",
              fontWeight: 600,
            }}
          >
            🍴 DIET
          </Typography>
        </Box>

        <Box
          sx={{
            width: 115,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#666",
              fontWeight: 600,
            }}
          >
            📊 PROGRESS
          </Typography>
        </Box>
      </Box>

      {/* Workout days */}
      <Box
        sx={{
          height: 84,
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            minWidth: "max-content",
            height: "100%",
          }}
        >
          {days.map((day) => {
            const active = selectedDay === day.number;

            return (
              <Box
                key={day.number}
                onClick={() =>
                  onDayChange(day.number)
                }
                sx={{
                  width: {
                    xs: 190,
                    md: 250,
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",

                  borderBottom: active
                    ? "3px solid #ff5938"
                    : "3px solid transparent",

                  transition: "0.15s",

                  "&:hover": {
                    backgroundColor: "#1d1d1c",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: active
                      ? "#fff"
                      : "#666",
                  }}
                >
                  {day.number}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: 1,
                    color: active
                      ? "#fff"
                      : "#666",
                    whiteSpace: "nowrap",
                  }}
                >
                  {day.label}
                </Typography>

                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#ff5938",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default WorkoutNavigation;