import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

import DayNavigation from "../../../components/workout/DayNavigation";
import LoggingNotice from "../../../components/workout/LoggingNotice";
import WorkoutSummaryCard from "../../../components/workout/WorkoutSummaryCard";
import CalorieCard from "../../../components/workout/CalorieCard";
import SessionProgress from "../../../components/workout/SessionProgress";
import WarmUpSection from "../../../components/workout/WarmupSection";
import ExerciseAccordion, {
  type WorkoutExercise,
} from "../../../components/workout/ExerciseAccordion";
import type { WorkoutSet } from "../../../components/workout/SetTracker";

import { WARM_UP_EXERCISES } from "../../../constants/warmup";

import { useDashboard } from "../../../context/DashboardContext";

const Workout = () => {
  const { dashboard, setStats } = useDashboard();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [warmUpExercises, setWarmUpExercises] =
    useState(WARM_UP_EXERCISES);

  const [completedSetsByDay, setCompletedSetsByDay] =
    useState<Record<number, Record<string, boolean>>>({});

  const [openExerciseId, setOpenExerciseId] =
    useState<number | null>(null);

  /*
   * Select the first backend day once dashboard data is available.
   */
  useEffect(() => {
    if (
      dashboard?.days?.length &&
      selectedDay === null
    ) {
      setSelectedDay(dashboard.days[0].id);
    }
  }, [dashboard, selectedDay]);

  const selectedWorkout = useMemo(() => {
    if (!dashboard || selectedDay === null) {
      return undefined;
    }

    return dashboard.days.find(
      (day) => day.id === selectedDay
    );
  }, [dashboard, selectedDay]);

  /*
   * Convert the backend exercise structure into the structure
   * expected by the existing ExerciseAccordion UI.
   */
  const exercises = useMemo<WorkoutExercise[]>(() => {
    if (!selectedWorkout) {
      return [];
    }

    const completedSets =
      completedSetsByDay[selectedWorkout.id] ?? {};

    return selectedWorkout.exercises.map(
      (exercise, exerciseIndex) => {
        const exerciseId =
          selectedWorkout.id * 1000 +
          exerciseIndex + 1;

        const sets: WorkoutSet[] = Array.from(
          { length: exercise.sets },
          (_, setIndex) => {
            const setId =
              exerciseId * 100 +
              setIndex + 1;

            return {
              id: setId,
              label: `SET ${setIndex + 1}`,
              target: exercise.reps,
              completed:
                completedSets[String(setId)] ?? false,
            };
          }
        );

        return {
          id: exerciseId,
          exerciseNumber: exerciseIndex + 1,
          name: exercise.name,
          sets,
          videoUrl: buildYouTubeSearchUrl(
            exercise.yt
          ),
        };
      }
    );
  }, [
    selectedWorkout,
    completedSetsByDay,
  ]);

  /*
   * Total sets for the currently selected day.
   */
  const totalSets = useMemo(() => {
    return exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.length,
      0
    );
  }, [exercises]);

  /*
   * Completed sets for the currently selected day.
   */
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

  /*
   * Keep the dashboard header statistics synchronized
   * with the backend-driven workout state.
   */
  useEffect(() => {
    if (!dashboard) {
      return;
    }

    const totalProgramSets =
      dashboard.days.reduce(
        (total, day) =>
          total +
          day.exercises.reduce(
            (dayTotal, exercise) =>
              dayTotal + exercise.sets,
            0
          ),
        0
      );

    const completedProgramSets =
      dashboard.days.reduce(
        (total, day) => {
          const dayCompletedSets =
            completedSetsByDay[day.id] ?? {};

          return (
            total +
            Object.values(dayCompletedSets).filter(
              Boolean
            ).length
          );
        },
        0
      );

    const completedDays =
      dashboard.days.filter((day) => {
        const totalDaySets =
          day.exercises.reduce(
            (total, exercise) =>
              total + exercise.sets,
            0
          );

        const completedDaySets =
          Object.values(
            completedSetsByDay[day.id] ?? {}
          ).filter(Boolean).length;

        return (
          totalDaySets > 0 &&
          completedDaySets === totalDaySets
        );
      }).length;

    setStats({
      completedSets: completedProgramSets,
      totalSets: totalProgramSets,
      completedDays,
      totalDays: dashboard.days.length,
      calories: selectedWorkout?.calMin ?? 0,
    });
  }, [
    dashboard,
    completedSetsByDay,
    selectedWorkout,
    setStats,
  ]);

  /*
   * Open the first exercise whenever the selected day changes.
   */
  useEffect(() => {
    if (exercises.length > 0) {
      setOpenExerciseId(exercises[0].id);
    } else {
      setOpenExerciseId(null);
    }
  }, [selectedDay, exercises.length]);

  const handleResetDay = () => {
    if (selectedWorkout === undefined) {
      return;
    }

    setCompletedSetsByDay(
      (current) => {
        const updated = {
          ...current,
        };

        delete updated[selectedWorkout.id];

        return updated;
      }
    );

    setOpenExerciseId(
      exercises[0]?.id ?? null
    );
  };

  const handleWarmUpToggle = (
    exerciseId: number
  ) => {
    setWarmUpExercises(
      (current) =>
        current.map(
          (exercise) =>
            exercise.id === exerciseId
              ? {
                  ...exercise,
                  completed:
                    !exercise.completed,
                }
              : exercise
        )
    );
  };

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

  const handleSetToggle = (
    exerciseId: number,
    setId: number
  ) => {
    if (selectedWorkout === undefined) {
      return;
    }

    setCompletedSetsByDay(
      (current) => {
        const currentDayState =
          current[selectedWorkout.id] ?? {};

        return {
          ...current,
          [selectedWorkout.id]: {
            ...currentDayState,
            [String(setId)]:
              !currentDayState[String(setId)],
          },
        };
      }
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

  /*
   * Dashboard data has not arrived yet.
   * Keep the page structure intact while showing no workout data.
   */
  if (!dashboard || selectedDay === null) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 194px)",
          backgroundColor: "#f5f2ed",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 194px)",
        backgroundColor: "#f5f2ed",
      }}
    >
      <DayNavigation
        days={dashboard.days.map(
          (day) => ({
            id: day.id,
            dayNumber: day.id,
            label: day.label,
          })
        )}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />

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
          flexDirection: "column",
          gap: {
            xs: 2,
            sm: 2.5,
          },
        }}
      >
        <LoggingNotice
          month={1}
          week={1}
        />

        <WorkoutSummaryCard
          dayNumber={selectedWorkout?.id ?? selectedDay}
          title={
            selectedWorkout?.label ??
            "Workout"
          }
          exerciseCount={exercises.length}
          totalSets={totalSets}
          completedSets={completedSets}
          onReset={handleResetDay}
        />

        <CalorieCard
          minimumCalories={
            selectedWorkout?.calMin ?? 0
          }
          maximumCalories={
            selectedWorkout?.calMax ?? 0
          }
          earnedCalories={0}
        />

        <SessionProgress
          completed={completedSets}
          total={totalSets}
        />

        <WarmUpSection
          exercises={warmUpExercises}
          onToggle={handleWarmUpToggle}
          onWatch={(exercise) =>
            handleWatch(
              exercise.videoUrl
            )
          }
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {exercises.map(
            (exercise) => (
              <ExerciseAccordion
                key={exercise.id}
                exercise={exercise}
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
                onWatch={(exercise) =>
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

/*
 * Backend gives us a YouTube search query in `yt`,
 * not a direct video URL.
 */
const buildYouTubeSearchUrl = (
  query: string
) => {
  if (!query) {
    return undefined;
  }

  return `https://www.youtube.com/results?search_query=${query}`;
};

export default Workout;