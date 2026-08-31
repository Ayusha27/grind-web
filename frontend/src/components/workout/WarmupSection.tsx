import {
  Box,
  Button,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import type { WarmupExercise } from "../../pages/client/workout/workoutMockData";

interface WarmupSectionProps {
  exercises: WarmupExercise[];
  completed: Record<string, boolean>;
  onToggle: (name: string) => void;
}

const WarmupSection = ({
  exercises,
  completed,
  onToggle,
}: WarmupSectionProps) => {
  const openYoutube = (query?: string) => {
    if (!query) return;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "1.5px solid #e0dbd4",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(26,23,20,.08)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          px: {
            xs: 1.75,
            md: 2.25,
          },
          py: 1.6,
          borderBottom: "1px solid #eee9e3",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocalFireDepartmentOutlinedIcon
            sx={{
              fontSize: 18,
              color: "#ff5c35",
            }}
          />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 900,
              color: "#1a1714",
            }}
          >
            Warm-Up First
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 0.65,
            maxWidth: 720,
            fontSize: 10,
            lineHeight: 1.55,
            color: "#77716b",
          }}
        >
          A proper warm-up gradually raises your heart
          rate, prepares your joints and muscles, and
          helps you move better during your workout.
        </Typography>
      </Box>

      {/* WARMUP ROWS */}

      <Box>
        {exercises.map((exercise, index) => {
          const isCompleted =
            Boolean(completed[exercise.name]);

          return (
            <Box
              key={exercise.name}
              sx={{
                minHeight: 53,
                px: {
                  xs: 1.25,
                  md: 1.75,
                },
                display: "flex",
                alignItems: "center",
                borderBottom:
                  index === exercises.length - 1
                    ? "none"
                    : "1px solid #eee9e3",
              }}
            >
              {/* CHECKBOX */}

              <Checkbox
                checked={isCompleted}
                onChange={() =>
                  onToggle(exercise.name)
                }
                disableRipple
                sx={{
                  p: 0.5,
                  mr: 0.75,

                  "& .MuiSvgIcon-root": {
                    fontSize: 19,
                  },

                  color: "#cfc8c0",

                  "&.Mui-checked": {
                    color: "#15803d",
                  },
                }}
              />

              {/* NAME + DURATION */}

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: isCompleted
                      ? "#8b8a86"
                      : "#1a1714",

                    textDecoration:
                      isCompleted
                        ? "line-through"
                        : "none",
                  }}
                >
                  {exercise.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.25,
                    fontSize: 9,
                    lineHeight: 1.2,
                    color: "#8b857f",
                  }}
                >
                  {exercise.duration}
                </Typography>
              </Box>

              {/* WATCH */}

              <Button
                variant="outlined"
                size="small"
                startIcon={
                  <PlayArrowRoundedIcon
                    sx={{
                      fontSize:
                        "14px !important",
                    }}
                  />
                }
                onClick={() =>
                  openYoutube(exercise.youtube)
                }
                sx={{
                  minWidth: 67,
                  height: 27,
                  px: 0.8,
                  mr: 1,

                  borderRadius: "7px",
                  borderColor: "#ded8d1",

                  color: "#59534e",
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "none",

                  "&:hover": {
                    borderColor: "#ff5c35",
                    color: "#ff5c35",
                    backgroundColor:
                      "rgba(255,92,53,.03)",
                  },
                }}
              >
                Watch
              </Button>

              {/* STATUS */}

              <Typography
                sx={{
                  width: 48,
                  textAlign: "right",

                  fontSize: 8,
                  fontWeight: 900,
                  letterSpacing: 0.5,

                  color: isCompleted
                    ? "#15803d"
                    : "#ff5c35",
                }}
              >
                {isCompleted
                  ? "DONE"
                  : "WARM UP"}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WarmupSection;