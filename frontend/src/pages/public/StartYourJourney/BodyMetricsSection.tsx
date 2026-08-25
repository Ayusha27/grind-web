import {
  Box,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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

const BodyMetricsSection = ({ data, onChange }: Props) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* Section Title */}
      <Typography
        sx={{
          color: "primary.main",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.5,
          mb: 2,
        }}
      >
        BODY METRICS
      </Typography>

      {/* Section line */}
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#292929",
          mb: 2,
        }}
      />

      {/* Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.8,
        }}
      >
        {/* Weight */}
        <Box>
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 700,
              color: "#777",
              mb: 0.8,
              textTransform: "uppercase",
            }}
          >
            Weight Unit
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={data.weightUnit}
            onChange={(_, value) => {
              if (value) {
                onChange("weightUnit", value);
              }
            }}
            size="small"
            sx={{
              mb: 1,
            }}
          >
            <ToggleButton value="kg">KG</ToggleButton>
            <ToggleButton value="lbs">LBS</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="WEIGHT"
            value={data.weight}
            onChange={(event) =>
              onChange("weight", event.target.value)
            }
            type="number"
            placeholder="75"
            fullWidth
          />
        </Box>

        {/* Height */}
        <Box>
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 700,
              color: "#777",
              mb: 0.8,
              textTransform: "uppercase",
            }}
          >
            Height Unit
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={data.heightUnit}
            onChange={(_, value) => {
              if (value) {
                onChange("heightUnit", value);
              }
            }}
            size="small"
            sx={{
              mb: 1,
            }}
          >
            <ToggleButton value="cm">CM</ToggleButton>
            <ToggleButton value="ft">FT/IN</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="HEIGHT"
            value={data.height}
            onChange={(event) =>
              onChange("height", event.target.value)
            }
            type="number"
            placeholder="178"
            fullWidth
          />
        </Box>

        {/* Fitness Level */}
        <Box>
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 700,
              color: "#777",
              mb: 0.8,
              textTransform: "uppercase",
            }}
          >
            Current Fitness Level
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={data.fitnessLevel}
            onChange={(_, value) => {
              if (value) {
                onChange("fitnessLevel", value);
              }
            }}
            size="small"
            sx={{
              flexWrap: "wrap",
            }}
          >
            <ToggleButton value="beginner">
              BEGINNER
            </ToggleButton>

            <ToggleButton value="intermediate">
              INTERMEDIATE
            </ToggleButton>

            <ToggleButton value="advanced">
              ADVANCED
            </ToggleButton>

            <ToggleButton value="athlete">
              ATHLETE
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Training Days */}
        <TextField
          select
          label="AVAILABLE TRAINING DAYS / WEEK"
          value={data.trainingDays}
          onChange={(event) =>
            onChange("trainingDays", event.target.value)
          }
          fullWidth
        >
          <MenuItem value="1">1 Day</MenuItem>
          <MenuItem value="2">2 Days</MenuItem>
          <MenuItem value="3">3 Days</MenuItem>
          <MenuItem value="4">4 Days</MenuItem>
          <MenuItem value="5">5 Days</MenuItem>
          <MenuItem value="6">6 Days</MenuItem>
          <MenuItem value="7">7 Days</MenuItem>
        </TextField>

        {/* Session Length */}
        <TextField
          select
          label="PREFERRED SESSION LENGTH"
          value={data.sessionLength}
          onChange={(event) =>
            onChange("sessionLength", event.target.value)
          }
          fullWidth
        >
          <MenuItem value="30">30 Minutes</MenuItem>
          <MenuItem value="45">45 Minutes</MenuItem>
          <MenuItem value="60">60 Minutes</MenuItem>
          <MenuItem value="90">90+ Minutes</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
};

export default BodyMetricsSection;