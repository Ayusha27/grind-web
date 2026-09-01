import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import DietHeader from "../../../components/diet/DietHeader";
import NutritionSummary from "../../../components/diet/NutritionSummary";
import NutritionStats from "../../../components/diet/NutritionStats";
import DietPlanInfo from "../../../components/diet/DietPlanInfo";
import MealSection from "../../../components/diet/MealSection";

import { dietMockData } from "./dietMockData";

const Diet = () => {
  /* =========================================================
     SELECTED MEALS

     We store one selected option for each meal.

     Example:

     {
       Breakfast: 1,
       Lunch: 0,
       Snack: 1,
       Dinner: 0
     }

     undefined means nothing selected.
  ========================================================= */

  const [selectedMeals, setSelectedMeals] =
    useState<
      Record<string, number | undefined>
    >({
      Breakfast: 0,
    });

  /* =========================================================
     TOGGLE MEAL

     Only ONE option can be selected
     inside each meal category.

     Selecting another option replaces
     the previous selection.

     Clicking the already-selected option
     deselects it.
  ========================================================= */

  const toggleMeal = (
    meal: string,
    optionIndex: number
  ) => {
    setSelectedMeals((previous) => {
      const current =
        previous[meal];

      /*
       * Clicking the currently selected
       * meal removes it.
       */
      if (
        current === optionIndex
      ) {
        return {
          ...previous,
          [meal]: undefined,
        };
      }

      /*
       * Selecting another option
       * automatically replaces the
       * previous option for this meal.
       */
      return {
        ...previous,
        [meal]: optionIndex,
      };
    });
  };

  /* =========================================================
     NUTRITION CALCULATION
  ========================================================= */

  const nutrition = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fibre = 0;

    dietMockData.meals.forEach(
      (mealSection) => {
        const selectedIndex =
          selectedMeals[
            mealSection.meal
          ];

        /*
         * Nothing selected for this meal.
         */
        if (
          selectedIndex === undefined
        ) {
          return;
        }

        const selectedOption =
          mealSection.options[
            selectedIndex
          ];

        if (!selectedOption) {
          return;
        }

        /* =====================================================
           CALORIES
        ===================================================== */

        calories += Number(
          selectedOption.calories.replace(
            /[^0-9.]/g,
            ""
          )
        );

        /* =====================================================
           PROTEIN
        ===================================================== */

        protein += Number(
          selectedOption.protein.replace(
            /[^0-9.]/g,
            ""
          )
        );

        /* =====================================================
           CARBS
        ===================================================== */

        carbs += Number(
          selectedOption.carbs.replace(
            /[^0-9.]/g,
            ""
          )
        );

        /* =====================================================
           FAT
        ===================================================== */

        fat += Number(
          selectedOption.fat.replace(
            /[^0-9.]/g,
            ""
          )
        );

        /* =====================================================
           FIBRE
        ===================================================== */

        fibre += Number(
          selectedOption.fibre.replace(
            /[^0-9.]/g,
            ""
          )
        );
      }
    );

    return {
      calories,
      protein,
      carbs,
      fat,
      fibre,
    };
  }, [selectedMeals]);

  /* =========================================================
     RESET
  ========================================================= */

  const resetDiet = () => {
    setSelectedMeals({});
  };

  /* =========================================================
     TARGET VALUES

     These remain dynamic from dietMockData.
  ========================================================= */

  const targetProtein =
    dietMockData.dailyProtein;

  const targetCarbs =
    dietMockData.dailyCarbs;

  const targetFat =
    dietMockData.dailyFat;

  const targetFibre =
    dietMockData.dailyFibre;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100%",

        backgroundColor:
          "#f5f3ef",
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
        {/* =====================================================
            HEADER
        ===================================================== */}

        <DietHeader />

        {/* =====================================================
            TODAY'S NUTRITION
        ===================================================== */}

        <NutritionSummary
          consumedCalories={
            nutrition.calories
          }

          targetCalories={
            dietMockData.dailyCalories
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

          onReset={
            resetDiet
          }
        />

        {/* =====================================================
            PERSONAL STATS
        ===================================================== */}

        <NutritionStats
          weight={
            dietMockData.stats.weight
          }

          goalWeight={
            dietMockData.stats.goalWeight
          }

          height={
            dietMockData.stats.height
          }

          bmi={
            dietMockData.stats.bmi
          }

          bmiStatus={
            dietMockData.stats.bmiStatus
          }

          calories={
            dietMockData.stats.calories
          }

          protein={
            dietMockData.stats.protein
          }

          carbs={
            dietMockData.stats.carbs
          }

          fat={
            dietMockData.stats.fat
          }

          fibre={
            dietMockData.stats.fibre
          }

          water={
            dietMockData.stats.water
          }
        />

        {/* =====================================================
            DIET PLAN INFORMATION
        ===================================================== */}

        <DietPlanInfo
          planName={
            dietMockData.planName
          }

          description={
            dietMockData.notes
          }
        />

        {/* =====================================================
            MEALS

            Each MealSection manages one meal category.

            Example:

            Breakfast
              ├── Option 1
              └── Option 2

            Only one can be selected.
        ===================================================== */}

        {dietMockData.meals.map(
          (mealSection) => (
            <MealSection
              key={
                mealSection.meal
              }

              meal={
                mealSection.meal
              }

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

        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

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

export default Diet;