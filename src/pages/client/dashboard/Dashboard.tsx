import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 194px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">
        Dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;