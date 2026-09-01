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
        width: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #e0dbd4",
        borderRadius: "12px",
        p: 1.5,
        boxShadow:
          "0 4px 14px rgba(26,23,20,.05)",
      }}
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

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

      {/* =====================================================
          WEEKLY WEIGHT INPUTS
      ===================================================== */}

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
          {/* WEEK LABEL */}

          <Typography
            sx={{
              width: 105,
              fontSize: 13,
              color: "#1a1714",
              fontWeight: 500,
            }}
          >
            Week {week}
          </Typography>

          {/* WEIGHT INPUT */}

          <TextField
            value={weights[week] ?? ""}
            placeholder="kg"
            type="number"
            onChange={(event) => {
              const value =
                event.target.value;

              onChange(
                week,
                value === ""
                  ? null
                  : Number(value)
              );
            }}
            size="small"
            sx={{
              width: 120,

              /* Input container */
              "& .MuiInputBase-root": {
                height: 36,
                borderRadius: 0,
                fontSize: 12,
                color: "#000000",
                backgroundColor:
                  "#ffffff",
              },

              /* Normal border */
              "& .MuiOutlinedInput-notchedOutline":
                {
                  borderColor:
                    "#000000",
                  borderWidth: "1px",
                },

              /* Hover border */
              "&:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor:
                    "#000000",
                  borderWidth: "1px",
                },

              /* Focused border */
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor:
                    "#000000",
                  borderWidth: "1px",
                },

              /* Entered text */
              "& input": {
                fontFamily:
                  "monospace",
                color: "#000000",
                WebkitTextFillColor:
                  "#000000",
              },

              /* Placeholder */
              "& input::placeholder":
                {
                  color: "#000000",
                  opacity: 0.5,
                },

              /* Remove number spinner appearance */
              "& input::-webkit-outer-spin-button":
                {
                  WebkitAppearance:
                    "none",
                  margin: 0,
                },

              "& input::-webkit-inner-spin-button":
                {
                  WebkitAppearance:
                    "none",
                  margin: 0,
                },

              "& input[type=number]": {
                MozAppearance:
                  "textfield",
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyWeightTracker;