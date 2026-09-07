import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Box,
  Container,
  Stack,
} from "@mui/material";

import {
  useOutletContext,
} from "react-router-dom";

import ProgressStats from "../../../components/progress/ProgressStats";
import ProgressTrackerHeader from "../../../components/progress/ProgressTrackerHeader";
import ProgressSummaryCards from "../../../components/progress/ProgressSummaryCards";
import WeeklyDetail from "../../../components/progress/WeeklyDetail";
import DayBreakdown from "../../../components/progress/DayBreakdown";
import WeeklySummary from "../../../components/progress/WeeklySummary";
import WeeklyWeightTracker from "../../../components/progress/WeeklyWeightTracker";
import ThreeMonthOverview from "../../../components/progress/ThreeMonthOverview";
import GrindLoading from "../../../components/loading/GrindLoading";

import { useDashboard } from "../../../context/DashboardContext";
import { getProgress } from "../../../api/dashboardApi";

import type { ProgressResponse } from "../../../types/progress";

/* =========================================================
   DASHBOARD OUTLET CONTEXT
========================================================= */

interface DashboardOutletContext {
  month: number;
  week: number;
  periodResetKey: number;
  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
}

/* =========================================================
   DASHBOARD EXERCISE
========================================================= */

interface DashboardExercise {
  id: number;
  name?: string;
  exercise_name?: string;
  sets?: number;
  reps?: number | string;
}

/* =========================================================
   DASHBOARD DAY
========================================================= */

interface DashboardDay {
  id: number;
  label: string;
  exercises: DashboardExercise[];
}

/* =========================================================
   DAY BREAKDOWN
========================================================= */

interface ProgressDay {
  day: number;
  name: string;
  type: string;
  completion: number | null;
  calories: number | null;
}

/* =========================================================
   MONTH DATA
========================================================= */

interface MonthProgress {
  month_no: number;

  sessions_completed: number;
  sessions_logged: number;
  sessions_total: number;
  percent: number;

  calories_burned: number;
  avg_calories_per_session: number;

  active_weeks: number;
  weeks_logged: number;
  weeks_completed: number;

  best_week_score: number;

  workouts: number;
  calories: number;
  score: number;

  sets_total: number;
  sets_completed: number;
}

/* =========================================================
   EXTENDED PROGRESS DATA
========================================================= */

interface ExtendedProgressData {
  sessions?: {
    total: number;
    logged: number;
    completed: number;
    percent: number;
  };

  exercises?: {
    total: number;
    completed: number;
    percent: number;
  };

  calories_burned: number;
  avg_calories_per_session: number;

  active_weeks: number;
  weeks_total: number;
  best_week_score: number;

  weekly_detail: Record<
    string,
    Record<
      string,
      Record<
        string,
        {
          completed: boolean;
          logged: boolean;
          completion_percent: number;
          calories_burned: number;
          total_sets: number;
          completed_sets: number;
        }
      >
    >
  >;

  plan: {
    workouts_per_week: number;
    weeks_per_month: number;
    sessions_per_month: number;
    months: number;
    sessions_total: number;
  };

  month: MonthProgress;

  months?: Record<
    string,
    MonthProgress
  >;

  overall: {
    sessions_completed: number;
    sessions_logged: number;
    sessions_total: number;
    percent: number;

    calories_burned: number;
    avg_calories_per_session: number;

    active_weeks: number;
    best_week_score: number;
    months_tracked: number;
  };

  sets: {
    total: number;
    completed: number;
    percent: number;
  };

  current: unknown;

  transformation: {
    weight_lost: number;
    waist_reduced: number;
  };

  chart: {
    dates: string[];
    weights: number[];
    waists: number[];
  };
}

/* =========================================================
   EMPTY MONTH
========================================================= */

const EMPTY_MONTH: MonthProgress = {
  month_no: 1,

  sessions_completed: 0,
  sessions_logged: 0,
  sessions_total: 0,
  percent: 0,

  calories_burned: 0,
  avg_calories_per_session: 0,

  active_weeks: 0,
  weeks_logged: 0,
  weeks_completed: 0,

  best_week_score: 0,

  workouts: 0,
  calories: 0,
  score: 0,

  sets_total: 0,
  sets_completed: 0,
};

/* =========================================================
   COMPONENT
========================================================= */

const Progress = () => {
  const {
    month,
    week,
    periodResetKey,
    onMonthChange,
    onWeekChange,
  } =
    useOutletContext<DashboardOutletContext>();

  const {
    dashboard,
  } = useDashboard();

  /* =========================================================
     WEIGHTS
  ========================================================= */

  const [
    weights,
    setWeights,
  ] = useState<
    Record<number, number | null>
  >({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  /* =========================================================
     PROGRESS API STATE
  ========================================================= */

  const [
    progress,
    setProgress,
  ] =
    useState<ProgressResponse | null>(
      null
    );

  const [
    progressLoading,
    setProgressLoading,
  ] = useState(true);

  /* =========================================================
     LOAD PROGRESS
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      try {
        setProgressLoading(true);

        const response =
          await getProgress();

        if (!mounted) {
          return;
        }

        if (response.success) {
          setProgress(response);
        }
      } catch (error) {
        console.error(
          "Failed to load progress:",
          error
        );
      } finally {
        if (mounted) {
          setProgressLoading(false);
        }
      }
    };

    void loadProgress();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     PROGRESS DATA
  ========================================================= */

  const progressData =
    progress?.data as
    | ExtendedProgressData
    | undefined;

  /* =========================================================
     DASHBOARD DAYS
  ========================================================= */

  const backendDays =
    (dashboard?.days ??
      []) as DashboardDay[];

  /* =========================================================
     WEEKLY DETAIL
  ========================================================= */

  const weeklyDetail =
    progressData?.weekly_detail ??
    {};

  /* =========================================================
     SELECTED MONTH DETAIL
  ========================================================= */

  const selectedMonthDetail =
    weeklyDetail[
    String(month)
    ] ?? {};

  /* =========================================================
     SELECTED WEEK DETAIL
  ========================================================= */

  const selectedWeekDetail =
    selectedMonthDetail[
    String(week)
    ] ?? {};

  /* =========================================================
     DAY BREAKDOWN
  ========================================================= */

  const selectedWeekDays =
    useMemo<ProgressDay[]>(
      () => {
        return backendDays.map(
          (
            day: DashboardDay
          ) => {
            const dayDetail =
              selectedWeekDetail[
              String(day.id)
              ];

            return {
              day: day.id,

              name: day.label,

              type: day.label,

              completion:
                dayDetail
                  ?.completion_percent ??
                null,

              calories:
                dayDetail
                  ?.calories_burned ??
                null,
            };
          }
        );
      },
      [
        backendDays,
        selectedWeekDetail,
      ]
    );

  /* =========================================================
     WEEK SESSIONS COMPLETED
     
     This is kept separate from logged sessions.

     `completed` means the workout reached 100%.
  ========================================================= */

  const weekSessionsCompleted =
    useMemo(() => {
      return backendDays.reduce(
        (
          count: number,
          day: DashboardDay
        ) => {
          const dayDetail =
            selectedWeekDetail[
            String(day.id)
            ];

          return dayDetail?.completed === true
            ? count + 1
            : count;
        },
        0
      );
    }, [
      backendDays,
      selectedWeekDetail,
    ]);

  /* =========================================================
     WEEK SESSIONS LOGGED
     
     Attendance rule:

     A session counts as logged when the user
     logs at least one set.
  ========================================================= */

  const weekSessionsLogged =
    useMemo(() => {
      return backendDays.reduce(
        (
          count: number,
          day: DashboardDay
        ) => {
          const dayDetail =
            selectedWeekDetail[
            String(day.id)
            ];

          return dayDetail?.logged === true
            ? count + 1
            : count;
        },
        0
      );
    }, [
      backendDays,
      selectedWeekDetail,
    ]);

  /* =========================================================
     WEEK TOTAL SESSIONS
  ========================================================= */

  const weekTotalSessions =
    backendDays.length;

  /* =========================================================
     WEEK CALORIES
  ========================================================= */

  const weekCaloriesBurned =
    useMemo(() => {
      return backendDays.reduce(
        (
          total: number,
          day: DashboardDay
        ) => {
          const dayDetail =
            selectedWeekDetail[
            String(day.id)
            ];

          return (
            total +
            Number(
              dayDetail
                ?.calories_burned ??
              0
            )
          );
        },
        0
      );
    }, [
      backendDays,
      selectedWeekDetail,
    ]);

  /* =========================================================
     WEEK SCORE
     
     IMPORTANT:

     Week score is based on ATTENDANCE.

     1 logged session / 5 = 20%
     3 logged sessions / 5 = 60%
     5 logged sessions / 5 = 100%

     It does NOT require a workout to be 100% complete.
  ========================================================= */

  const weekScore =
    weekTotalSessions > 0
      ? Math.round(
        (weekSessionsLogged /
          weekTotalSessions) *
        100
      )
      : 0;

  /* =========================================================
     SELECTED MONTH DATA
  ========================================================= */

  const selectedMonthData =
    progressData?.months?.[
    String(month)
    ] ??
    progressData?.month ??
    {
      ...EMPTY_MONTH,
      month_no: month,
    };

  /* =========================================================
     MONTH LOGGED SESSIONS
  ========================================================= */

  const monthSessionsLogged =
    selectedMonthData
      .sessions_logged ?? 0;

  /* =========================================================
     MONTH TOTAL SESSIONS
  ========================================================= */

  const monthTotalSessions =
    selectedMonthData
      .sessions_total ??
    progressData?.plan
      ?.sessions_per_month ??
    0;

  /* =========================================================
     MONTH SCORE
     
     ATTENDANCE BASED:

     logged sessions / planned sessions

     Current example:

     1 / 20 = 5%
  ========================================================= */

  const monthScore =
    monthTotalSessions > 0
      ? Math.round(
        (monthSessionsLogged /
          monthTotalSessions) *
        100
      )
      : 0;

  /* =========================================================
     MONTH SETS
     
     This is the total planned/completed sets
     across the selected month.

     For Month 1:

     29 / 139
  ========================================================= */

  const calculatedMonthTotalSets =
    useMemo(() => {
      return backendDays.reduce(
        (
          total: number,
          day: DashboardDay
        ) => {
          return (
            total +
            day.exercises.reduce(
              (
                dayTotal: number,
                exercise: DashboardExercise
              ) => {
                return (
                  dayTotal +
                  Number(
                    exercise.sets ?? 0
                  )
                );
              },
              0
            )
          );
        },
        0
      );
    }, [backendDays]);

  const monthSetsTotal =
    selectedMonthData
      .sets_total ??
    calculatedMonthTotalSets;

  const monthSetsCompleted =
    selectedMonthData
      .sets_completed ??
    0;

  /* =========================================================
     MONTH CALORIES
  ========================================================= */

  const monthCaloriesBurned =
    selectedMonthData
      .calories_burned ?? 0;

  /* =========================================================
     MONTH AVERAGE CALORIES
  ========================================================= */

  const monthAvgCaloriesPerSession =
    selectedMonthData
      .avg_calories_per_session ??
    0;

  /* =========================================================
     MONTH ACTIVE WEEKS
  ========================================================= */

  const monthActiveWeeks =
    selectedMonthData
      .active_weeks ??
    0;

  /* =========================================================
     BEST WEEK SCORE
     
     Attendance based.
     
     Example:

     Week 1 = 1/5 = 20%
     Week 2 = 1/5 = 20%
     Week 3 = 3/5 = 60%

     Best = 60%
  ========================================================= */

  const monthBestWeekScore =
    selectedMonthData
      .best_week_score ??
    progressData?.best_week_score ??
    0;

  /* =========================================================
     WEIGHT CHANGE
  ========================================================= */

  const handleWeightChange = (
    weekNumber: number,
    value: number | null
  ) => {
    setWeights(
      (
        previous: Record<
          number,
          number | null
        >
      ) => ({
        ...previous,
        [weekNumber]: value,
      })
    );
  };

  /* =========================================================
     CURRENT WEIGHT
  ========================================================= */

  const currentWeight =
    useMemo(() => {
      const enteredWeeks =
        Object.entries(weights)
          .filter(
            (
              entry: [
                string,
                number | null
              ]
            ) =>
              entry[1] !== null &&
              entry[1] !== undefined &&
              Number.isFinite(
                entry[1]
              )
          )
          .map(
            (
              entry: [
                string,
                number | null
              ]
            ) => ({
              week: Number(
                entry[0]
              ),

              weight:
                entry[1] as number,
            })
          )
          .sort(
            (
              a: {
                week: number;
                weight: number;
              },
              b: {
                week: number;
                weight: number;
              }
            ) =>
              b.week - a.week
          );

      return (
        enteredWeeks[0]
          ?.weight ?? null
      );
    }, [weights]);

  /* =========================================================
     STARTING WEIGHT
  ========================================================= */

  const startingWeight =
    useMemo(() => {
      const value =
        dashboard?.diet
          ?.current_weight;

      if (!value) {
        return null;
      }

      const match =
        String(value).match(
          /-?\d+(?:\.\d+)?/
        );

      return match
        ? Number(match[0])
        : null;
    }, [dashboard]);

  /* =========================================================
     WEIGHT CHANGE
  ========================================================= */

  const weightChange =
    startingWeight !== null &&
      currentWeight !== null
      ? currentWeight -
      startingWeight
      : null;

  /* =========================================================
     HEIGHT / BMI
  ========================================================= */

  const height =
    dashboard?.diet?.height ??
    null;

  const bmi =
    dashboard?.diet?.bmi ??
    null;

  /* =========================================================
     THREE MONTH OVERVIEW
     
     Month overview uses LOGGED sessions
     because workouts represent attendance.
  ========================================================= */

  const threeMonthData =
    useMemo(() => {
      const months =
        progressData?.months ??
        {};

      return [1, 2, 3].map(
        (
          monthNumber: number
        ) => {
          const monthData =
            months[
            String(monthNumber)
            ];

          return {
            month:
              `M${monthNumber}`,

            workouts:
              monthData
                ?.sessions_logged ??
              monthData?.workouts ??
              0,

            calories:
              monthData
                ?.calories ??
              monthData
                ?.calories_burned ??
              0,

            score:
              monthData
                ?.score ??
              monthData
                ?.percent ??
              0,
          };
        }
      );
    }, [progressData]);

  /* =========================================================
     LOADING - GRIND EXACT LOGO LOADER
  ========================================================= */

  if (
    !dashboard ||
    progressLoading
  ) {
    return (
      <GrindLoading/>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Box
      key={periodResetKey}
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100%",

        backgroundColor:
          "#f5f2ed",
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

          boxSizing:
            "border-box",
        }}
      >
        <Stack spacing={2.5}>

          {/* =============================================
              PROGRESS OVERVIEW
          ============================================= */}

          <ProgressStats
            startingWeight={
              startingWeight ?? 0
            }

            currentWeight={
              currentWeight ??
              startingWeight ??
              0
            }

            weightChange={
              weightChange ?? 0
            }

            height={height}

            bmi={bmi}
          />

          {/* =============================================
              PROGRESS TRACKER
          ============================================= */}

          <Box
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <ProgressTrackerHeader
              month={month}
              onMonthChange={
                onMonthChange
              }
            />

            <Box
              sx={{
                mt: {
                  xs: 1.5,
                  sm: 1.7,
                  md: 2,
                },
              }}
            >
              <ProgressSummaryCards
                monthScore={
                  monthScore
                }

                sessionsLogged={
                  monthSessionsLogged
                }

                totalSessions={
                  monthTotalSessions
                }

                setsCompleted={
                  monthSetsCompleted
                }

                setsTotal={
                  monthSetsTotal
                }

                caloriesBurned={
                  monthCaloriesBurned
                }

                avgCaloriesPerSession={
                  monthAvgCaloriesPerSession
                }

                activeWeeks={
                  monthActiveWeeks
                }

                totalWeeks={
                  progressData?.plan
                    ?.weeks_per_month ??
                  4
                }

                bestWeekScore={
                  monthBestWeekScore
                }
              />
            </Box>
          </Box>

          {/* =============================================
              WEEKLY DETAIL
          ============================================= */}

          <WeeklyDetail
            week={week}
            onWeekChange={
              onWeekChange
            }
          />

          {/* =============================================
              DAY BREAKDOWN
          ============================================= */}

          <DayBreakdown
            week={week}
            days={
              selectedWeekDays
            }
          />

          {/* =============================================
              WEEKLY SUMMARY
          ============================================= */}

          <WeeklySummary
            sessionsCompleted={
              weekSessionsLogged
            }

            totalSessions={
              weekTotalSessions
            }

            caloriesBurned={
              weekCaloriesBurned
            }

            weekScore={
              weekScore
            }
          />

          {/* =============================================
              WEEKLY WEIGHT TRACKER
          ============================================= */}

          <WeeklyWeightTracker
            weights={weights}
            onChange={
              handleWeightChange
            }
          />

          {/* =============================================
              THREE MONTH OVERVIEW
          ============================================= */}

          <ThreeMonthOverview
            data={
              threeMonthData
            }
          />

        </Stack>
      </Container>
    </Box>
  );
};

export default Progress;