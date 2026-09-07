import { Box, Typography } from "@mui/material";

export interface WarmUpExercise {
  id: number;
  name: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

interface WarmUpSectionProps {
  exercises: WarmUpExercise[];
  onToggle: (exerciseId: number) => void;
  onWatch: (exercise: WarmUpExercise) => void;
}

const WarmUpSection = ({
  exercises,
  onToggle,
  onWatch,
}: WarmUpSectionProps) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: "2px solid #ffd0c3",
        borderRadius: "15px",
        boxShadow: "0 4px 14px rgba(30, 25, 20, 0.04)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          minHeight: {
            xs: 90,
            sm: 98,
          },

          px: {
            xs: 2,
            sm: 2.5,
          },

          display: "flex",
          alignItems: "center",
          gap: 1.5,

          borderBottom: "1px solid #e7e2dd",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 54,
            height: 54,
            flexShrink: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "12px",
            backgroundColor: "#fff0eb",

            fontSize: 27,
          }}
        >
          🔥
        </Box>

        {/* Header text */}
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                sm: 20,
              },

              lineHeight: 1.1,
              fontWeight: 900,
              color: "#211f1d",
            }}
          >
            Warm-Up First
          </Typography>

          <Typography
            sx={{
              mt: 0.7,

              fontSize: {
                xs: 11,
                sm: 13,
              },

              lineHeight: 1.4,
              color: "#6c6762",
            }}
          >
            A proper warm-up gradually raises your heart rate,
            improves blood flow and prepares your joints and
            muscles for the workout. It can improve movement
            quality and reduce the risk of strain. Complete
            these before starting your working sets.
          </Typography>
        </Box>
      </Box>

      {/* Exercises */}
      <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
        {exercises.map((exercise, index) => (
          <WarmUpItem
            key={exercise.id}
            exercise={exercise}
            isLast={index === exercises.length - 1}
            onToggle={onToggle}
            onWatch={onWatch}
          />
        ))}
      </Box>
    </Box>
  );
};

interface WarmUpItemProps {
  exercise: WarmUpExercise;
  isLast: boolean;
  onToggle: (exerciseId: number) => void;
  onWatch: (exercise: WarmUpExercise) => void;
}

const WarmUpItem = ({
  exercise,
  isLast,
  onToggle,
  onWatch,
}: WarmUpItemProps) => {
  return (
    <Box
      sx={{
        minHeight: {
          xs: 68,
          sm: 74,
        },

        display: "flex",
        alignItems: "center",
        gap: {
          xs: 1.2,
          sm: 1.5,
        },

        borderBottom: isLast
          ? "none"
          : "1px solid #e7e2dd",
      }}
    >
      {/* Checkbox */}
      <Box
        component="button"
        onClick={() => onToggle(exercise.id)}
        aria-label={
          exercise.completed
            ? `Mark ${exercise.name} incomplete`
            : `Mark ${exercise.name} complete`
        }
        sx={{
          width: 30,
          height: 30,
          flexShrink: 0,

          borderRadius: "7px",

          border: exercise.completed
            ? "none"
            : "2px solid #dfdbd6",

          backgroundColor: exercise.completed
            ? "#20c565"
            : "#ffffff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",

          transition: "all 0.15s ease",

          "&:hover": {
            borderColor: exercise.completed
              ? "#20c565"
              : "#ff5b38",
          },
        }}
      >
        {exercise.completed && (
          <Typography
            component="span"
            sx={{
              color: "#ffffff",
              fontSize: 18,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            ✓
          </Typography>
        )}
      </Box>

      {/* Exercise information */}
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 13,
              sm: 15,
            },

            lineHeight: 1.2,
            fontWeight: 800,

            color: exercise.completed
              ? "#77716c"
              : "#252321",

            textDecoration: exercise.completed
              ? "line-through"
              : "none",
          }}
        >
          {exercise.name}
        </Typography>

        <Typography
          sx={{
            mt: 0.3,

            fontSize: {
              xs: 10,
              sm: 12,
            },

            lineHeight: 1.2,

            fontFamily: "monospace",
            color: "#716b66",
          }}
        >
          {exercise.instruction}
        </Typography>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          gap: {
            xs: 0.8,
            sm: 1,
          },
        }}
      >
        <Box
          component="button"
          onClick={() => onWatch(exercise)}
          sx={{
            border: 0,
            borderRadius: "8px",

            px: {
              xs: 1.2,
              sm: 1.5,
            },

            py: 0.7,

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

        <Typography
          sx={{
            minWidth: {
              xs: 48,
              sm: 58,
            },

            fontSize: {
              xs: 9,
              sm: 11,
            },

            fontWeight: 900,
            letterSpacing: 0.5,

            color: "#16823f",
            textAlign: "left",
          }}
        >
          {exercise.completed ? "DONE" : "WARM UP"}
        </Typography>
      </Box>
    </Box>
  );
};

export default WarmUpSection;