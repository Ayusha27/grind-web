import { Box, Stack, Typography } from "@mui/material";

interface SessionProgressProps {
  completed: number;
  total: number;
}

const SessionProgress = ({
  completed,
  total,
}: SessionProgressProps) => {
  const percentage =
    total > 0
      ? Math.min(100, Math.round((completed / total) * 100))
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        sx={{
            mb: 0.6,
            justifyContent: "space-between",
            alignItems: "center",
        }}
        >
        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
          }}
        >
          Session Progress
        </Typography>

        <Typography
          sx={{
            color: "#777",
            fontSize: 9,
          }}
        >
          {completed} of {total} sets
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: 7,
          backgroundColor: "#e3dfda",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#ff5a36",
            borderRadius: "10px",
            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

export default SessionProgress;