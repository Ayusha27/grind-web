import { Box, Typography } from "@mui/material";

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
      ? Math.min((completed / total) * 100, 100)
      : 0;

  return (
    <Box>
      <Box
        sx={{
          mb: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "#68635e",
          }}
        >
          Session Progress
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#68635e",
          }}
        >
          {completed} of {total} sets
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 5,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#dedbd6",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 5,
            backgroundColor: "#ff5b38",

            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

export default SessionProgress;