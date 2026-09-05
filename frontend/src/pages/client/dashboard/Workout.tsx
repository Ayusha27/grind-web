import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";

import DayNavigation from "../../../components/workout/DayNavigation";
import WorkoutCompletionCard from "../../../components/workout/WorkoutCompletionCard";
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
  useState<Record<string, Record<string, boolean>>>({});

  const [openExerciseId, setOpenExerciseId] =
    useState<number | null>(null);

  const { month, week } = useOutletContext<{
  month: number;
  week: number;
  periodResetKey: number;
}>(); 

const getWorkoutStateKey = (
  month: number,
  week: number,
  dayId: number
) => `${month}-${week}-${dayId}`;

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

const workoutStateKey = getWorkoutStateKey(
  month,
  week,
  selectedWorkout.id
);

const completedSetState =
  completedSetsByDay[workoutStateKey] ?? {};

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
                completedSetState[String(setId)] ?? false,
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
    month,
    week,
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

 const isDayCompleted =
  totalSets > 0 &&
  completedSets === totalSets; 


const earnedCalories = useMemo(() => {
  if (!selectedWorkout || totalSets === 0) {
    return 0;
  }

  const completionRatio =
    completedSets / totalSets;

  return Math.round(
    selectedWorkout.calMax * completionRatio
  );
}, [
  selectedWorkout,
  completedSets,
  totalSets,
]);

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
        const workoutStateKey = getWorkoutStateKey(
            month,
            week,
            day.id
            );

            const dayCompletedSets =
            completedSetsByDay[workoutStateKey] ?? {};
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

    const workoutStateKey =
      getWorkoutStateKey(
        month,
        week,
        day.id
      );

    const completedDaySets =
      Object.values(
        completedSetsByDay[workoutStateKey] ?? {}
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
      calories: earnedCalories,
    });
 }, [
    dashboard,
    completedSetsByDay,
    selectedWorkout,
    earnedCalories,
    setStats,
    month,
    week,
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

  const workoutStateKey = getWorkoutStateKey(
    month,
    week,
    selectedWorkout.id
  );

  setCompletedSetsByDay((current) => {
    const updated = {
      ...current,
    };

    delete updated[workoutStateKey];

    return updated;
  });

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

  const workoutStateKey = getWorkoutStateKey(
    month,
    week,
    selectedWorkout.id
  );

  setCompletedSetsByDay((current) => {
    const currentDayState =
      current[workoutStateKey] ?? {};

    return {
      ...current,
      [workoutStateKey]: {
        ...currentDayState,
        [String(setId)]:
          !currentDayState[String(setId)],
      },
    };
  });
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
        {isDayCompleted && selectedWorkout && (
        <WorkoutCompletionCard
            dayNumber={selectedWorkout.id}
            month={month}
            week={week}
            earnedCalories={earnedCalories}
        />
        )}

        <LoggingNotice
        month={month}
        week={week}
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
          earnedCalories={earnedCalories}
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