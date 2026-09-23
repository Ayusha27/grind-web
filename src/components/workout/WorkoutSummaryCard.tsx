import type { ReactNode } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

interface WorkoutSummaryCardProps {
  dayNumber: number;
  title: string;
  exerciseCount: number;
  totalSets: number;
  completedSets: number;
  minimumCalories: number;
  maximumCalories: number;
  earnedCalories: number;
}

interface SummaryStatProps {
  value: number;
  label: string;
  icon: ReactNode;
  iconColor?: string;
}

const SummaryStat = ({
  value,
  label,
  icon,
  iconColor = "#ff5b38",
}: SummaryStatProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: {
          xs: 0.55,
          sm: 0.7,
          md: 0.8,
        },

        minWidth: 0,
      }}
    >
      {/* Icon */}

      <Box
        sx={{
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: iconColor,

          "& svg": {
            fontSize: {
              xs: 18,
              sm: 20,
              md: 21,
            },
          },
        }}
      >
        {icon}
      </Box>

      {/* Value + label */}

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily:
              "'JetBrains Mono', monospace",

            fontSize: {
              xs: 11,
              sm: 12,
              md: 13,
            },

            lineHeight: 1.1,

            fontWeight: 700,

            color: "#13131A",

            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>

        <Typography
          component="span"
          sx={{
            ml: 0.4,

            fontFamily:
              "'Archivo', sans-serif",

            fontSize: {
              xs: 9,
              sm: 10,
              md: 11,
            },

            lineHeight: 1.1,

            color: "#4C4A49",

            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const WorkoutSummaryCard = ({
  dayNumber,
  title,
  exerciseCount,
  totalSets,
  completedSets,
  minimumCalories,
  maximumCalories,
  earnedCalories,
}: WorkoutSummaryCardProps) => {
  /*
   * =========================================================
   * COMPLETION
   * =========================================================
   *
   * Existing functionality preserved.
   */

  const completionPercentage =
    totalSets > 0
      ? Math.round(
          (completedSets / totalSets) * 100
        )
      : 0;

  /*
   * =========================================================
   * STATS
   * =========================================================
   *
   * Keeping these in one configuration array
   * avoids repeating the same JSX.
   */

  const summaryStats = [
    {
      value: exerciseCount,
      label: "exercises",
      icon: (
        <FitnessCenterOutlinedIcon />
      ),
      iconColor: "#ff5b38",
    },
    {
      value: totalSets,
      label: "total sets",
      icon: (
        <LayersOutlinedIcon />
      ),
      iconColor: "#ff5b38",
    },
    {
      value: completedSets,
      label: "done",
      icon: (
        <CheckCircleOutlinedIcon />
      ),
      iconColor: "#77716b",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",

        position: "relative",

        boxSizing: "border-box",

        backgroundColor: "#ffffff",

        border:
          "1px solid #ddd9d4",

        borderRadius: {
          xs: "14px",
          sm: "15px",
        },

        boxShadow:
          "0 4px 14px rgba(30, 25, 20, 0.05)",

        overflow: "hidden",

        p: {
          xs: 1.8,
          sm: 2.2,
          md: 2.6,
        },
      }}
    >
      {/* =====================================================
          SUBTLE CORNER ACCENT
          ===================================================== */}

      <Box
        sx={{
          position: "absolute",

          top: 0,
          right: 0,

          width: {
            xs: 50,
            sm: 60,
            md: 70,
          },

          height: {
            xs: 50,
            sm: 60,
            md: 70,
          },

          background:
            "linear-gradient(135deg, transparent 50%, #fff7f3 50%)",

          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <Box
        sx={{
          position: "relative",

          zIndex: 1,

          display: "grid",

          /*
           * Mobile:
           *
           * ┌──────────────────────┐
           * │ Day + title       ○  │
           * │                   ○  │
           * │ stats           Reset│
           * └──────────────────────┘
           *
           * Desktop:
           *
           * ┌─────────────────────────────┐
           * │ Day + title       ○         │
           * │ stats             Reset     │
           * └─────────────────────────────┘
           */
          gridTemplateColumns: {
            xs: "minmax(0, 1fr) 78px",
            sm: "minmax(0, 1fr) 90px",
            md: "minmax(0, 1fr) 100px",
          },

          columnGap: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },

          rowGap: {
            xs: 1.3,
            sm: 1.5,
            md: 1.7,
          },
        }}
      >
        {/* ===================================================
            DAY + TITLE
            =================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "1 / -1",
              md: "1",
            },

            gridRow: {
              xs: "1",
              md: "1",
            },

            minWidth: 0,
          }}
        >
          {/* DAY BADGE */}

          <Box
            sx={{
              display: "inline-flex",

              alignItems: "center",

              gap: 0.55,

              px: {
                xs: 1.1,
                sm: 1.25,
              },

              py: {
                xs: 0.45,
                sm: 0.5,
              },

              borderRadius:
                "999px",

              backgroundColor:
                "#fff1ec",

              color: "#ff5735",

              fontSize: {
                xs: 10,
                sm: 11,
              },
              fontFamily:
                "'Archivo', sans-serif",
              fontWeight: 800,

              letterSpacing: 0.3,
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: 6,

                lineHeight: 1,
              }}
            >
              ●
            </Box>

            DAY {dayNumber}
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              mt: {
                xs: 0.9,
                sm: 1,
                md: 1.1,
              },

              fontFamily:
                "'Archivo Black', sans-serif",

              fontSize: {
                xs: 20,
                sm: 22,
                md: 24,
              },

              lineHeight: 1.12,

              fontWeight: 400,

              letterSpacing: "-0.25px",

              color: "#13131A",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* ===================================================
            STATS
            =================================================== */}

        <Box
          sx={{
            gridColumn: "1",

            gridRow: {
              xs: "2",
              md: "2",
            },

            minWidth: 0,

            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },

            alignItems: {
              xs: "flex-start",
              sm: "center",
              md: "center",
            },

            gap: {
              xs: 0.9,
              sm: 0,
              md: 0,
            },

            /*
             * Keeps the stats compact on mobile
             * while allowing the controls to sit
             * naturally beside them.
             */
            minHeight: {
              xs: 78,
              sm: 44,
              md: 44,
            },
          }}
        >
          {summaryStats.map(
            (stat, index) => (
              <Box
                key={stat.label}
                sx={{
                  display: "flex",

                  alignItems: "center",

                  /*
                   * Desktop separators.
                   */
                  "&::after":
                    index <
                      summaryStats.length -
                        1
                      ? {
                          content:
                            '""',

                          display: {
                            xs: "none",
                            sm: "block",
                          },

                          width: "1px",

                          height: 20,

                          backgroundColor:
                            "#ded9d4",

                          mx: {
                            sm: 1.5,
                            md: 2,
                          },
                        }
                      : undefined,
                }}
              >
                <SummaryStat
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  iconColor={
                    stat.iconColor
                  }
                />
              </Box>
            )
          )}
        </Box>

        {/* ===================================================
            PROGRESS + RESET
            =================================================== */}

        <Box
          sx={{
            gridColumn: "2",

            gridRow: {
              xs: "2",
              md: "1 / span 2",
            },

            alignSelf: {
              xs: "center",
              md: "start",
            },

            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            justifyContent: {
              xs: "space-between",
              md: "flex-start",
            },

            gap: {
              xs: 0.9,
              sm: 1,
              md: 1,
            },

            minWidth: 0,

            /*
             * This makes the right-side controls
             * occupy the same visual area as the
             * stats rather than creating extra
             * vertical whitespace.
             */
            minHeight: {
              xs: 78,
              sm: 82,
              md: 86,
            },
          }}
        >
          {/* =================================================
              PROGRESS RING
              ================================================= */}

          <Box
            sx={{
              width: {
                xs: 60,
                sm: 68,
                md: 76,
              },

              height: {
                xs: 60,
                sm: 68,
                md: 76,
              },

              borderRadius: "50%",

              background:
                `conic-gradient(
                  #ff5b38 ${
                    completionPercentage *
                    3.6
                  }deg,
                  #dfdcd7 ${
                    completionPercentage *
                    3.6
                  }deg
                )`,

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width:
                  "calc(100% - 9px)",

                height:
                  "calc(100% - 9px)",

                borderRadius: "50%",

                backgroundColor:
                  "#ffffff",

                display: "flex",

                flexDirection:
                  "column",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 14,
                    md: 16,
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
                  mt: 0.35,

                  fontSize: {
                    xs: 7.5,
                    sm: 8,
                    md: 8.5,
                  },

                  lineHeight: 1,

                  color: "#77716b",
                }}
              >
                {completedSets}/
                {totalSets}
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>

      {/* =====================================================
          DIVIDER
          ===================================================== */}

      <Box
        sx={{
          height: "1px",

          backgroundColor:
            "#eee9e4",

          my: {
            xs: 1.5,
            sm: 1.8,
            md: 2,
          },
        }}
      />

      {/* =====================================================
          CALORIE PANEL
          ===================================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          gap: {
            xs: 1,
            sm: 1.5,
          },

          px: {
            xs: 1,
            sm: 1.3,
            md: 1.5,
          },

          py: {
            xs: 0.9,
            sm: 1,
            md: 1.1,
          },

          borderRadius: "10px",

          backgroundColor:
            "#fff8f5",

          boxSizing:
            "border-box",

          width: "100%",
        }}
      >
        {/* =================================================
            ESTIMATED CALORIES
            ================================================= */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: {
              xs: 0.7,
              sm: 0.9,
            },

            minWidth: 0,
          }}
        >
          {/* Bolt */}

          <Box
            sx={{
              width: {
                xs: 32,
                sm: 36,
              },

              height: {
                xs: 32,
                sm: 36,
              },

              flexShrink: 0,

              borderRadius: "50%",

              backgroundColor:
                "#ffe9df",

              color: "#ff5735",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              "& svg": {
                fontSize: {
                  xs: 19,
                  sm: 21,
                },
              },
            }}
          >
            <BoltOutlinedIcon />
          </Box>

          {/* Text */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  sm: 17,
                  md: 19,
                },

                lineHeight: 1.05,

                fontWeight: 900,

                color: "#e93320",

                whiteSpace:
                  "nowrap",
              }}
            >
              {minimumCalories}–
              {maximumCalories} kcal
            </Typography>

            <Typography
              sx={{
                mt: 0.25,

                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },

                lineHeight: 1.2,

                color: "#77716b",

                whiteSpace: {
                  xs: "normal",
                  sm: "nowrap",
                },
              }}
            >
              Estimated range · Workout Day
            </Typography>
          </Box>
        </Box>

        {/* =================================================
            EARNED CALORIES
            ================================================= */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: {
              xs: 0.55,
              sm: 0.7,
            },

            flexShrink: 0,

            px: {
              xs: 0.8,
              sm: 1,
            },

            py: {
              xs: 0.55,
              sm: 0.65,
            },

            borderRadius: "8px",

            backgroundColor:
              "#ffede7",

            color: "#ed3021",
          }}
        >
          <BarChartOutlinedIcon
            sx={{
              fontSize: {
                xs: 17,
                sm: 19,
              },

              flexShrink: 0,
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },

                lineHeight: 1.1,

                fontWeight: 800,

                whiteSpace:
                  "nowrap",
              }}
            >
              Earned:
            </Typography>

            <Typography
              sx={{
                mt: 0.15,

                fontSize: {
                  xs: 8.5,
                  sm: 9.5,
                  md: 10.5,
                },

                lineHeight: 1.1,

                fontWeight: 900,

                whiteSpace:
                  "nowrap",
              }}
            >
              {earnedCalories} kcal
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutSummaryCard;