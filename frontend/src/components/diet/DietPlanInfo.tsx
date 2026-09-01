import { Box, Typography } from "@mui/material";
import MedicalDisclaimer from "./MedicalDisclaimer";

interface DietPlanInfoProps {
  planName: string;
  description: string;
}

const DietPlanInfo = ({
  planName,
  description,
}: DietPlanInfoProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #ddd8d2",
        borderRadius: "12px",
        boxShadow:
          "0 2px 10px rgba(26,23,20,.055)",
        px: {
          xs: 1.75,
          md: 2.25,
        },
        py: {
          xs: 1.75,
          md: 2,
        },
        mb: {
          xs: 2,
          md: 2.5,
        },
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: {
            xs: 17,
            md: 19,
          },
          lineHeight: 1.1,
          fontWeight: 900,
          color: "#211e1b",
          maxWidth: 700,
        }}
      >
        {planName}
      </Typography>

      <Typography
        sx={{
          mt: 0.7,
          fontSize: 10,
          lineHeight: 1.5,
          color: "#6f6963",
          fontStyle: "italic",
        }}
      >
        {description}
      </Typography>

      <MedicalDisclaimer />
    </Box>
  );
};

export default DietPlanInfo;