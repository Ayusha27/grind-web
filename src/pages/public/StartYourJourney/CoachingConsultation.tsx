import {
  Box,
  Checkbox,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },

        borderTop:
          "1px solid #292929",
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

          border:
            "1px solid #292929",

          backgroundColor:
            "#0d0d0d",
        }}
      >
        {/* ===================================================
            CHECKBOX
        =================================================== */}

        <Checkbox
          size="small"
          checked={
            data.lifestyleConsultation
          }
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

        {/* ===================================================
            CONTENT
        =================================================== */}

        <Box>
          <Typography
            sx={{
              color: "#f5f5f0",

              fontSize: 10,

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

          {/* =================================================
              PAID SERVICE NOTE
          ================================================= */}

          <Typography
            sx={{
              mt: 0.35,

              color: "#555",

              fontSize: 7.5,

              lineHeight: 1.4,
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "#ff7417",
              }}
            >
              Paid service.
            </Box>{" "}
            Pricing and package details are available
            on the{" "}

            <Box
              component="button"
              type="button"
              onClick={() =>
                navigate(
                  "/membership-guide"
                )
              }
              sx={{
                display: "inline",

                border: 0,

                margin: 0,

                padding: 0,

                background: "none",

                color: "#ff7417",

                font: "inherit",

                fontWeight: 700,

                cursor: "pointer",

                textDecoration:
                  "underline",

                textUnderlineOffset:
                  "2px",

                "&:hover": {
                  color: "#ff8a3d",
                },

                "&:focus-visible": {
                  outline:
                    "1px solid #ff7417",

                  outlineOffset:
                    "2px",
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