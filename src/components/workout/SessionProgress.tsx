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
      ? Math.min(
          (completed / total) * 100,
          100
        )
      : 0;

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",

          mb: 0.7,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "'Archivo', sans-serif",

            fontSize: 10,

            fontWeight: 500,

            letterSpacing: 0.3,

            color: "#4C4A49",
          }}
        >
          Session Progress
        </Typography>

        <Typography
          sx={{
            fontFamily:
              "'JetBrains Mono', monospace",

            fontSize: 10,

            fontWeight: 400,

            color: "#4C4A49",
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

          backgroundColor:
            "rgba(76, 74, 73, 0.25)",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,

            height: "100%",

            borderRadius: 5,

            backgroundColor: "#FF5C35",

            transition:
              "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

export default SessionProgress;