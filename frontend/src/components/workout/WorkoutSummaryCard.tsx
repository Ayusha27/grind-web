import { Box, Button, Typography } from "@mui/material";

interface WorkoutSummaryCardProps {
  dayNumber: number;
  title: string;
  exerciseCount: number;
  totalSets: number;
  completedSets: number;
  onReset: () => void;
}

const WorkoutSummaryCard = ({
  dayNumber,
  title,
  exerciseCount,
  totalSets,
  completedSets,
  onReset,
}: WorkoutSummaryCardProps) => {
  const completionPercentage =
    totalSets > 0
      ? Math.round((completedSets / totalSets) * 100)
      : 0;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: {
          xs: 190,
          sm: 205,
        },
        p: {
          xs: 2.5,
          sm: 3,
          md: 3.5,
        },

        backgroundColor: "#ffffff",
        border: "1px solid #ddd9d4",
        borderRadius: "15px",

        boxShadow:
          "0 4px 14px rgba(30, 25, 20, 0.06)",

        overflow: "hidden",
      }}
    >
      {/* Subtle decorative background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 75,
          height: 75,
          background:
            "linear-gradient(135deg, transparent 50%, #fff5f1 50%)",
          opacity: 0.8,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pr: {
            xs: 9,
            sm: 12,
          },
        }}
      >
        {/* Day badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.6,

            px: 1.5,
            py: 0.6,

            borderRadius: 10,
            backgroundColor: "#fff0eb",

            color: "#ff5735",

            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.4,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: 9,
            }}
          >
            ●
          </Box>

          DAY {dayNumber}
        </Box>

        {/* Title */}
        <Typography
          sx={{
            mt: 1.2,

            fontSize: {
              xs: 23,
              sm: 27,
              md: 29,
            },

            lineHeight: 1.15,
            fontWeight: 900,
            color: "#1c1b19",
          }}
        >
          {title}
        </Typography>

        {/* Stats */}
        <Box
          sx={{
            mt: 1,

            display: "flex",
            flexWrap: "wrap",
            gap: {
              xs: 1.5,
              sm: 2,
            },
          }}
        >
          <SummaryStat
            value={exerciseCount}
            label="exercises"
          />

          <SummaryStat
            value={totalSets}
            label="total sets"
          />

          <SummaryStat
            value={completedSets}
            label="done"
          />
        </Box>
      </Box>

      {/* Progress ring */}
      <Box
        sx={{
          position: "absolute",
          top: {
            xs: 25,
            sm: 28,
          },
          right: {
            xs: 18,
            sm: 25,
          },

          width: {
            xs: 70,
            sm: 82,
          },
          height: {
            xs: 70,
            sm: 82,
          },

          borderRadius: "50%",

          background: `conic-gradient(
            #ff5b38 ${completionPercentage * 3.6}deg,
            #dfdcd7 ${completionPercentage * 3.6}deg
          )`,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 10px)",
            height: "calc(100% - 10px)",

            borderRadius: "50%",
            backgroundColor: "#ffffff",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 17,
              },
              lineHeight: 1,
              fontWeight: 900,
              color: "#252321",
            }}
          >
            {completionPercentage}%
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 9,
              color: "#6f6b67",
            }}
          >
            {completedSets}/{totalSets}
          </Typography>
        </Box>
      </Box>

      {/* Reset button */}
      <Button
        onClick={onReset}
        variant="outlined"
        size="small"
        sx={{
          position: "absolute",
          right: {
            xs: 18,
            sm: 25,
          },
          bottom: {
            xs: 18,
            sm: 24,
          },

          minWidth: 100,

          borderColor: "#d8d3cd",
          borderRadius: "9px",

          color: "#706b67",

          fontSize: 11,
          fontWeight: 700,
          textTransform: "none",

          "&:hover": {
            borderColor: "#ff5b38",
            color: "#ff5b38",
            backgroundColor: "#fff8f5",
          },
        }}
      >
        ↻ Reset Day
      </Button>
    </Box>
  );
};

interface SummaryStatProps {
  value: number;
  label: string;
}

const SummaryStat = ({
  value,
  label,
}: SummaryStatProps) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: {
          xs: 12,
          sm: 14,
        },
        color: "#5d5955",
      }}
    >
      <Box
        component="span"
        sx={{
          mr: 0.5,
          fontWeight: 900,
          color: "#252321",
        }}
      >
        {value}
      </Box>

      {label}
    </Typography>
  );
};

export default WorkoutSummaryCard;