import { Box, Typography } from "@mui/material";

import SetTracker, {
  type WorkoutSet,
} from "./SetTracker";

export interface WorkoutExercise {
  id: number;
  exerciseNumber: number;
  name: string;
  sets: WorkoutSet[];
  videoUrl?: string;
}

interface ExerciseAccordionProps {
  exercise: WorkoutExercise;
  isOpen: boolean;
  onToggle: () => void;
  onSetToggle: (setId: number) => void;
  onWatch: (exercise: WorkoutExercise) => void;
}

const ExerciseAccordion = ({
  exercise,
  isOpen,
  onToggle,
  onSetToggle,
  onWatch,
}: ExerciseAccordionProps) => {
  const completedSets = exercise.sets.filter(
    (set) => set.completed
  ).length;

  const allSetsCompleted =
    exercise.sets.length > 0 &&
    completedSets === exercise.sets.length;

  return (
    <Box
      sx={{
        overflow: "hidden",

        backgroundColor: allSetsCompleted
          ? "#f1fff6"
          : "#ffffff",

        border: allSetsCompleted
          ? "2px solid #62e899"
          : "2px solid #dedad5",

        borderRadius: "15px",

        boxShadow:
          "0 3px 10px rgba(30, 25, 20, 0.05)",

        transition:
          "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Accordion header */}
      <Box
        component="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        sx={{
          width: "100%",
          minHeight: {
            xs: 76,
            sm: 86,
          },

          px: {
            xs: 1.5,
            sm: 2,
          },

          border: 0,
          background: "transparent",

          cursor: "pointer",

          display: "flex",
          alignItems: "center",

          textAlign: "left",
        }}
      >
        {/* Exercise number */}
        <Box
          sx={{
            width: {
              xs: 34,
              sm: 38,
            },

            height: {
              xs: 34,
              sm: 38,
            },

            flexShrink: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "7px",

            backgroundColor: allSetsCompleted
              ? "#75eaa5"
              : "#e2ded9",

            color: allSetsCompleted
              ? "#16763d"
              : "#66615c",

            fontSize: 15,
            fontWeight: 900,
          }}
        >
          {exercise.exerciseNumber}
        </Box>

        {/* Exercise information */}
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            ml: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 17,
              },

              lineHeight: 1.2,

              fontWeight: 800,

              color: allSetsCompleted
                ? "#706b66"
                : "#252321",

              textDecoration: allSetsCompleted
                ? "line-through"
                : "none",
            }}
          >
            {exercise.name}
          </Typography>

          <Typography
            sx={{
              mt: 0.4,

              fontSize: {
                xs: 11,
                sm: 13,
              },

              lineHeight: 1,

              color: "#716b66",

              fontFamily: "monospace",
            }}
          >
            {exercise.sets.length} ×{" "}
            {getExerciseTarget(exercise.sets)}
          </Typography>
        </Box>

        {/* Watch */}
        <Box
          component="span"
          onClick={(event) => {
            event.stopPropagation();
            onWatch(exercise);
          }}
          sx={{
            flexShrink: 0,

            mr: 1.5,

            px: {
              xs: 1.2,
              sm: 1.5,
            },

            py: 0.8,

            borderRadius: "8px",

            backgroundColor: "#ff0000",
            color: "#ffffff",

            fontSize: {
              xs: 10,
              sm: 12,
            },

            fontWeight: 800,

            cursor: "pointer",

            "&:hover": {
              backgroundColor: "#d90000",
            },
          }}
        >
          ▶ Watch
        </Box>

        {/* Chevron */}
        <Typography
          component="span"
          sx={{
            width: 20,

            fontSize: 21,
            lineHeight: 1,

            color: "#77716c",
          }}
        >
          {isOpen ? "⌃" : "⌄"}
        </Typography>
      </Box>

      {/* Accordion content */}
      {isOpen && (
        <Box
          sx={{
            mx: {
              xs: 1.5,
              sm: 2,
            },

            pb: {
              xs: 1.5,
              sm: 2,
            },

            borderTop: "1px solid #e3ded9",
          }}
        >
          <Box
            sx={{
              pt: 1.5,
            }}
          >
            <SetTracker
              sets={exercise.sets}
              onToggle={onSetToggle}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const getExerciseTarget = (
  sets: WorkoutSet[]
) => {
  if (!sets.length) {
    return "";
  }

  const firstTarget = sets[0].target;

  const allTargetsSame = sets.every(
    (set) => set.target === firstTarget
  );

  return allTargetsSame
    ? firstTarget
    : "varied";
};

export default ExerciseAccordion;