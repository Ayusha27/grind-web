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
          color: "#13131A",
          fontFamily: "Archivo Black, sans-serif",
        }}
      >
        Weekly Detail
      </Typography>

      <Stack
        direction="row"
        spacing={0.8}
        sx={{
          mt: 1.5,

          overflowX: "auto",

          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
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

                borderColor: active
                  ? "#FF5C35"
                  : "#4C4A49",

                backgroundColor: active
                  ? "#FF5C35"
                  : "#ffffff",

                color: active
                  ? "#ffffff"
                  : "#13131A",

                fontSize: 10,
                fontWeight: 700,

                fontFamily:
                  "Archivo, sans-serif",

                textTransform: "none",

                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: active
                    ? "#FF5C35"
                    : "#f5f2ed",

                  borderColor: active
                    ? "#FF5C35"
                    : "#4C4A49",
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