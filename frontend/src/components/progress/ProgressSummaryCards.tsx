import {
  Box,
  Typography,
} from "@mui/material";

import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

interface ProgressSummaryCardsProps {
  monthScore: number;
  sessionsCompleted: number;
  totalSessions: number;
  caloriesBurned: number;
  activeWeeks: number;
  totalWeeks: number;
  bestWeekScore: number;
}

interface MetricProps {
  icon: React.ReactNode;
  value: string | number;
  title: string;
  subtitle: string;
  accent?: boolean;
}

const Metric = ({
  icon,
  value,
  title,
  subtitle,
  accent = false,
}: MetricProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",

        px: {
          xs: 0.6,
          sm: 1,
          md: 1.5,
        },

        py: {
          xs: 1.1,
          sm: 1.2,
          md: 1,
        },
      }}
    >
      {/* ICON */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          mb: {
            xs: 0.7,
            md: 0.8,
          },

          "& svg": {
            fontSize: {
              xs: 23,
              sm: 25,
              md: 29,
            },
          },
        }}
      >
        {icon}
      </Box>

      {/* VALUE */}

      <Typography
        sx={{
          fontSize: {
            xs: 20,
            sm: 22,
            md: 24,
          },

          lineHeight: 1,

          fontWeight: 800,

          color: "#ffffff",

          fontFamily: "monospace",

          mb: {
            xs: 0.55,
            md: 0.65,
          },
        }}
      >
        {value}
      </Typography>

      {/* TITLE */}

      <Typography
        sx={{
          fontSize: {
            xs: 10,
            sm: 11,
            md: 13,
          },

          lineHeight: 1.2,

          fontWeight: 700,

          color: "#f4f4f4",

          whiteSpace: {
            xs: "normal",
            md: "nowrap",
          },
        }}
      >
        {title}
      </Typography>

      {/* SUBTITLE */}

      <Typography
        sx={{
          mt: 0.35,

          fontSize: {
            xs: 7.5,
            sm: 8,
            md: 9,
          },

          lineHeight: 1.25,

          color: accent
            ? "#55b8e8"
            : "#aaa9a7",

          whiteSpace: {
            xs: "normal",
            md: "nowrap",
          },
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

const ProgressSummaryCards = ({
  monthScore,
  sessionsCompleted,
  totalSessions,
  caloriesBurned,
  activeWeeks,
  totalWeeks,
  bestWeekScore,
}: ProgressSummaryCardsProps) => {
  const safeScore = Math.min(
    100,
    Math.max(0, monthScore)
  );

  const safeSessions =
    Math.max(0, sessionsCompleted);

  const safeTotalSessions =
    Math.max(0, totalSessions);

  const safeActiveWeeks =
    Math.max(0, activeWeeks);

  const safeTotalWeeks =
    Math.max(0, totalWeeks);

  /*
   * SVG CIRCLE
   *
   * Used for the month score ring.
   */

  const radius = 47;
  const circumference =
    2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (safeScore / 100) *
      circumference;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          MAIN DARK TRACKER
      ===================================================== */}

      <Box
        sx={{
          width: "100%",

          background:
            "linear-gradient(135deg, #191a1a 0%, #202020 100%)",

          borderRadius: {
            xs: "11px",
            sm: "12px",
            md: "13px",
          },

          px: {
            xs: 1.2,
            sm: 2,
            md: 2.5,
          },

          py: {
            xs: 1.3,
            sm: 1.7,
            md: 2,
          },

          boxSizing: "border-box",

          boxShadow:
            "0 5px 18px rgba(26,23,20,.14)",

          /*
           * Desktop:
           * score + metrics all in one row.
           *
           * Mobile:
           * score remains on top.
           */
          display: {
            xs: "block",
            md: "flex",
          },

          alignItems: "stretch",
        }}
      >
        {/* =================================================
            SCORE SECTION
        ================================================= */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "36%",
            },

            minWidth: 0,

            display: "flex",

            alignItems: "center",

            justifyContent: {
              xs: "flex-start",
              md: "center",
            },

            gap: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
            },

            pr: {
              md: 2.5,
            },

            pb: {
              xs: 1.3,
              md: 0,
            },

            borderRight: {
              xs: "none",
              md: "1px solid rgba(255,255,255,.18)",
            },

            borderBottom: {
              xs: "1px solid rgba(255,255,255,.14)",
              md: "none",
            },
          }}
        >
          {/* SCORE RING */}

          <Box
            sx={{
              position: "relative",

              width: {
                xs: 74,
                sm: 82,
                md: 112,
              },

              height: {
                xs: 74,
                sm: 82,
                md: 112,
              },

              flexShrink: 0,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 120 120"
              style={{
                transform:
                  "rotate(-90deg)",
              }}
            >
              {/* BACKGROUND RING */}

              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#555758"
                strokeWidth="8"
              />

              {/* PROGRESS RING */}

              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#9a9b9b"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={
                  circumference
                }
                strokeDashoffset={
                  dashOffset
                }
                style={{
                  transition:
                    "stroke-dashoffset 300ms ease",
                }}
              />
            </svg>

            {/* SCORE TEXT */}

            <Box
              sx={{
                position: "absolute",

                inset: 0,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 20,
                    md: 27,
                  },

                  fontWeight: 800,

                  color: "#ffffff",

                  fontFamily:
                    "monospace",
                }}
              >
                {Math.round(
                  safeScore
                )}
                %
              </Typography>
            </Box>
          </Box>

          {/* SCORE INFORMATION */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 10,
                  sm: 11,
                  md: 13,
                },

                fontWeight: 700,

                color: "#f1f1f1",

                letterSpacing: 0.2,
              }}
            >
              MONTH SCORE
            </Typography>

            <Typography
              sx={{
                mt: 0.35,

                fontSize: {
                  xs: 10,
                  sm: 11,
                  md: 13,
                },

                fontWeight: 500,

                color: "#f1f1f1",
              }}
            >
              {safeSessions}/
              {safeTotalSessions} sessions
            </Typography>

            {/* MOTIVATION */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.55,

                mt: {
                  xs: 0.6,
                  md: 1.3,
                },
              }}
            >
              <EmojiEventsOutlinedIcon
                sx={{
                  fontSize: {
                    xs: 15,
                    md: 19,
                  },

                  color: "#ffb000",
                }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: 9,
                    sm: 10,
                    md: 12,
                  },

                  fontWeight: 800,

                  color: "#ff5c35",
                }}
              >
                {safeScore >= 100
                  ? "Great work!"
                  : "Keep going"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =================================================
            METRICS
        ================================================= */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "64%",
            },

            display: "flex",

            alignItems: "stretch",

            mt: {
              xs: 1.2,
              md: 0,
            },
          }}
        >
          {/* WORKOUTS */}

          <Metric
            icon={
              <FitnessCenterOutlinedIcon
                sx={{
                  color: "#ffffff",
                }}
              />
            }
            value={safeSessions}
            title="Workouts Done"
            subtitle={`Out of ${safeTotalSessions} planned`}
          />

          {/* DIVIDER */}

          <Box
            sx={{
              width: "1px",

              backgroundColor:
                "rgba(255,255,255,.16)",

              my: {
                xs: 0.7,
                md: 0.8,
              },

              flexShrink: 0,
            }}
          />

          {/* CALORIES */}

          <Metric
            icon={
              <LocalFireDepartmentOutlinedIcon
                sx={{
                  color: "#ff5c35",
                }}
              />
            }
            value={caloriesBurned}
            title="Calories Burned"
            subtitle={`Avg ${caloriesBurned} kcal/session`}
          />

          {/* DIVIDER */}

          <Box
            sx={{
              width: "1px",

              backgroundColor:
                "rgba(255,255,255,.16)",

              my: {
                xs: 0.7,
                md: 0.8,
              },

              flexShrink: 0,
            }}
          />

          {/* ACTIVE WEEKS */}

          <Metric
            icon={
              <CalendarMonthOutlinedIcon
                sx={{
                  color: "#ff5c35",
                }}
              />
            }
            value={`${safeActiveWeeks}/${safeTotalWeeks}`}
            title="Active Weeks"
            subtitle={`Best: ${Math.round(
              Math.max(
                0,
                bestWeekScore
              )
            )}% week score`}
            accent
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressSummaryCards;