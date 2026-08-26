import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { IntakeFormData } from "./types";

interface WorkoutPreferenceProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const preferences = [
  {
    value: "gym",
    title: "Gym",
    description: "Full equipment access",
    icon: "🏢",
  },
  {
    value: "home",
    title: "Home",
    description: "Minimal or no equipment",
    icon: "🏠",
  },
  {
    value: "both",
    title: "Both",
    description: "Mix of gym & home",
    icon: "🔄",
  },
];

const WorkoutPreference = ({
  data,
  onChange,
}: WorkoutPreferenceProps) => {
  return (
    <Box
      sx={{
        mt: 3,
        px: {
          xs: 2.5,
          sm: 3,
        },
        py: {
          xs: 2,
          sm: 2.5,
        },
      }}
    >
      <Typography
        sx={{
          color: "#777",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          mb: 1.5,
        }}
      >
        Workout Preference
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 1.25,
        }}
      >
        {preferences.map((preference) => {
          const selected =
            data.workoutPreference === preference.value;

          return (
            <Box
              key={preference.value}
              component="button"
              type="button"
              onClick={() =>
                onChange("workoutPreference", preference.value)
              }
              sx={{
                position: "relative",
                minHeight: 58,
                px: 1.5,
                py: 1,
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
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                {preference.icon}
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#f5f5f0",
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {preference.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 8,
                    lineHeight: 1.4,
                    mt: 0.3,
                  }}
                >
                  {preference.description}
                </Typography>
              </Box>

              {selected && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 7,
                    right: 7,
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

export default WorkoutPreference;