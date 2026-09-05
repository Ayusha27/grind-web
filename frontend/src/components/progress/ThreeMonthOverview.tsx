import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

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
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #e0dbd4",
        borderRadius: {
          xs: "10px",
          md: "12px",
        },
        px: {
          xs: 1.1,
          sm: 1.4,
          md: 1.7,
        },
        py: {
          xs: 1.15,
          md: 1.4,
        },
        boxShadow:
          "0 2px 8px rgba(26,23,20,.04)",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                md: 14,
              },
              fontWeight: 900,
              color: "#1a1714",
            }}
          >
            3-Month Overview
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: {
                xs: 7,
                md: 8,
              },
              color: "#77716b",
            }}
          >
            Workouts · Calories · Score
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={{
            xs: 0.8,
            md: 1.2,
          }}
        >
          <Legend
            color="#ff5c35"
            label="Workouts"
          />

          <Legend
            color="#2865dc"
            label="Calories"
          />

          <Legend
            color="#16b85a"
            label="Score"
          />
        </Stack>
      </Box>

      {/* COMPACT CHART */}

      <Box
        sx={{
          mt: 1.25,
          height: {
            xs: 105,
            sm: 115,
            md: 125,
          },
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          borderBottom:
            "1px solid #e5e0da",
        }}
      >
        {data.map((item) => (
          <Box
            key={item.month}
            sx={{
              height: "100%",
              flex: 1,
              maxWidth: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              direction="row"
              spacing={{
                xs: 0.45,
                md: 0.7,
              }}
              sx={{
                alignItems: "flex-end",
                height: "100%",
              }}
            >
              <ChartBar
                height={item.workouts * 3}
                color="#ff5c35"
              />

              <ChartBar
                height={item.calories / 10}
                color="#2865dc"
              />

              <ChartBar
                height={item.score}
                color="#16b85a"
              />
            </Stack>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 7,
                color: "#aaa39c",
                fontFamily:
                  '"Roboto Mono", "Courier New", monospace',
              }}
            >
              {item.score}%
            </Typography>

            <Typography
              sx={{
                mt: 0.1,
                mb: 0.6,
                fontSize: 8,
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
  );
};

const ChartBar = ({
  height,
  color,
}: {
  height: number;
  color: string;
}) => (
  <Box
    sx={{
      width: {
        xs: 8,
        sm: 10,
        md: 12,
      },
      height: Math.min(
        85,
        Math.max(3, height)
      ),
      borderRadius: "3px 3px 0 0",
      backgroundColor: color,
    }}
  />
);

const Legend = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <Stack
    direction="row"
    spacing={0.35}
    sx={{
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />

    <Typography
      sx={{
        fontSize: 6.5,
        color: "#77716b",
      }}
    >
      {label}
    </Typography>
  </Stack>
);

export default ThreeMonthOverview;