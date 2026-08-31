import { Box, Grid, Typography } from "@mui/material";

interface ProgressStatsProps {
  startingWeight: number;
  currentWeight: number;
  weightChange: number;
}

const ProgressStats = ({
  startingWeight,
  currentWeight,
  weightChange,
}: ProgressStatsProps) => {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            height: 78,
            backgroundColor: "#ffffff",
            border: "1px solid #e0dbd4",
            borderRadius: "12px",
            px: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(26,23,20,.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1,
              fontWeight: 900,
              fontFamily: "monospace",
              color: "#1a1714",
            }}
          >
            {startingWeight} kg
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: 10,
              letterSpacing: 1.2,
              color: "#77716b",
              fontWeight: 700,
            }}
          >
            STARTING WEIGHT
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            height: 78,
            backgroundColor: "#ffffff",
            border: "1px solid #e0dbd4",
            borderRadius: "12px",
            px: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(26,23,20,.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1,
              fontWeight: 900,
              fontFamily: "monospace",
              color: "#1a1714",
            }}
          >
            {currentWeight} kg
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: 10,
              letterSpacing: 1.2,
              color: "#77716b",
              fontWeight: 700,
            }}
          >
            CURRENT WEIGHT
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            height: 78,
            backgroundColor: "#ffffff",
            border: "1px solid #e0dbd4",
            borderRadius: "12px",
            px: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(26,23,20,.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1,
              fontWeight: 900,
              fontFamily: "monospace",
              color: weightChange < 0 ? "#16b85a" : "#ef2b2b",
            }}
          >
            {weightChange > 0 ? "+" : ""}
            {weightChange.toFixed(1)} kg
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: 10,
              letterSpacing: 1.2,
              color: "#77716b",
              fontWeight: 700,
            }}
          >
            WEIGHT CHANGE
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProgressStats;