import { Box, Button, Stack, Typography } from "@mui/material";

interface WeeklyDetailProps {
  week: number;
  onWeekChange: (week: number) => void;
}

const WeeklyDetail = ({
  week,
  onWeekChange,
}: WeeklyDetailProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 900,
          color: "#1a1714",
        }}
      >
        Weekly Detail
      </Typography>

      <Stack direction="row" spacing={0.8} sx={{ mt: 1.5 }}>
        {[1, 2, 3, 4].map((item) => {
          const active = week === item;

          return (
            <Button
              key={item}
              onClick={() => onWeekChange(item)}
              sx={{
                minWidth: 0,
                height: 32,
                px: 1.8,
                borderRadius: "8px",
                border: "1px solid",
                borderColor: active ? "#ff5c35" : "#ddd7d0",
                backgroundColor: active ? "#ff5c35" : "#ffffff",
                color: active ? "#ffffff" : "#77716b",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: active ? "#ff5c35" : "#f5f2ed",
                },
              }}
            >
              Week {item}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default WeeklyDetail;