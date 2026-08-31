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

  const [weights, setWeights] = useState<
    Record<number, number | null>
  >(progressMockData.weeklyWeights);

  const selectedMonthData = useMemo(() => {
    return (
      progressMockData.months.find(
        (item) => item.month === selectedMonth
      ) ?? progressMockData.months[0]
    );
  }, [selectedMonth]);

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

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setSelectedWeek(1);
  };

  const handleWeightChange = (
    week: number,
    value: number | null
  ) => {
    setWeights((previous) => ({
      ...previous,
      [week]: value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundColor: "#f5f2ed",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
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
        }}
      >
        <Stack spacing={2.5}>
          {/* =================================================
              TOP WEIGHT STATS
          ================================================= */}

          <ProgressStats
            startingWeight={
              progressMockData.startingWeight
            }
            currentWeight={
              progressMockData.currentWeight
            }
            weightChange={
              progressMockData.weightChange
            }
          />

          {/* =================================================
              PROGRESS TRACKER
          ================================================= */}

          <ProgressTrackerHeader
            month={selectedMonth}
            onMonthChange={handleMonthChange}
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
            onWeekChange={setSelectedWeek}
          />

          {/* =================================================
              DAY BREAKDOWN
          ================================================= */}

          <DayBreakdown
            week={selectedWeek}
            days={selectedWeekData.days}
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
              WEEKLY WEIGHT
          ================================================= */}

          <WeeklyWeightTracker
            weights={weights}
            onChange={handleWeightChange}
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