import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

interface DietHeaderProps {
  water?: string | number;
}

const DietHeader: React.FC<DietHeaderProps> = ({
  water,
}) => {
  return (
    <Box
      sx={{
        mb: { xs: 2.5, md: 3 },
        px: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* =================================================
          AI NUTRITION PLAN
      ================================================= */}

      <Box>
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: {
              xs: 24,
              sm: 28,
              md: 30,
            },
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#211E1B",
          }}
        >
          AI Nutrition Plan
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontFamily: "'Archivo', sans-serif",
            fontSize: {
              xs: 12,
              sm: 13,
              md: 14,
            },
            fontWeight: 500,
            lineHeight: 1.3,
            color: "#6F6963",
          }}
        >
          Personalized by GRIND AI
        </Typography>
      </Box>

      {/* =================================================
          DAILY WATER INTAKE
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <WaterDropIcon
          sx={{
            fontSize: 21,
            color: "#5DACD4",
          }}
        />

        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: {
              xs: 13,
              sm: 14,
            },
            fontWeight: 700,
            lineHeight: 1,
            color: "#211E1B",
          }}
        >
          {water ?? "-"}
        </Typography>
      </Box>
    </Box>
  );
};

export default DietHeader;