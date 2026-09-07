import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
} from "@mui/material";

import { useOutletContext } from "react-router-dom";

import DayNavigation from "../../../components/workout/DayNavigation";
import WorkoutCompletionCard from "../../../components/workout/WorkoutCompletionCard";
import WorkoutCompletionDialog from "../../../components/workout/WorkoutCompletionDialog";
import LoggingNotice from "../../../components/workout/LoggingNotice";
import WorkoutSummaryCard from "../../../components/workout/WorkoutSummaryCard";
import SessionProgress from "../../../components/workout/SessionProgress";
import WarmUpSection from "../../../components/workout/WarmupSection";
import ExerciseAccordion, {
  type WorkoutExercise,
} from "../../../components/workout/ExerciseAccordion";

import type { WorkoutSet } from "../../../components/workout/SetTracker";

import { WARM_UP_EXERCISES } from "../../../constants/warmup";

import { useDashboard } from "../../../context/DashboardContext";

import {
  getWorkoutSets,
  logWorkout,
} from "../../../api/workoutApi";

const Workout = () => {
  const {
    dashboard,
  } = useDashboard();

  /**
   * =========================================================
   * SELECTED DAY
   * =========================================================
   *
   * dashboard.days[].id is the workout DAY NUMBER.
   *
   * M1/W1/Day 1 -> 1
   * M1/W1/Day 2 -> 2
   * etc.
   *
   * The backend expects this value as day_id.
   */

  const [
    selectedDay,
    setSelectedDay,
  ] = useState<number | null>(null);

  /**
   * =========================================================
   * WARM-UP STATE
   * =========================================================
   */

  const [
    warmUpExercises,
    setWarmUpExercises,
  ] = useState(WARM_UP_EXERCISES);

  /**
   * =========================================================
   * WORKOUT SET STATE
   * =========================================================
   *
   * UI state while the user is working out.
   *
   * No API request happens when a set is checked/unchecked.
   *
   * The complete state is sent when the user clicks:
   *
   * "Mark Workout Complete"
   */

  const [
    completedSetsByDay,
    setCompletedSetsByDay,
  ] = useState<
    Record<
      string,
      Record<string, boolean>
    >
  >({});

  /**
   * =========================================================
   * ACCORDION STATE
   * =========================================================
   */

  const [
    openExerciseId,
    setOpenExerciseId,
  ] = useState<number | null>(null);

  /**
   * =========================================================
   * COMPLETION DIALOG STATE
   * =========================================================
   */

  const [
    completionDialogOpen,
    setCompletionDialogOpen,
  ] = useState(false);

  const [
    completionSuccess,
    setCompletionSuccess,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string | null>(null);

  /**
   * =========================================================
   * MONTH / WEEK
   * =========================================================
   */

  const {
    month,
    week,
  } = useOutletContext<{
    month: number;
    week: number;
    periodResetKey?: number;
  }>();

  /**
   * =========================================================
   * WORKOUT STATE KEY
   * =========================================================
   *
   * Unique UI state per:
   *
   * month + week + day
   */

  const getWorkoutStateKey = (
    currentMonth: number,
    currentWeek: number,
    dayId: number
  ) =>
    `${currentMonth}-${currentWeek}-${dayId}`;

  /**
   * =========================================================
   * INITIAL DAY
   * =========================================================
   */

  useEffect(() => {
    if (
      dashboard?.days?.length &&
      selectedDay === null
    ) {
      setSelectedDay(
        dashboard.days[0].id
      );
    }
  }, [
    dashboard,
    selectedDay,
  ]);

  /**
   * =========================================================
   * SELECTED WORKOUT
   * =========================================================
   */

  const selectedWorkout =
    useMemo(() => {
      if (
        !dashboard ||
        selectedDay === null
      ) {
        return undefined;
      }

      return dashboard.days.find(
        (day) =>
          day.id === selectedDay
      );
    }, [
      dashboard,
      selectedDay,
    ]);

  /**
   * =========================================================
   * LOAD SAVED SETS
   * =========================================================
   *
   * Loads raw set states from workout_set_logs.
   *
   * Backend response:
   *
   * {
   *   success: true,
   *   data: [...]
   * }
   *
   * State is keyed by:
   *
   * exerciseId + setNo
   */

  useEffect(() => {
    if (!selectedWorkout) {
      return;
    }

    let cancelled = false;

    const loadSavedWorkoutSets =
      async () => {
        try {
          const response =
            await getWorkoutSets(
              month,
              week,
              selectedWorkout.id
            );

          if (cancelled) {
            return;
          }

          const savedSets: Record<
            string,
            boolean
          > = {};

          /**
           * IMPORTANT:
           *
           * The API response is:
           *
           * {
           *   success: true,
           *   data: [...]
           * }
           *
           * Therefore we iterate over:
           *
           * response.data
           */

          response.data.forEach(
            (set) => {
              /**
               * Use the REAL backend exercise ID.
               *
               * Example:
               *
               * exercise 705 + set 2
               *
               * becomes:
               *
               * "705-2"
               */

              const setKey =
                `${set.exercise_id}-${set.set_no}`;

              savedSets[setKey] =
                Boolean(
                  set.completed
                );
            }
          );

          const workoutStateKey =
            getWorkoutStateKey(
              month,
              week,
              selectedWorkout.id
            );

          setCompletedSetsByDay(
            (previous) => ({
              ...previous,

              [workoutStateKey]:
                savedSets,
            })
          );
        } catch (error) {
          if (!cancelled) {
            console.error(
              "Failed to load saved workout sets:",
              error
            );
          }
        }
      };

    void loadSavedWorkoutSets();

    return () => {
      cancelled = true;
    };
  }, [
    month,
    week,
    selectedWorkout?.id,
  ]);

  /**
   * =========================================================
   * EXERCISES
   * =========================================================
   *
   * Converts backend exercise data into the existing
   * ExerciseAccordion structure.
   *
   * IMPORTANT:
   *
   * We use exercise.id directly.
   *
   * NO synthetic database IDs.
   */

  const exercises =
    useMemo<WorkoutExercise[]>(
      () => {
        if (!selectedWorkout) {
          return [];
        }

        const workoutStateKey =
          getWorkoutStateKey(
            month,
            week,
            selectedWorkout.id
          );

        const completedSetState =
          completedSetsByDay[
          workoutStateKey
          ] ?? {};

        return selectedWorkout.exercises.map(
          (
            exercise,
            exerciseIndex
          ) => {
            /**
             * REAL DATABASE EXERCISE ID
             */

            const exerciseId =
              Number(exercise.id);

            const sets: WorkoutSet[] =
              Array.from(
                {
                  length:
                    exercise.sets,
                },
                (
                  _,
                  setIndex
                ) => {
                  const setNo =
                    setIndex + 1;

                  const setKey =
                    `${exerciseId}-${setNo}`;

                  return {
                    /**
                     * UI set ID.
                     *
                     * Unique within this workout.
                     */

                    id:
                      exerciseId *
                      100 +
                      setNo,

                    label:
                      `SET ${setNo}`,

                    target:
                      exercise.reps,

                    completed:
                      completedSetState[
                      setKey
                      ] ?? false,
                  };
                }
              );

            return {
              /**
               * REAL exercise ID.
               */

              id: exerciseId,

              exerciseNumber:
                exerciseIndex + 1,

              name: exercise.name,

              sets,

              videoUrl:
                buildYouTubeSearchUrl(
                  exercise.yt
                ),
            };
          }
        );
      },
      [
        selectedWorkout,
        completedSetsByDay,
        month,
        week,
      ]
    );

  /**
   * =========================================================
   * TOTAL SETS
   * =========================================================
   */

  const totalSets =
    useMemo(() => {
      return exercises.reduce(
        (
          total,
          exercise
        ) =>
          total +
          exercise.sets.length,
        0
      );
    }, [exercises]);

  /**
   * =========================================================
   * COMPLETED SETS
   * =========================================================
   */

  const completedSets =
    useMemo(() => {
      return exercises.reduce(
        (
          total,
          exercise
        ) =>
          total +
          exercise.sets.filter(
            (set) =>
              set.completed
          ).length,
        0
      );
    }, [exercises]);

  /**
   * =========================================================
   * DAY COMPLETION
   * =========================================================
   */

  const isDayCompleted =
    totalSets > 0 &&
    completedSets === totalSets;

  /**
   * =========================================================
   * EARNED CALORIES
   * =========================================================
   *
   * UI preview only.
   *
   * Backend calculates and stores the authoritative
   * calorie value when the workout is submitted.
   */

  const earnedCalories =
    useMemo(() => {
      if (
        !selectedWorkout ||
        totalSets === 0 ||
        completedSets === 0
      ) {
        return 0;
      }

      const ratio =
        completedSets /
        totalSets;

      const calories =
        (
          selectedWorkout.calMin +
          (
            selectedWorkout.calMax -
            selectedWorkout.calMin
          ) *
          ratio
        ) *
        ratio;

      return Math.round(
        calories
      );
    }, [
      selectedWorkout,
      completedSets,
      totalSets,
    ]);

  /**
   * =========================================================
   * OPEN FIRST EXERCISE
   * =========================================================
   */

  useEffect(() => {
    if (exercises.length > 0) {
      setOpenExerciseId(
        exercises[0].id
      );
    } else {
      setOpenExerciseId(null);
    }
  }, [
    selectedDay,
    exercises.length,
  ]);

  /**
   * =========================================================
   * RESET DAY
   * =========================================================
   *
   * UI reset only.
   *
   * No database DELETE endpoint exists yet.
   */

  const handleResetDay = () => {
    if (!selectedWorkout) {
      return;
    }

    const workoutStateKey =
      getWorkoutStateKey(
        month,
        week,
        selectedWorkout.id
      );

    setCompletedSetsByDay(
      (current) => {
        const updated = {
          ...current,
        };

        delete updated[
          workoutStateKey
        ];

        return updated;
      }
    );

    setOpenExerciseId(
      exercises[0]?.id ?? null
    );

    setCompletionDialogOpen(
      false
    );

    setCompletionSuccess(
      false
    );

    setErrorMessage(null);
  };

  /**
   * =========================================================
   * WARM-UP TOGGLE
   * =========================================================
   */

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

  /**
   * =========================================================
   * EXERCISE ACCORDION
   * =========================================================
   */

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

  /**
   * =========================================================
   * SET TOGGLE
   * =========================================================
   *
   * NO API REQUEST.
   *
   * Local state only.
   */

  const handleSetToggle = (
    exerciseId: number,
    setId: number
  ) => {
    if (!selectedWorkout) {
      return;
    }

    const workoutStateKey =
      getWorkoutStateKey(
        month,
        week,
        selectedWorkout.id
      );

    setCompletedSetsByDay(
      (current) => {
        const currentDayState =
          current[
          workoutStateKey
          ] ?? {};

        /**
         * Rendered UI set ID:
         *
         * exerciseId * 100 + setNo
         */

        const setNo =
          setId % 100;

        const setKey =
          `${exerciseId}-${setNo}`;

        return {
          ...current,

          [workoutStateKey]: {
            ...currentDayState,

            [setKey]:
              !currentDayState[
              setKey
              ],
          },
        };
      }
    );
  };

  /**
   * =========================================================
   * WATCH VIDEO
   * =========================================================
   */

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

  /**
   * =========================================================
   * OPEN COMPLETION DIALOG
   * =========================================================
   */

  const handleOpenCompletion =
    () => {
      if (
        !selectedWorkout ||
        completedSets === 0
      ) {
        return;
      }

      setErrorMessage(null);

      setCompletionSuccess(false);

      setCompletionDialogOpen(
        true
      );
    };

  /**
   * =========================================================
   * CLOSE COMPLETION DIALOG
   * =========================================================
   */

  const handleCloseCompletion =
    () => {
      if (isSubmitting) {
        return;
      }

      setCompletionDialogOpen(
        false
      );

      setCompletionSuccess(false);

      setErrorMessage(null);
    };

  /**
   * =========================================================
   * BUILD WORKOUT SET PAYLOAD
   * =========================================================
   *
   * The backend requires the actual database exercise ID.
   *
   * Every planned set is submitted.
   */

  const buildWorkoutSetPayload =
    () => {
      if (!selectedWorkout) {
        return [];
      }

      const workoutStateKey =
        getWorkoutStateKey(
          month,
          week,
          selectedWorkout.id
        );

      const completedSetState =
        completedSetsByDay[
        workoutStateKey
        ] ?? {};

      return selectedWorkout.exercises.flatMap(
        (exercise) => {
          /**
           * REAL DATABASE ID
           */

          const exerciseId =
            Number(exercise.id);

          return Array.from(
            {
              length:
                exercise.sets,
            },
            (
              _,
              setIndex
            ) => {
              const setNo =
                setIndex + 1;

              const setKey =
                `${exerciseId}-${setNo}`;

              return {
                exercise_id:
                  exerciseId,

                set_no:
                  setNo,

                completed:
                  completedSetState[
                  setKey
                  ] ?? false,
              };
            }
          );
        }
      );
    };

  /**
   * =========================================================
   * CONFIRM WORKOUT COMPLETION
   * =========================================================
   *
   * POST /api/v1/workout/log
   */

  const handleConfirmCompletion =
    async () => {
      if (
        !dashboard ||
        !selectedWorkout ||
        isSubmitting
      ) {
        return;
      }

      if (completedSets <= 0) {
        setErrorMessage(
          "Please complete at least one set before logging the workout."
        );

        return;
      }

      if (
        completedSets >
        totalSets
      ) {
        setErrorMessage(
          "Completed sets cannot exceed total sets."
        );

        return;
      }

      setIsSubmitting(true);

      setErrorMessage(null);

      try {
        /**
         * Build complete raw set state.
         */

        const sets =
          buildWorkoutSetPayload();

        /**
         * Submit to backend.
         *
         * client_id is NOT sent.
         *
         * Backend gets client identity from
         * CurrentClient / access token.
         */

        const response =
          await logWorkout({
            month_no:
              month,

            week_no:
              week,

            day_id:
              selectedWorkout.id,

            total_sets:
              totalSets,

            completed_sets:
              completedSets,

            calories_burned:
              earnedCalories,

            sets,
          });

        /**
         * Backend confirmed success.
         */

        if (response.success) {
          /**
           * Synchronize local set state with
           * what was submitted.
           */

          const submittedState: Record<
            string,
            boolean
          > = {};

          sets.forEach(
            (set) => {
              submittedState[
                `${set.exercise_id}-${set.set_no}`
              ] =
                set.completed;
            }
          );

          const workoutStateKey =
            getWorkoutStateKey(
              month,
              week,
              selectedWorkout.id
            );

          setCompletedSetsByDay(
            (previous) => ({
              ...previous,

              [workoutStateKey]:
                submittedState,
            })
          );

          setCompletionSuccess(
            true
          );

          return;
        }

        setErrorMessage(
          response.message ||
          "Unable to save workout."
        );
      } catch (error) {
        console.error(
          "Failed to log workout:",
          error
        );

        setErrorMessage(
          axiosErrorMessage(
            error
          ) ??
          "Unable to save workout. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (
    !dashboard ||
    selectedDay === null
  ) {
    return (
      <Box
        sx={{
          minHeight:
            "calc(100vh - 194px)",

          backgroundColor:
            "#f5f2ed",
        }}
      />
    );
  }

  /**
   * =========================================================
   * SELECTED WORKOUT SAFETY CHECK
   * =========================================================
   */

  if (!selectedWorkout) {
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

          px: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor:
              "#ffffff",

            border:
              "1px solid #ddd9d4",

            borderRadius: 3,

            p: 3,

            textAlign:
              "center",
          }}
        >
          Workout day not found.
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight:
          "calc(100vh - 194px)",

        backgroundColor:
          "#f5f2ed",
      }}
    >
      {/* ===================================================
          DAY NAVIGATION
          =================================================== */}

      <DayNavigation
        days={dashboard.days.map(
          (day) => ({
            id: day.id,

            dayNumber:
              day.id,

            label:
              day.label,
          })
        )}

        selectedDay={
          selectedDay
        }

        onDayChange={
          setSelectedDay
        }
      />

      <Box
        sx={{
          width: "100%",

          mx: "auto",

          px: {
            xs: 1.5,
            sm: 2.5,
            md: 3,
          },

          py: {
            xs: 1.5,
            sm: 2.5,
            md: 3,
          },

          display: "flex",

          flexDirection:
            "column",

          gap: {
            xs: 1.5,
            sm: 2,
          },
        }}
      >
        {/* =================================================
            COMPLETION CARD
            ================================================= */}

        {isDayCompleted && (
          <WorkoutCompletionCard
            dayNumber={
              selectedWorkout.id
            }

            month={month}

            week={week}

            earnedCalories={
              earnedCalories
            }
          />
        )}

        {/* =================================================
            LOGGING NOTICE
            ================================================= */}

        <LoggingNotice
          month={month}
          week={week}
        />

        {/* =================================================
            WORKOUT SUMMARY
            ================================================= */}

        <WorkoutSummaryCard
          dayNumber={
            selectedWorkout.id
          }

          title={
            selectedWorkout.label
          }

          exerciseCount={
            exercises.length
          }

          totalSets={
            totalSets
          }

          completedSets={
            completedSets
          }

          minimumCalories={
            selectedWorkout.calMin
          }

          maximumCalories={
            selectedWorkout.calMax
          }

          earnedCalories={
            earnedCalories
          }

          onReset={
            handleResetDay
          }
        />

        {/* =================================================
            SESSION PROGRESS
            ================================================= */}

        <SessionProgress
          completed={
            completedSets
          }

          total={
            totalSets
          }
        />

        {/* =================================================
            WARM-UP
            ================================================= */}

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

        {/* =================================================
            EXERCISES
            ================================================= */}

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
                key={
                  exercise.id
                }

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

        {/* =================================================
            MARK WORKOUT COMPLETE
            ================================================= */}

        <Box
          sx={{
            pt: {
              xs: 0.5,
              sm: 1,
            },
          }}
        >
          <Button
            onClick={
              handleOpenCompletion
            }

            disabled={
              completedSets ===
              0 ||
              isSubmitting
            }

            fullWidth

            variant="contained"

            sx={{
              minHeight: {
                xs: 44,
                sm: 46,
              },

              borderRadius:
                "10px",

              backgroundColor:
                "#ff5b38",

              color:
                "#ffffff",

              fontSize: {
                xs: 11,
                sm: 12,
              },

              fontWeight:
                800,

              textTransform:
                "none",

              boxShadow:
                "none",

              "&:hover": {
                backgroundColor:
                  "#ed4e30",

                boxShadow:
                  "none",
              },

              "&.Mui-disabled": {
                backgroundColor:
                  "#ddd8d2",

                color:
                  "#ffffff",
              },
            }}
          >
            ✓ Mark Workout Complete
          </Button>
        </Box>

        {/* =================================================
            WORKOUT COMPLETION DIALOG
            ================================================= */}

        <WorkoutCompletionDialog
          open={
            completionDialogOpen
          }

          month={month}

          week={week}

          dayNumber={
            selectedWorkout.id
          }

          exerciseCount={
            exercises.length
          }

          totalSets={
            totalSets
          }

          completedSets={
            completedSets
          }

          earnedCalories={
            earnedCalories
          }

          isSubmitting={
            isSubmitting
          }

          isSuccess={
            completionSuccess
          }

          errorMessage={
            errorMessage
          }

          onClose={
            handleCloseCompletion
          }

          onConfirm={
            handleConfirmCompletion
          }
        />
      </Box>
    </Box>
  );
};

/**
 * ===========================================================
 * API ERROR MESSAGE
 * ===========================================================
 */

const axiosErrorMessage = (
  error: unknown
): string | null => {
  if (
    !error ||
    typeof error !== "object"
  ) {
    return null;
  }

  if ("response" in error) {
    const response =
      (
        error as {
          response?: {
            data?: {
              detail?: string;
              message?: string;
            };
          };
        }
      ).response;

    return (
      response?.data?.detail ??
      response?.data?.message ??
      null
    );
  }

  if ("message" in error) {
    const message =
      (
        error as {
          message?: unknown;
        }
      ).message;

    if (
      typeof message ===
      "string"
    ) {
      return message;
    }
  }

  return null;
};

/**
 * ===========================================================
 * YOUTUBE SEARCH URL
 * ===========================================================
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