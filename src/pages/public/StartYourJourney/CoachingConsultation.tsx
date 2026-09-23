import {
  Box,
  Checkbox,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { IntakeFormData } from "./types";

interface CoachingConsultationProps {
  data: IntakeFormData;

  onChange: <
    K extends keyof IntakeFormData
  >(
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

        borderTop: "1px solid",
        borderTopColor: "divider",
      }}
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

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
            color: "primary.main",
            fontSize: 11,
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
            backgroundColor: "divider",
          }}
        />
      </Box>

      {/* =====================================================
          CONSULTATION OPTION
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,

          p: {
            xs: 1.2,
            md: 1.5,
          },

          border: "1px solid",
          borderColor: "divider",

          backgroundColor: "background.paper",
        }}
      >
        {/* ===================================================
            CHECKBOX
        =================================================== */}

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
            color: "divider",

            p: 0.2,

            mt: 0.1,

            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />

        {/* ===================================================
            CONTENT
        =================================================== */}

        <Box>
          <Typography
            sx={{
              color: "text.primary",

              fontSize: 14,

              fontWeight: 700,

              lineHeight: 1.3,
            }}
          >
            I would like a paid Lifestyle
            Correction Consultation
          </Typography>

          <Typography
            sx={{
              mt: 0.45,

              color: "text.primary",
              opacity: 0.55,

              fontSize: 11,

              lineHeight: 1.45,
            }}
          >
            Our coaches will reach out to discuss a
            holistic plan covering training, nutrition,
            recovery, and daily habits tailored to your
            lifestyle.
          </Typography>

          {/* =================================================
              PAID SERVICE NOTE
          ================================================= */}

          <Typography
            sx={{
              mt: 0.35,
              color: "text.primary",
              fontSize: 10,
              lineHeight: 1.4,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              Paid service.
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.primary",
                opacity: 0.65,
              }}
            >
              Pricing and package details are available on the{" "}
            </Box>

            <Box
              component={RouterLink}
              to="/membership-guide"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline",
                color: "primary.main",
                font: "inherit",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "2px",

                "&:hover": {
                  color: "primary.main",
                  opacity: 0.8,
                },

                "&:focus-visible": {
                  outline: "1px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
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