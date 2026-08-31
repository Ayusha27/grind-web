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
      ? Math.min(
          100,
          Math.round((completed / total) * 100)
        )
      : 0;

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e0dbd4",
        borderRadius: "12px",
        px: {
          xs: 1.75,
          md: 2,
        },
        py: 1.5,
      }}
    >
      {/* Vertical spacing is fine with Stack */}
      <Stack spacing={0.8}>
        {/* Horizontal layout - use Box instead of Stack */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              color: "#1a1714",
            }}
          >
            Session Progress
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#6b6560",
            }}
          >
            <strong>{completed}</strong> of {total} sets
          </Typography>
        </Box>

        {/* Progress bar */}
        <Box
          sx={{
            width: "100%",
            height: 6,
            borderRadius: 10,
            backgroundColor: "#ebe6e0",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: 10,
              backgroundColor: "#ff5c35",
              transition: "width 250ms ease",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default SessionProgress;