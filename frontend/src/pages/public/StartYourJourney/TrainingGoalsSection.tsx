import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { IntakeFormData } from "./types";

interface TrainingGoalsSectionProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const goals = [
  {
    value: "fat_loss",
    title: "Fat Loss",
    description: "Burn, shred, recompose",
    icon: "🔥",
  },
  {
    value: "muscle_gain",
    title: "Muscle Gain",
    description: "Size, mass, hypertrophy",
    icon: "💪",
  },
  {
    value: "strength",
    title: "Strength",
    description: "Power, lifts, PRs",
    icon: "🏋️",
  },
  {
    value: "general_fitness",
    title: "General Fitness",
    description: "Move better, feel better",
    icon: "⚡",
  },
];

const TrainingGoalsSection = ({
  data,
  onChange,
}: TrainingGoalsSectionProps) => {
  const selectedGoals = data.trainingGoals ?? [];

  const toggleGoal = (value: string) => {
    const isSelected = selectedGoals.includes(value);

    const updatedGoals = isSelected
      ? selectedGoals.filter((goal) => goal !== value)
      : [...selectedGoals, value];

    onChange("trainingGoals", updatedGoals);
  };

  return (
    <Box
      sx={{
        px: {
          xs: 2.5,
          sm: 3,
        },
        py: 3.5,
        borderTop: "1px solid #292929",
      }}
    >
      {/* Section heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Training Goals
        </Typography>

        <Box
          sx={{
            height: "1px",
            backgroundColor: "#292929",
            flex: 1,
          }}
        />
      </Box>

      {/* Goal cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 1.25,
        }}
      >
        {goals.map((goal) => {
          const selected = selectedGoals.includes(goal.value);

          return (
            <Box
              key={goal.value}
              component="button"
              type="button"
              onClick={() => toggleGoal(goal.value)}
              sx={{
                position: "relative",
                width: "100%",
                minHeight: 70,
                px: 1.5,
                py: 1.25,
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textAlign: "left",
                cursor: "pointer",
                color: "#f5f5f0",
                border: selected
                  ? "1px solid #ff7a1a"
                  : "1px solid #292929",
                backgroundColor: selected
                  ? "rgba(255, 122, 26, 0.10)"
                  : "#111",
                transition: "all 0.2s ease",
                fontFamily: "inherit",

                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  border: selected
                    ? "1px solid #ff7a1a"
                    : "1px solid #292929",
                  backgroundColor: "#151515",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {goal.icon}
              </Box>

              {/* Text */}
              <Box>
                <Typography
                  sx={{
                    color: "#f5f5f0",
                    fontSize: 12,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {goal.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 9,
                    lineHeight: 1.4,
                    mt: 0.35,
                  }}
                >
                  {goal.description}
                </Typography>
              </Box>

              {/* Selected check */}
              {selected && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "#fff",
                      fontSize: 12,
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrainingGoalsSection;