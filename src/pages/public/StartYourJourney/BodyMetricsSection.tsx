import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import type {
  IntakeFormData,
} from "./types";

interface BodyMetricsSectionProps {
  data: IntakeFormData;

  onChange: <
    K extends keyof IntakeFormData
  >(
    field: K,
    value: IntakeFormData[K]
  ) => void;

  errors?: {
    weight?: boolean;
    height?: boolean;
    fitnessLevel?: boolean;
    trainingDays?: boolean;
  };
}

// ============================================================
// INPUT STYLES
// ============================================================

const inputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "background.paper",
    color: "text.primary",
    borderRadius: 0,
    fontSize: 16,
    minHeight: 38,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "divider",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },

  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },

  "& .MuiInputBase-input": {
    py: 1,
  },

  "& .MuiSelect-icon": {
    color: "secondary.main",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "text.primary",
    opacity: 0.45,
  },
};

// ============================================================
// NATIVE SELECT STYLES
// ============================================================

const nativeSelectStyles = {
  width: "100%",
  minHeight: 38,

  padding: "0 36px 0 12px",

  backgroundColor: "background.paper",
  color: "text.primary",

  border: "1px solid",
  borderColor: "divider",

  borderRadius: 0,

  outline: "none",

  fontSize: 16,
  fontFamily: "inherit",

  cursor: "pointer",

  "&:hover": {
    borderColor: "secondary.main",
  },

  "&:focus": {
    borderColor: "primary.main",
  },

  "& option": {
    backgroundColor: "background.paper",
    color: "text.primary",
  },
};

// ============================================================
// LABEL
// ============================================================

const labelStyles = {
  color: "text.primary",
  opacity: 0.55,

  fontSize: 12,

  fontWeight: 700,

  letterSpacing: "0.7px",

  textTransform: "uppercase",

  mb: 0.7,
};

// ============================================================
// ERROR MESSAGE
// ============================================================

const ErrorMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Typography
      role="alert"
      sx={{
        color: "primary.main",

        fontSize: 11,

        lineHeight: 1.4,

        mt: 0.45,
      }}
    >
      {children}
    </Typography>
  );
};

// ============================================================
// ERROR WRAPPER
// ============================================================

const errorWrapperStyles = (
  hasError?: boolean
) => ({
  borderLeft: hasError
    ? "2px solid"
    : "2px solid transparent",

  borderColor: hasError
    ? "primary.main"
    : "transparent",

  pl: hasError ? 1 : 0,
});

// ============================================================
// BODY METRICS SECTION
// ============================================================

const BodyMetricsSection = ({
  data,
  onChange,
  errors = {},
}: BodyMetricsSectionProps) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },

        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* ======================================================
          SECTION HEADING
      ====================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",

            fontSize: 11,

            fontWeight: 700,

            letterSpacing: "1.2px",

            whiteSpace: "nowrap",
          }}
        >
          BODY METRICS
        </Typography>

        <Box
          sx={{
            flex: 1,

            height: "1px",

            backgroundColor: "divider",
          }}
        />
      </Box>

      {/* ======================================================
          WEIGHT
      ====================================================== */}

      <Box
        id="intake-weight"
        sx={{
          ...errorWrapperStyles(errors.weight),
          mb: 1.6,
        }}
      >
        <Typography sx={labelStyles}>
          Weight{" "}
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
            display: "flex",
            mb: 0.8,
          }}
        >
          <Button
            type="button"
            onClick={() =>
              onChange("weightUnit", "kg")
            }
            sx={{
              minWidth: 35,
              minHeight: 24,
              px: 1,
              py: 0.3,
              borderRadius: 0,

              border: "1px solid",
              borderColor: "divider",

              color:
                data.weightUnit === "kg"
                  ? "text.primary"
                  : "secondary.main",

              backgroundColor:
                data.weightUnit === "kg"
                  ? "primary.main"
                  : "background.default",

              fontSize: 11,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                backgroundColor:
                  data.weightUnit === "kg"
                    ? "primary.main"
                    : "background.paper",

                boxShadow: "none",
              },
            }}
          >
            KG
          </Button>

          <Button
            type="button"
            onClick={() =>
              onChange("weightUnit", "lbs")
            }
            sx={{
              minWidth: 35,
              minHeight: 24,
              px: 1,
              py: 0.3,
              borderRadius: 0,

              border: "1px solid",
              borderColor: "divider",

              color:
                data.weightUnit === "lbs"
                  ? "text.primary"
                  : "secondary.main",

              backgroundColor:
                data.weightUnit === "lbs"
                  ? "primary.main"
                  : "background.default",

              fontSize: 11,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                backgroundColor:
                  data.weightUnit === "lbs"
                    ? "primary.main"
                    : "background.paper",

                boxShadow: "none",
              },
            }}
          >
            LBS
          </Button>
        </Box>

        <TextField
          fullWidth
          size="small"
          type="number"
          value={data.weight}
          placeholder="75"
          error={Boolean(errors.weight)}
          slotProps={{
            htmlInput: {
              min: 1,
              step: "0.1",
            },
          }}
          onChange={(event) =>
            onChange(
              "weight",
              event.target.value
            )
          }
          sx={inputStyles}
        />

        {errors.weight && (
          <ErrorMessage>
            Please enter your weight.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          HEIGHT
      ====================================================== */}

      <Box
        id="intake-height"
        sx={{
          ...errorWrapperStyles(errors.height),
          mb: 1.6,
        }}
      >
        <Typography sx={labelStyles}>
          Height{" "}
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
            display: "flex",
            mb: 0.8,
          }}
        >
          <Button
            type="button"
            onClick={() =>
              onChange("heightUnit", "cm")
            }
            sx={{
              minWidth: 35,
              minHeight: 24,
              px: 1,
              py: 0.3,
              borderRadius: 0,

              border: "1px solid",
              borderColor: "divider",

              color:
                data.heightUnit === "cm"
                  ? "text.primary"
                  : "secondary.main",

              backgroundColor:
                data.heightUnit === "cm"
                  ? "primary.main"
                  : "background.default",

              fontSize: 11,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                backgroundColor:
                  data.heightUnit === "cm"
                    ? "primary.main"
                    : "background.paper",

                boxShadow: "none",
              },
            }}
          >
            CM
          </Button>

          <Button
            type="button"
            onClick={() =>
              onChange("heightUnit", "ft/in")
            }
            sx={{
              minWidth: 35,
              minHeight: 24,
              px: 1,
              py: 0.3,
              borderRadius: 0,

              border: "1px solid",
              borderColor: "divider",

              color:
                data.heightUnit === "ft/in"
                  ? "text.primary"
                  : "secondary.main",

              backgroundColor:
                data.heightUnit === "ft/in"
                  ? "primary.main"
                  : "background.default",

              fontSize: 11,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                backgroundColor:
                  data.heightUnit === "ft/in"
                    ? "primary.main"
                    : "background.paper",

                boxShadow: "none",
              },
            }}
          >
            FT/IN
          </Button>
        </Box>

        {data.heightUnit === "cm" ? (
          <TextField
            fullWidth
            size="small"
            type="number"
            value={data.height}
            placeholder="178"
            error={Boolean(errors.height)}
            slotProps={{
              htmlInput: {
                min: 1,
                step: "0.1",
              },
            }}
            onChange={(event) =>
              onChange(
                "height",
                event.target.value
              )
            }
            sx={inputStyles}
          />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              type="number"
              value={data.heightFt}
              placeholder="5"
              error={Boolean(errors.height)}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 8,
                  step: 1,
                },
              }}
              onChange={(event) =>
                onChange(
                  "heightFt",
                  event.target.value
                )
              }
              sx={inputStyles}
            />

            <TextField
              fullWidth
              size="small"
              type="number"
              value={data.heightIn}
              placeholder="10"
              error={Boolean(errors.height)}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 11.9,
                  step: "0.1",
                },
              }}
              onChange={(event) =>
                onChange(
                  "heightIn",
                  event.target.value
                )
              }
              sx={inputStyles}
            />
          </Box>
        )}

        {errors.height && (
          <ErrorMessage>
            Please enter your height.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          FITNESS LEVEL
      ====================================================== */}

      <Box
        id="intake-fitness-level"
        sx={{
          ...errorWrapperStyles(
            errors.fitnessLevel
          ),
          mb: 1.6,
        }}
      >
        <Typography sx={labelStyles}>
          Current Fitness Level{" "}
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
            display: "flex",
            flexWrap: "wrap",
            gap: 0.6,
          }}
        >
          {[
            "beginner",
            "intermediate",
            "advanced",
            "athlete",
          ].map((level) => {
            const selected =
              data.fitnessLevel === level;

            return (
              <Button
                key={level}
                type="button"
                onClick={() =>
                  onChange(
                    "fitnessLevel",
                    level
                  )
                }
                sx={{
                  minWidth: 35,
                  minHeight: 24,
                  px: 1,
                  py: 0.3,
                  borderRadius: 0,

                  border: "1px solid",
                  borderColor: "divider",

                  color: selected
                    ? "text.primary"
                    : "secondary.main",

                  backgroundColor: selected
                    ? "primary.main"
                    : "background.default",

                  fontSize: 11,
                  fontWeight: 700,
                  boxShadow: "none",

                  textTransform: "uppercase",

                  "&:hover": {
                    backgroundColor: selected
                      ? "primary.main"
                      : "background.paper",

                    boxShadow: "none",
                  },
                }}
              >
                {level}
              </Button>
            );
          })}
        </Box>

        {errors.fitnessLevel && (
          <ErrorMessage>
            Please select your fitness level.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          TRAINING DAYS
      ====================================================== */}

      <Box
        id="intake-training-days"
        sx={{
          ...errorWrapperStyles(
            errors.trainingDays
          ),
          mb: 1.6,
        }}
      >
        <Typography sx={labelStyles}>
          Available Training Days / Week{" "}
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
          component="select"
          value={data.trainingDays}
          onChange={(event) =>
            onChange(
              "trainingDays",
              event.target.value
            )
          }
          sx={{
            ...nativeSelectStyles,

            appearance: "auto",

            borderColor: errors.trainingDays
              ? "primary.main"
              : "divider",
          }}
        >
          <option value="">Select</option>

          <option value="2 days">2 days</option>
          <option value="3 days">3 days</option>
          <option value="4 days">4 days</option>
          <option value="5 days">5 days</option>
          <option value="6 days">6 days</option>
          <option value="7 days">7 days</option>
        </Box>

        {errors.trainingDays && (
          <ErrorMessage>
            Please select your training days.
          </ErrorMessage>
        )}
      </Box>

      {/* ======================================================
          SESSION LENGTH
          OPTIONAL
      ====================================================== */}

      <Box>
        <Typography sx={labelStyles}>
          Preferred Session Length
        </Typography>

        <Box
          component="select"
          value={data.sessionLength}
          onChange={(event) =>
            onChange(
              "sessionLength",
              event.target.value
            )
          }
          sx={{
            ...nativeSelectStyles,
            appearance: "auto",
          }}
        >
          <option value="">Select</option>

          <option value="30 mins">30 mins</option>
          <option value="45 mins">45 mins</option>
          <option value="60 mins">60 mins</option>
          <option value="75 mins">75 mins</option>
          <option value="90 mins">90 mins</option>
        </Box>
      </Box>
    </Box>
  );
};

export default BodyMetricsSection;