import { useMemo, useState } from "react";
import { Box, Container, Stack } from "@mui/material";

import ProgressStats from "../../../components/progress/ProgressStats";
import ProgressTrackerHeader from "../../../components/progress/ProgressTrackerHeader";
import ProgressSummaryCards from "../../../components/progress/ProgressSummaryCards";
import WeeklyDetail from "../../../components/progress/WeeklyDetail";
import DayBreakdown from "../../../components/progress/DayBreakdown";
import WeeklySummary from "../../../components/progress/WeeklySummary";
import WeeklyWeightTracker from "../../../components/progress/WeeklyWeightTracker";
import ThreeMonthOverview from "../../../components/progress/ThreeMonthOverview";

import { progressMockData } from "./progressMockData";

const Progress = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  /*
   * Weekly weights entered by the user.
   *
   * Example:
   *
   * {
   *   1: 93,
   *   2: 91,
   *   3: 92,
   *   4: null
   * }
   */
  const [weights, setWeights] = useState<
    Record<number, number | null>
  >(progressMockData.weeklyWeights);

  /* =========================================================
     SELECTED MONTH
  ========================================================= */

  const selectedMonthData = useMemo(() => {
    return (
      progressMockData.months.find(
        (item) => item.month === selectedMonth
      ) ?? progressMockData.months[0]
    );
  }, [selectedMonth]);

  /* =========================================================
     SELECTED WEEK
  ========================================================= */

  const selectedWeekData = useMemo(() => {
    return (
      selectedMonthData.weeks.find(
        (item) => item.week === selectedWeek
      ) ??
      selectedMonthData.weeks[0] ?? {
        week: selectedWeek,
        sessionsCompleted: 0,
        totalSessions: 6,
        caloriesBurned: 0,
        weekScore: 0,
        days: [],
      }
    );
  }, [selectedMonthData, selectedWeek]);

  /* =========================================================
     MONTH CHANGE
  ========================================================= */

  const handleMonthChange = (
    month: number
  ) => {
    setSelectedMonth(month);
    setSelectedWeek(1);
  };

  /* =========================================================
     WEIGHT CHANGE
  ========================================================= */

  const handleWeightChange = (
    week: number,
    value: number | null
  ) => {
    setWeights((previous) => ({
      ...previous,
      [week]: value,
    }));
  };

  /* =========================================================
     CURRENT WEIGHT

     The current weight is always the latest
     week for which the user has entered a value.

     Example:

     Week 1 = 93
     Week 2 = 91
     Week 3 = 92
     Week 4 = empty

     Current weight = 92 kg
  ========================================================= */

  const currentWeight = useMemo(() => {
    const enteredWeeks = Object.entries(
      weights
    )
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
        (a, b) => b.week - a.week
      );

    return (
      enteredWeeks[0]?.weight ??
      progressMockData.startingWeight
    );
  }, [weights]);

  /* =========================================================
     TOTAL WEIGHT CHANGE

     IMPORTANT:

     This is ALWAYS calculated against the
     user's starting weight.

     currentWeight - startingWeight

     Example:

     Starting = 95
     Current  = 91

     91 - 95 = -4 kg

     Therefore:

     -4 kg = lost 4 kg
  ========================================================= */

  const weightChange = useMemo(() => {
    return (
      currentWeight -
      progressMockData.startingWeight
    );
  }, [currentWeight]);

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
              TOP WEIGHT STATS

              These values are now dynamic.
          ================================================= */}

          <ProgressStats
            startingWeight={
              progressMockData.startingWeight
            }

            currentWeight={
              currentWeight
            }

            weightChange={
              weightChange
            }
          />

          {/* =================================================
              PROGRESS TRACKER
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
              selectedMonthData.monthScore
            }

            sessionsCompleted={
              selectedMonthData.sessionsCompleted
            }

            totalSessions={
              selectedMonthData.totalSessions
            }

            caloriesBurned={
              selectedMonthData.caloriesBurned
            }

            activeWeeks={
              selectedMonthData.activeWeeks
            }

            totalWeeks={
              selectedMonthData.totalWeeks
            }

            bestWeekScore={
              selectedMonthData.bestWeekScore
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
              selectedWeekData.days
            }
          />

          {/* =================================================
              WEEK SUMMARY
          ================================================= */}

          <WeeklySummary
            sessionsCompleted={
              selectedWeekData.sessionsCompleted
            }

            totalSessions={
              selectedWeekData.totalSessions
            }

            caloriesBurned={
              selectedWeekData.caloriesBurned
            }

            weekScore={
              selectedWeekData.weekScore
            }
          />

          {/* =================================================
              WEEKLY WEIGHT TRACKER

              User enters weight here.
              ProgressStats automatically updates.
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
            data={
              progressMockData.monthlyOverview
            }
          />

        </Stack>
      </Container>
    </Box>
  );
};

export default Progress;