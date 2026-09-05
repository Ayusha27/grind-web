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

  const [selectedMonth, setSelectedMonth] =
    useState(1);

  const [selectedWeek, setSelectedWeek] =
    useState(1);

  /*
   * =========================================================
   * WEEKLY WEIGHTS
   * =========================================================
   *
   * User-entered weight tracking.
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
   *
   * GET /api/v1/portal/progress
   *
   * This is separate from /portal/my-plan because
   * progress is not cached by the backend.
   */

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

  /*
   * =========================================================
   * BACKEND DAYS
   * =========================================================
   *
   * These provide the workout day structure.
   *
   * The progress API currently does NOT return individual
   * days, so the day names still come from my-plan.
   */

  const backendDays =
    dashboard?.days ?? [];

  /*
   * =========================================================
   * TOTAL SETS PER DAY
   * =========================================================
   */

  const getDayTotalSets = (
    day: typeof backendDays[number]
  ) => {
    return day.exercises.reduce(
      (
        total: number,
        exercise: typeof day.exercises[number]
      ) =>
        total +
        Number(exercise.sets || 0),
      0
    );
  };

  /*
   * =========================================================
   * OVERALL PROGRESS FROM BACKEND
   * =========================================================
   *
   * API:
   *
   * data.exercises.total
   * data.exercises.completed
   * data.exercises.percent
   */

  const totalExercises =
    progress?.data?.exercises?.total ?? 0;

  const completedExercises =
    progress?.data?.exercises?.completed ?? 0;

  const overallProgress =
    progress?.data?.exercises?.percent ?? 0;

  /*
   * =========================================================
   * DAY BREAKDOWN
   * =========================================================
   *
   * The current progress API does not expose individual
   * day completion/calorie values.
   *
   * Therefore:
   *
   * - Day/name/type come from dashboard days.
   * - Completion remains unavailable at day level.
   * - Calories remain unavailable at day level.
   *
   * We deliberately do NOT copy the overall progress
   * percentage onto every day because that would be
   * misleading.
   */

  const selectedWeekDays = useMemo<
    ProgressDay[]
  >(() => {
    return backendDays.map((day) => ({
      day: day.id,
      name: day.label,
      type: day.label,
      completion: null,
      calories: null,
    }));
  }, [backendDays]);

  /*
   * =========================================================
   * TOTAL WORKOUT DAYS
   * =========================================================
   */

  const totalSessions =
    backendDays.length;

  /*
   * =========================================================
   * TOTAL SETS
   * =========================================================
   */

  const totalSets = useMemo(() => {
    return backendDays.reduce(
      (total, day) =>
        total +
        getDayTotalSets(day),
      0
    );
  }, [backendDays]);

  /*
   * =========================================================
   * CURRENT WEIGHT
   * =========================================================
   *
   * Latest entered weekly weight.
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
   *
   * Until a dedicated starting_weight field is available,
   * use the backend diet current_weight.
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
   * HEIGHT
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

          {/* =================================================
              PROGRESS STATS
          ================================================= */}

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

       {/* =================================================
    PROGRESS TRACKER
================================================= */}

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
      caloriesBurned={0}
      activeWeeks={
        completedExercises > 0
          ? 1
          : 0
      }
      totalWeeks={4}
      bestWeekScore={
        overallProgress
      }
    />
  </Box>
</Box>

          {/* =================================================
              WEEK SELECTOR
          ================================================= */}

          <WeeklyDetail
            week={selectedWeek}
            onWeekChange={
              setSelectedWeek
            }
          />

          {/* =================================================
              DAY BREAKDOWN
          ================================================= */}

          <DayBreakdown
            week={selectedWeek}
            days={
              selectedWeekDays
            }
          />

          {/* =================================================
              WEEK SUMMARY
          ================================================= */}

          <WeeklySummary
            sessionsCompleted={
              completedExercises
            }

            totalSessions={
              totalExercises
            }

            caloriesBurned={0}

            weekScore={
              overallProgress
            }
          />

          {/* =================================================
              WEEKLY WEIGHT TRACKER
          ================================================= */}

          <WeeklyWeightTracker
            weights={weights}
            onChange={
              handleWeightChange
            }
          />

          {/* =================================================
              THREE MONTH OVERVIEW
          ================================================= */}

          <ThreeMonthOverview
            data={[
              {
                month: "M1",

                workouts:
                  completedExercises,

                calories: 0,

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