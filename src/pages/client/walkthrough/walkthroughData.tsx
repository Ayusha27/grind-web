export interface WalkthroughExercise {
    id: number;
    name: string;
    sets: number;
    reps: string;
}

export interface WalkthroughMealOption {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
}

export interface WalkthroughSceneData {
    id:
    | "welcome"
    | "workout"
    | "nutrition"
    | "progress"
    | "journey";

    eyebrow: string;
    title: string;
    description: string;
    narration: string;
}

export const WALKTHROUGH_SCENES: WalkthroughSceneData[] = [
    {
        id: "welcome",
        eyebrow: "WELCOME TO GRIND",
        title: "YOUR FITNESS JOURNEY,\nBUILT AROUND YOU.",
        description:
            "A personalized system for training, nutrition and progress.",
        narration:
            "Welcome to GRIND. Your personalized fitness journey starts here.",
    },
    {
        id: "workout",
        eyebrow: "01 / WORKOUT",
        title: "TRAIN WITH PURPOSE.",
        description:
            "Follow your personalized workouts, track every set and stay consistent.",
        narration:
            "Your workout is organized around your plan, with every session broken down into clear exercises, sets and targets.",
    },
    {
        id: "nutrition",
        eyebrow: "02 / NUTRITION",
        title: "FUEL YOUR GOALS.",
        description:
            "Stay on top of calories, macros and structured meals built around your plan.",
        narration:
            "Your nutrition plan keeps your daily calories and macros aligned with your goals, with structured meals throughout the day.",
    },
    {
        id: "progress",
        eyebrow: "03 / PROGRESS",
        title: "SEE YOUR PROGRESS.",
        description:
            "Track your consistency and results over time.",
        narration:
            "GRIND helps you track your progress over time, so you can see whether your consistency is turning into results.",
    },
    {
        id: "journey",
        eyebrow: "GRIND",
        title: "CONGRATULATIONS ON STARTING\nYOUR JOURNEY.",
        description: "#FITINDIA",
        narration: "",
    },
];

export const WALKTHROUGH_WORKOUT = {
    dayNumber: 1,
    title: "Upper Body Strength",
    exercises: 6,
    totalSets: 18,
    completedSets: 7,
    calories: {
        minimum: 300,
        maximum: 450,
        earned: 180,
    },
    exercisesList: [
        {
            id: 1,
            name: "Barbell Bench Press",
            sets: 3,
            reps: "8–10",
        },
        {
            id: 2,
            name: "Lat Pulldown",
            sets: 3,
            reps: "10–12",
        },
        {
            id: 3,
            name: "Seated Shoulder Press",
            sets: 3,
            reps: "10–12",
        },
    ] satisfies WalkthroughExercise[],
};

/*
 * Nutrition data is demo-only for the walkthrough.
 * The showcase uses this data locally and never writes it
 * to the real Diet page or backend.
 */
export const WALKTHROUGH_NUTRITION = {
    calories: 2250,
    protein: 170,
    carbs: 220,
    fat: 58,
    fibre: 38,
    water: "4–4.5 L",

    planName: "12 Week Body Recomposition Nutrition Plan",

    meals: [
        {
            name: "Breakfast",
            options: [
                {
                    name: "Protein Oats",
                    calories: 450,
                    protein: 37,
                    carbs: 55,
                    fat: 8,
                    fibre: 8,
                },
                {
                    name: "Protein Poha",
                    calories: 500,
                    protein: 34,
                    carbs: 68,
                    fat: 7,
                    fibre: 5,
                },
                {
                    name: "Overnight Protein Oats",
                    calories: 470,
                    protein: 39,
                    carbs: 52,
                    fat: 9,
                    fibre: 9,
                },
            ],
        },
        {
            name: "Lunch",
            options: [
                {
                    name: "Paneer Rice Meal",
                    calories: 640,
                    protein: 48,
                    carbs: 46,
                    fat: 24,
                    fibre: 4,
                },
                {
                    name: "Rajma Rice Meal",
                    calories: 600,
                    protein: 24,
                    carbs: 90,
                    fat: 4,
                    fibre: 16,
                },
                {
                    name: "Chana Rice Meal",
                    calories: 620,
                    protein: 25,
                    carbs: 88,
                    fat: 6,
                    fibre: 15,
                },
                {
                    name: "Dal Rice Meal",
                    calories: 580,
                    protein: 30,
                    carbs: 82,
                    fat: 12,
                    fibre: 12,
                },
            ],
        },
        {
            name: "Snack",
            options: [
                {
                    name: "Protein Shake",
                    calories: 120,
                    protein: 24,
                    carbs: 3,
                    fat: 1.5,
                    fibre: 0,
                },
                {
                    name: "Protein & Roasted Chana",
                    calories: 310,
                    protein: 36,
                    carbs: 32,
                    fat: 4,
                    fibre: 8,
                },
                {
                    name: "Double Protein Shake",
                    calories: 240,
                    protein: 48,
                    carbs: 6,
                    fat: 3,
                    fibre: 0,
                },
            ],
        },
        {
            name: "Dinner",
            options: [
                {
                    name: "Paneer Salad Bowl",
                    calories: 420,
                    protein: 40,
                    carbs: 10,
                    fat: 24,
                    fibre: 3,
                },
                {
                    name: "Rajma Salad Bowl",
                    calories: 400,
                    protein: 22,
                    carbs: 52,
                    fat: 3,
                    fibre: 15,
                },
                {
                    name: "Chana Salad Bowl",
                    calories: 420,
                    protein: 22,
                    carbs: 54,
                    fat: 5,
                    fibre: 14,
                },
                {
                    name: "Dal Salad Bowl",
                    calories: 360,
                    protein: 22,
                    carbs: 42,
                    fat: 3,
                    fibre: 12,
                },
            ],
        },
    ] satisfies {
        name: string;
        options: WalkthroughMealOption[];
    }[],
};

export const WALKTHROUGH_PROGRESS = {
    startingWeight: 82,
    currentWeight: 78,
    weightChange: -4,
    monthScore: 86,
    sessionsCompleted: 12,
    totalSessions: 15,
    caloriesBurned: 3840,
    activeWeeks: 3,
    totalWeeks: 4,
    bestWeekScore: 94,
};
