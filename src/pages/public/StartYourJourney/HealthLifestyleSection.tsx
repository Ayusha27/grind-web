import { Box, Checkbox, Typography } from "@mui/material";

import { IntakeFormData } from "./types";

interface HealthLifestyleSectionProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
  dietError?: boolean;
  healthError?: boolean;
  dietSectionId?: string;
  healthSectionId?: string;
}

const injuries = [
  "Knee issues",
  "Lower back pain",
  "Shoulder injury",
  "No injuries",
];

const HealthLifestyleSection = ({
  data,
  onChange,
  dietError = false,
  healthError = false,
  dietSectionId = "intake-diet-lifestyle",
  healthSectionId = "intake-health-limitations",
}: HealthLifestyleSectionProps) => {
  const selectedInjuries = data.injuries ?? [];

  const toggleInjury = (injury: string) => {
    if (injury === "No injuries") {
      onChange(
        "injuries",
        selectedInjuries.includes("No injuries")
          ? []
          : ["No injuries"]
      );

      return;
    }

    const withoutNoInjuries = selectedInjuries.filter(
      (item) => item !== "No injuries"
    );

    const selected = withoutNoInjuries.includes(injury);

    const updated = selected
      ? withoutNoInjuries.filter((item) => item !== injury)
      : [...withoutNoInjuries, injury];

    onChange("injuries", updated);
  };

  const errorBorder = (hasError: boolean) => {
    if (!hasError) {
      return {};
    }

    return {
      borderLeft: "2px solid",
      borderLeftColor: "primary.main",
      pl: {
        xs: 2.5,
        sm: 3,
      },
      ml: {
        xs: -2.5,
        sm: -3,
      },
    };
  };

  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "divider",

        px: {
          xs: 2.5,
          sm: 3,
        },

        py: 3.5,

        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },

        gap: {
          xs: 4,
          md: 5,
        },
      }}
    >
      {/* ========================================================= */}
      {/* HEALTH & LIMITATIONS */}
      {/* ========================================================= */}

      <Box
        id={healthSectionId}
        sx={{
          ...errorBorder(healthError),
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
            Health & Limitations
          </Typography>

          <Box
            sx={{
              height: "1px",
              backgroundColor: "divider",
              flex: 1,
            }}
          />

          {healthError && (
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
        {healthError && (
          <Typography
            role="alert"
            sx={{
              color: "primary.main",
              fontSize: 12,
              lineHeight: 1.5,
              mb: 1.5,
            }}
          >
            Please select an option. If you have an injury or limitation,
            describe it below.
          </Typography>
        )}

        {/* Injuries Label */}
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Any injuries or physical limitations?{" "}
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

        {/* Injury Options */}
        <Box>
          {injuries.map((injury) => {
            const selected = selectedInjuries.includes(injury);

            return (
              <Box
                key={injury}
                component="button"
                type="button"
                onClick={() => toggleInjury(injury)}
                sx={{
                  width: "100%",
                  minHeight: 38,
                  px: 0,

                  display: "flex",
                  alignItems: "center",
                  gap: 1,

                  border: 0,
                  borderBottom: "1px solid",
                  borderBottomColor: "divider",

                  background: "transparent",

                  color: "text.primary",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <Checkbox
                  checked={selected}
                  disableRipple
                  sx={{
                    p: 0,

                    color: "divider",

                    "&.Mui-checked": {
                      color: "primary.main",
                    },

                    "& .MuiSvgIcon-root": {
                      fontSize: 27,
                    },
                  }}
                />

                <Typography
                  sx={{
                    color: "text.primary",
                    opacity: selected ? 1 : 0.55,
                    fontSize: 14,
                    fontWeight: selected ? 500 : 400,
                  }}
                >
                  {injury}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Health Concern Label */}
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Describe any injury / health concern
        </Typography>

        {/* Health Concern Textarea */}
        <Box
          component="textarea"
          value={data.healthConcern}
          onChange={(event) =>
            onChange("healthConcern", event.target.value)
          }
          placeholder="Eg. Torn ACL in 2022, fully recovered but cautious with heavy squats..."
          sx={{
            width: "100%",
            minHeight: 72,
            boxSizing: "border-box",
            resize: "vertical",

            border: "1px solid",
            borderColor: "divider",

            backgroundColor: "background.paper",
            color: "text.primary",

            px: 1.5,
            py: 1.25,

            fontFamily: "inherit",
            fontSize: 14,
            outline: "none",

            "&::placeholder": {
              color: "text.primary",
              opacity: 0.45,
              fontStyle: "italic",
            },

            "&:focus": {
              borderColor: "primary.main",
            },
          }}
        />
      </Box>

      {/* ========================================================= */}
      {/* DIET & LIFESTYLE */}
      {/* ========================================================= */}

      <Box
        id={dietSectionId}
        sx={{
          ...errorBorder(dietError),
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
            Diet & Lifestyle
          </Typography>

          <Box
            sx={{
              height: "1px",
              backgroundColor: "divider",
              flex: 1,
            }}
          />

          {dietError && (
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
        {dietError && (
          <Typography
            role="alert"
            sx={{
              color: "primary.main",
              fontSize: 12,
              lineHeight: 1.5,
              mb: 1.5,
            }}
          >
            Please complete your dietary preference, sleep, and stress level.
          </Typography>
        )}

        {/* Dietary Preference */}
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Dietary Preference{" "}
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
          component="select"
          value={data.dietaryPreference}
          onChange={(event) =>
            onChange("dietaryPreference", event.target.value)
          }
          sx={{
            width: "100%",
            height: 42,

            border: "1px solid",
            borderColor: "divider",

            backgroundColor: "background.paper",
            color: "text.primary",

            px: 1.5,

            fontFamily: "inherit",
            fontSize: 14,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
            },

            "& option": {
              backgroundColor: "background.paper",
              color: "text.primary",
            },
          }}
        >
          <option value="">Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Eggetarian">Eggetarian</option>
          <option value="Other">Other</option>
        </Box>

        {/* Average Sleep */}
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Average Sleep (Hours/Night){" "}
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
          component="select"
          value={data.averageSleep}
          onChange={(event) =>
            onChange("averageSleep", event.target.value)
          }
          sx={{
            width: "100%",
            height: 42,

            border: "1px solid",
            borderColor: "divider",

            backgroundColor: "background.paper",
            color: "text.primary",

            px: 1.5,

            fontFamily: "inherit",
            fontSize: 14,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
            },

            "& option": {
              backgroundColor: "background.paper",
              color: "text.primary",
            },
          }}
        >
          <option value="">Select</option>
          <option value="Less than 5 hours">
            Less than 5 hours
          </option>
          <option value="5-6 hours">5-6 hours</option>
          <option value="7-8 hours">7-8 hours</option>
          <option value="More than 8 hours">
            More than 8 hours
          </option>
        </Box>

        {/* Stress Level */}
        <Typography
          sx={{
            color: "text.primary",
            opacity: 0.55,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Stress Level (Daily){" "}
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
          component="select"
          value={data.stressLevel}
          onChange={(event) =>
            onChange("stressLevel", event.target.value)
          }
          sx={{
            width: "100%",
            height: 42,

            border: "1px solid",
            borderColor: "divider",

            backgroundColor: "background.paper",
            color: "text.primary",

            px: 1.5,

            fontFamily: "inherit",
            fontSize: 14,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
            },

            "& option": {
              backgroundColor: "background.paper",
              color: "text.primary",
            },
          }}
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </Box>
      </Box>
    </Box>
  );
};

export default HealthLifestyleSection;