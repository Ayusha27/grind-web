import { Box, Typography } from "@mui/material";

interface ProgressRingProps {
  percentage: number;
  completed: number;
  total: number;
  size?: number;
}

const ProgressRing = ({
  percentage,
  completed,
  total,
  size = 48,
}: ProgressRingProps) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        style={{
          display: "block",
          transform: "rotate(-90deg)",
        }}
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#e3dfda"
          strokeWidth="4"
        />

        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#ff5a36"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference -
            (percentage / 100) * circumference
          }
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            lineHeight: 1,
            color: "#222",
          }}
        >
          {percentage}%
        </Typography>

        <Typography
          sx={{
            fontSize: 6,
            color: "#777",
            lineHeight: 1,
            mt: 0.3,
          }}
        >
          {completed}/{total}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressRing;