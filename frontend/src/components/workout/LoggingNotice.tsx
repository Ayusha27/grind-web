import { Box, Typography } from "@mui/material";

interface LoggingNoticeProps {
  month: number;
  week: number;
}

const LoggingNotice = ({
  month,
  week,
}: LoggingNoticeProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 56,
        px: {
          xs: 2,
          sm: 2.5,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,

        border: "2px dashed #ffc5b7",
        borderRadius: "12px",
        backgroundColor: "#fff8f5",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 12,
            sm: 14,
          },
          color: "#66615d",
        }}
      >
        <Box
          component="span"
          sx={{
            mr: 0.5,
            color: "#ff4f2f",
          }}
        >
          📍
        </Box>

        Logging to{" "}

        <Box
          component="span"
          sx={{
            fontWeight: 800,
            color: "#ff5535",
          }}
        >
          Month {month} · Week {week}
        </Box>

        <Box
          component="span"
          sx={{
            ml: 1,
          }}
        >
          — change in the bar above
        </Box>
      </Typography>

      <Box
        sx={{
          flexShrink: 0,
          px: 1.5,
          py: 0.4,
          borderRadius: 10,
          backgroundColor: "#ff5b38",
          color: "#ffffff",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: 0.3,
        }}
      >
        AUTO-SYNC
      </Box>
    </Box>
  );
};

export default LoggingNotice;