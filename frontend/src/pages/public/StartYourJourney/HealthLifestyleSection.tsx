import { Box, Checkbox, Typography } from "@mui/material";

import { IntakeFormData } from "./types";

interface HealthLifestyleSectionProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
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

  return (
    <Box
      sx={{
        borderTop: "1px solid #292929",
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
      {/* =====================================================
          HEALTH & LIMITATIONS
      ===================================================== */}
      <Box>
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
            Health & Limitations
          </Typography>

          <Box
            sx={{
              height: "1px",
              backgroundColor: "#292929",
              flex: 1,
            }}
          />
        </Box>

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Any injuries or physical limitations?
        </Typography>

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
                  borderBottom: "1px solid #292929",
                  background: "transparent",
                  color: "#f5f5f0",
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
                    color: "#292929",

                    "&.Mui-checked": {
                      color: "primary.main",
                    },

                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />

                <Typography
                  sx={{
                    color: selected ? "#f5f5f0" : "#777",
                    fontSize: 10,
                    fontWeight: selected ? 500 : 400,
                  }}
                >
                  {injury}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Describe any injury / health concern
        </Typography>

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
            border: "1px solid #292929",
            backgroundColor: "#111",
            color: "#f5f5f0",
            px: 1.5,
            py: 1.25,
            fontFamily: "inherit",
            fontSize: 10,
            outline: "none",

            "&::placeholder": {
              color: "#555",
              fontStyle: "italic",
            },

            "&:focus": {
              borderColor: "primary.main",
            },
          }}
        />
      </Box>

      {/* =====================================================
          DIET & LIFESTYLE
      ===================================================== */}
      <Box>
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
            Diet & Lifestyle
          </Typography>

          <Box
            sx={{
              height: "1px",
              backgroundColor: "#292929",
              flex: 1,
            }}
          />
        </Box>

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Dietary Preference
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
            border: "1px solid #292929",
            backgroundColor: "#111",
            color: "#f5f5f0",
            px: 1.5,
            fontFamily: "inherit",
            fontSize: 10,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
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

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Average Sleep (Hours/Night)
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
            border: "1px solid #292929",
            backgroundColor: "#111",
            color: "#f5f5f0",
            px: 1.5,
            fontFamily: "inherit",
            fontSize: 10,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
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

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            mt: 2.5,
            mb: 1,
          }}
        >
          Stress Level (Daily)
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
            border: "1px solid #292929",
            backgroundColor: "#111",
            color: "#f5f5f0",
            px: 1.5,
            fontFamily: "inherit",
            fontSize: 10,
            outline: "none",

            "&:focus": {
              borderColor: "primary.main",
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