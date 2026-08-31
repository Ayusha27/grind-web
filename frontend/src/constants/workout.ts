import type { WorkoutExercise } from "../components/workout/ExerciseAccordion";

export interface WorkoutDay {
  id: number;
  day: string;
  title: string;
}

interface WarmUpExercise {
  id: number;
  name: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

export const WARM_UP_EXERCISES = [
  {
    id: 1,
    name: "Arm Circles",
    instruction: "30 sec forward + 30 sec backward",
    completed: false,
  },
  {
    id: 2,
    name: "Shoulder Rolls",
    instruction: "10 reps each direction",
    completed: false,
  },
  {
    id: 3,
    name: "Bodyweight Squats",
    instruction: "12-15 controlled reps",
    completed: false,
  },
  {
    id: 4,
    name: "Hip Circles",
    instruction: "10 reps each direction",
    completed: false,
  },
  {
    id: 5,
    name: "Jumping Jacks or March in Place",
    instruction: "60 sec",
    completed: false,
  },
];

export const WORKOUT_DAYS = [
  {
    id: 1,
    dayNumber: 1,
    label: "MONDAY - LOWER BODY STRENGTH",
  },
  {
    id: 2,
    dayNumber: 2,
    label: "TUESDAY - UPPER BODY PUSH",
  },
  {
    id: 3,
    dayNumber: 3,
    label: "WEDNESDAY - FULL BODY CONDITIONING",
  },
  {
    id: 4,
    dayNumber: 4,
    label: "THURSDAY - UPPER BODY PULL",
  },
  {
    id: 5,
    dayNumber: 5,
    label: "FRIDAY - GLUTES AND HIIT",
  },
];

export const WORKOUT_EXERCISES: WorkoutExercise[] = [
  {
    id: 1,
    exerciseNumber: 1,
    name: "Goblet Squat",
    sets: [
      {
        id: 101,
        label: "SET 1",
        target: "10-12",
        completed: false,
      },
      {
        id: 102,
        label: "SET 2",
        target: "10-12",
        completed: false,
      },
      {
        id: 103,
        label: "SET 3",
        target: "10-12",
        completed: false,
      },
      {
        id: 104,
        label: "SET 4",
        target: "10-12",
        completed: false,
      },
    ],
  },

  {
    id: 2,
    exerciseNumber: 2,
    name: "Romanian Deadlift",
    sets: [
      {
        id: 201,
        label: "SET 1",
        target: "10-12",
        completed: false,
      },
      {
        id: 202,
        label: "SET 2",
        target: "10-12",
        completed: false,
      },
      {
        id: 203,
        label: "SET 3",
        target: "10-12",
        completed: false,
      },
      {
        id: 204,
        label: "SET 4",
        target: "10-12",
        completed: false,
      },
    ],
  },

  {
    id: 3,
    exerciseNumber: 3,
    name: "Walking Lunge",
    sets: [
      {
        id: 301,
        label: "SET 1",
        target: "12 each leg",
        completed: false,
      },
      {
        id: 302,
        label: "SET 2",
        target: "12 each leg",
        completed: false,
      },
      {
        id: 303,
        label: "SET 3",
        target: "12 each leg",
        completed: false,
      },
    ],
  },

  {
    id: 4,
    exerciseNumber: 4,
    name: "Hip Thrust",
    sets: [
      {
        id: 401,
        label: "SET 1",
        target: "12-15",
        completed: false,
      },
      {
        id: 402,
        label: "SET 2",
        target: "12-15",
        completed: false,
      },
      {
        id: 403,
        label: "SET 3",
        target: "12-15",
        completed: false,
      },
    ],
  },

  {
    id: 5,
    exerciseNumber: 5,
    name: "Standing Calf Raise",
    sets: [
      {
        id: 501,
        label: "SET 1",
        target: "15-20",
        completed: false,
      },
      {
        id: 502,
        label: "SET 2",
        target: "15-20",
        completed: false,
      },
      {
        id: 503,
        label: "SET 3",
        target: "15-20",
        completed: false,
      },
    ],
  },

  {
    id: 6,
    exerciseNumber: 6,
    name: "Plank",
    sets: [
      {
        id: 601,
        label: "SET 1",
        target: "45 sec",
        completed: false,
      },
      {
        id: 602,
        label: "SET 2",
        target: "45 sec",
        completed: false,
      },
      {
        id: 603,
        label: "SET 3",
        target: "45 sec",
        completed: false,
      },
    ],
  },
];