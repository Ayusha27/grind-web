import {
  Box,
  Checkbox,
  Typography,
} from "@mui/material";

import { IntakeFormData } from "./types";

interface CoachingConsultationProps {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const CoachingConsultation = ({
  data,
  onChange,
}: CoachingConsultationProps) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },
        borderTop: "1px solid #292929",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.8,
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
          COACHING CONSULTATION
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            backgroundColor: "#292929",
          }}
        />
      </Box>

      {/* Consultation option */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          p: {
            xs: 1.2,
            md: 1.5,
          },
          border: "1px solid #292929",
          backgroundColor: "#0d0d0d",
        }}
      >
        <Checkbox
          size="small"
          checked={data.lifestyleConsultation}
          onChange={(event) =>
            onChange(
              "lifestyleConsultation",
              event.target.checked
            )
          }
          sx={{
            color: "#333",
            p: 0.2,
            mt: 0.1,

            "&.Mui-checked": {
              color: "#ff7417",
            },
          }}
        />

        <Box>
          <Typography
            sx={{
              color: "#f5f5f0",
              fontSize: 10,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            I would like a consultation for lifestyle
            correction
          </Typography>

          <Typography
            sx={{
              mt: 0.45,
              color: "#666",
              fontSize: 8,
              lineHeight: 1.45,
            }}
          >
            Our coaches will reach out to discuss a
            holistic plan covering training, nutrition,
            recovery, and daily habits tailored to your
            lifestyle.
          </Typography>

          <Typography
            sx={{
              mt: 0.35,
              color: "#555",
              fontSize: 7.5,
              lineHeight: 1.4,
            }}
          >
            Note: Lifestyle Correction Consultation is a
            paid service. Pricing and package details are
            available on the{" "}
            <Box
              component="span"
              sx={{
                color: "#ff7417",
                fontWeight: 700,
              }}
            >
              Membership Guide
            </Box>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoachingConsultation;