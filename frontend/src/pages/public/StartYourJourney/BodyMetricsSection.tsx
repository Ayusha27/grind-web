import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { IntakeFormData } from "./types";

interface BodyMetricsSectionProps {
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

const toggleStyles = {
  minWidth: 35,
  minHeight: 24,
  px: 1,
  py: 0.3,
  borderRadius: 0,
  border: "1px solid #292929",
  color: "#666",
  fontSize: 8,
  fontWeight: 700,
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#1a1a1a",
    boxShadow: "none",
  },
};

const BodyMetricsSection = ({
  data,
  onChange,
}: BodyMetricsSectionProps) => {
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
          BODY METRICS
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            backgroundColor: "#292929",
          }}
        />
      </Box>

      {/* Weight */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Weight Unit
        </Typography>

        <Box sx={{ display: "flex", mb: 0.8 }}>
          <Button
            onClick={() =>
              onChange("weightUnit", "kg")
            }
            sx={{
              ...toggleStyles,
              backgroundColor:
                data.weightUnit === "kg"
                  ? "#ff7417"
                  : "#111",
              color:
                data.weightUnit === "kg"
                  ? "#fff"
                  : "#666",
            }}
          >
            KG
          </Button>

          <Button
            onClick={() =>
              onChange("weightUnit", "lbs")
            }
            sx={{
              ...toggleStyles,
              backgroundColor:
                data.weightUnit === "lbs"
                  ? "#ff7417"
                  : "#111",
              color:
                data.weightUnit === "lbs"
                  ? "#fff"
                  : "#666",
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
          onChange={(event) =>
            onChange("weight", event.target.value)
          }
          sx={inputStyles}
        />
      </Box>

      {/* Height */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Height Unit
        </Typography>

        <Box sx={{ display: "flex", mb: 0.8 }}>
          <Button
            onClick={() =>
              onChange("heightUnit", "cm")
            }
            sx={{
              ...toggleStyles,
              backgroundColor:
                data.heightUnit === "cm"
                  ? "#ff7417"
                  : "#111",
              color:
                data.heightUnit === "cm"
                  ? "#fff"
                  : "#666",
            }}
          >
            CM
          </Button>

          <Button
            onClick={() =>
              onChange("heightUnit", "ft/in")
            }
            sx={{
              ...toggleStyles,
              backgroundColor:
                data.heightUnit === "ft/in"
                  ? "#ff7417"
                  : "#111",
              color:
                data.heightUnit === "ft/in"
                  ? "#fff"
                  : "#666",
            }}
          >
            FT/IN
          </Button>
        </Box>

        <TextField
          fullWidth
          size="small"
          value={data.height}
          placeholder="178"
          onChange={(event) =>
            onChange("height", event.target.value)
          }
          sx={inputStyles}
        />
      </Box>

      {/* Fitness level */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Current Fitness Level
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
          ].map((level) => (
            <Button
              key={level}
              onClick={() =>
                onChange("fitnessLevel", level)
              }
              sx={{
                ...toggleStyles,
                backgroundColor:
                  data.fitnessLevel === level
                    ? "#ff7417"
                    : "#111",
                color:
                  data.fitnessLevel === level
                    ? "#fff"
                    : "#666",
                textTransform: "uppercase",
              }}
            >
              {level}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Training days */}
      <Box sx={{ mb: 1.6 }}>
        <Typography sx={labelStyles}>
          Available Training Days / Week
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
      </Box>

      {/* Session length */}
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