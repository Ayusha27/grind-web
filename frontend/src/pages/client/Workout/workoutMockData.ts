export interface WarmUpExercise {
  id: number;
  name: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}
export interface WorkoutExercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  youtube?: string;
  notes?: string;
}

export interface WorkoutDay {
  id: number;
  dayNumber: number;
  dayName: string;
  warmups: WarmUpExercise[];
  exercises: WorkoutExercise[];
  calMin: number;
  calMax: number;
  calNote: string;
}

const warmups: WarmUpExercise[] = [
  {
    id: 1,
    name: "Arm Circles",
    instruction: "30 sec forward + 30 sec backward",
    completed: false,
    videoUrl: "arm circles proper form warm up",
  },
];

export const workoutDays: WorkoutDay[] = [
  {
    id: 1,
    dayNumber: 1,
    dayName: "Monday - Lower Body Strength",
    warmups,
    calMin: 250,
    calMax: 350,
    calNote: "Estimated range · Workout Day",
    exercises: [
      {
        id: 1,
        name: "Goblet Squat",
        sets: 4,
        reps: "10-12",
        youtube: "goblet squat proper form",
      },
      {
        id: 2,
        name: "Romanian Deadlift",
        sets: 4,
        reps: "10-12",
        youtube: "romanian deadlift proper form",
      },
      {
        id: 3,
        name: "Walking Lunge",
        sets: 3,
        reps: "12 each leg",
        youtube: "walking lunge proper form",
      },
      {
        id: 4,
        name: "Hip Thrust",
        sets: 3,
        reps: "12-15",
        youtube: "hip thrust proper form",
      },
      {
        id: 5,
        name: "Standing Calf Raise",
        sets: 3,
        reps: "15-20",
        youtube: "standing calf raise proper form",
      },
      {
        id: 6,
        name: "Plank",
        sets: 3,
        reps: "45 sec",
        youtube: "plank proper form",
      },
    ],
  },

  {
    id: 2,
    dayNumber: 2,
    dayName: "Tuesday - Upper Body Push",
    warmups,
    calMin: 220,
    calMax: 320,
    calNote: "Estimated range · Workout Day",
    exercises: [
      {
        id: 7,
        name: "Bench Press",
        sets: 4,
        reps: "8-12",
        youtube: "bench press proper form",
      },
      {
        id: 8,
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "10-12",
        youtube: "incline dumbbell press proper form",
      },
      {
        id: 9,
        name: "Shoulder Press",
        sets: 3,
        reps: "10-12",
        youtube: "dumbbell shoulder press proper form",
      },
      {
        id: 10,
        name: "Lateral Raise",
        sets: 3,
        reps: "12-15",
        youtube: "lateral raise proper form",
      },
      {
        id: 11,
        name: "Tricep Pushdown",
        sets: 3,
        reps: "12-15",
        youtube: "tricep pushdown proper form",
      },
    ],
  },

  {
    id: 3,
    dayNumber: 3,
    dayName: "Wednesday - Full Body Conditioning",
    warmups,
    calMin: 250,
    calMax: 350,
    calNote: "Estimated range · Workout Day",
    exercises: [
      {
        id: 12,
        name: "Kettlebell Swing",
        sets: 3,
        reps: "15",
        youtube: "kettlebell swing proper form",
      },
      {
        id: 13,
        name: "Push-Ups",
        sets: 3,
        reps: "10-15",
        youtube: "push ups proper form",
      },
      {
        id: 14,
        name: "Bodyweight Squat",
        sets: 3,
        reps: "15-20",
        youtube: "bodyweight squat proper form",
      },
      {
        id: 15,
        name: "Mountain Climbers",
        sets: 3,
        reps: "30 sec",
        youtube: "mountain climbers proper form",
      },
      {
        id: 16,
        name: "Plank",
        sets: 3,
        reps: "45 sec",
        youtube: "plank proper form",
      },
    ],
  },

  {
    id: 4,
    dayNumber: 4,
    dayName: "Thursday - Upper Body Pull",
    warmups,
    calMin: 220,
    calMax: 320,
    calNote: "Estimated range · Workout Day",
    exercises: [
      {
        id: 17,
        name: "Lat Pulldown",
        sets: 4,
        reps: "10-12",
        youtube: "lat pulldown proper form",
      },
      {
        id: 18,
        name: "Seated Cable Row",
        sets: 3,
        reps: "10-12",
        youtube: "seated cable row proper form",
      },
      {
        id: 19,
        name: "One Arm Dumbbell Row",
        sets: 3,
        reps: "10-12 each side",
        youtube: "one arm dumbbell row proper form",
      },
      {
        id: 20,
        name: "Face Pull",
        sets: 3,
        reps: "12-15",
        youtube: "face pull proper form",
      },
      {
        id: 21,
        name: "Dumbbell Curl",
        sets: 3,
        reps: "12-15",
        youtube: "dumbbell curl proper form",
      },
    ],
  },

  {
    id: 5,
    dayNumber: 5,
    dayName: "Friday - Glutes and HIIT",
    warmups,
    calMin: 280,
    calMax: 380,
    calNote: "Estimated range · Workout Day",
    exercises: [
      {
        id: 22,
        name: "Hip Thrust",
        sets: 4,
        reps: "10-12",
        youtube: "hip thrust proper form",
      },
      {
        id: 23,
        name: "Bulgarian Split Squat",
        sets: 3,
        reps: "10 each leg",
        youtube: "bulgarian split squat proper form",
      },
      {
        id: 24,
        name: "Romanian Deadlift",
        sets: 3,
        reps: "10-12",
        youtube: "romanian deadlift proper form",
      },
      {
        id: 25,
        name: "Cable Kickback",
        sets: 3,
        reps: "12-15 each leg",
        youtube: "cable kickback proper form",
      },
      {
        id: 26,
        name: "Jump Squat",
        sets: 3,
        reps: "12",
        youtube: "jump squat proper form",
      },
      {
        id: 27,
        name: "Mountain Climbers",
        sets: 3,
        reps: "30 sec",
        youtube: "mountain climbers proper form",
      },
    ],
  },
];


// salesforce free learning

// hiring 

// 2-3

