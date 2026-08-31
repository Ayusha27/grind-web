export interface DietStats {
  weight: string;
  goalWeight: string;
  height: string;
  bmi: string;
  bmiStatus: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fibre: string;
  water: string;
}

export interface MealOption {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fibre: string;
  items: string[];
}

export interface MealSectionData {
  meal: string;
  options: MealOption[];
}

export interface DietPlan {
  planName: string;
  goal: string;
  notes: string;
  dailyCalories: number;
  dailyProtein: string;
  dailyCarbs: string;
  dailyFat: string;
  dailyFibre: string;
  dailyWater: string;
  stats: DietStats;
  meals: MealSectionData[];
}

export const dietMockData: DietPlan = {
  planName:
    "GRIND Vegetarian Fat Loss & Body Recomposition Diet",

  goal:
    "Fat loss with muscle retention, muscle development, strength support and waist reduction",

  notes:
    "Vegetarian fat-loss diet designed to support resistance training, muscle retention and sustainable body recomposition. The long-term target weight is 75 kg. Progress should be evaluated using weekly average body weight, waist circumference, progress photographs, strength and adherence rather than scale weight alone. Maintain approximately 2350 kcal/day initially and adjust only after reviewing 2-3 weeks of consistent adherence. Abdominal and love-handle fat will reduce through overall fat loss; spot reduction is not possible.",

  dailyCalories: 2350,
  dailyProtein: "180 g",
  dailyCarbs: "250 g",
  dailyFat: "70 g",
  dailyFibre: "35-40 g",
  dailyWater: "3-3.5 L",

  stats: {
    weight: "95 kg",
    goalWeight: "75 kg",
    height: "5 ft 10 in",
    bmi: "30.1 kg/m²",
    bmiStatus: "Obesity Class I",
    calories: "2350 kcal",
    protein: "180 g",
    carbs: "250 g",
    fat: "70 g",
    fibre: "35-40 g",
    water: "3-3.5 L",
  },

  meals: [
    {
      meal: "Breakfast",

      options: [
        {
          name: "High-Protein Oats Bowl",
          calories: "550 kcal",
          protein: "40 g",
          carbs: "62 g",
          fat: "16 g",
          fibre: "10 g",

          items: [
            "50 g rolled oats",
            "250 ml low-fat milk",
            "25 g whey protein",
            "100 g banana",
            "10 g chia seeds",
          ],
        },

        {
          name: "Paneer Vegetable Breakfast",
          calories: "540 kcal",
          protein: "39 g",
          carbs: "58 g",
          fat: "17 g",
          fibre: "9 g",

          items: [
            "100 g low-fat paneer",
            "2 whole-wheat rotis",
            "150 g mixed vegetables",
            "100 g low-fat curd",
            "1 small fruit",
          ],
        },
      ],
    },

    {
      meal: "Lunch",

      options: [
        {
          name: "Tofu Dal Roti Meal",
          calories: "680 kcal",
          protein: "50 g",
          carbs: "74 g",
          fat: "19 g",
          fibre: "12 g",

          items: [
            "150 g tofu",
            "200 g cooked dal",
            "2 whole-wheat rotis",
            "200 g mixed vegetables",
            "100 g low-fat curd",
            "5 g cooking oil",
          ],
        },

        {
          name: "Soy Rice Bowl",
          calories: "690 kcal",
          protein: "51 g",
          carbs: "78 g",
          fat: "18 g",
          fibre: "12 g",

          items: [
            "50 g dry soy chunks cooked",
            "180 g cooked rice",
            "150 g low-fat curd",
            "200 g mixed vegetables",
            "100 g salad",
            "5 g cooking oil",
          ],
        },
      ],
    },

    {
      meal: "Snack",

      options: [
        {
          name: "Protein Yogurt Snack",
          calories: "410 kcal",
          protein: "35 g",
          carbs: "44 g",
          fat: "10 g",
          fibre: "7 g",

          items: [
            "200 g Greek yogurt or high-protein curd",
            "1 medium banana",
            "15 g roasted almonds",
            "1 tsp chia seeds",
          ],
        },

        {
          name: "Whey Banana Snack",
          calories: "400 kcal",
          protein: "34 g",
          carbs: "47 g",
          fat: "9 g",
          fibre: "7 g",

          items: [
            "30 g whey protein",
            "1 medium banana",
            "30 g roasted chana",
            "200 ml low-fat milk",
          ],
        },
      ],
    },

    {
      meal: "Dinner",

      options: [
        {
          name: "Paneer Roti Vegetable Dinner",
          calories: "710 kcal",
          protein: "55 g",
          carbs: "69 g",
          fat: "23 g",
          fibre: "10 g",

          items: [
            "150 g low-fat paneer",
            "2 whole-wheat rotis",
            "250 g mixed vegetables",
            "150 g salad",
            "100 g low-fat curd",
            "5 g cooking oil",
          ],
        },

        {
          name: "Tofu Soy Roti Dinner",
          calories: "700 kcal",
          protein: "53 g",
          carbs: "70 g",
          fat: "22 g",
          fibre: "11 g",

          items: [
            "150 g tofu",
            "30 g dry soy chunks cooked",
            "2 whole-wheat rotis",
            "250 g mixed vegetables",
            "100 g salad",
            "5 g cooking oil",
          ],
        },
      ],
    },
  ],
};