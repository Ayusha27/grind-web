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

import ProgressStats from "../../../components/progress/ProgressStats";
import ProgressTrackerHeader from "../../../components/progress/ProgressTrackerHeader";
import ProgressSummaryCards from "../../../components/progress/ProgressSummaryCards";
import WeeklyDetail from "../../../components/progress/WeeklyDetail";
import DayBreakdown from "../../../components/progress/DayBreakdown";
import WeeklySummary from "../../../components/progress/WeeklySummary";
import WeeklyWeightTracker from "../../../components/progress/WeeklyWeightTracker";
import ThreeMonthOverview from "../../../components/progress/ThreeMonthOverview";

import { useDashboard } from "../../../context/DashboardContext";
import { getProgress } from "../../../api/dashboardApi";

import type { ProgressResponse } from "../../../types/progress";

interface ProgressDay {
  day: number;
  name: string;
  type: string;
  completion: number | null;
  calories: number | null;
}

const Progress = () => {
  const { dashboard } = useDashboard();

  /*
   * =========================================================
   * MONTH / WEEK
   * =========================================================
   */

  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  /*
   * =========================================================
   * WEEKLY WEIGHTS
   * =========================================================
   */

  const [weights, setWeights] = useState<
    Record<number, number | null>
  >({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  /*
   * =========================================================
   * BACKEND PROGRESS
   * =========================================================
   */

  const [progress, setProgress] =
    useState<ProgressResponse | null>(null);

  const [progressLoading, setProgressLoading] =
    useState(true);

  /*
   * =========================================================
   * LOAD PROGRESS
   * =========================================================
   */

  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      try {
        setProgressLoading(true);

        const response = await getProgress();

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

  /*
   * =========================================================
   * BACKEND DAYS
   * =========================================================
   */

  const backendDays = dashboard?.days ?? [];

  /*
   * =========================================================
   * OVERALL PROGRESS
   * =========================================================
   */

  const totalExercises =
    progress?.data?.exercises?.total ?? 0;

  const completedExercises =
    progress?.data?.exercises?.completed ?? 0;

  const overallProgress =
    progress?.data?.exercises?.percent ?? 0;

  /*
   * =========================================================
   * TOTAL CALORIES
   * =========================================================
   */

  const totalCaloriesBurned =
    progress?.data?.calories_burned ?? 0;

  /*
   * =========================================================
   * BACKEND WEEKLY DETAIL
   * =========================================================
   *
   * Structure:
   *
   * month
   *   └── week
   *        └── day
   */

  const weeklyDetail =
    progress?.data?.weekly_detail ?? {};

  /*
   * =========================================================
   * BACKEND CALCULATED WEEK METRICS
   * =========================================================
   */

  const activeWeeks =
    progress?.data?.active_weeks ?? 0;

  const bestWeekScore =
    progress?.data?.best_week_score ?? 0;

  /*
   * =========================================================
   * SELECTED MONTH / WEEK DETAIL
   * =========================================================
   */

  const selectedMonthDetail =
    weeklyDetail[String(selectedMonth)] ?? {};

  const selectedWeekDetail =
    selectedMonthDetail[String(selectedWeek)] ?? {};

  /*
   * =========================================================
   * DAY BREAKDOWN
   * =========================================================
   */

  const selectedWeekDays = useMemo<
    ProgressDay[]
  >(() => {
    return backendDays.map((day) => {
      const dayDetail =
        selectedWeekDetail[String(day.id)];

      return {
        day: day.id,

        name: day.label,

        type: day.label,

        completion:
          dayDetail?.completion_percent ??
          null,

        calories:
          dayDetail?.calories_burned ??
          null,
      };
    });
  }, [
    backendDays,
    selectedWeekDetail,
  ]);

  /*
   * =========================================================
   * WEEK SESSIONS COMPLETED
   * =========================================================
   *
   * A session is counted when the backend
   * marks that workout day as completed.
   */

  const weekSessionsCompleted =
    useMemo(() => {
      return backendDays.reduce(
        (count, day) => {
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

  /*
   * =========================================================
   * WEEK TOTAL SESSIONS
   * =========================================================
   */

  const weekTotalSessions =
    backendDays.length;

  /*
   * =========================================================
   * WEEK CALORIES
   * =========================================================
   */

  const weekCaloriesBurned =
    useMemo(() => {
      return backendDays.reduce(
        (total, day) => {
          const dayDetail =
            selectedWeekDetail[
              String(day.id)
            ];

          return (
            total +
            Number(
              dayDetail?.calories_burned ?? 0
            )
          );
        },
        0
      );
    }, [
      backendDays,
      selectedWeekDetail,
    ]);

  /*
   * =========================================================
   * WEEK SCORE
   * =========================================================
   */

  const weekScore =
    weekTotalSessions > 0
      ? Math.round(
          (weekSessionsCompleted /
            weekTotalSessions) *
            100
        )
      : 0;

  /*
   * =========================================================
   * CURRENT WEIGHT
   * =========================================================
   */

  const currentWeight = useMemo(() => {
    const enteredWeeks =
      Object.entries(weights)
        .filter(
          ([, weight]) =>
            weight !== null &&
            weight !== undefined &&
            Number.isFinite(weight)
        )
        .map(
          ([week, weight]) => ({
            week: Number(week),
            weight: weight as number,
          })
        )
        .sort(
          (a, b) =>
            b.week - a.week
        );

    return (
      enteredWeeks[0]?.weight ??
      null
    );
  }, [weights]);

  /*
   * =========================================================
   * STARTING WEIGHT
   * =========================================================
   */

  const startingWeight = useMemo(() => {
    const value =
      dashboard?.diet?.current_weight;

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

  /*
   * =========================================================
   * HEIGHT / BMI
   * =========================================================
   */

  const height =
    dashboard?.diet?.height ?? null;

  const bmi =
    dashboard?.diet?.bmi ?? null;

  /*
   * =========================================================
   * WEIGHT CHANGE
   * =========================================================
   */

  const weightChange =
    startingWeight !== null &&
      currentWeight !== null
      ? currentWeight -
        startingWeight
      : null;

  /*
   * =========================================================
   * MONTH CHANGE
   * =========================================================
   */

  const handleMonthChange = (
    month: number
  ) => {
    setSelectedMonth(month);
    setSelectedWeek(1);
  };

  /*
   * =========================================================
   * WEIGHT CHANGE
   * =========================================================
   */

  const handleWeightChange = (
    week: number,
    value: number | null
  ) => {
    setWeights((previous) => ({
      ...previous,
      [week]: value,
    }));
  };

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (!dashboard || progressLoading) {
    return (
      <Box
        sx={{
          minHeight:
            "calc(100vh - 194px)",

          backgroundColor:
            "#f5f2ed",

          display: "flex",

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >
        <Box>
          Loading your progress...
        </Box>
      </Box>
    );
  }

  return (
    <Box
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

          <Box
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <ProgressTrackerHeader
              month={selectedMonth}
              onMonthChange={
                handleMonthChange
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
                  overallProgress
                }

                sessionsCompleted={
                  completedExercises
                }

                totalSessions={
                  totalExercises
                }

                caloriesBurned={
                  totalCaloriesBurned
                }

                activeWeeks={
                  activeWeeks
                }

                totalWeeks={4}

                bestWeekScore={
                  bestWeekScore
                }
              />
            </Box>
          </Box>

          <WeeklyDetail
            week={selectedWeek}
            onWeekChange={
              setSelectedWeek
            }
          />

          <DayBreakdown
            week={selectedWeek}
            days={
              selectedWeekDays
            }
          />

          <WeeklySummary
            sessionsCompleted={
              weekSessionsCompleted
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

          <WeeklyWeightTracker
            weights={weights}
            onChange={
              handleWeightChange
            }
          />

          <ThreeMonthOverview
            data={[
              {
                month: "M1",

                workouts:
                  completedExercises,

                calories:
                  totalCaloriesBurned,

                score:
                  overallProgress,
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
            ]}
          />

        </Stack>
      </Container>
    </Box>
  );
};

export default Progress;