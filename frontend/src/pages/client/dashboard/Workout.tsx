import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
} from "@mui/material";

import {
  useOutletContext,
} from "react-router-dom";

import DayNavigation from "../../../components/workout/DayNavigation";
import WorkoutCompletionCard from "../../../components/workout/WorkoutCompletionCard";
import LoggingNotice from "../../../components/workout/LoggingNotice";
import WorkoutSummaryCard from "../../../components/workout/WorkoutSummaryCard";
import SessionProgress from "../../../components/workout/SessionProgress";
import WarmUpSection from "../../../components/workout/WarmupSection";
import ExerciseAccordion, {
  type WorkoutExercise,
} from "../../../components/workout/ExerciseAccordion";
import WorkoutCompletionDialog from "../../../components/workout/WorkoutCompletionDialog";

import type { WorkoutSet } from "../../../components/workout/SetTracker";

import { WARM_UP_EXERCISES } from "../../../constants/warmup";

import { useDashboard } from "../../../context/DashboardContext";

import {
  logWorkout,
} from "../../../api/workoutApi";

const Workout = () => {
  const {
    dashboard,
    setStats,
  } = useDashboard();

  const [
    selectedDay,
    setSelectedDay,
  ] = useState<number | null>(
    null
  );

  const [
    warmUpExercises,
    setWarmUpExercises,
  ] = useState(
    WARM_UP_EXERCISES
  );

  const [
    completedSetsByDay,
    setCompletedSetsByDay,
  ] = useState<
    Record<
      string,
      Record<string, boolean>
    >
  >({});

  const [
    openExerciseId,
    setOpenExerciseId,
  ] = useState<number | null>(
    null
  );

  /**
   * =========================================================
   * WORKOUT COMPLETION DIALOG STATE
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
  ] = useState<string | null>(
    null
  );

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
   * Completion is scoped to:
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
   * EXERCISES
   * =========================================================
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
            const exerciseId =
              selectedWorkout.id *
                1000 +
              exerciseIndex +
              1;

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
                  const setId =
                    exerciseId *
                      100 +
                    setIndex +
                    1;

                  return {
                    id: setId,

                    label: `SET ${
                      setIndex + 1
                    }`,

                    target:
                      exercise.reps,

                    completed:
                      completedSetState[
                        String(
                          setId
                        )
                      ] ??
                      false,
                  };
                }
              );

            return {
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
    completedSets ===
      totalSets;

  /**
   * =========================================================
   * EARNED CALORIES
   * =========================================================
   *
   * Existing calculation preserved.
   */

  const earnedCalories =
    useMemo(() => {
      if (
        !selectedWorkout ||
        totalSets === 0
      ) {
        return 0;
      }

      const completionRatio =
        completedSets /
        totalSets;

      return Math.round(
        selectedWorkout.calMax *
          completionRatio
      );
    }, [
      selectedWorkout,
      completedSets,
      totalSets,
    ]);

  /**
   * =========================================================
   * DASHBOARD STATS
   * =========================================================
   */

  useEffect(() => {
    if (!dashboard) {
      return;
    }

    const totalProgramSets =
      dashboard.days.reduce(
        (
          total,
          day
        ) =>
          total +
          day.exercises.reduce(
            (
              dayTotal,
              exercise
            ) =>
              dayTotal +
              exercise.sets,
            0
          ),
        0
      );

    const completedProgramSets =
      dashboard.days.reduce(
        (
          total,
          day
        ) => {
          const workoutStateKey =
            getWorkoutStateKey(
              month,
              week,
              day.id
            );

          const dayCompletedSets =
            completedSetsByDay[
              workoutStateKey
            ] ?? {};

          return (
            total +
            Object.values(
              dayCompletedSets
            ).filter(
              Boolean
            ).length
          );
        },
        0
      );

    const completedDays =
      dashboard.days.filter(
        (day) => {
          const totalDaySets =
            day.exercises.reduce(
              (
                total,
                exercise
              ) =>
                total +
                exercise.sets,
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
              completedSetsByDay[
                workoutStateKey
              ] ?? {}
            ).filter(
              Boolean
            ).length;

          return (
            totalDaySets > 0 &&
            completedDaySets ===
              totalDaySets
          );
        }
      ).length;

    setStats({
      completedSets:
        completedProgramSets,

      totalSets:
        totalProgramSets,

      completedDays,

      totalDays:
        dashboard.days.length,

      calories:
        earnedCalories,
    });
  }, [
    dashboard,
    completedSetsByDay,
    earnedCalories,
    setStats,
    month,
    week,
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
   */

  const handleResetDay = () => {
    if (
      !selectedWorkout
    ) {
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
      exercises[0]?.id ??
        null
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
        currentId ===
        exerciseId
          ? null
          : exerciseId
    );
  };

  /**
   * =========================================================
   * SET TOGGLE
   * =========================================================
   *
   * Still UI/local state only.
   *
   * No API request is made here.
   */

  const handleSetToggle = (
    exerciseId: number,
    setId: number
  ) => {
    if (
      !selectedWorkout
    ) {
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

        return {
          ...current,

          [workoutStateKey]: {
            ...currentDayState,

            [String(setId)]:
              !currentDayState[
                String(setId)
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

  const handleOpenCompletion = () => {
    if (
      !selectedWorkout ||
      completedSets === 0
    ) {
      return;
    }

    setErrorMessage(null);

    setCompletionSuccess(
      false
    );

    setCompletionDialogOpen(
      true
    );
  };

  /**
   * =========================================================
   * CLOSE COMPLETION DIALOG
   * =========================================================
   */

  const handleCloseCompletion = () => {
    if (isSubmitting) {
      return;
    }

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
   * CONFIRM WORKOUT COMPLETION
   * =========================================================
   *
   * THIS IS WHERE THE BACKEND IS NOW CALLED.
   *
   * One click
   *      ↓
   * One POST request
   *      ↓
   * One workout_logs row
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

      /**
       * Safety check.
       */
      if (completedSets <= 0) {
        setErrorMessage(
          "Please complete at least one set before logging the workout."
        );

        return;
      }

      /**
       * Safety check.
       */
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
         * Client ID comes directly from
         * the dashboard response.
         */
        const clientId =
          dashboard.client.id;

        /**
         * Send ONLY the raw values.
         *
         * completion_percent is intentionally
         * not sent because the backend calculates it.
         */
        const response =
          await logWorkout({
            client_id:
              clientId,

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
          });

        /**
         * Backend confirmed successful save.
         */
        if (
          response.success
        ) {
          setCompletionSuccess(
            true
          );

          return;
        }

        /**
         * Unexpected unsuccessful response.
         */
        setErrorMessage(
          response.message ||
            "Unable to save workout."
        );
      } catch (error) {
        console.error(
          "Failed to log workout:",
          error
        );

        /**
         * Convert API/network error
         * into something the dialog can show.
         */
        if (
          axiosErrorMessage(
            error
          )
        ) {
          setErrorMessage(
            axiosErrorMessage(
              error
            )
          );
        } else {
          setErrorMessage(
            "Unable to save workout. Please try again."
          );
        }
      } finally {
        setIsSubmitting(
          false
        );
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

            dayNumber: day.id,

            label: day.label,
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
              completedSets === 0 ||
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

              color: "#ffffff",

              fontSize: {
                xs: 11,
                sm: 12,
              },

              fontWeight: 800,

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

          month={
            month
          }

          week={
            week
          }

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

  if (
    "response" in error
  ) {
    const response = (
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

  if (
    "message" in error
  ) {
    const message = (
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