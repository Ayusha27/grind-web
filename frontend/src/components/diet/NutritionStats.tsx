import { Box, Typography } from "@mui/material";

interface NutritionStatsProps {
  weight: string;
  goalWeight: string;
  height: string;
  bmi: string;
  bmiStatus: string;
  water: string;
}

const NutritionStats = ({
  weight,
  goalWeight,
  height,
  bmi,
  bmiStatus,
  water,
}: NutritionStatsProps) => {
  const stats = [
    {
      label: "WEIGHT",
      value: weight,
    },
    {
      label: "GOAL WEIGHT",
      value: goalWeight,
    },
    {
      label: "HEIGHT",
      value: height,
    },
    {
      label: "BMI",
      value: bmi,
      status: bmiStatus,
      highlight: true,
    },
    {
      label: "WATER",
      value: water,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: {
          xs: 1.25,
          sm: 1.5,
          md: 1.5,
        },
        mb: {
          xs: 2,
          md: 2.5,
        },
        width: "100%",
      }}
    >
      {stats.map((stat) => (
        <Box
          key={stat.label}
          sx={{
            width: "100%",
            minWidth: 0,
            minHeight: {
              xs: 76,
              md: 78,
            },
            boxSizing: "border-box",
            backgroundColor: "#fff",
            border: "1px solid #e0dbd4",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(26,23,20,.055)",
            px: {
              xs: 1.75,
              md: 2,
            },
            py: 1.45,

            ...(stat.highlight && {
              borderLeft: "4px solid #ff5c35",
            }),
          }}
        >
          <Typography
            sx={{
              fontSize: 9,
              color: "#77716b",
              fontWeight: 500,
            }}
          >
            {stat.label}
          </Typography>

          <Typography
            sx={{
              mt: 0.55,
              fontSize: {
                xs: 20,
                md: 21,
              },
              lineHeight: 1,
              fontWeight: 800,
              color: "#211e1b",
              fontFamily:
                '"Roboto Mono", "Courier New", monospace',
              letterSpacing: 0.4,
              wordBreak: "break-word",
            }}
          >
            {stat.value}
          </Typography>

          {stat.status && (
            <Box
              sx={{
                mt: 0.65,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: "#e84462",
                }}
              />

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#77716b",
                }}
              >
                {stat.status}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NutritionStats;