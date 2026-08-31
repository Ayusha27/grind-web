import { Box, TextField, Typography } from "@mui/material";

interface WeeklyWeightTrackerProps {
  weights: Record<number, number | null>;
  onChange: (
    week: number,
    value: number | null
  ) => void;
}

const WeeklyWeightTracker = ({
  weights,
  onChange,
}: WeeklyWeightTrackerProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e0dbd4",
        borderRadius: "12px",
        p: 1.5,
        boxShadow: "0 4px 14px rgba(26,23,20,.05)",
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 900,
          color: "#1a1714",
          mb: 2,
        }}
      >
        Weekly Weight Tracker
      </Typography>

      {[1, 2, 3, 4].map((week) => (
        <Box
          key={week}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            "&:last-child": {
              mb: 0,
            },
          }}
        >
          <Typography
            sx={{
              width: 105,
              fontSize: 13,
              color: "#1a1714",
            }}
          >
            Week {week}
          </Typography>

          <TextField
            value={weights[week] ?? ""}
            placeholder="kg"
            type="number"
            onChange={(event) => {
              const value = event.target.value;

              onChange(
                week,
                value === "" ? null : Number(value)
              );
            }}
            size="small"
            sx={{
              width: 120,

              "& .MuiInputBase-root": {
                height: 36,
                borderRadius: 0,
                fontSize: 12,
              },

              "& input": {
                fontFamily: "monospace",
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyWeightTracker;