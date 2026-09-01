import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface NutritionSummaryProps {
  consumedCalories: number;
  targetCalories: number;

  consumedProtein: number;
  targetProtein: string;

  consumedCarbs: number;
  targetCarbs: string;

  consumedFat: number;
  targetFat: string;

  consumedFibre: number;
  targetFibre: string;

  onReset: () => void;
}

const NutritionSummary = ({
  consumedCalories,
  targetCalories,

  consumedProtein,
  targetProtein,

  consumedCarbs,
  targetCarbs,

  consumedFat,
  targetFat,

  consumedFibre,
  targetFibre,

  onReset,
}: NutritionSummaryProps) => {
  /* =========================================================
     CALORIE %
  ========================================================= */

  const percentage =
    targetCalories > 0
      ? Math.min(
          100,
          Math.round(
            (consumedCalories /
              targetCalories) *
              100
          )
        )
      : 0;

  /* =========================================================
     FORMAT TARGET

     Removes unnecessary decimal formatting
     while preserving ranges such as 35-40.
  ========================================================= */

  const formatTarget = (
    value: string
  ) => {
    return value
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        backgroundColor:
          "#191715",

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

        boxSizing:
          "border-box",
      }}
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

      <Typography
        sx={{
          fontSize: 10,

          letterSpacing: 1.2,

          fontWeight: 800,

          color: "#77716b",

          textTransform:
            "uppercase",
        }}
      >
        Today's Nutrition
      </Typography>

      {/* =====================================================
          CALORIES
      ===================================================== */}

      <Box
        sx={{
          mt: 0.7,

          display: "flex",

          alignItems: "center",

          gap: 1.25,

          minWidth: 0,
        }}
      >
        <LocalFireDepartmentIcon
          sx={{
            fontSize: 28,

            color: "#ff5c35",

            flexShrink: 0,
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

            whiteSpace:
              "nowrap",
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

      {/* =====================================================
          MACRO SUMMARY

          CONSUMED / TARGET
      ===================================================== */}

      <Box
        sx={{
          mt: 1.8,

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(4, 1fr)",
          },

          gap: {
            xs: 0.75,
            sm: 1,
          },

          width: "100%",
        }}
      >
        <MacroSummary
          label="Protein"
          consumed={
            consumedProtein
          }
          target={
            formatTarget(
              targetProtein
            )
          }
        />

        <MacroSummary
          label="Carbs"
          consumed={
            consumedCarbs
          }
          target={
            formatTarget(
              targetCarbs
            )
          }
        />

        <MacroSummary
          label="Fat"
          consumed={
            consumedFat
          }
          target={
            formatTarget(
              targetFat
            )
          }
        />

        <MacroSummary
          label="Fibre"
          consumed={
            consumedFibre
          }
          target={
            formatTarget(
              targetFibre
            )
          }
        />
      </Box>

      {/* =====================================================
          RESET + PERCENTAGE
      ===================================================== */}

      <Box
        sx={{
          mt: 2,

          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onReset}
          startIcon={
            <RestartAltIcon
              sx={{
                fontSize:
                  12,
              }}
            />
          }
          sx={{
            minWidth: 0,

            height: 27,

            px: 1.2,

            borderRadius: "7px",

            borderColor:
              "#77716b",

            color: "#77716b",

            fontSize: 9,

            textTransform:
              "none",

            "&:hover": {
              borderColor:
                "#ff5c35",

              color:
                "#ff5c35",

              backgroundColor:
                "transparent",
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

            whiteSpace:
              "nowrap",
          }}
        >
          {percentage}% Complete
        </Typography>
      </Box>

      {/* =====================================================
          CALORIE PROGRESS
      ===================================================== */}

      <Box
        sx={{
          mt: 1,

          width: "100%",

          height: 6,

          borderRadius: 10,

          backgroundColor:
            "#403d3a",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width:
              `${percentage}%`,

            height: "100%",

            borderRadius: 10,

            backgroundColor:
              "#ff5c35",

            transition:
              "width 250ms ease",
          }}
        />
      </Box>
    </Box>
  );
};

/* ============================================================
   MACRO SUMMARY ITEM
============================================================ */

interface MacroSummaryProps {
  label: string;
  consumed: number;
  target: string;
}

const MacroSummary = ({
  label,
  consumed,
  target,
}: MacroSummaryProps) => {
  return (
    <Box
      sx={{
        minWidth: 0,

        px: {
          xs: 0.75,
          sm: 1,
        },

        py: 0.75,

        border:
          "1px solid #34312e",

        borderRadius: "8px",

        backgroundColor:
          "#211f1d",
      }}
    >
      {/* LABEL */}

      <Typography
        sx={{
          fontSize: 7,

          color: "#8f8983",

          fontWeight: 700,

          letterSpacing: 0.7,

          textTransform:
            "uppercase",
        }}
      >
        {label}
      </Typography>

      {/* VALUE */}

      <Typography
        sx={{
          mt: 0.35,

          fontSize: {
            xs: 11,
            sm: 12,
          },

          lineHeight: 1.1,

          fontWeight: 800,

          color: "#f4f1ec",

          fontFamily:
            '"Roboto Mono", "Courier New", monospace',

          whiteSpace:
            "nowrap",

          overflow:
            "hidden",

          textOverflow:
            "ellipsis",
        }}
      >
        {consumed} / {target}
      </Typography>

      {/* UNIT */}

      <Typography
        sx={{
          mt: 0.25,

          fontSize: 7,

          color: "#77716b",
        }}
      >
        grams
      </Typography>
    </Box>
  );
};

export default NutritionSummary;