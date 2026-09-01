import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

interface ExerciseCardProps {
  index: number;
  name: string;
  setsCount: number;
  reps: string;
  youtubeUrl?: string;
  completedSets: boolean[];
  expanded: boolean;
  onExpand: () => void;
  onToggleSet: (setIndex: number) => void;
}

const ExerciseCard = ({
  index,
  name,
  setsCount,
  reps,
  youtubeUrl,
  completedSets,
  expanded,
  onExpand,
  onToggleSet,
}: ExerciseCardProps) => {
  const completedCount =
    completedSets.filter(Boolean).length;

  const isComplete =
    completedCount === setsCount &&
    setsCount > 0;

  const openYoutube = () => {
    if (!youtubeUrl) return;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        youtubeUrl
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: isComplete
          ? "#f0fdf4"
          : "#fff",

        border: "1.5px solid",
        borderColor: isComplete
          ? "#86efac"
          : "#e0dbd4",

        borderRadius: "14px",
        overflow: "hidden",

        boxShadow:
          "0 2px 12px rgba(26,23,20,.08)",

        transition:
          "border-color .15s ease, background-color .15s ease",
      }}
    >
      {/* =====================================================
          ACCORDION HEADER
      ===================================================== */}

      <Box
        onClick={onExpand}
        sx={{
          minHeight: 57,
          px: {
            xs: 1.25,
            md: 1.75,
          },

          display: "flex",
          alignItems: "center",

          cursor: "pointer",

          "&:hover": {
            backgroundColor: isComplete
              ? "#ecfdf3"
              : "#fcfbfa",
          },
        }}
      >
        {/* NUMBER */}

        <Box
          sx={{
            width: 28,
            height: 28,
            mr: 1.25,

            flexShrink: 0,

            display: "grid",
            placeItems: "center",

            borderRadius: "8px",

            backgroundColor: isComplete
              ? "#dcfce7"
              : "#f1ede8",

            color: isComplete
              ? "#15803d"
              : "#6b6560",

            fontSize: 11,
            fontWeight: 900,
          }}
        >
          {index + 1}
        </Box>

        {/* EXERCISE NAME */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.2,
              fontWeight: 800,

              color: isComplete
                ? "#15803d"
                : "#1a1714",

              textDecoration:
                isComplete
                  ? "line-through"
                  : "none",
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              mt: 0.35,
              fontSize: 9,
              color: "#77716b",
            }}
          >
            {setsCount} × {reps}
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
          onClick={(event) => {
            event.stopPropagation();
            openYoutube();
          }}
          sx={{
            minWidth: 67,
            height: 28,

            px: 0.8,
            mr: 0.75,

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

        {/* COMPLETION */}

        {completedCount > 0 && (
          <Typography
            sx={{
              minWidth: 31,
              mr: 0.5,

              textAlign: "right",

              fontSize: 8,
              fontWeight: 800,

              color: isComplete
                ? "#15803d"
                : "#ff5c35",
            }}
          >
            {completedCount}/{setsCount}
          </Typography>
        )}

        {/* CHEVRON */}

        <KeyboardArrowDownRoundedIcon
          sx={{
            fontSize: 20,
            color: "#77716b",

            transform: expanded
              ? "rotate(180deg)"
              : "rotate(0deg)",

            transition:
              "transform .15s ease",
          }}
        />
      </Box>

      {/* =====================================================
          EXPANDED CONTENT
      ===================================================== */}

      {expanded && (
        <Box
          sx={{
            px: {
              xs: 1.25,
              md: 1.75,
            },

            pt: 1.1,
            pb: 1.35,

            borderTop:
              "1px solid #eee9e3",
          }}
        >
          <Typography
            sx={{
              mb: 0.9,

              fontSize: 8,
              fontWeight: 900,
              letterSpacing: 1,

              textTransform: "uppercase",

              color: "#77716b",
            }}
          >
            Track Your Sets
          </Typography>

          <Stack
            direction="row"
            spacing={0.7}
            sx={{
              flexWrap: "wrap",
              rowGap: 0.7,
            }}
          >
            {Array.from({
              length: setsCount,
            }).map((_, setIndex) => {
              const done =
                completedSets[setIndex];

              return (
                <Box
                  key={setIndex}
                  onClick={() =>
                    onToggleSet(setIndex)
                  }
                  sx={{
                    minWidth: {
                      xs: 67,
                      sm: 75,
                    },

                    height: 34,

                    px: 1,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: "8px",

                    border: "1px solid",
                    borderColor: done
                      ? "#86efac"
                      : "#ded8d1",

                    backgroundColor: done
                      ? "#dcfce7"
                      : "#fff",

                    color: done
                      ? "#15803d"
                      : "#6b6560",

                    fontSize: 9,
                    fontWeight: 800,

                    cursor: "pointer",

                    userSelect: "none",

                    transition:
                      "all .15s ease",

                    "&:hover": {
                      borderColor: done
                        ? "#4ade80"
                        : "#ff5c35",
                    },
                  }}
                >
                  {done ? "✓ " : ""}
                  SET {setIndex + 1}
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ExerciseCard;