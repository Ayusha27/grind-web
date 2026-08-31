import { useMemo, useState } from "react";
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

const Workout = () => {
  /* ---------------------------------------------
   * Day selection
   * --------------------------------------------- */

  const [selectedDay, setSelectedDay] = useState(1);

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
   * Derived workout data
   *
   * Don't store these separately.
   * They can be calculated from exercises.
   * --------------------------------------------- */

  const totalSets = useMemo(() => {
    return exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.length,
      0
    );
  }, [exercises]);

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

  /* ---------------------------------------------
   * Selected workout day
   * --------------------------------------------- */

  const selectedWorkout = WORKOUT_DAYS.find(
  (day) => day.dayNumber === selectedDay
);

  /* ---------------------------------------------
   * Handlers
   * --------------------------------------------- */

  const handleResetDay = () => {
    setExercises(
      WORKOUT_EXERCISES.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          ...set,
          completed: false,
        })),
      }))
    );

    setWarmUpExercises(
      WARM_UP_EXERCISES.map((exercise) => ({
        ...exercise,
        completed: false,
      }))
    );

    setOpenExerciseId(1);
  };

  const handleWarmUpToggle = (
    exerciseId: number
  ) => {
    setWarmUpExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              completed: !exercise.completed,
            }
          : exercise
      )
    );
  };

  const handleExerciseToggle = (
    exerciseId: number
  ) => {
    setOpenExerciseId((currentId) =>
      currentId === exerciseId
        ? null
        : exerciseId
    );
  };

  const handleSetToggle = (
    exerciseId: number,
    setId: number
  ) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }

        return {
          ...exercise,

          sets: exercise.sets.map((set) =>
            set.id === setId
              ? {
                  ...set,
                  completed: !set.completed,
                }
              : set
          ),
        };
      })
    );
  };

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
        minHeight: "calc(100vh - 194px)",
        backgroundColor: "#f5f2ed",
      }}
    >
      {/* -----------------------------------------
       * Day navigation
       * ----------------------------------------- */}

      <DayNavigation
        days={WORKOUT_DAYS}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />

      {/* -----------------------------------------
       * Main workout content
       * ----------------------------------------- */}

      <Box
        sx={{
          width: "100%",
          maxWidth: 1500,
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
          flexDirection: "column",

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
          exerciseCount={exercises.length}
          totalSets={totalSets}
          completedSets={completedSets}
          onReset={handleResetDay}
        />

        {/* Calories */}

        <CalorieCard
          minimumCalories={250}
          maximumCalories={350}
          earnedCalories={84}
        />

        {/* Session progress */}

        <SessionProgress
          completed={completedSets}
          total={totalSets}
        />

        {/* Warm-up */}

        <WarmUpSection
          exercises={warmUpExercises}
          onToggle={handleWarmUpToggle}
          onWatch={(exercise) =>
            handleWatch(exercise.videoUrl)
          }
        />

        {/* ---------------------------------------
         * Working exercises
         * --------------------------------------- */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {exercises.map((exercise) => (
            <ExerciseAccordion
              key={exercise.id}
              exercise={exercise}
              isOpen={
                openExerciseId === exercise.id
              }
              onToggle={() =>
                handleExerciseToggle(
                  exercise.id
                )
              }
              onSetToggle={(setId) =>
                handleSetToggle(
                  exercise.id,
                  setId
                )
              }
              onWatch={(exercise) =>
                handleWatch(
                  exercise.videoUrl
                )
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Workout;