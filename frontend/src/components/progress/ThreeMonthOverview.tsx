import { Box, Stack, Typography } from "@mui/material";

interface MonthlyData {
  month: string;
  workouts: number;
  calories: number;
  score: number;
}

interface ThreeMonthOverviewProps {
  data: MonthlyData[];
}

const ThreeMonthOverview = ({
  data,
}: ThreeMonthOverviewProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 900,
          color: "#1a1714",
          mb: 1,
        }}
      >
        3-Month Overview
      </Typography>

      <Box
        sx={{
          height: 210,
          backgroundColor: "#ffffff",
          border: "1px solid #e0dbd4",
          borderRadius: "12px",
          p: 2,
          boxShadow: "0 4px 14px rgba(26,23,20,.05)",
        }}
      >
        <Stack
  direction="row"
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 900,
              color: "#1a1714",
            }}
          >
            Workouts · Calories · Score — per month
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Typography
              sx={{
                fontSize: 9,
                color: "#77716b",
              }}
            >
              <span style={{ color: "#ff5c35" }}>●</span>{" "}
              Workouts
            </Typography>

            <Typography
              sx={{
                fontSize: 9,
                color: "#77716b",
              }}
            >
              <span style={{ color: "#2865dc" }}>●</span>{" "}
              kcal ÷10
            </Typography>

            <Typography
              sx={{
                fontSize: 9,
                color: "#77716b",
              }}
            >
              <span style={{ color: "#16b85a" }}>●</span>{" "}
              Score %
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            height: 145,
            mt: 2,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          {data.map((item) => (
            <Box
              key={item.month}
              sx={{
                width: 100,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack
  direction="row"
  spacing={2}
  sx={{
    mb: 2,
    alignItems: "center",
  }}
>
                <Box
                  sx={{
                    width: 16,
                    height: Math.max(3, item.workouts * 3),
                    borderRadius: "4px 4px 0 0",
                    backgroundColor: "#ff5c35",
                  }}
                />

                <Box
                  sx={{
                    width: 16,
                    height: Math.max(3, item.calories / 10),
                    borderRadius: "4px 4px 0 0",
                    backgroundColor: "#2865dc",
                  }}
                />

                <Box
                  sx={{
                    width: 16,
                    height: Math.max(3, item.score),
                    borderRadius: "4px 4px 0 0",
                    backgroundColor: "#16b85a",
                  }}
                />
              </Stack>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#aaa39c",
                  fontFamily: "monospace",
                }}
              >
                {item.score}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#77716b",
                }}
              >
                {item.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ThreeMonthOverview;