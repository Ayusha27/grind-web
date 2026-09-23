import { Box, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import SyncIcon from "@mui/icons-material/Sync";
import CheckIcon from "@mui/icons-material/Check";

import { IntakeFormData } from "./types";

interface WorkoutPreferenceProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
  error?: boolean;
}

const preferences = [
  {
    value: "gym",
    title: "Gym",
    description: "Full equipment access",
    icon: <BusinessIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
  {
    value: "home",
    title: "Home",
    description: "Minimal or no equipment",
    icon: <HomeIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
  {
    value: "both",
    title: "Both",
    description: "Mix of gym & home",
    icon: <SyncIcon sx={{ color: "primary.main", fontSize: 24 }} />,
  },
];

const WorkoutPreference = ({
  data,
  onChange,
  error = false,
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
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Workout Preference{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              opacity: 1,
            }}
          >
            *
          </Box>
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            backgroundColor: "divider",
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
          Please select a workout preference.
        </Typography>
      )}

      {/* Preferences */}
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
              {/* Icon */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {preference.icon}
              </Box>

              {/* Text */}
              <Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {preference.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.primary",
                    opacity: 0.55,
                    fontSize: 11,
                    lineHeight: 1.4,
                    mt: 0.3,
                  }}
                >
                  {preference.description}
                </Typography>
              </Box>

              {/* Selected Check */}
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

export default WorkoutPreference;