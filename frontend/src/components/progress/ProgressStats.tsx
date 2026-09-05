import React from "react";
import { Box, Grid, Typography } from "@mui/material";

interface ProgressStatsProps {
  startingWeight: number;
  currentWeight: number;
  weightChange: number;
  height: number | null;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  startingWeight,
  currentWeight,
  weightChange,
  height,
}) => {
  /*
   * =========================================================
   * BMI
   * =========================================================
   *
   * BMI = weight / height²
   *
   * Height is received from backend in centimeters.
   * Current weight comes from the latest weekly weight entry.
   */

  const bmi =
    height &&
      height > 0 &&
      currentWeight > 0
      ? currentWeight /
      Math.pow(height / 100, 2)
      : null;

  const stats = [
    {
      label: "Starting Weight",
      value:
        startingWeight > 0
          ? `${startingWeight.toFixed(1)} kg`
          : "-",
      icon: "⚖",
    },
    {
      label: "Current Weight",
      value:
        currentWeight > 0
          ? `${currentWeight.toFixed(1)} kg`
          : "-",
      icon: "⚖",
    },
    {
      label: "Weight Change",
      value:
        `${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)} kg`,
      icon: "↗",
      valueColor:
        weightChange > 0
          ? "#c62828"
          : weightChange < 0
            ? "#16803d"
            : "#1a1714",
    },
    {
      label: "Height",
      value:
        height !== null &&
          height > 0
          ? `${height.toFixed(2)} cm`
          : "-",
      icon: "♙",
    },
    {
      label: "BMI",
      value:
        bmi !== null
          ? bmi.toFixed(1)
          : "-",
      icon: "▥",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={{
          xs: 0.8,
          sm: 1,
          md: 1.2,
        }}
      >
        {stats.map((stat) => (
          <Grid
            key={stat.label}
            size={{
              xs: 6,
              sm: 6,
              md: 2.4,
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: {
                  xs: 72,
                  sm: 78,
                  md: 82,
                },

                px: {
                  xs: 0.8,
                  sm: 1.2,
                  md: 1.4,
                },

                py: {
                  xs: 1,
                  sm: 1.1,
                  md: 1.2,
                },

                boxSizing: "border-box",

                backgroundColor: "#ffffff",

                border:
                  "1px solid #e0dbd4",

                borderRadius: "10px",

                boxShadow:
                  "0 4px 14px rgba(26,23,20,.05)",

                display: "flex",

                alignItems: "center",

                gap: {
                  xs: 0.7,
                  sm: 1,
                },

                overflow: "hidden",
              }}
            >
              {/* ICON */}

              <Box
                sx={{
                  flexShrink: 0,

                  width: {
                    xs: 30,
                    sm: 34,
                    md: 36,
                  },

                  height: {
                    xs: 30,
                    sm: 34,
                    md: 36,
                  },

                  borderRadius: "50%",

                  backgroundColor:
                    "#fff3ee",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  fontSize: {
                    xs: 15,
                    sm: 17,
                    md: 18,
                  },

                  color: "#ff5c35",
                }}
              >
                {stat.icon}
              </Box>

              {/* CONTENT */}

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 14,
                      sm: 16,
                      md: 17,
                    },

                    lineHeight: 1.05,

                    fontWeight: 900,

                    fontFamily: "monospace",

                    color:
                      stat.valueColor ??
                      "#1a1714",

                    whiteSpace:
                      "nowrap",

                    overflow: "hidden",

                    textOverflow:
                      "ellipsis",
                  }}
                >
                  {stat.value}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.45,

                    fontSize: {
                      xs: 8,
                      sm: 9,
                      md: 9.5,
                    },

                    lineHeight: 1.15,

                    color: "#77716b",

                    fontWeight: 500,

                    whiteSpace:
                      "nowrap",

                    overflow: "hidden",

                    textOverflow:
                      "ellipsis",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProgressStats;