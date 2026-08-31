import { Box, Typography } from "@mui/material";

const Diet = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 194px)",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        color: "#1a1917",
      }}
    >
      <Typography
        sx={{
          color: "#1a1917",
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        Diet
      </Typography>
    </Box>
  );
};

export default Diet;