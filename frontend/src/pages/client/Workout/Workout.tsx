// import { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
// } from "@mui/material";

// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// import WorkoutHeader from "../../../components/workout/WorkoutHeader";
// import WarmupSection from "../../../components/workout/WarmupSection";
// import ExerciseCard from "../../../components/workout/ExerciseCard";
// import CalorieBanner from "../../../components/workout/CalorieBanner";
// import SessionProgress from "../../../components/workout/SessionProgress";

// // import DashboardHeader from "../../../components/workout/DashboardHeader";
// // import WorkoutPeriodBar from "../../../components/workout/WorkoutPeriodBar";
// // import WorkoutTabs from "../../../components/workout/WorkoutTabs";

// import { workoutDays } from "../workout/workoutMockData";
// import { useDashboard } from "../../../context/DashboardContext";
// import { useOutletContext } from "react-router-dom";

// const Workout = () => {
//    console.log("🔥🔥🔥 CURRENT WORKOUT COMPONENT IS RENDERING");
//   const { month, week } = useOutletContext<{
//     month: number;
//     week: number;
//   }>();

//   const [selectedDay, setSelectedDay] = useState(0);
//   // const [month, setMonth] = useState(1);
//   // const [week, setWeek] = useState(3);

//   const [completedSets, setCompletedSets] = useState<
//     Record<string, boolean[]>
//   >({});

//   const [completedWarmups, setCompletedWarmups] = useState<
//     Record<number, Record<number, boolean>>
//   >({});

//   const [expandedExercise, setExpandedExercise] =
//     useState<number | null>(0);

//   const currentDay = workoutDays[selectedDay];
//   const { setStats } = useDashboard();

//   const totalSets = useMemo(() => {
//     return currentDay.exercises.reduce(
//       (total, exercise) => total + exercise.sets,
//       0
//     );
//   }, [currentDay]);

//   const completedSetCount = useMemo(() => {
//     return Object.entries(completedSets).reduce(
//       (total, [key, sets]) => {
//         if (!key.startsWith(`${selectedDay}-`)) {
//           return total;
//         }

//         return total + sets.filter(Boolean).length;
//       },
//       0
//     );
//   }, [completedSets, selectedDay]);

//   const totalProgramSets = workoutDays.reduce(
//   (total, day) =>
//     total +
//     day.exercises.reduce(
//       (dayTotal, exercise) => dayTotal + exercise.sets,
//       0
//     ),
//   0
// );

//   const completedProgramSets = useMemo(() => {
//     return Object.values(completedSets).reduce(
//       (total, sets) => total + sets.filter(Boolean).length,
//       0
//     );
//   }, [completedSets]);

//   const completedDays = useMemo(() => {
//     return workoutDays.reduce(
//       (count, day, dayIndex) => {
//         const dayTotal = day.exercises.reduce(
//           (total, exercise) => total + exercise.sets,
//           0
//         );

//         const dayCompleted = Object.entries(completedSets).reduce(
//           (total, [key, sets]) => {
//             if (!key.startsWith(`${dayIndex}-`)) {
//               return total;
//             }

//             return total + sets.filter(Boolean).length;
//           },
//           0
//         );

//         return dayCompleted >= dayTotal ? count + 1 : count;
//       },
//       0
//     );
//   }, [completedSets]);

//   const progressPercentage =
//     totalSets === 0
//       ? 0
//       : Math.round((completedSetCount / totalSets) * 100);

//   const earnedCalories = useMemo(() => {
//     if (totalSets === 0) return 0;


//   const ratio = completedSetCount / totalSets;

//   return Math.round(
//       (currentDay.calMin +
//         (currentDay.calMax - currentDay.calMin) * ratio) *
//         ratio
//     );
//   }, [completedSetCount, totalSets, currentDay]);

//   console.log("🔥 BEFORE WORKOUT EFFECT", {
//   completedProgramSets,
//   totalProgramSets,
//   completedDays,
//   earnedCalories,
// });

//    useEffect(() => {
//   console.log("🔥 WORKOUT STATS:", {
//     completedProgramSets,
//     totalProgramSets,
//     completedDays,
//     totalDays: workoutDays.length,
//     earnedCalories,
//   });

//   setStats({
//     completedSets: completedProgramSets,
//     totalSets: totalProgramSets,
//     completedDays,
//     totalDays: workoutDays.length,
//     calories: earnedCalories,
//   });
// }, [
//   completedProgramSets,
//   totalProgramSets,
//   completedDays,
//   earnedCalories,
//   setStats,
// ]);

//   const toggleSet = (
//     exerciseIndex: number,
//     setIndex: number,
//     setsCount: number
//   ) => {
//     const key = `${selectedDay}-${exerciseIndex}`;

//     setCompletedSets((previous) => {
//       const current = previous[key] ?? Array(setsCount).fill(false);
//       const updated = [...current];

//       updated[setIndex] = !updated[setIndex];

//       return {
//         ...previous,
//         [key]: updated,
//       };
//     });
//   };

//   const toggleWarmup = (exerciseId: number) => {
//     setCompletedWarmups((previous) => {
//       const currentDayWarmups = previous[selectedDay] ?? {};

//       return {
//         ...previous,
//         [selectedDay]: {
//           ...currentDayWarmups,
//           [exerciseId]: !currentDayWarmups[exerciseId],
//         },
//       };
//     });
//   };

//   const handleWatch = (videoUrl?: string) => {
//     if (!videoUrl) return;

//     window.open(
//       `https://www.youtube.com/results?search_query=${encodeURIComponent(
//         videoUrl
//       )}`,
//       "_blank",
//       "noopener,noreferrer"
//     );
//   };

//   const resetDay = () => {
//     setCompletedSets((previous) => {
//       const updated = { ...previous };

//       currentDay.exercises.forEach((_, index) => {
//         delete updated[`${selectedDay}-${index}`];
//       });

//       return updated;
//     });

//     setCompletedWarmups((previous) => {
//       const updated = { ...previous };
//       delete updated[selectedDay];
//       return updated;
//     });

//     setExpandedExercise(0);
//   };

//   const changeDay = (index: number) => {
//     setSelectedDay(index);
//     setExpandedExercise(0);
//   };

//   const getDayLabels = (dayName: string) => {
//     const parts = dayName.split(" - ");

//     return {
//       dayTitle: parts[0] ?? "",
//       workoutTitle: parts.slice(1).join(" - "),
//     };
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100%",
//         backgroundColor: "#f5f2ed",
//         color: "#1a1714",
//         boxSizing: "border-box",
//         overflow: "hidden",
//       }}
//     >
//       {/* <DashboardHeader />

//       <WorkoutPeriodBar
//         month={month}
//         week={week}
//         onMonthChange={setMonth}
//         onWeekChange={setWeek}
//       />

//       <WorkoutTabs activeTab="workout" /> */}

//       <Box
//         sx={{
//           backgroundColor: "#1a1917",
//           color: "#fff",
//           width: "100%",
//           boxSizing: "border-box",
//           px: "clamp(0.5rem, 4vw, 2.5rem)",
//           py: "clamp(0.75rem, 2vw, 1.5rem)",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "stretch",
//             minHeight: "clamp(50px, 10vw, 110px)",
//             width: "100%",
//           }}
//         >
//             {workoutDays.map((day, index) => {
//               const active = index === selectedDay;
//               const { dayTitle, workoutTitle } = getDayLabels(
//                 day.dayName
//               );

//               return (
//                 <Box
//                   key={day.id}
//                   onClick={() => changeDay(index)}
//                   sx={{
//                     position: "relative",
//                     flex: 1,
//                     minWidth: 0,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     px: 1,
//                     cursor: "pointer",
//                     transition: "all 0.15s ease",
//                     borderBottom: active ? "3px solid #ff5c35" : "none",
//                     color: active ? "#fff" : "#55514d",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.02)",
//                     },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontSize: { xs: 16, sm: 17, md: 19 },
//                       lineHeight: 1,
//                       fontWeight: 800,
//                     }}
//                   >
//                     {day.dayNumber}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       mt: 0.75,
//                       fontSize: { xs: 7, sm: 8, md: 8.5 },
//                       lineHeight: 1.2,
//                       fontWeight: 800,
//                       letterSpacing: 0.8,
//                       textTransform: "uppercase",
//                       textAlign: "center",
//                       color: active ? "#ddd8d2" : "#57534f",
//                     }}
//                   >
//                     {dayTitle}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       mt: 0.5,
//                       maxWidth: "90%",
//                       fontSize: { xs: 6.5, sm: 7, md: 7.5 },
//                       lineHeight: 1.2,
//                       fontWeight: 600,
//                       letterSpacing: 0.4,
//                       textTransform: "uppercase",
//                       textAlign: "center",
//                       color: active ? "#aaa5a0" : "#4b4844",
//                       display: { xs: "none", sm: "block" },
//                     }}
//                   >
//                     {workoutTitle}
//                   </Typography>

//                   <Box
//                     sx={{
//                       width: 4,
//                       height: 4,
//                       mt: 1,
//                       borderRadius: "50%",
//                       backgroundColor: active ? "#ff5c35" : "#44413e",
//                     }}
//                   />
//                 </Box>
//               );
//             })}
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           width: "100%",
//           boxSizing: "border-box",
//           px: "clamp(0.5rem, 4vw, 2.5rem)",
//           py: "clamp(1.5rem, 3vw, 3rem)",
//         }}
//       >
//         <Stack spacing="clamp(0.75rem, 1.5vw, 1.5rem)" sx={{ width: "100%", boxSizing: "border-box" }}>
//           <Box
//             sx={{
//               width: "100%",
//               boxSizing: "border-box",
//               mt: 1.5,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 1,
//               minHeight: { xs: "auto", sm: 40 },
//               px: 1.5,
//               py: 1,
//               border: "1px dashed #ffb9a8",
//               borderRadius: 2,
//               backgroundColor: "rgba(255,255,255,0.28)",
//             }}
//           >
//             <Stack
//               direction="row"
//               spacing={0.8}
//               sx={{ alignItems: "center" }}
//             >
//               <LocationOnOutlinedIcon
//                 sx={{ fontSize: 15, color: "#ff5c35" }}
//               />

//               <Typography sx={{ fontSize: 11, color: "#77716b" }}>
//                 Logging to
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#ff5c35",
//                 }}
//               >
//                 {month} · {week}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 11,
//                   color: "#77716b",
//                   display: { xs: "none", sm: "block" },
//                 }}
//               >
//                 — change in the bar above
//               </Typography>
//             </Stack>

//             <Box
//               sx={{
//                 px: 1.1,
//                 py: 0.5,
//                 borderRadius: 999,
//                 backgroundColor: "#ff5c35",
//                 color: "#fff",
//                 fontSize: 8,
//                 fontWeight: 800,
//                 letterSpacing: 0.5,
//               }}
//             >
//               AUTO-SYNC
//             </Box>
//           </Box>

//           <WorkoutHeader
//             dayNumber={currentDay.dayNumber}
//             dayName={currentDay.dayName}
//             exerciseCount={currentDay.exercises.length}
//             totalSets={totalSets}
//             completedSets={completedSetCount}
//             progress={progressPercentage}
//             onReset={resetDay}
//           />

//           <CalorieBanner
//             min={currentDay.calMin}
//             max={currentDay.calMax}
//             earned={earnedCalories}
//             note={currentDay.calNote}
//           />

//           <SessionProgress
//             completed={completedSetCount}
//             total={totalSets}
//           />

//           <WarmupSection
//             exercises={currentDay.warmups}
//             onToggle={toggleWarmup}
//             onWatch={(exercise) => handleWatch(exercise.videoUrl)}
//           />

//           <Stack spacing={0.75} sx={{ width: "100%", boxSizing: "border-box" }}>
//             {currentDay.exercises.map((exercise, index) => {
//               const key = `${selectedDay}-${index}`;
//               const sets =
//                 completedSets[key] ?? Array(exercise.sets).fill(false);

//               return (
//                 <ExerciseCard
//                   key={key}
//                   index={index}
//                   name={exercise.name}
//                   setsCount={exercise.sets}
//                   reps={exercise.reps}
//                   youtubeUrl={exercise.youtube}
//                   completedSets={sets}
//                   expanded={expandedExercise === index}
//                   onExpand={() =>
//                     setExpandedExercise(
//                       expandedExercise === index ? null : index
//                     )
//                   }
//                   onToggleSet={(setIndex) =>
//                     toggleSet(index, setIndex, exercise.sets)
//                   }
//                 />
//               );
//             })}
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default Workout;