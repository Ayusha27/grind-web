import { useMemo, useState } from "react";
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

interface ProgressDay {
  day: number;
  name: string;
  type: string;
  completion: number | null;
  calories: number | null;
}

const Progress = () => {
  const { dashboard } = useDashboard();

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
   *
   * The latest entered weight becomes the Current Weight.
   * BMI is then calculated from this weight + backend height.
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
   * BACKEND DAYS
   * =========================================================
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
   * DAY BREAKDOWN
   * =========================================================
   *
   * Actual live completion data will be connected once the
   * completed workout state is available through the
   * DashboardContext/backend progress response.
   */

  const selectedWeekDays = useMemo<
    ProgressDay[]
  >(() => {
    return backendDays.map(
      (day) => ({
        day: day.id,
        name: day.label,
        type: day.label,
        completion: 0,
        calories: null,
      })
    );
  }, [backendDays]);

  /*
   * =========================================================
   * MONTH SUMMARY
   * =========================================================
   */

  const totalSessions =
    backendDays.length;

  const completedSessions =
    dashboard?.progress?.completed ?? 0;

  const overallProgress =
    dashboard?.progress?.percent ?? 0;

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
   * The latest entered weekly weight is treated as the
   * current weight.
   *
   * Example:
   *
   * Week 1 = 75 kg
   * Week 2 = 73.8 kg
   * Week 3 = 72.9 kg
   *
   * Current Weight = 72.9 kg
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
   * Until a dedicated starting_weight field is exposed by
   * the backend, use the diet plan's current_weight as the
   * initial/reference weight.
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
   *
   * Height comes directly from the backend diet data.
   *
   * Backend may return:
   *
   * "175 cm"
   * "5 ft 10 in"
   * "5'10"
   *
   * ProgressStats expects height in centimeters.
   */

  const height = useMemo(() => {
    const value =
      dashboard?.diet?.height;

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const heightString =
      String(value)
        .trim()
        .toLowerCase();

    /*
     * ---------------------------------------------------------
     * Format: centimeters
     * Example: "175 cm"
     * ---------------------------------------------------------
     */

    const cmMatch =
      heightString.match(
        /(\d+(?:\.\d+)?)\s*cm/
      );

    if (cmMatch) {
      return Number(cmMatch[1]);
    }

    /*
     * ---------------------------------------------------------
     * Format: feet + inches
     * Example: "5 ft 10 in"
     * ---------------------------------------------------------
     */

    const feetInchesMatch =
      heightString.match(
        /(\d+(?:\.\d+)?)\s*(?:ft|feet|')\s*(\d+(?:\.\d+)?)?\s*(?:in|inch|inches|")?/
      );

    if (feetInchesMatch) {
      const feet =
        Number(feetInchesMatch[1]);

      const inches =
        feetInchesMatch[2]
          ? Number(feetInchesMatch[2])
          : 0;

      return (
        feet * 30.48 +
        inches * 2.54
      );
    }

    /*
     * ---------------------------------------------------------
     * Format: decimal feet
     * Example: "5.83 ft"
     * ---------------------------------------------------------
     */

    const decimalFeetMatch =
      heightString.match(
        /(\d+(?:\.\d+)?)\s*(?:ft|feet)/
      );

    if (decimalFeetMatch) {
      return (
        Number(decimalFeetMatch[1]) *
        30.48
      );
    }

    /*
     * ---------------------------------------------------------
     * Fallback:
     *
     * If backend gives a plain number, assume centimeters.
     * ---------------------------------------------------------
     */

    const numericMatch =
      heightString.match(
        /^\d+(?:\.\d+)?$/
      );

    if (numericMatch) {
      return Number(numericMatch[0]);
    }

    return null;
  }, [dashboard]);

  /*
   * =========================================================
   * WEIGHT CHANGE
   * =========================================================
   *
   * Current tracked weight - starting weight.
   *
   * Example:
   *
   * Starting = 75 kg
   * Current  = 72 kg
   *
   * Change = -3 kg
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

  if (!dashboard) {
    return (
      <Box
        sx={{
          minHeight:
            "calc(100vh - 194px)",
          backgroundColor:
            "#f5f2ed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              
              Starting Weight
              Current Weight
              Weight Change
              Height
              BMI
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
          />

          {/* =================================================
              MONTH SELECTOR
          ================================================= */}

          <ProgressTrackerHeader
            month={selectedMonth}
            onMonthChange={
              handleMonthChange
            }
          />

          {/* =================================================
              MONTH SUMMARY
          ================================================= */}

          <ProgressSummaryCards
            monthScore={
              overallProgress
            }
            sessionsCompleted={
              completedSessions
            }
            totalSessions={
              totalSessions
            }
            caloriesBurned={0}
            activeWeeks={
              completedSessions > 0
                ? 1
                : 0
            }
            totalWeeks={4}
            bestWeekScore={
              overallProgress
            }
          />

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
              completedSessions
            }
            totalSessions={
              totalSessions
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
                  completedSessions,
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