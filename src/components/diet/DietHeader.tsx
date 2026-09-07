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
            color: "#211e1b",
          }}
        >
          AI Nutrition Plan
        </Typography>

        <Typography
          sx={{
            color: "#6f6963",
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
            color: "#211e1b",
            fontWeight: 700,
          }}
        >
          {water ?? "-"}
        </Typography>
      </Box>
    </Box>
  );
};

export default DietHeader;