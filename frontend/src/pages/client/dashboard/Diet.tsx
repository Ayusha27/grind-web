import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import DietHeader from "../../../components/diet/DietHeader";
import NutritionSummary from "../../../components/diet/NutritionSummary";
// import NutritionStats from "../../../components/diet/NutritionStats";
import DietPlanInfo from "../../../components/diet/DietPlanInfo";
import MealSection from "../../../components/diet/MealSection";

import { useDashboard } from "../../../context/DashboardContext";

const Diet = () => {
  const { dashboard } = useDashboard();

  /*
   * =========================================================
   * BACKEND DIET DATA
   * =========================================================
   *
   * Diet information now comes from the same dashboard
   * response used by Workout.
   */
  const diet = dashboard?.diet;

  const normalizedMeals = useMemo(() => {
    if (!diet?.meals) {
      return [];
    }

    return diet.meals.map((mealSection) => ({
      ...mealSection,
      options: mealSection.options.map((option) => ({
        ...option,
        items:
          option.items ??
          (option.ingredients
            ? [option.ingredients]
            : []),
      })),
    }));
  }, [diet]);

  /*
   * =========================================================
   * SELECTED MEALS
   * =========================================================
   *
   * Only ONE option can be selected per meal category.
   *
   * Example:
   *
   * {
   *   Breakfast: 0,
   *   Lunch: 1,
   *   Snack: 0,
   *   Dinner: 2
   * }
   *
   * undefined = nothing selected.
   */
  const [selectedMeals, setSelectedMeals] =
    useState<Record<string, number | undefined>>({
      Breakfast: 0,
    });

  /*
   * =========================================================
   * TOGGLE MEAL
   * =========================================================
   *
   * Selecting another option replaces the previous option
   * for that meal.
   *
   * Clicking the selected option deselects it.
   */
  const toggleMeal = (
    meal: string,
    optionIndex: number
  ) => {
    setSelectedMeals((previous) => {
      const current = previous[meal];

      if (current === optionIndex) {
        return {
          ...previous,
          [meal]: undefined,
        };
      }

      return {
        ...previous,
        [meal]: optionIndex,
      };
    });
  };

  /*
   * =========================================================
   * NUTRITION CALCULATION
   * =========================================================
   *
   * Calculated from the actual backend diet response.
   */
  const nutrition = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fibre = 0;

    normalizedMeals.forEach((mealSection) => {
      const selectedIndex =
        selectedMeals[mealSection.meal];

      if (selectedIndex === undefined) {
        return;
      }

      const selectedOption =
        mealSection.options[selectedIndex];

      if (!selectedOption) {
        return;
      }

      calories += parseNutritionValue(
        selectedOption.calories
      );

      protein += parseNutritionValue(
        selectedOption.protein
      );

      carbs += parseNutritionValue(
        selectedOption.carbs
      );

      fat += parseNutritionValue(
        selectedOption.fat
      );

      fibre += parseNutritionValue(
        selectedOption.fibre
      );
    });

    return {
      calories,
      protein,
      carbs,
      fat,
      fibre,
    };
  }, [normalizedMeals, selectedMeals]);

  /*
   * =========================================================
   * RESET
   * =========================================================
   */
  const resetDiet = () => {
    setSelectedMeals({});
  };

  /*
   * =========================================================
   * LOADING / EMPTY STATE
   * =========================================================
   */
  if (!dashboard || !diet) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 194px)",
          backgroundColor: "#f5f3ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "#77716b",
          }}
        >
          Loading your diet plan...
        </Typography>
      </Box>
    );
  }

  /*
   * =========================================================
   * TARGET VALUES
   * =========================================================
   */
  const targetCalories =
    parseNutritionValue(
      diet.daily_calories
    );

  const targetProtein =
    diet.daily_protein ?? "0 g";

  const targetCarbs =
    diet.daily_carbs ?? "0 g";

  const targetFat =
    diet.daily_fat ?? "0 g";

  const targetFibre =
    diet.daily_fibre ?? "0 g";

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100%",
        backgroundColor: "#f5f3ef",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "none",

          px: {
            xs: 2,
            sm: 2.5,
            md: 4,
          },

          py: {
            xs: 2.5,
            md: 3,
          },

          boxSizing: "border-box",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <DietHeader
          water={diet.daily_water_intake}
        />

        {/* =================================================
            TODAY'S NUTRITION
        ================================================= */}

        <NutritionSummary
          consumedCalories={
            nutrition.calories
          }
          targetCalories={
            targetCalories
          }
          consumedProtein={
            nutrition.protein
          }
          targetProtein={
            targetProtein
          }
          consumedCarbs={
            nutrition.carbs
          }
          targetCarbs={
            targetCarbs
          }
          consumedFat={
            nutrition.fat
          }
          targetFat={
            targetFat
          }
          consumedFibre={
            nutrition.fibre
          }
          targetFibre={
            targetFibre
          }
          onReset={resetDiet}
        />

        {/* =================================================
            PERSONAL STATS
        ================================================= */}

        {/* <NutritionStats
          water={
            diet.daily_water_intake ?? "-"
          }
        /> */}

        {/* =================================================
            DIET PLAN INFORMATION
        ================================================= */}

        <DietPlanInfo
          planName={
            diet.plan_name ?? "Diet Plan"
          }
          description={
            diet.notes ?? ""
          }
        />

        {/* =================================================
            MEALS
        ================================================= */}

        {normalizedMeals.map(
          (mealSection) => (
            <MealSection
              key={mealSection.meal}
              meal={mealSection.meal}
              options={
                mealSection.options
              }
              selectedMeal={
                selectedMeals[
                mealSection.meal
                ]
              }
              onToggleMeal={(
                optionIndex
              ) =>
                toggleMeal(
                  mealSection.meal,
                  optionIndex
                )
              }
            />
          )
        )}

        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <Box
          sx={{
            pt: 1,
            pb: 2,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 8,
              color: "#99928b",
            }}
          >
            Personalized nutrition
            plan powered by GRIND AI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

/*
 * ===========================================================
 * PARSE NUTRITION VALUE
 * ===========================================================
 *
 * Supports:
 *
 * "2250 kcal"
 * "170 g"
 * "35-40 g"
 * "4-4.5 L"
 *
 * For ranges, the first numeric value is used for
 * consumed/target numeric calculations.
 */
const parseNutritionValue = (
  value?: string | number | null
): number => {
  if (
    value === undefined ||
    value === null
  ) {
    return 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : 0;
  }

  const match =
    String(value).match(
      /-?\d+(?:\.\d+)?/
    );

  return match
    ? Number(match[0])
    : 0;
};

export default Diet;