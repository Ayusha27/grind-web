export interface DayProgress {
  day: number;
  name: string;
  type: string;
  completion: number | null;
  calories: number | null;
}

export interface WeekProgress {
  week: number;
  sessionsCompleted: number;
  totalSessions: number;
  caloriesBurned: number;
  weekScore: number;
  days: DayProgress[];
}

export interface MonthProgress {
  month: number;
  monthScore: number;
  sessionsCompleted: number;
  totalSessions: number;
  caloriesBurned: number;
  activeWeeks: number;
  totalWeeks: number;
  bestWeekScore: number;
  weeks: WeekProgress[];
}

export const progressMockData = {
  startingWeight: 95,
  currentWeight: 90,
  weightChange: -5,

  months: [
    {
      month: 1,
      monthScore: 0,
      sessionsCompleted: 0,
      totalSessions: 20,
      caloriesBurned: 0,
      activeWeeks: 0,
      totalWeeks: 4,
      bestWeekScore: 0,

      weeks: [
        {
          week: 1,
          sessionsCompleted: 0,
          totalSessions: 6,
          caloriesBurned: 0,
          weekScore: 0,

          days: [
            {
              day: 1,
              name: "DAY 1 - LOWER STRENGTH",
              type: "LOWER STRENGTH",
              completion: null,
              calories: null,
            },
            {
              day: 2,
              name: "DAY 2 - UPPER STRENGTH & SHOULDERS",
              type: "UPPER STRENGTH & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 3,
              name: "DAY 3 - CONDITIONING & CORE",
              type: "CONDITIONING & CORE",
              completion: null,
              calories: null,
            },
            {
              day: 4,
              name: "DAY 4 - LOWER HYPERTROPHY",
              type: "LOWER HYPERTROPHY",
              completion: null,
              calories: null,
            },
            {
              day: 5,
              name: "DAY 5 - UPPER HYPERTROPHY & SHOULDERS",
              type: "UPPER HYPERTROPHY & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 6,
              name: "DAY 6 - FULL BODY FUNCTIONAL",
              type: "FULL BODY FUNCTIONAL",
              completion: null,
              calories: null,
            },
          ],
        },

        {
          week: 2,
          sessionsCompleted: 0,
          totalSessions: 6,
          caloriesBurned: 0,
          weekScore: 0,

          days: [
            {
              day: 1,
              name: "DAY 1 - LOWER STRENGTH",
              type: "LOWER STRENGTH",
              completion: null,
              calories: null,
            },
            {
              day: 2,
              name: "DAY 2 - UPPER STRENGTH & SHOULDERS",
              type: "UPPER STRENGTH & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 3,
              name: "DAY 3 - CONDITIONING & CORE",
              type: "CONDITIONING & CORE",
              completion: null,
              calories: null,
            },
            {
              day: 4,
              name: "DAY 4 - LOWER HYPERTROPHY",
              type: "LOWER HYPERTROPHY",
              completion: null,
              calories: null,
            },
            {
              day: 5,
              name: "DAY 5 - UPPER HYPERTROPHY & SHOULDERS",
              type: "UPPER HYPERTROPHY & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 6,
              name: "DAY 6 - FULL BODY FUNCTIONAL",
              type: "FULL BODY FUNCTIONAL",
              completion: null,
              calories: null,
            },
          ],
        },

        {
          week: 3,
          sessionsCompleted: 0,
          totalSessions: 6,
          caloriesBurned: 0,
          weekScore: 0,

          days: [
            {
              day: 1,
              name: "DAY 1 - LOWER STRENGTH",
              type: "LOWER STRENGTH",
              completion: null,
              calories: null,
            },
            {
              day: 2,
              name: "DAY 2 - UPPER STRENGTH & SHOULDERS",
              type: "UPPER STRENGTH & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 3,
              name: "DAY 3 - CONDITIONING & CORE",
              type: "CONDITIONING & CORE",
              completion: null,
              calories: null,
            },
            {
              day: 4,
              name: "DAY 4 - LOWER HYPERTROPHY",
              type: "LOWER HYPERTROPHY",
              completion: null,
              calories: null,
            },
            {
              day: 5,
              name: "DAY 5 - UPPER HYPERTROPHY & SHOULDERS",
              type: "UPPER HYPERTROPHY & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 6,
              name: "DAY 6 - FULL BODY FUNCTIONAL",
              type: "FULL BODY FUNCTIONAL",
              completion: null,
              calories: null,
            },
          ],
        },

        {
          week: 4,
          sessionsCompleted: 0,
          totalSessions: 6,
          caloriesBurned: 0,
          weekScore: 0,

          days: [
            {
              day: 1,
              name: "DAY 1 - LOWER STRENGTH",
              type: "LOWER STRENGTH",
              completion: null,
              calories: null,
            },
            {
              day: 2,
              name: "DAY 2 - UPPER STRENGTH & SHOULDERS",
              type: "UPPER STRENGTH & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 3,
              name: "DAY 3 - CONDITIONING & CORE",
              type: "CONDITIONING & CORE",
              completion: null,
              calories: null,
            },
            {
              day: 4,
              name: "DAY 4 - LOWER HYPERTROPHY",
              type: "LOWER HYPERTROPHY",
              completion: null,
              calories: null,
            },
            {
              day: 5,
              name: "DAY 5 - UPPER HYPERTROPHY & SHOULDERS",
              type: "UPPER HYPERTROPHY & SHOULDERS",
              completion: null,
              calories: null,
            },
            {
              day: 6,
              name: "DAY 6 - FULL BODY FUNCTIONAL",
              type: "FULL BODY FUNCTIONAL",
              completion: null,
              calories: null,
            },
          ],
        },
      ],
    },

    {
      month: 2,
      monthScore: 0,
      sessionsCompleted: 0,
      totalSessions: 20,
      caloriesBurned: 0,
      activeWeeks: 0,
      totalWeeks: 4,
      bestWeekScore: 0,
      weeks: [],
    },

    {
      month: 3,
      monthScore: 0,
      sessionsCompleted: 0,
      totalSessions: 20,
      caloriesBurned: 0,
      activeWeeks: 0,
      totalWeeks: 4,
      bestWeekScore: 0,
      weeks: [],
    },
  ],

  weeklyWeights: {
    1: 89,
    2: 90,
    3: null,
    4: null,
  },

  monthlyOverview: [
    {
      month: "M1",
      workouts: 0,
      calories: 0,
      score: 0,
    },
    {
      month: "M2",
      workouts: 0,
      calories: 0,
      score: 0,
    },
    {
      month: "M3",
      workouts: 0,
      calories: 0,
      score: 0,
    },
  ],
};