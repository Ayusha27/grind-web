import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import WorkoutHeader from "../../../components/workout/WorkoutHeader";
import WarmupSection from "../../../components/workout/WarmupSection";
import ExerciseCard from "../../../components/workout/ExerciseCard";
import CalorieBanner from "../../../components/workout/CalorieBanner";
import SessionProgress from "../../../components/workout/SessionProgress";

import DashboardHeader from "../../../components/workout/DashboardHeader";
import WorkoutPeriodBar from "../../../components/workout/WorkoutPeriodBar";
import WorkoutTabs from "../../../components/workout/WorkoutTabs";

import { workoutDays } from "../workout/workoutMockData";

// @ts-expect-error CSS imports are handled by the bundler.
import "./Workout.css";

const Workout = () => {
  /* =========================================================
     PERIOD / DAY STATE
  ========================================================= */

  const [selectedDay, setSelectedDay] = useState(0);

  const [month, setMonth] = useState(1);
  const [week, setWeek] = useState(3);

  /* =========================================================
     SET / WARMUP STATE
  ========================================================= */

  const [completedSets, setCompletedSets] = useState<
    Record<string, boolean[]>
  >({});

  const [completedWarmups, setCompletedWarmups] = useState<
  Record<number, Record<string, boolean>>
  >({});

  const [expandedExercise, setExpandedExercise] =
    useState<number | null>(0);

  /* =========================================================
     CURRENT DAY
  ========================================================= */

  const currentDay = workoutDays[selectedDay];

  /* =========================================================
     CURRENT DAY TOTAL SETS
  ========================================================= */

  const totalSets = useMemo(() => {
    return currentDay.exercises.reduce(
      (total, exercise) => total + exercise.sets,
      0
    );
  }, [currentDay]);

  /* =========================================================
     CURRENT DAY COMPLETED SETS
  ========================================================= */

  const completedSetCount = useMemo(() => {
    return Object.entries(completedSets).reduce(
      (total, [key, sets]) => {
        if (!key.startsWith(`${selectedDay}-`)) {
          return total;
        }

        return (
          total +
          sets.filter(Boolean).length
        );
      },
      0
    );
  }, [completedSets, selectedDay]);

  /* =========================================================
     TOTAL SETS ACROSS ALL 5 DAYS
     Used by DashboardHeader
  ========================================================= */

  const totalProgramSets = useMemo(() => {
    return workoutDays.reduce(
      (total, day) =>
        total +
        day.exercises.reduce(
          (dayTotal, exercise) =>
            dayTotal + exercise.sets,
          0
        ),
      0
    );
  }, []);

  /* =========================================================
     COMPLETED SETS ACROSS ALL 5 DAYS
  ========================================================= */

  const completedProgramSets = useMemo(() => {
    return Object.values(completedSets).reduce(
      (total, sets) =>
        total + sets.filter(Boolean).length,
      0
    );
  }, [completedSets]);

  /* =========================================================
     COMPLETED DAYS
  ========================================================= */

  const completedDays = useMemo(() => {
    return workoutDays.reduce(
      (count, day, dayIndex) => {
        const dayTotal = day.exercises.reduce(
          (total, exercise) =>
            total + exercise.sets,
          0
        );

        const dayCompleted = Object.entries(
          completedSets
        ).reduce(
          (total, [key, sets]) => {
            if (
              !key.startsWith(`${dayIndex}-`)
            ) {
              return total;
            }

            return (
              total +
              sets.filter(Boolean).length
            );
          },
          0
        );

        return dayCompleted >= dayTotal
          ? count + 1
          : count;
      },
      0
    );
  }, [completedSets]);

  /* =========================================================
     CURRENT DAY PROGRESS
  ========================================================= */

  const progressPercentage =
    totalSets === 0
      ? 0
      : Math.round(
          (completedSetCount / totalSets) *
            100
        );

  /* =========================================================
     CALORIES
  ========================================================= */

  const earnedCalories = useMemo(() => {
    if (totalSets === 0) {
      return 0;
    }

    const ratio =
      completedSetCount / totalSets;

    return Math.round(
      (currentDay.calMin +
        (currentDay.calMax -
          currentDay.calMin) *
          ratio) *
        ratio
    );
  }, [
    completedSetCount,
    totalSets,
    currentDay,
  ]);

  /* =========================================================
     TOGGLE SET
  ========================================================= */

  const toggleSet = (
    exerciseIndex: number,
    setIndex: number,
    setsCount: number
  ) => {
    const key = `${selectedDay}-${exerciseIndex}`;

    setCompletedSets((previous) => {
      const current =
        previous[key] ??
        Array(setsCount).fill(false);

      const updated = [...current];

      updated[setIndex] =
        !updated[setIndex];

      return {
        ...previous,
        [key]: updated,
      };
    });
  };

  /* =========================================================
     TOGGLE WARMUP
  ========================================================= */

  const toggleWarmup = (name: string) => {
  setCompletedWarmups((previous) => {
    const currentDayWarmups =
      previous[selectedDay] ?? {};

    return {
      ...previous,
      [selectedDay]: {
        ...currentDayWarmups,
        [name]: !currentDayWarmups[name],
      },
    };
  });
};

  /* =========================================================
     RESET CURRENT DAY
  ========================================================= */

  const resetDay = () => {
    setCompletedSets((previous) => {
      const updated = {
        ...previous,
      };

      currentDay.exercises.forEach(
        (_, index) => {
          delete updated[
            `${selectedDay}-${index}`
          ];
        }
      );

      return updated;
    });

    setCompletedWarmups((previous) => {
    const updated = {
      ...previous,
    };

    delete updated[selectedDay];

    return updated;
  });
    setExpandedExercise(0);
  };

  /* =========================================================
     CHANGE DAY
  ========================================================= */

  const changeDay = (index: number) => {
    setSelectedDay(index);
    setExpandedExercise(0);
  };

  /* =========================================================
     DAY TAB LABEL
  ========================================================= */

  const getDayLabels = (
    dayName: string
  ) => {
    const parts =
      dayName.split(" - ");

    return {
      dayTitle: parts[0] ?? "",
      workoutTitle:
        parts.slice(1).join(" - "),
    };
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Box className="workout-page">
      {/* =====================================================
          1. DASHBOARD HEADER
          
          GRIND logo
          6/96 sets done
          0/5 days done
          kcal today
      ===================================================== */}

      <DashboardHeader
        completedSets={completedProgramSets}
        totalSets={totalProgramSets}
        completedDays={completedDays}
        totalDays={5}
        calories={earnedCalories}
      />

      {/* =====================================================
          2. MONTH / WEEK BAR

          Logging to
          Month 1
          Week 3
          Auto-syncing to Progress
      ===================================================== */}

      <WorkoutPeriodBar
        month={month}
        week={week}
        onMonthChange={setMonth}
        onWeekChange={setWeek}
      />
 
      {/* =====================================================
          3. MAIN TABS

          WORKOUT
          DIET
          PROGRESS
      ===================================================== */}

      <WorkoutTabs activeTab="workout" />

      {/* =====================================================
          4. DAY TABS

          1 MONDAY
          2 TUESDAY
          3 WEDNESDAY
          4 THURSDAY
          5 FRIDAY
      ===================================================== */}

      <Box className="workout-day-navigation">
        <Container
          maxWidth={false}
          className="workout-container"
        >
          <Box className="day-tabs">
            {workoutDays.map(
              (day, index) => {
                const active =
                  index === selectedDay;

                const {
                  dayTitle,
                  workoutTitle,
                } =
                  getDayLabels(
                    day.dayName
                  );

                return (
                  <Box
                    key={day.id}
                    className={`day-tab ${
                      active
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      changeDay(index)
                    }
                  >
                    <Typography className="day-number">
                      {day.dayNumber}
                    </Typography>

                    <Typography className="day-name">
                      {dayTitle}
                    </Typography>

                    <Typography className="day-workout">
                      {workoutTitle}
                    </Typography>

                    <Box className="day-dot" />
                  </Box>
                );
              }
            )}
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          5. MAIN CONTENT
      ===================================================== */}

      <Container
        maxWidth={false}
        className="workout-container workout-content"
      >
        <Stack spacing={1.25}>
          {/* =================================================
              LOGGING CONTEXT
          ================================================= */}

          <Box className="logging-context">
            <Stack
              direction="row"
              spacing={0.8}
              sx={{
                alignItems: "center",
              }}
            >
              <LocationOnOutlinedIcon
                className="logging-icon"
              />

              <Typography className="logging-label">
                Logging to
              </Typography>

              <Typography className="logging-value">
                {month} · {week}
              </Typography>

              <Typography className="logging-change">
                — change in the bar above
              </Typography>
            </Stack>

            <Box className="sync-badge">
              AUTO-SYNC
            </Box>
          </Box>

          {/* =================================================
              WORKOUT HEADER
          ================================================= */}

          <WorkoutHeader
            dayNumber={
              currentDay.dayNumber
            }
            dayName={
              currentDay.dayName
            }
            exerciseCount={
              currentDay.exercises.length
            }
            totalSets={totalSets}
            completedSets={
              completedSetCount
            }
            progress={
              progressPercentage
            }
            onReset={resetDay}
          />

          {/* =================================================
              CALORIE BANNER
          ================================================= */}

          <CalorieBanner
            min={currentDay.calMin}
            max={currentDay.calMax}
            earned={earnedCalories}
            note={currentDay.calNote}
          />

          {/* =================================================
              SESSION PROGRESS
          ================================================= */}

          <SessionProgress
            completed={
              completedSetCount
            }
            total={totalSets}
          />

          {/* =================================================
              WARM UP
          ================================================= */}

          <WarmupSection
            exercises={currentDay.warmups}
            completed={
              completedWarmups[selectedDay] ?? {}
            }
            onToggle={toggleWarmup}
          />

          {/* =================================================
              EXERCISES
          ================================================= */}

          <Stack spacing={0.75}>
            {currentDay.exercises.map(
              (exercise, index) => {
                const key = `${selectedDay}-${index}`;

                const sets =
                  completedSets[key] ??
                  Array(
                    exercise.sets
                  ).fill(false);

                return (
                  <ExerciseCard
                    key={key}
                    index={index}
                    name={
                      exercise.name
                    }
                    setsCount={
                      exercise.sets
                    }
                    reps={
                      exercise.reps
                    }
                    youtubeUrl={
                      exercise.youtube
                    }
                    completedSets={sets}
                    expanded={
                      expandedExercise ===
                      index
                    }
                    onExpand={() =>
                      setExpandedExercise(
                        expandedExercise ===
                          index
                          ? null
                          : index
                      )
                    }
                    onToggleSet={(
                      setIndex
                    ) =>
                      toggleSet(
                        index,
                        setIndex,
                        exercise.sets
                      )
                    }
                  />
                );
              }
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Workout;