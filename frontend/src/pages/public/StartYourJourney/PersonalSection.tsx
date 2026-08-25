import {
  Box,
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

const PersonalSection = ({ data, onChange }: Props) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
        borderRight: {
          xs: "none",
          md: "1px solid #292929",
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
        PERSONAL
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
        {/* Full Name */}
        <TextField
          label="FULL NAME"
          value={data.fullName}
          onChange={(event) =>
            onChange("fullName", event.target.value)
          }
          fullWidth
        />

        {/* Email */}
        <TextField
          label="EMAIL ADDRESS"
          type="email"
          value={data.email}
          onChange={(event) =>
            onChange("email", event.target.value)
          }
          fullWidth
        />

        {/* Age */}
        <TextField
          label="AGE"
          type="number"
          value={data.age}
          onChange={(event) =>
            onChange("age", event.target.value)
          }
          fullWidth
        />

        {/* Gender */}
        <TextField
          select
          label="GENDER"
          value={data.gender}
          onChange={(event) =>
            onChange("gender", event.target.value)
          }
          fullWidth
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
          <MenuItem value="prefer-not-to-say">
            Prefer not to say
          </MenuItem>
        </TextField>

        {/* Occupation */}
        <TextField
          label="OCCUPATION"
          value={data.occupation}
          onChange={(event) =>
            onChange("occupation", event.target.value)
          }
          helperText="Helps us understand your daily activity & stress levels."
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default PersonalSection;