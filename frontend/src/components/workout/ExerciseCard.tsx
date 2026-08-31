import { useState } from "react";
import { Box } from "@mui/material";

interface ExerciseCardProps {
  index: number;
  name: string;
  sets: number;
  reps: string;
  youtube?: string;
  completedSets: boolean[];
  onToggleSet: (index: number) => void;
}

const ExerciseCard = ({
  index,
  name,
  sets,
  reps,
  youtube,
  completedSets,
  onToggleSet,
}: ExerciseCardProps) => {
  const [open, setOpen] = useState(false);

  const watchUrl = youtube
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
        youtube
      )}`
    : "#";

  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid #ded9d3",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <Box
        onClick={() => setOpen((value) => !value)}
        sx={{
          minHeight: {
            xs: 62,
            md: 58,
          },
          px: {
            xs: 1.5,
            md: 1.25,
          },
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: 1.25,
        }}
      >
        {/* NUMBER */}

        <Box
          sx={{
            width: 26,
            height: 26,
            flexShrink: 0,
            borderRadius: 1,
            background: "#e9e6e2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {index + 1}
        </Box>

        {/* NAME */}

        <Box
          sx={{
            minWidth: 0,
            flex: 1,
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: 13,
                md: 12,
              },
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#252525",
            }}
          >
            {name}
          </Box>

          <Box
            sx={{
              mt: 0.35,
              color: "#777",
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            {sets} × {reps}
          </Box>
        </Box>

        {/* WATCH */}

        <Box
          component="a"
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) =>
            event.stopPropagation()
          }
          sx={{
            width: {
              xs: 75,
              md: 65,
            },
            height: {
              xs: 38,
              md: 34,
            },
            flexShrink: 0,
            borderRadius: 1.5,
            background: "#ff0505",
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.7,
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          <span>▶</span>
          Watch
        </Box>

        {/* CHEVRON */}

        <Box
          sx={{
            width: 20,
            textAlign: "center",
            color: "#777",
            fontSize: 15,
            transform: open
              ? "rotate(180deg)"
              : "none",
            transition: "transform .15s",
          }}
        >
         ⌄
        </Box>
      </Box>

      {/* CONTENT */}

      {open && (
        <Box
          sx={{
            borderTop: "1px solid #ebe7e2",
            px: {
              xs: 1.5,
              md: 1.25,
            },
            py: 1,
          }}
        >
          <Box
            sx={{
              mb: 0.8,
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#777",
            }}
          >
            TRACK YOUR SETS
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.7,
            }}
          >
            {Array.from({ length: sets }).map(
              (_, setIndex) => {
                const completed =
                  completedSets[setIndex] ?? false;

                return (
                  <Box
                    key={setIndex}
                    onClick={() =>
                      onToggleSet(setIndex)
                    }
                    sx={{
                      width: 82,
                      minHeight: 42,
                      px: 0.8,
                      borderRadius: 1.2,
                      border: completed
                        ? "1px solid #20c56a"
                        : "1px solid #ddd8d2",
                      background: completed
                        ? "#effcf5"
                        : "#faf9f7",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      cursor: "pointer",
                    }}
                  >
                    {/* CHECK */}

                    <Box
                      sx={{
                        width: 17,
                        height: 17,
                        borderRadius: 0.7,
                        flexShrink: 0,
                        background: completed
                          ? "#20c56a"
                          : "#fff",
                        border: completed
                          ? "1px solid #20c56a"
                          : "1px solid #d5d0ca",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      {completed ? "✓" : ""}
                    </Box>

                    <Box>
                      <Box
                        sx={{
                          fontSize: 7,
                          color: "#888",
                          lineHeight: 1,
                        }}
                      >
                        SET {setIndex + 1}
                      </Box>

                      <Box
                        sx={{
                          mt: 0.35,
                          fontSize: 10,
                          fontWeight: 800,
                          color: "#333",
                          lineHeight: 1,
                        }}
                      >
                        {reps}
                      </Box>
                    </Box>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExerciseCard;