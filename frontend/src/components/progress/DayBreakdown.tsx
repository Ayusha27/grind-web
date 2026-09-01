import { Box, Grid, Typography } from "@mui/material";
import type { DayProgress } from "../../pages/client/progress/progressMockData";

interface DayBreakdownProps {
  week: number;
  days: DayProgress[];
}

const DAY_COLORS = [
  "#ff6b4a",
  "#6395ff",
  "#48bd78",
  "#b46cf2",
  "#ff8050",
  "#51b7b2",
];

const DayBreakdown = ({
  week,
  days,
}: DayBreakdownProps) => {
  return (
    <Box>
      <Typography
        sx={{
          mb: 1.5,
          fontSize: 15,
          fontWeight: 900,
          color: "#1a1714",
        }}
      >
        Week {week} — Day Breakdown
      </Typography>

      <Grid container spacing={1.2}>
        {days.map((day, index) => (
          <Grid
            key={day.day}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                minHeight: 136,
                backgroundColor: "#ffffff",
                border: "1px solid #e0dbd4",
                borderRadius: "12px",
                p: 1.2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 14px rgba(26,23,20,.05)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  lineHeight: 1,
                  color: "#77716b",
                  fontWeight: 400,
                }}
              >
                —
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 12,
                  fontWeight: 900,
                  color: "#77716b",
                }}
              >
                Day {day.day}
              </Typography>

              <Typography
                sx={{
                  mt: 0.6,
                  minHeight: 25,
                  fontSize: 8.5,
                  lineHeight: 1.25,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  color: DAY_COLORS[index],
                }}
              >
                {day.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.6,
                  fontSize: 9,
                  color: "#aaa39c",
                  fontFamily: "monospace",
                }}
              >
                Completion:{" "}
                {day.completion !== null
                  ? `${day.completion}%`
                  : "-"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 9,
                  color: "#aaa39c",
                  fontFamily: "monospace",
                }}
              >
                Calories:{" "}
                {day.calories !== null
                  ? day.calories
                  : "-"}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: 4,
                  mt: "auto",
                  borderRadius: 3,
                  backgroundColor: "#ebe7e1",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DayBreakdown;