import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

export interface ProgressDay {
  day: number;
  name: string;
  type: string;
  completion: number | null;
  calories: number | null;
}

interface DayBreakdownProps {
  week: number;
  days: ProgressDay[];
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
  const carouselRef =
    useRef<HTMLDivElement>(null);

  /*
   * Reset the carousel position whenever
   * the selected week changes.
   */
  useEffect(() => {
    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [week]);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          SECTION TITLE
      ===================================================== */}

      <Typography
        sx={{
          mb: 1.5,

          fontSize: {
            xs: 15,
            sm: 16,
            md: 17,
          },

          lineHeight: 1.2,

          fontFamily:
            "Archivo Black, sans-serif",

          fontWeight: 900,

          color: "#13131A",
        }}
      >
        Week {week} — Day Breakdown
      </Typography>

      {/* =====================================================
          DAY CAROUSEL
      ===================================================== */}

      <Box
        ref={carouselRef}
        sx={{
          display: "flex",

          gap: {
            xs: 1.2,
            sm: 1.3,
            md: 1.4,
          },

          overflowX: {
            xs: "auto",
            md: "visible",
          },

          flexWrap: {
            xs: "nowrap",
            md: "wrap",
          },

          pb: {
            xs: 1,
            md: 0,
          },

          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },

          width: "100%",
          minWidth: 0,
        }}
      >
        {days.map((day, index) => {
          const completion = Math.min(
            100,
            Math.max(
              0,
              day.completion ?? 0
            )
          );

          const isComplete =
            day.completion === 100;

          return (
            <Box
              key={day.day}
              sx={{
                flex: {
                  xs: "0 0 150px",
                  sm: "0 0 190px",
                  md: "1 1 calc(33.333% - 8px)",
                  lg: "1 1 calc(16.666% - 10px)",
                },

                minWidth: {
                  xs: 150,
                  sm: 190,
                  md: 0,
                },
              }}
            >
              <Box
                sx={{
                  minHeight: 136,

                  backgroundColor:
                    "#ffffff",

                  border:
                    "1px solid #4C4A49",

                  borderRadius: "12px",

                  p: 1.2,

                  textAlign: "center",

                  display: "flex",

                  flexDirection:
                    "column",

                  alignItems: "center",

                  boxShadow:
                    "0 4px 14px rgba(26,23,20,.05)",

                  boxSizing: "border-box",

                  width: "100%",
                }}
              >
                {/* =================================================
                    STATUS
                ================================================= */}

                <Typography
                  sx={{
                    fontSize: {
                      xs: 22,
                      sm: 23,
                      md: 24,
                    },

                    lineHeight: 1,

                    color: isComplete
                      ? "#16b85a"
                      : "#4C4A49",

                    fontFamily:
                      "Archivo, sans-serif",

                    fontWeight: 700,
                  }}
                >
                  {isComplete
                    ? "✓"
                    : "—"}
                </Typography>

                {/* =================================================
                    DAY
                ================================================= */}

                <Typography
                  sx={{
                    mt: 1,

                    fontSize: {
                      xs: 11,
                      sm: 12,
                      md: 12,
                    },

                    lineHeight: 1.1,

                    fontFamily:
                      "Archivo Black, sans-serif",

                    fontWeight: 900,

                    color: "#13131A",
                  }}
                >
                  Day {day.day}
                </Typography>

                {/* =================================================
                    NAME
                ================================================= */}

                <Typography
                  sx={{
                    mt: 0.6,

                    minHeight: 25,

                    fontSize: {
                      xs: 8.5,
                      sm: 9,
                      md: 9,
                    },

                    lineHeight: 1.25,

                    fontFamily:
                      "Archivo, sans-serif",

                    fontWeight: 700,

                    letterSpacing: 0.4,

                    color:
                      DAY_COLORS[
                        index %
                          DAY_COLORS.length
                      ],
                  }}
                >
                  {day.name}
                </Typography>

                {/* =================================================
                    COMPLETION
                ================================================= */}

                <Typography
                  sx={{
                    mt: 0.6,

                    fontSize: {
                      xs: 8.5,
                      sm: 9,
                      md: 9,
                    },

                    lineHeight: 1.2,

                    color: "#4C4A49",

                    fontFamily:
                      "JetBrains Mono, monospace",
                  }}
                >
                  Completion:{" "}
                  {day.completion !== null
                    ? `${day.completion}%`
                    : "-"}
                </Typography>

                {/* =================================================
                    CALORIES
                ================================================= */}

                <Typography
                  sx={{
                    mt: 0.25,

                    fontSize: {
                      xs: 8.5,
                      sm: 9,
                      md: 9,
                    },

                    lineHeight: 1.2,

                    color: "#4C4A49",

                    fontFamily:
                      "JetBrains Mono, monospace",
                  }}
                >
                  Calories:{" "}
                  {day.calories !== null
                    ? day.calories
                    : "-"}
                </Typography>

                {/* =================================================
                    PROGRESS BAR
                ================================================= */}

                <Box
                  sx={{
                    width: "100%",

                    height: 4,

                    mt: "auto",

                    borderRadius: 3,

                    backgroundColor:
                      "#e8e5e1",

                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${completion}%`,

                      height: "100%",

                      backgroundColor:
                        "#FF5C35",

                      borderRadius: 3,

                      transition:
                        "width 250ms ease",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DayBreakdown;