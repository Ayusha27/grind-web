import { Box, Button, Typography } from "@mui/material";

interface ProgressTrackerHeaderProps {
  month: number;
  onMonthChange: (month: number) => void;
}

const ProgressTrackerHeader = ({
  month,
  onMonthChange,
}: ProgressTrackerHeaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* TITLE */}
      <Typography
        component="h2"
        sx={{
          fontFamily: "Archivo Black, sans-serif",
          fontSize: {
            xs: 18,
            sm: 20,
            md: 22,
          },
          lineHeight: 1.15,
          fontWeight: 900,
          color: "#13131A",
          mb: {
            xs: 1.4,
            sm: 1.5,
            md: 1.8,
          },
        }}
      >
        Progress Tracker
      </Typography>

      {/* MONTH SELECTOR */}
      <Box
        sx={{
          display: "flex",
          gap: {
            xs: 0.8,
            sm: 1,
          },

          width: "100%",

          overflowX: "auto",

          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {[1, 2, 3].map((item) => {
          const active = month === item;

          return (
            <Button
              key={item}
              onClick={() => onMonthChange(item)}
              sx={{
                flex: {
                  xs: "1 1 0",
                  sm: "0 0 auto",
                },

                minWidth: {
                  xs: 0,
                  sm: 120,
                  md: 145,
                },

                height: {
                  xs: 36,
                  sm: 40,
                  md: 44,
                },

                px: {
                  xs: 1.5,
                  sm: 2.5,
                  md: 3,
                },

                borderRadius: "999px",

                border: "1px solid",

                borderColor: active
                  ? "#FF5C35"
                  : "#4C4A49",

                backgroundColor: active
                  ? "#FF5C35"
                  : "#ffffff",

                color: active
                  ? "#ffffff"
                  : "#13131A",

                fontFamily: "Archivo, sans-serif",

                fontSize: {
                  xs: 11,
                  sm: 12,
                  md: 13,
                },

                fontWeight: active
                  ? 800
                  : 700,

                textTransform: "none",

                whiteSpace: "nowrap",

                boxShadow: active
                  ? "0 3px 10px rgba(255,92,53,.16)"
                  : "none",

                transition: "all 180ms ease",

                "&:hover": {
                  backgroundColor: active
                    ? "#FF5C35"
                    : "#f8f6f3",

                  borderColor: active
                    ? "#FF5C35"
                    : "#4C4A49",
                },
              }}
            >
              Month {item}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProgressTrackerHeader;