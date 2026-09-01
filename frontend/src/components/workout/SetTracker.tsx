import { Box, Typography } from "@mui/material";

export interface WorkoutSet {
  id: number;
  label: string;
  target: string;
  completed: boolean;
}

interface SetTrackerProps {
  sets: WorkoutSet[];
  onToggle: (setId: number) => void;
}

const SetTracker = ({
  sets,
  onToggle,
}: SetTrackerProps) => {
  return (
    <Box>
      <Typography
        sx={{
          mb: 1,
          fontSize: {
            xs: 11,
            sm: 13,
          },
          fontWeight: 700,
          letterSpacing: 2,
          color: "#77716c",
        }}
      >
        TRACK YOUR SETS
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.2,
        }}
      >
        {sets.map((set) => (
          <SetItem
            key={set.id}
            set={set}
            onToggle={onToggle}
          />
        ))}
      </Box>
    </Box>
  );
};

interface SetItemProps {
  set: WorkoutSet;
  onToggle: (setId: number) => void;
}

const SetItem = ({
  set,
  onToggle,
}: SetItemProps) => {
  return (
    <Box
      component="button"
      onClick={() => onToggle(set.id)}
      sx={{
        minWidth: {
          xs: 120,
          sm: 134,
        },

        minHeight: {
          xs: 60,
          sm: 66,
        },

        px: 1.5,

        display: "flex",
        alignItems: "center",
        gap: 1,

        borderRadius: "12px",

        border: set.completed
          ? "2px solid #62e899"
          : "2px solid #e0dcd7",

        backgroundColor: set.completed
          ? "#f1fff6"
          : "#f8f6f3",

        cursor: "pointer",

        textAlign: "left",

        transition: "all 0.15s ease",

        "&:hover": {
          borderColor: set.completed
            ? "#62e899"
            : "#ff5b38",
        },
      }}
    >
      {/* Checkbox */}
      <Box
        sx={{
          width: 23,
          height: 23,
          flexShrink: 0,

          borderRadius: "6px",

          border: set.completed
            ? "none"
            : "2px solid #dedad5",

          backgroundColor: set.completed
            ? "#20c565"
            : "#ffffff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {set.completed && (
          <Typography
            component="span"
            sx={{
              color: "#ffffff",
              fontSize: 15,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            ✓
          </Typography>
        )}
      </Box>

      {/* Set information */}
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: 10,
              sm: 11,
            },

            lineHeight: 1.1,

            color: set.completed
              ? "#3e9661"
              : "#68635e",

            letterSpacing: 0.8,
          }}
        >
          {set.label}
        </Typography>

        <Typography
          sx={{
            mt: 0.3,

            fontSize: {
              xs: 14,
              sm: 15,
            },

            lineHeight: 1,

            fontWeight: 800,

            fontFamily: "monospace",

            color: set.completed
              ? "#16823f"
              : "#282522",
          }}
        >
          {set.target}
        </Typography>
      </Box>
    </Box>
  );
};

export default SetTracker;