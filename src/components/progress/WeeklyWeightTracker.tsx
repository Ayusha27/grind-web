import {
  Box,
  TextField,
  Typography,
} from "@mui/material";

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

        border: "1px solid #4C4A49",

        borderRadius: "12px",

        p: {
          xs: 1.5,
          sm: 1.8,
          md: 2,
        },

        boxShadow:
          "0 4px 14px rgba(26,23,20,.05)",

        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

      <Typography
        sx={{
          fontFamily:
            "Archivo Black, sans-serif",

          fontSize: {
            xs: 13,
            sm: 14,
            md: 15,
          },

          lineHeight: 1.2,

          fontWeight: 900,

          color: "#13131A",

          mb: {
            xs: 1.5,
            sm: 1.8,
            md: 2,
          },
        }}
      >
        Weekly Weight Tracker
      </Typography>

      {/* =====================================================
          WEEKLY WEIGHT INPUTS
      ===================================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },

          gap: {
            xs: 1,
            sm: 1.2,
            md: 1.5,
          },
        }}
      >
        {[1, 2, 3, 4].map(
          (week) => (
            <Box
              key={week}
              sx={{
                display: "flex",

                alignItems: "center",

                gap: {
                  xs: 1,
                  sm: 1.2,
                },

                minWidth: 0,
              }}
            >
              {/* WEEK LABEL */}

              <Typography
                sx={{
                  flexShrink: 0,

                  fontFamily:
                    "Archivo, sans-serif",

                  fontSize: {
                    xs: 11,
                    sm: 12,
                    md: 13,
                  },

                  lineHeight: 1.2,

                  color: "#13131A",

                  fontWeight: 700,
                }}
              >
                Week {week}
              </Typography>

              {/* WEIGHT INPUT */}

              <TextField
                fullWidth
                value={
                  weights[week] ?? ""
                }
                placeholder="kg"
                type="number"
                onChange={(
                  event
                ) => {
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
                  minWidth: 0,

                  "& .MuiInputBase-root": {
                    height: {
                      xs: 36,
                      sm: 38,
                      md: 40,
                    },

                    borderRadius: "6px",

                    backgroundColor:
                      "#ffffff",

                    color: "#13131A",

                    fontFamily:
                      "JetBrains Mono, monospace",

                    fontSize: 12,
                  },

                  /* Normal border */

                  "& .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        "1px solid #4C4A49 !important",
                    },

                  /* Hover border */

                  "&:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        "1px solid #4C4A49 !important",
                    },

                  /* Focus border */

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        "1px solid #FF5C35 !important",
                    },

                  /* Input */

                  "& .MuiOutlinedInput-input":
                    {
                      color:
                        "#13131A !important",

                      WebkitTextFillColor:
                        "#13131A !important",

                      fontFamily:
                        "JetBrains Mono, monospace",

                      fontSize: 12,
                    },

                  /* Placeholder */

                  "& input::placeholder": {
                    color:
                      "#4C4A49 !important",

                    opacity: 1,

                    fontFamily:
                      "JetBrains Mono, monospace",
                  },

                  /* Remove number spinner */

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
          )
        )}
      </Box>
    </Box>
  );
};

export default WeeklyWeightTracker;