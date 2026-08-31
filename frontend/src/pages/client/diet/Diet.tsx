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
  /*
   * Initial state mirrors the production screenshot:
   * 540 / 2350 kcal
   *
   * Paneer Vegetable Breakfast = 540 kcal
   */
  const [selectedMeals, setSelectedMeals] =
    useState<string[]>([
      "Breakfast-1",
    ]);

  const toggleMeal = (key: string) => {
    setSelectedMeals((previous) => {
      if (previous.includes(key)) {
        return previous.filter(
          (item) => item !== key
        );
      }

      return [...previous, key];
    });
  };

  const consumedCalories = useMemo(() => {
    let total = 0;

    dietMockData.meals.forEach(
      (mealSection) => {
        mealSection.options.forEach(
          (option, optionIndex) => {
            const key = `${mealSection.meal}-${optionIndex}`;

            if (selectedMeals.includes(key)) {
              const calories = Number(
                option.calories.replace(
                  /[^0-9.]/g,
                  ""
                )
              );

              total += calories;
            }
          }
        );
      }
    );

    return total;
  }, [selectedMeals]);

  const resetDiet = () => {
    setSelectedMeals([]);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundColor: "#f5f3ef",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
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
          consumedCalories={consumedCalories}
          targetCalories={dietMockData.dailyCalories}
          protein={dietMockData.dailyProtein}
          carbs={dietMockData.dailyCarbs}
          fat={dietMockData.dailyFat}
          fibre={dietMockData.dailyFibre}
          onReset={resetDiet}
        />

        {/* =====================================================
            STATS
        ===================================================== */}

        <NutritionStats
          weight={dietMockData.stats.weight}
          goalWeight={dietMockData.stats.goalWeight}
          height={dietMockData.stats.height}
          bmi={dietMockData.stats.bmi}
          bmiStatus={dietMockData.stats.bmiStatus}
          calories={dietMockData.stats.calories}
          protein={dietMockData.stats.protein}
          carbs={dietMockData.stats.carbs}
          fat={dietMockData.stats.fat}
          fibre={dietMockData.stats.fibre}
          water={dietMockData.stats.water}
        />

        {/* =====================================================
            PLAN INFORMATION
        ===================================================== */}

        <DietPlanInfo
          planName={dietMockData.planName}
          description={dietMockData.notes}
        />

        {/* =====================================================
            MEALS
        ===================================================== */}

        {dietMockData.meals.map(
          (mealSection) => (
            <MealSection
              key={mealSection.meal}
              meal={mealSection.meal}
              options={mealSection.options}
              selectedMeals={selectedMeals}
              onToggleMeal={toggleMeal}
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
            Personalized nutrition plan powered by GRIND AI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Diet;