import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { IntakeFormData } from "./types";

interface PersonalSectionProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const inputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "#151515",
    color: "#f5f5f0",
    borderRadius: 0,
    fontSize: 12,
    minHeight: 38,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#292929",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3a3a3a",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff7417",
  },

  "& .MuiInputBase-input": {
    py: 1,
  },

  "& .MuiSelect-icon": {
    color: "#777",
  },
};

const nativeSelectStyles = {
  width: "100%",
  minHeight: 38,
  padding: "0 36px 0 12px",
  backgroundColor: "#151515",
  color: "#f5f5f0",
  border: "1px solid #292929",
  borderRadius: 0,
  outline: "none",
  fontSize: 12,
  fontFamily: "inherit",
  cursor: "pointer",

  "&:hover": {
    borderColor: "#3a3a3a",
  },

  "&:focus": {
    borderColor: "#ff7417",
  },

  "& option": {
    backgroundColor: "#1a1a1a",
    color: "#f5f5f0",
  },
};

const labelStyles = {
  color: "#777",
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  mb: 0.7,
};

const PersonalSection = ({
  data,
  onChange,
}: PersonalSectionProps) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },
      }}
    >
      {/* Section heading */}
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
            color: "#ff7417",
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "1.2px",
            whiteSpace: "nowrap",
          }}
        >
          PERSONAL
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            backgroundColor: "#292929",
          }}
        />
      </Box>

      {/* Full name */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Full Name
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={data.fullName}
          placeholder="Alex Carter"
          onChange={(event) =>
            onChange("fullName", event.target.value)
          }
          sx={inputStyles}
        />
      </Box>

      {/* Email */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Email Address
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="email"
          value={data.email}
          placeholder="alex@example.com"
          onChange={(event) =>
            onChange("email", event.target.value)
          }
          sx={inputStyles}
        />
      </Box>

      {/* Age */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Age
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="number"
          value={data.age}
          placeholder="28"
          onChange={(event) =>
            onChange("age", event.target.value)
          }
          sx={inputStyles}
        />
      </Box>

      {/* Gender */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Gender
        </Typography>

        <Box
          component="select"
          value={data.gender}
          onChange={(event) =>
            onChange("gender", event.target.value)
          }
          sx={{
            ...nativeSelectStyles,
            appearance: "auto",
          }}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">
            Prefer not to say
          </option>
        </Box>
      </Box>

      {/* Occupation */}
      <Box>
        <Typography sx={labelStyles}>
          Occupation
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={data.occupation}
          placeholder="Software Engineer"
          onChange={(event) =>
            onChange("occupation", event.target.value)
          }
          sx={inputStyles}
        />

        <Typography
          sx={{
            mt: 0.5,
            color: "#666",
            fontSize: 8,
            fontStyle: "italic",
          }}
        >
          Helps us understand your daily activity & stress
          levels.
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonalSection;