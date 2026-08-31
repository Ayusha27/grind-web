import { Box, Typography } from "@mui/material";

const DietHeader = () => {
  return (
    <Box
      sx={{
        mb: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: {
            xs: 24,
            sm: 27,
            md: 29,
          },
          lineHeight: 1.1,
          fontWeight: 900,
          color: "#1a1714",
          letterSpacing: "-0.5px",
        }}
      >
        AI Nutrition Plan
      </Typography>

      <Typography
        sx={{
          mt: 0.45,
          fontSize: {
            xs: 10,
            md: 11,
          },
          color: "#77716b",
        }}
      >
        Personalized by GRIND AI
      </Typography>
    </Box>
  );
};

export default DietHeader;