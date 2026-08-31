import { Box } from "@mui/material";
import type { WarmupExercise } from "../../pages/client/Workout/workoutMockData";

interface WarmupSectionProps {
  exercises: WarmupExercise[];
  completed: Record<string, boolean>;
  dayId: number;
  onToggle: (name: string) => void;
}

const WarmupSection = ({
  exercises,
  completed,
  dayId,
  onToggle,
}: WarmupSectionProps) => {
  return (
    <Box
      sx={{
        mt: 1.5,
        background: "#fff",
        border: "1px solid #ffb39f",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          minHeight: 65,
          px: {
            xs: 1.5,
            md: 2,
          },
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          borderBottom:
            "1px solid #eee8e2",
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: 1.5,
            background: "#fff0eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          🔥
        </Box>

        <Box>
          <Box
            sx={{
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            Warm-Up First
          </Box>

          <Box
            sx={{
              mt: 0.3,
              fontSize: 9,
              color: "#777",
              lineHeight: 1.4,
            }}
          >
            A proper warm-up gradually raises your heart
            rate, improves blood flow and prepares your
            joints and muscles for the workout. It can
            improve movement quality and reduce the risk
            of strain. Complete these before starting your
            working sets.
          </Box>
        </Box>
      </Box>

      {/* ITEMS */}

      {exercises.map((exercise) => {
        const key = `${dayId}-${exercise.name}`;
        const isDone = !!completed[key];

        const watchUrl = exercise.youtube
          ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
              exercise.youtube
            )}`
          : "#";

        return (
          <Box
            key={exercise.name}
            sx={{
              minHeight: 48,
              px: {
                xs: 1.5,
                md: 2,
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderBottom:
                "1px solid #eeeae5",
            }}
          >
            {/* CHECK */}

            <Box
              onClick={() =>
                onToggle(exercise.name)
              }
              sx={{
                width: 18,
                height: 18,
                flexShrink: 0,
                borderRadius: 0.7,
                cursor: "pointer",
                border: isDone
                  ? "1px solid #20c56a"
                  : "2px solid #ddd8d2",
                background: isDone
                  ? "#20c56a"
                  : "#fff",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {isDone ? "✓" : ""}
            </Box>

            {/* TEXT */}

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: isDone
                    ? "line-through"
                    : "none",
                  color: isDone
                    ? "#777"
                    : "#252525",
                }}
              >
                {exercise.name}
              </Box>

              <Box
                sx={{
                  mt: 0.2,
                  fontSize: 8,
                  color: "#777",
                  fontFamily: "monospace",
                }}
              >
                {exercise.duration}
              </Box>
            </Box>

            {/* WATCH */}

            <Box
              component="a"
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              sx={{
                width: 56,
                height: 27,
                flexShrink: 0,
                borderRadius: 1,
                background: "#ff0505",
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                fontSize: 8,
                fontWeight: 800,
              }}
            >
              ▶ Watch
            </Box>

            {/* STATUS */}

            <Box
              sx={{
                width: 48,
                flexShrink: 0,
                textAlign: "right",
                fontSize: 8,
                fontWeight: 700,
                color: isDone
                  ? "#159447"
                  : "#159447",
              }}
            >
              {isDone ? "DONE" : "WARM UP"}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default WarmupSection;