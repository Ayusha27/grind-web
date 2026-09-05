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
        title: "READY TO START?",
        description:
            "Your personalized fitness journey starts with a few simple questions.",
        narration:
            "Ready to start? Begin your personalized GRIND journey today.",
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

export const WALKTHROUGH_NUTRITION = {
    calories: 2250,
    protein: 170,
    carbs: 220,
    fat: 58,
    fibre: 38,
    water: "4–4.5 L",

    planName: "Personalized Nutrition Plan",

    meals: [
        {
            name: "Breakfast",
            options: [
                {
                    name: "Protein Oats",
                    calories: 480,
                    protein: 32,
                    carbs: 58,
                    fat: 12,
                },
                {
                    name: "Paneer Toast",
                    calories: 450,
                    protein: 30,
                    carbs: 45,
                    fat: 16,
                },
            ],
        },

        {
            name: "Lunch",
            options: [
                {
                    name: "Paneer Rice Bowl",
                    calories: 620,
                    protein: 42,
                    carbs: 72,
                    fat: 18,
                },
                {
                    name: "Dal & Roti",
                    calories: 580,
                    protein: 30,
                    carbs: 82,
                    fat: 12,
                },
            ],
        },

        {
            name: "Snack",
            options: [
                {
                    name: "Protein Shake",
                    calories: 220,
                    protein: 30,
                    carbs: 12,
                    fat: 4,
                },
            ],
        },

        {
            name: "Dinner",
            options: [
                {
                    name: "Tofu Stir Fry",
                    calories: 540,
                    protein: 38,
                    carbs: 48,
                    fat: 20,
                },
                {
                    name: "Rajma Bowl",
                    calories: 510,
                    protein: 28,
                    carbs: 70,
                    fat: 12,
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