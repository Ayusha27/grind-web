import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

import DayNavigation from "../../../components/workout/DayNavigation";
import LoggingNotice from "../../../components/workout/LoggingNotice";
import WorkoutSummaryCard from "../../../components/workout/WorkoutSummaryCard";
import CalorieCard from "../../../components/workout/CalorieCard";
import SessionProgress from "../../../components/workout/SessionProgress";
import WarmUpSection from "../../../components/workout/WarmupSection";
import ExerciseAccordion from "../../../components/workout/ExerciseAccordion";

import {
  WORKOUT_DAYS,
  WARM_UP_EXERCISES,
  WORKOUT_EXERCISES,
} from "../../../constants/workout";

import { useDashboard } from "../../../context/DashboardContext";

const Workout = () => {
  const { setStats } = useDashboard();

  /* ---------------------------------------------
   * Day selection
   * --------------------------------------------- */

  const [selectedDay, setSelectedDay] =
    useState(1);

  /* ---------------------------------------------
   * Warm-up state
   * --------------------------------------------- */

  const [warmUpExercises, setWarmUpExercises] =
    useState(WARM_UP_EXERCISES);

  /* ---------------------------------------------
   * Workout exercise state
   * --------------------------------------------- */

  const [exercises, setExercises] =
    useState(WORKOUT_EXERCISES);

  /* ---------------------------------------------
   * Accordion state
   *
   * Exercise #1 is open by default.
   * --------------------------------------------- */

  const [openExerciseId, setOpenExerciseId] =
    useState<number | null>(1);

  /* ---------------------------------------------
   * Current workout day
   * --------------------------------------------- */

  const selectedWorkout =
    WORKOUT_DAYS.find(
      (day) =>
        day.dayNumber === selectedDay
    );

  /* ---------------------------------------------
   * Current day's total sets
   * --------------------------------------------- */

  const totalSets = useMemo(() => {
    return exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.length,
      0
    );
  }, [exercises]);

  /* ---------------------------------------------
   * Current day's completed sets
   * --------------------------------------------- */

  const completedSets = useMemo(() => {
    return exercises.reduce(
      (total, exercise) =>
        total +
        exercise.sets.filter(
          (set) => set.completed
        ).length,
      0
    );
  }, [exercises]);


  useEffect(() => {
  setStats({
    completedSets,
    totalSets,
    completedDays: completedSets === totalSets ? 1 : 0,
    totalDays: WORKOUT_DAYS.length,
    calories: 84,
  });
}, [completedSets, totalSets, setStats]);
  /* ---------------------------------------------
   * Total sets across the complete program
   * --------------------------------------------- */

//   const totalProgramSets = useMemo(() => {
//     return WORKOUT_DAYS.reduce(
//       (total, day) => {
//         return (
//           total +
//           day.exercises.reduce(
//             (
//               dayTotal,
//               exercise
//             ) =>
//               dayTotal +
//               exercise.sets.length,
//             0
//           )
//         );
//       },
//       0
//     );
//   }, []);

  /* ---------------------------------------------
   * Completed program sets
   *
   * Current page stores workout completion
   * in the selected workout state.
   * --------------------------------------------- */

  const completedProgramSets =
    completedSets;

  /* ---------------------------------------------
   * Completed days
   * --------------------------------------------- */

  const completedDays =
    completedSets === totalSets &&
    totalSets > 0
      ? 1
      : 0;

  /* ---------------------------------------------
   * Sync stats with DashboardContext
   * --------------------------------------------- */

//   useEffect(() => {
//     console.log("🔥 DASHBOARD STATS", {
//       completedSets:
//         completedProgramSets,

//       totalSets:
//         totalProgramSets,

//       completedDays,

//       totalDays:
//         WORKOUT_DAYS.length,
//     });

//     setStats({
//       completedSets:
//         completedProgramSets,

//       totalSets:
//         totalProgramSets,

//       completedDays,

//       totalDays:
//         WORKOUT_DAYS.length,

//       calories: 0,
//     });
//   }, [
//     completedProgramSets,
//     totalProgramSets,
//     completedDays,
//     setStats,
//   ]);

  /* ---------------------------------------------
   * Reset current day
   * --------------------------------------------- */

  const handleResetDay = () => {
    setExercises(
      WORKOUT_EXERCISES.map(
        (exercise) => ({
          ...exercise,

          sets: exercise.sets.map(
            (set) => ({
              ...set,
              completed: false,
            })
          ),
        })
      )
    );

    setWarmUpExercises(
      WARM_UP_EXERCISES.map(
        (exercise) => ({
          ...exercise,
          completed: false,
        })
      )
    );

    setOpenExerciseId(1);
  };

  /* ---------------------------------------------
   * Warm-up toggle
   * --------------------------------------------- */

  const handleWarmUpToggle = (
    exerciseId: number
  ) => {
    setWarmUpExercises(
      (current) =>
        current.map(
          (exercise) =>
            exercise.id ===
            exerciseId
              ? {
                  ...exercise,
                  completed:
                    !exercise.completed,
                }
              : exercise
        )
    );
  };

  /* ---------------------------------------------
   * Exercise accordion toggle
   * --------------------------------------------- */

  const handleExerciseToggle = (
    exerciseId: number
  ) => {
    setOpenExerciseId(
      (currentId) =>
        currentId === exerciseId
          ? null
          : exerciseId
    );
  };

  /* ---------------------------------------------
   * Set toggle
   * --------------------------------------------- */

  const handleSetToggle = (
    exerciseId: number,
    setId: number
  ) => {
    setExercises(
      (currentExercises) =>
        currentExercises.map(
          (exercise) => {
            if (
              exercise.id !==
              exerciseId
            ) {
              return exercise;
            }

            return {
              ...exercise,

              sets: exercise.sets.map(
                (set) =>
                  set.id === setId
                    ? {
                        ...set,
                        completed:
                          !set.completed,
                      }
                    : set
              ),
            };
          }
        )
    );
  };

  /* ---------------------------------------------
   * Watch exercise video
   * --------------------------------------------- */

  const handleWatch = (
    videoUrl?: string
  ) => {
    if (!videoUrl) {
      return;
    }

    window.open(
      videoUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ---------------------------------------------
   * Render
   * --------------------------------------------- */

  return (
    <Box
      sx={{
        minHeight:
          "calc(100vh - 194px)",
        backgroundColor:
          "#f5f2ed",
      }}
    >
      {/* Day navigation */}

      <DayNavigation
        days={WORKOUT_DAYS}
        selectedDay={selectedDay}
        onDayChange={
          setSelectedDay
        }
      />

      {/* Main content */}

      <Box
        sx={{
          width: "100%",
          mx: "auto",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: {
            xs: 2,
            sm: 3,
            md: 3.5,
          },

          display: "flex",
          flexDirection:
            "column",

          gap: {
            xs: 2,
            sm: 2.5,
          },
        }}
      >
        {/* Logging notice */}

        <LoggingNotice
          month={1}
          week={1}
        />

        {/* Workout summary */}

        <WorkoutSummaryCard
          dayNumber={selectedDay}
          title={
            selectedWorkout?.label ??
            "Workout"
          }
          exerciseCount={
            exercises.length
          }
          totalSets={totalSets}
          completedSets={
            completedSets
          }
          onReset={
            handleResetDay
          }
        />

        {/* Calories */}

        <CalorieCard
          minimumCalories={250}
          maximumCalories={350}
          earnedCalories={84}
        />

        {/* Session progress */}

        <SessionProgress
          completed={
            completedSets
          }
          total={totalSets}
        />

        {/* Warm-up */}

        <WarmUpSection
          exercises={
            warmUpExercises
          }
          onToggle={
            handleWarmUpToggle
          }
          onWatch={(exercise) =>
            handleWatch(
              exercise.videoUrl
            )
          }
        />

        {/* Exercises */}

        <Box
          sx={{
            display: "flex",
            flexDirection:
              "column",
            gap: 1.5,
          }}
        >
          {exercises.map(
            (exercise) => (
              <ExerciseAccordion
                key={exercise.id}
                exercise={
                  exercise
                }
                isOpen={
                  openExerciseId ===
                  exercise.id
                }
                onToggle={() =>
                  handleExerciseToggle(
                    exercise.id
                  )
                }
                onSetToggle={(
                  setId
                ) =>
                  handleSetToggle(
                    exercise.id,
                    setId
                  )
                }
                onWatch={(
                  exercise
                ) =>
                  handleWatch(
                    exercise.videoUrl
                  )
                }
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Workout;