import { Box, Typography } from "@mui/material";

import { IntakeFormData } from "./types";

interface Props {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const options = [
  {
    value: "gym" as const,
    title: "Gym",
    description: "Full equipment access",
    icon: "🏢",
  },
  {
    value: "home" as const,
    title: "Home",
    description: "Minimal or no equipment",
    icon: "🏠",
  },
  {
    value: "both" as const,
    title: "Both",
    description: "Mix of gym & home",
    icon: "🔀",
  },
];

const WorkoutPreference = ({
  data,
  onChange,
}: Props) => {
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
        WORKOUT PREFERENCE
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {options.map((option) => {
          const selected =
            data.workoutPreference === option.value;

          return (
            <Box
              key={option.value}
              component="button"
              type="button"
              onClick={() =>
                onChange(
                  "workoutPreference",
                  option.value
                )
              }
              sx={{
                textAlign: "left",
                cursor: "pointer",
                p: 2.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: selected
                  ? "primary.main"
                  : "#292929",
                backgroundColor: selected
                  ? "rgba(255,122,0,0.08)"
                  : "#151515",
                color: "#f5f5f0",

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
                {option.icon}
              </Typography>

              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: 15,
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {option.title}
              </Typography>

              <Typography
                component="span"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  fontSize: 13,
                }}
              >
                {option.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WorkoutPreference;