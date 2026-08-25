import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { IntakeFormData } from "./types";

interface Props {
  data: IntakeFormData;
  onChange: <K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => void;
}

const CoachingConsultation = ({
  data,
  onChange,
}: Props) => {
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
      <Typography
        sx={{
          color: "primary.main",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.5,
          mb: 2,
        }}
      >
        COACHING CONSULTATION
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={data.lifestyleConsultation}
            onChange={(event) =>
              onChange(
                "lifestyleConsultation",
                event.target.checked
              )
            }
          />
        }
        label="I would like a consultation for lifestyle correction"
      />

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 13,
          lineHeight: 1.7,
          maxWidth: 800,
          mt: 1,
        }}
      >
        Our coaches will reach out to discuss a holistic plan
        covering training, nutrition, recovery, and daily
        habits.
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 12,
          lineHeight: 1.7,
          mt: 1.5,
        }}
      >
        Note: Lifestyle Correction Consultation is a paid
        service. Pricing and package details are available
        on the{" "}
        <Link
          component={RouterLink}
          to="/membership-guide"
          sx={{
            color: "primary.main",
            textDecoration: "none",
          }}
        >
          Membership Guide
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default CoachingConsultation;