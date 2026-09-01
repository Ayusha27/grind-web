import { Box, Typography } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const MedicalDisclaimer = () => {
  return (
    <Box
      sx={{
        mt: 1.75,
        border: "1px solid #f1b900",
        backgroundColor: "#fff8df",
        borderRadius: "10px",
        px: {
          xs: 1.5,
          md: 1.75,
        },
        py: 1.25,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <WarningAmberOutlinedIcon
          sx={{
            fontSize: 15,
            color: "#a85c00",
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            color: "#9a5600",
          }}
        >
          Medical Disclaimer:
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 10,
          lineHeight: 1.5,
          color: "#9a5600",
        }}
      >
        If you have any pre-existing medical condition,
        are taking medication, are pregnant, nursing, or
        have specific dietary restrictions, please consult
        your physician or a qualified healthcare
        professional before starting this nutrition plan.
      </Typography>
    </Box>
  );
};

export default MedicalDisclaimer;