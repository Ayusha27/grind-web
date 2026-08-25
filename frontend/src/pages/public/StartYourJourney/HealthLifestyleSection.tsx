import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
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

const injuryOptions = [
  "Knee issues",
  "Lower back pain",
  "Shoulder injury",
  "No injuries",
];

const HealthLifestyleSection = ({
  data,
  onChange,
}: Props) => {
  const toggleInjury = (injury: string) => {
    if (injury === "No injuries") {
      onChange("injuries", ["No injuries"]);
      return;
    }

    const withoutNone = data.injuries.filter(
      (item) => item !== "No injuries"
    );

    const exists = withoutNone.includes(injury);

    onChange(
      "injuries",
      exists
        ? withoutNone.filter((item) => item !== injury)
        : [...withoutNone, injury]
    );
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: {
            xs: 5,
            md: 6,
          },
        }}
      >
        {/* Health */}
        <Box>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.5,
              mb: 3,
            }}
          >
            HEALTH & LIMITATIONS
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 13,
              mb: 1.5,
            }}
          >
            Any injuries or physical limitations?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {injuryOptions.map((injury) => (
              <FormControlLabel
                key={injury}
                control={
                  <Checkbox
                    checked={data.injuries.includes(injury)}
                    onChange={() =>
                      toggleInjury(injury)
                    }
                  />
                }
                label={injury}
              />
            ))}
          </Box>

          <TextField
            label="Describe any injury / health concern"
            value={data.healthConcern}
            onChange={(event) =>
              onChange(
                "healthConcern",
                event.target.value
              )
            }
            multiline
            minRows={4}
            fullWidth
            sx={{
              mt: 2,
            }}
          />
        </Box>

        {/* Lifestyle */}
        <Box>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.5,
              mb: 3,
            }}
          >
            DIET & LIFESTYLE
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <TextField
              select
              label="Dietary Preference"
              value={data.dietaryPreference}
              onChange={(event) =>
                onChange(
                  "dietaryPreference",
                  event.target.value
                )
              }
              fullWidth
            >
              <MenuItem value="none">
                No Preference
              </MenuItem>
              <MenuItem value="vegetarian">
                Vegetarian
              </MenuItem>
              <MenuItem value="vegan">
                Vegan
              </MenuItem>
              <MenuItem value="non-vegetarian">
                Non-Vegetarian
              </MenuItem>
              <MenuItem value="eggetarian">
                Eggetarian
              </MenuItem>
            </TextField>

            <TextField
              select
              label="Average Sleep (Hours/Night)"
              value={data.sleep}
              onChange={(event) =>
                onChange("sleep", event.target.value)
              }
              fullWidth
            >
              <MenuItem value="less-than-5">
                Less than 5 hours
              </MenuItem>
              <MenuItem value="5-6">
                5–6 hours
              </MenuItem>
              <MenuItem value="6-7">
                6–7 hours
              </MenuItem>
              <MenuItem value="7-8">
                7–8 hours
              </MenuItem>
              <MenuItem value="8-plus">
                8+ hours
              </MenuItem>
            </TextField>

            <TextField
              select
              label="Stress Level (Daily)"
              value={data.stressLevel}
              onChange={(event) =>
                onChange(
                  "stressLevel",
                  event.target.value
                )
              }
              fullWidth
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="moderate">
                Moderate
              </MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="very-high">
                Very High
              </MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HealthLifestyleSection;