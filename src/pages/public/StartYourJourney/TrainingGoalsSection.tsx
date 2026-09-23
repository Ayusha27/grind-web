import { Box, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";

import { IntakeFormData } from "./types";

interface TrainingGoalsSectionProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
  error?: boolean;
}

const goals = [
  {
    value: "fat_loss",
    title: "Fat Loss",
    description: "Burn, shred, recompose",
    icon: <WhatshotIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
  {
    value: "muscle_gain",
    title: "Muscle Gain",
    description: "Size, mass, hypertrophy",
    icon: <MonitorWeightIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
  {
    value: "strength",
    title: "Strength",
    description: "Power, lifts, PRs",
    icon: <FitnessCenterIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
  {
    value: "general_fitness",
    title: "General Fitness",
    description: "Move better, feel better",
    icon: <BoltIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
];

const TrainingGoalsSection = ({
  data,
  onChange,
  error = false,
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

        borderTop: "1px solid",
        borderTopColor: "divider",

        borderLeft: error
          ? "2px solid"
          : "2px solid transparent",
        borderLeftColor: error
          ? "primary.main"
          : "transparent",
      }}
    >
      {/* Section Header */}
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
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Training Goals{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          >
            *
          </Box>
        </Typography>

        <Box
          sx={{
            height: "1px",
            backgroundColor: "divider",
            flex: 1,
          }}
        />

        {error && (
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Required
          </Typography>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          role="alert"
          sx={{
            color: "primary.main",
            fontSize: 12,
            lineHeight: 1.5,
            mb: 1.5,
          }}
        >
          Please select at least one training goal.
        </Typography>
      )}

      {/* Goals */}
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

                color: "text.primary",

                border: "1px solid",
                borderColor: selected
                  ? "primary.main"
                  : "divider",

                backgroundColor: selected
                  ? "rgba(255, 92, 53, 0.10)"
                  : "background.paper",

                transition: "all 0.2s ease",
                fontFamily: "inherit",

                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              {/* Icon Box */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,

                  border: "1px solid",
                  borderColor: selected
                    ? "primary.main"
                    : "divider",

                  backgroundColor: "background.default",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {goal.icon}
              </Box>

              {/* Goal Text */}
              <Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {goal.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.primary",
                    opacity: 0.55,
                    fontSize: 12,
                    lineHeight: 1.4,
                    mt: 0.35,
                  }}
                >
                  {goal.description}
                </Typography>
              </Box>

              {/* Selected Check */}
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
                      color: "primary.contrastText",
                      fontSize: 16,
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