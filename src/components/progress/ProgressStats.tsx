import React from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

interface ProgressStatsProps {
  startingWeight: number;
  currentWeight: number;
  weightChange: number;
  height: string | null;
  bmi: string | number | null;
}

/**
 * =========================================================
 * HEIGHT
 * =========================================================
 *
 * Converts backend height such as:
 *
 * "6 ft 0 in"
 * "5 ft 10 in"
 *
 * into meters for BMI calculation.
 *
 * This conversion is ONLY used internally.
 * The displayed height remains exactly as received
 * from the backend.
 */
const heightToMeters = (
  height: string | null
): number | null => {
  if (!height) {
    return null;
  }

  const match = height.match(
    /(\d+(?:\.\d+)?)\s*ft(?:\s*(\d+(?:\.\d+)?)\s*in)?/i
  );

  if (!match) {
    return null;
  }

  const feet = Number(match[1]);
  const inches = Number(match[2] ?? 0);

  if (
    !Number.isFinite(feet) ||
    !Number.isFinite(inches)
  ) {
    return null;
  }

  const totalInches =
    feet * 12 + inches;

  return totalInches * 0.0254;
};

/**
 * =========================================================
 * BMI CALCULATION
 * =========================================================
 *
 * BMI = weight (kg) / height² (m)
 */
const calculateBMI = (
  weight: number,
  height: string | null
): number | null => {
  if (weight <= 0) {
    return null;
  }

  const heightInMeters =
    heightToMeters(height);

  if (
    heightInMeters === null ||
    heightInMeters <= 0
  ) {
    return null;
  }

  return (
    weight /
    Math.pow(heightInMeters, 2)
  );
};

/**
 * =========================================================
 * BMI CATEGORY
 * =========================================================
 */
const getBMICategory = (
  bmiValue: number | null
): {
  label: string;
  color: string;
  background: string;
} => {
  if (
    bmiValue === null ||
    !Number.isFinite(bmiValue)
  ) {
    return {
      label: "-",
      color: "#77716b",
      background: "#f5f2ed",
    };
  }

  if (bmiValue < 18.5) {
    return {
      label: "Underweight",
      color: "#9a6700",
      background: "#fff7dc",
    };
  }

  if (bmiValue < 25) {
    return {
      label: "Normal",
      color: "#16803d",
      background: "#eaf7ef",
    };
  }

  if (bmiValue < 30) {
    return {
      label: "Overweight",
      color: "#c56a00",
      background: "#fff1df",
    };
  }

  if (bmiValue < 35) {
    return {
      label: "Obese Class I",
      color: "#c62828",
      background: "#fff0ee",
    };
  }

  if (bmiValue < 40) {
    return {
      label: "Obese Class II",
      color: "#c62828",
      background: "#fff0ee",
    };
  }

  return {
    label: "Obese Class III",
    color: "#c62828",
    background: "#fff0ee",
  };
};

/**
 * =========================================================
 * NORMAL STAT CARD
 * =========================================================
 */

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}

const StatCard: React.FC<
  StatCardProps
> = ({
  label,
  value,
  icon,
  valueColor = "#1a1714",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        minHeight: {
          xs: 92,
          sm: 100,
          md: 116,
        },

        p: {
          xs: 1.4,
          sm: 1.6,
          md: 1.8,
        },

        boxSizing: "border-box",

        backgroundColor: "#ffffff",

        border:
          "1px solid #e3ddd6",

        borderRadius: "14px",

        boxShadow:
          "0 5px 18px rgba(26,23,20,.045)",

        display: "flex",

        alignItems: "center",

        gap: {
          xs: 1.1,
          sm: 1.3,
          md: 1.5,
        },

        transition:
          "transform 180ms ease, box-shadow 180ms ease",

        "&:hover": {
          transform:
            "translateY(-1px)",

          boxShadow:
            "0 8px 22px rgba(26,23,20,.07)",
        },
      }}
    >
      {/* ICON */}

      <Box
        sx={{
          flexShrink: 0,

          width: {
            xs: 42,
            sm: 46,
            md: 50,
          },

          height: {
            xs: 42,
            sm: 46,
            md: 50,
          },

          borderRadius: "50%",

          backgroundColor:
            "#fff3ee",

          color: "#ff5c35",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          "& svg": {
            fontSize: {
              xs: 21,
              sm: 23,
              md: 25,
            },
          },
        }}
      >
        {icon}
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
              xs: 17,
              sm: 19,
              md: 21,
            },

            lineHeight: 1.05,

            fontWeight: 900,

            fontFamily:
              "monospace",

            color: valueColor,

            whiteSpace: "nowrap",

            overflow: "hidden",

            textOverflow: "ellipsis",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 0.65,

            fontSize: {
              xs: 9,
              sm: 9.5,
              md: 10.5,
            },

            lineHeight: 1.2,

            color: "#77716b",

            fontWeight: 600,

            whiteSpace: "normal",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const ProgressStats: React.FC<
  ProgressStatsProps
> = ({
  startingWeight,
  currentWeight,
  weightChange,
  height,
  bmi,
}) => {
  /**
   * =========================================================
   * BMI
   * =========================================================
   */

  const calculatedBMI =
    calculateBMI(
      currentWeight,
      height
    );

  const backendBMI =
    bmi !== null &&
    bmi !== undefined &&
    bmi !== ""
      ? Number(bmi)
      : null;

  /**
   * =========================================================
   * BMI TREND
   * =========================================================
   *
   * Increase → RED
   * Decrease → GREEN
   * Same → NEUTRAL
   */

  const bmiChange =
    calculatedBMI !== null &&
    backendBMI !== null &&
    Number.isFinite(backendBMI)
      ? calculatedBMI - backendBMI
      : 0;

  const bmiValueColor =
    bmiChange > 0
      ? "#c62828"
      : bmiChange < 0
        ? "#16803d"
        : "#1a1714";

  /**
   * =========================================================
   * DISPLAYED BMI
   * =========================================================
   */

  const displayedBMI =
    calculatedBMI !== null
      ? calculatedBMI.toFixed(1)
      : backendBMI !== null &&
          Number.isFinite(
            backendBMI
          )
        ? backendBMI.toFixed(1)
        : "-";

  /**
   * =========================================================
   * BMI CATEGORY
   * =========================================================
   */

  const bmiCategory =
    getBMICategory(
      calculatedBMI !== null
        ? calculatedBMI
        : backendBMI
    );

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <Box
        sx={{
          mb: {
            xs: 1.5,
            sm: 1.8,
            md: 2,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 22,
              md: 25,
            },

            lineHeight: 1.1,

            fontWeight: 900,

            color: "#1a1714",

            letterSpacing:
              "-0.3px",
          }}
        >
          Progress Overview
        </Typography>

        <Typography
          sx={{
            mt: 0.6,

            fontSize: {
              xs: 10,
              sm: 11,
              md: 12,
            },

            lineHeight: 1.4,

            color: "#77716b",

            fontWeight: 500,
          }}
        >
          Track your key health metrics
          and see your progress over time.
        </Typography>
      </Box>

      {/* =====================================================
          METRICS GRID
          ===================================================== */}

      <Grid
        container
        spacing={{
          xs: 1,
          sm: 1.2,
          md: 1.4,
        }}
      >
        {/* ===================================================
            STARTING WEIGHT
            =================================================== */}

        <Grid
          size={{
            xs: 6,
            sm: 6,
            md: 2.4,
          }}
        >
          <StatCard
            label="Starting Weight"
            value={
              startingWeight > 0
                ? `${startingWeight.toFixed(1)} kg`
                : "-"
            }
            icon={
              <MonitorWeightOutlinedIcon />
            }
          />
        </Grid>

        {/* ===================================================
            CURRENT WEIGHT
            =================================================== */}

        <Grid
          size={{
            xs: 6,
            sm: 6,
            md: 2.4,
          }}
        >
          <StatCard
            label="Current Weight"
            value={
              currentWeight > 0
                ? `${currentWeight.toFixed(1)} kg`
                : "-"
            }
            icon={
              <MonitorWeightOutlinedIcon />
            }
          />
        </Grid>

        {/* ===================================================
            WEIGHT CHANGE
            =================================================== */}

        <Grid
          size={{
            xs: 6,
            sm: 6,
            md: 2.4,
          }}
        >
          <StatCard
            label="Weight Change"
            value={
              `${
                weightChange > 0
                  ? "+"
                  : ""
              }${weightChange.toFixed(1)} kg`
            }
            valueColor={
              weightChange > 0
                ? "#c62828"
                : weightChange < 0
                  ? "#16803d"
                  : "#1a1714"
            }
            icon={
              <TrendingUpOutlinedIcon />
            }
          />
        </Grid>

        {/* ===================================================
            HEIGHT
            =================================================== */}

        <Grid
          size={{
            xs: 6,
            sm: 6,
            md: 2.4,
          }}
        >
          <StatCard
            label="Height"
            value={
              height ?? "-"
            }
            icon={
              <StraightenOutlinedIcon />
            }
          />
        </Grid>

        {/* ===================================================
            BMI
            =================================================== */}

        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 2.4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",

              minHeight: {
                xs: 100,
                sm: 108,
                md: 116,
              },

              p: {
                xs: 1.4,
                sm: 1.6,
                md: 1.8,
              },

              boxSizing: "border-box",

              backgroundColor:
                "#ffffff",

              border:
                "1px solid #e3ddd6",

              borderRadius: "14px",

              boxShadow:
                "0 5px 18px rgba(26,23,20,.045)",

              display: "flex",

              alignItems: "center",

              gap: {
                xs: 1.1,
                sm: 1.3,
                md: 1.5,
              },

              overflow: "hidden",
            }}
          >
            {/* =================================================
                BMI ICON
                ================================================= */}

            <Box
              sx={{
                flexShrink: 0,

                width: {
                  xs: 42,
                  sm: 46,
                  md: 50,
                },

                height: {
                  xs: 42,
                  sm: 46,
                  md: 50,
                },

                borderRadius: "50%",

                backgroundColor:
                  "#fff3ee",

                color: "#ff5c35",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                "& svg": {
                  fontSize: {
                    xs: 21,
                    sm: 23,
                    md: 25,
                  },
                },
              }}
            >
              <FitnessCenterOutlinedIcon />
            </Box>

            {/* =================================================
                BMI VALUE
                ================================================= */}

            <Box
              sx={{
                minWidth: 0,
                flexShrink: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 22,
                    md: 24,
                  },

                  lineHeight: 1.05,

                  fontWeight: 900,

                  fontFamily:
                    "monospace",

                  color:
                    bmiValueColor,

                  whiteSpace:
                    "nowrap",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",
                }}
              >
                {displayedBMI}
              </Typography>

              <Typography
                sx={{
                  mt: 0.6,

                  fontSize: {
                    xs: 9,
                    sm: 9.5,
                    md: 10.5,
                  },

                  lineHeight: 1.2,

                  color: "#77716b",

                  fontWeight: 600,
                }}
              >
                BMI
              </Typography>
            </Box>

            {/* =================================================
                BMI STATUS
                ================================================= */}

            <Box
              sx={{
                /*
                 * Push status to the right while allowing
                 * it to shrink when space is limited.
                 */
                marginLeft: "auto",

                flex: {
                  xs: "0 1 46%",
                  sm: "0 1 42%",
                  md: "0 1 48%",
                },

                minWidth: 0,

                boxSizing:
                  "border-box",

                px: {
                  xs: 1,
                  sm: 1.2,
                  md: 1.3,
                },

                py: {
                  xs: 0.8,
                  sm: 0.9,
                  md: 1,
                },

                borderRadius:
                  "10px",

                backgroundColor:
                  bmiCategory.background,

                display: "flex",

                alignItems:
                  "center",

                gap: 0.7,

                overflow: "hidden",
              }}
            >
              {/* STATUS DOT */}

              <Box
                sx={{
                  width: {
                    xs: 10,
                    sm: 11,
                    md: 12,
                  },

                  height: {
                    xs: 10,
                    sm: 11,
                    md: 12,
                  },

                  flexShrink: 0,

                  borderRadius:
                    "50%",

                  backgroundColor:
                    bmiCategory.color,
                }}
              />

              {/* STATUS TEXT */}

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {bmiCategory.label.startsWith(
                  "Obese"
                ) ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 10,
                          sm: 11,
                          md: 12,
                        },

                        lineHeight: 1.1,

                        fontWeight: 800,

                        color:
                          bmiCategory.color,

                        whiteSpace:
                          "nowrap",

                        overflow:
                          "hidden",

                        textOverflow:
                          "ellipsis",
                      }}
                    >
                      Obese
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.25,

                        fontSize: {
                          xs: 10,
                          sm: 11,
                          md: 12,
                        },

                        lineHeight: 1.1,

                        fontWeight: 800,

                        color:
                          bmiCategory.color,

                        whiteSpace:
                          "nowrap",

                        overflow:
                          "hidden",

                        textOverflow:
                          "ellipsis",
                      }}
                    >
                      {bmiCategory.label.replace(
                        "Obese ",
                        ""
                      )}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 10,
                        sm: 11,
                        md: 12,
                      },

                      lineHeight: 1.1,

                      fontWeight: 800,

                      color:
                        bmiCategory.color,

                      whiteSpace:
                        "nowrap",

                      overflow:
                        "hidden",

                      textOverflow:
                        "ellipsis",
                    }}
                  >
                    {bmiCategory.label}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressStats;