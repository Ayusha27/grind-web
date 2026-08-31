import { Box, Button, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface NutritionSummaryProps {
  consumedCalories: number;
  targetCalories: number;
  protein: string;
  carbs: string;
  fat: string;
  fibre: string;
  onReset: () => void;
}

const NutritionSummary = ({
  consumedCalories,
  targetCalories,
  protein,
  carbs,
  fat,
  fibre,
  onReset,
}: NutritionSummaryProps) => {
  const percentage =
    targetCalories > 0
      ? Math.min(
          100,
          Math.round(
            (consumedCalories / targetCalories) * 100
          )
        )
      : 0;

  return (
    <Box
      sx={{
        backgroundColor: "#191715",
        borderRadius: "14px",
        px: {
          xs: 2.25,
          sm: 2.75,
          md: 3,
        },
        py: {
          xs: 2.25,
          md: 2.5,
        },
        color: "#fff",
        mb: {
          xs: 2,
          md: 2.25,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 10,
          letterSpacing: 1.2,
          fontWeight: 800,
          color: "#77716b",
          textTransform: "uppercase",
        }}
      >
        Today's Nutrition
      </Typography>

      <Box
        sx={{
          mt: 0.7,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <LocalFireDepartmentIcon
          sx={{
            fontSize: 28,
            color: "#ff5c35",
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 25,
              md: 29,
            },
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 1,
            fontFamily:
              '"Roboto Mono", "Courier New", monospace',
          }}
        >
          {consumedCalories}
          <Box
            component="span"
            sx={{
              mx: 1.2,
              color: "#f4f1ec",
            }}
          >
            /
          </Box>
          {targetCalories} kcal
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1.8,
          display: "flex",
          flexDirection: "column",
          gap: 0.65,
        }}
      >
        <Typography sx={targetTextStyle}>
          Protein Target : {protein}
        </Typography>

        <Typography sx={targetTextStyle}>
          Carbs Target : {carbs}
        </Typography>

        <Typography sx={targetTextStyle}>
          Fat Target : {fat}
        </Typography>

        <Typography sx={targetTextStyle}>
          Fibre Target : {fibre}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={onReset}
          startIcon={
            <RestartAltIcon sx={{ fontSize: 12 }} />
          }
          sx={{
            minWidth: 0,
            height: 27,
            px: 1.2,
            borderRadius: "7px",
            borderColor: "#77716b",
            color: "#77716b",
            fontSize: 9,
            textTransform: "none",

            "&:hover": {
              borderColor: "#ff5c35",
              color: "#ff5c35",
              backgroundColor: "transparent",
            },
          }}
        >
          Reset Today's Diet
        </Button>

        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 700,
            color: "#85807b",
          }}
        >
          {percentage}% Complete
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1,
          width: "100%",
          height: 6,
          borderRadius: 10,
          backgroundColor: "#403d3a",
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
    </Box>
  );
};

const targetTextStyle = {
  fontSize: 11,
  color: "#f0ede9",
  fontWeight: 500,
};

export default NutritionSummary;