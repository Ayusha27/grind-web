import {
  Box,
  TextField,
  Typography,
} from "@mui/material";

import { IntakeFormData } from "./types";

interface Props {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const goals = [
  {
    value: "fat-loss",
    title: "Fat Loss",
    icon: "🔥",
  },
  {
    value: "muscle-gain",
    title: "Muscle Gain",
    icon: "💪",
  },
  {
    value: "strength",
    title: "Strength",
    icon: "🏋",
  },
  {
    value: "general-fitness",
    title: "General Fitness",
    icon: "⚡",
  },
];

const TrainingGoalsSection = ({
  data,
  onChange,
}: Props) => {
  const toggleGoal = (goal: string) => {
    const exists = data.trainingGoals.includes(goal);

    const updated = exists
      ? data.trainingGoals.filter((item) => item !== goal)
      : [...data.trainingGoals, goal];

    onChange("trainingGoals", updated);
  };

  return (
    <Box
      sx={{
        p: {
          xs: 3,
          md: 4,
        },
        borderBottom: "1px solid #292929",
      }}
    >
      <Typography
        sx={{
          color: "primary.main",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.5,
          mb: 3,
        }}
      >
        TRAINING GOALS
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {goals.map((goal) => {
          const selected = data.trainingGoals.includes(
            goal.value
          );

          return (
            <Box
              key={goal.value}
              component="button"
              type="button"
              onClick={() => toggleGoal(goal.value)}
              sx={{
                textAlign: "left",
                cursor: "pointer",
                p: 2.5,
                borderRadius: 1.5,
                border: selected
                  ? "1px solid"
                  : "1px solid #292929",
                borderColor: selected
                  ? "primary.main"
                  : "#292929",
                backgroundColor: selected
                  ? "rgba(255,122,0,0.08)"
                  : "#151515",
                color: "#f5f5f0",
                transition: "0.2s ease",

                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: 22,
                  mb: 1,
                }}
              >
                {goal.icon}
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {goal.title}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <TextField
        label="Specific Focus Area"
        placeholder="Tell us what you would like to focus on..."
        value={data.specificFocus}
        onChange={(event) =>
          onChange("specificFocus", event.target.value)
        }
        multiline
        minRows={3}
        fullWidth
      />
    </Box>
  );
};

export default TrainingGoalsSection;