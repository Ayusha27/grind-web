import { Box, Button, Stack, Typography } from "@mui/material";

interface ProgressTrackerHeaderProps {
  month: number;
  onMonthChange: (month: number) => void;
}

const ProgressTrackerHeader = ({
  month,
  onMonthChange,
}: ProgressTrackerHeaderProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 21,
          fontWeight: 900,
          color: "#1a1714",
        }}
      >
        Progress Tracker
      </Typography>

      <Typography
        sx={{
          mt: 0.3,
          fontSize: 11,
          color: "#77716b",
        }}
      >
        All data flows automatically from your workout check-ins — no manual
        entry needed.
      </Typography>

      <Stack direction="row" spacing={0.8} sx={{ mt: 2 }}>
        {[1, 2, 3].map((item) => {
          const active = month === item;

          return (
            <Button
              key={item}
              onClick={() => onMonthChange(item)}
              sx={{
                minWidth: 0,
                height: 30,
                px: 2,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: active ? "#1a1714" : "#ddd7d0",
                backgroundColor: active ? "#1a1714" : "#ffffff",
                color: active ? "#ffffff" : "#77716b",
                fontSize: 10,
                fontWeight: 800,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: active ? "#1a1714" : "#f5f2ed",
                },
              }}
            >
              Month {item}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProgressTrackerHeader;