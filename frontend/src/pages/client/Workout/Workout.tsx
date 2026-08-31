import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import WorkoutHeader from "../../../components/workout/WorkoutHeader";
import WarmupSection from "../../../components/workout/WarmupSection";
import ExerciseCard from "../../../components/workout/ExerciseCard";
import CalorieBanner from "../../../components/workout/CalorieBanner";
import SessionProgress from "../../../components/workout/SessionProgress";

import { workoutDays } from "./workoutMockData";

// @ts-expect-error CSS imports are handled by the bundler.
import "./Workout.css";

const Workout = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [month, setMonth] = useState("Month 1");
  const [week, setWeek] = useState("Week 3");

  const [completedSets, setCompletedSets] = useState<
    Record<string, boolean[]>
  >({});

  const [completedWarmups, setCompletedWarmups] = useState<
    Record<string, boolean>
  >({});

  const [expandedExercise, setExpandedExercise] =
    useState<number | null>(0);

  const currentDay = workoutDays[selectedDay];

  const totalSets = useMemo(
    () =>
      currentDay.exercises.reduce(
        (total, exercise) => total + exercise.sets,
        0
      ),
    [currentDay]
  );

  const completedSetCount = useMemo(
    () =>
      Object.entries(completedSets).reduce(
        (total, [key, sets]) => {
          if (!key.startsWith(`${selectedDay}-`)) {
            return total;
          }

          return total + sets.filter(Boolean).length;
        },
        0
      ),
    [completedSets, selectedDay]
  );

  const progressPercentage =
    totalSets === 0
      ? 0
      : Math.round(
          (completedSetCount / totalSets) * 100
        );

  const earnedCalories = useMemo(() => {
    if (totalSets === 0) return 0;

    const ratio = completedSetCount / totalSets;

    return Math.round(
      (currentDay.calMin +
        (currentDay.calMax - currentDay.calMin) * ratio) *
        ratio
    );
  }, [
    completedSetCount,
    totalSets,
    currentDay,
  ]);

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

  const toggleWarmup = (name: string) => {
    setCompletedWarmups((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const resetDay = () => {
    setCompletedSets((previous) => {
      const updated = { ...previous };

      currentDay.exercises.forEach(
        (_, index) => {
          delete updated[
            `${selectedDay}-${index}`
          ];
        }
      );

      return updated;
    });

    setCompletedWarmups({});
  };

  const changeDay = (index: number) => {
    setSelectedDay(index);
    setExpandedExercise(0);
  };

  return (
    <Box className="workout-page">
      {/* =====================================================
          LOGGING CONTEXT
      ===================================================== */}

      <Container
        maxWidth={false}
        className="workout-container"
      >
        <Box className="logging-context">
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
            }}
            spacing={0.8}
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
      </Container>

      {/* =====================================================
          MONTH / WEEK / DAY NAVIGATION
      ===================================================== */}

      <Box className="workout-navigation">
        <Container
          maxWidth={false}
          className="workout-nav-container"
        >
          <Box className="selector-row">
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
              }}
              spacing={1}
            >
              <Typography className="selector-label">
                Logging to
              </Typography>

              <Select
                value={month}
                onChange={(event) =>
                  setMonth(event.target.value)
                }
                size="small"
                IconComponent={
                  KeyboardArrowDownIcon
                }
                className="dark-select"
              >
                <MenuItem value="Month 1">
                  Month 1
                </MenuItem>

                <MenuItem value="Month 2">
                  Month 2
                </MenuItem>

                <MenuItem value="Month 3">
                  Month 3
                </MenuItem>
              </Select>

              <Select
                value={week}
                onChange={(event) =>
                  setWeek(event.target.value)
                }
                size="small"
                IconComponent={
                  KeyboardArrowDownIcon
                }
                className="dark-select"
              >
                <MenuItem value="Week 1">
                  Week 1
                </MenuItem>

                <MenuItem value="Week 2">
                  Week 2
                </MenuItem>

                <MenuItem value="Week 3">
                  Week 3
                </MenuItem>

                <MenuItem value="Week 4">
                  Week 4
                </MenuItem>
              </Select>
            </Stack>

            <Typography className="auto-sync-text">
              • Auto-syncing to Progress
            </Typography>
          </Box>

          {/* DAY TABS */}

          <Box className="day-tabs">
            {workoutDays.map((day, index) => {
              const active =
                index === selectedDay;

              const parts =
                day.dayName.split(" - ");

              const dayTitle = parts[0];
              const workoutTitle =
                parts.slice(1).join(" - ");

              return (
                <Box
                  key={day.id}
                  className={`day-tab ${
                    active ? "active" : ""
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
            })}
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <Container
        maxWidth={false}
        className="workout-container workout-content"
      >
        <Stack spacing={1.25}>

          <WorkoutHeader
            dayNumber={currentDay.dayNumber}
            dayName={currentDay.dayName}
            exerciseCount={
              currentDay.exercises.length
            }
            totalSets={totalSets}
            completedSets={completedSetCount}
            progress={progressPercentage}
            onReset={resetDay}
          />

          <CalorieBanner
            min={currentDay.calMin}
            max={currentDay.calMax}
            earned={earnedCalories}
            note={currentDay.calNote}
          />

          <SessionProgress
            completed={completedSetCount}
            total={totalSets}
          />

          <WarmupSection
            exercises={currentDay.warmups}
            completed={completedWarmups}
            onToggle={toggleWarmup}
          />

          <Stack spacing={0.75}>
            {currentDay.exercises.map(
              (exercise, index) => {
                const key = `${selectedDay}-${index}`;

                const sets =
                  completedSets[key] ??
                  Array(exercise.sets).fill(false);

                return (
                  <ExerciseCard
                    key={key}
                    index={index}
                    name={exercise.name}
                    setsCount={exercise.sets}
                    reps={exercise.reps}
                    youtubeUrl={exercise.youtube}
                    completedSets={sets}
                    expanded={
                      expandedExercise === index
                    }
                    onExpand={() =>
                      setExpandedExercise(
                        expandedExercise === index
                          ? null
                          : index
                      )
                    }
                    onToggleSet={(setIndex) =>
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