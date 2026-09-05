import React from "react";
import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";

import WalkthroughDashboardFrame from "./WalkthroughDashboardFrame";
import { WALKTHROUGH_WORKOUT } from "./walkthroughData";

interface WorkoutShowcaseProps {
    spotlight?: boolean;
}

const cardShadow = "0 10px 30px rgba(33, 30, 27, 0.08)";

const WorkoutShowcase: React.FC<WorkoutShowcaseProps> = ({
    spotlight = true,
}) => {
    const workout = WALKTHROUGH_WORKOUT;

    const progress =
        workout.totalSets > 0
            ? Math.round((workout.completedSets / workout.totalSets) * 100)
            : 0;

    return (
        <WalkthroughDashboardFrame
            activeSection="workout"
            spotlight={spotlight}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1180,
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 1.5, md: 2 },
                }}
            >
                {/* Demo label */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: -0.5,
                    }}
                >
                    <Box
                        sx={{
                            px: 1.2,
                            py: 0.45,
                            borderRadius: 10,
                            backgroundColor: "rgba(255, 92, 53, 0.08)",
                            border: "1px solid rgba(255, 92, 53, 0.18)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: 0.8,
                                color: "#ff5c35",
                                textTransform: "uppercase",
                            }}
                        >
                            Demo preview
                        </Typography>
                    </Box>
                </Box>

                {/* Day navigation */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(5, minmax(62px, 1fr))",
                            sm: "repeat(5, minmax(80px, 1fr))",
                        },
                        gap: { xs: 0.7, sm: 1 },
                    }}
                >
                    {["MON", "TUE", "WED", "THU", "FRI"].map((day, index) => {
                        const active = index === 0;

                        return (
                            <Box
                                key={day}
                                sx={{
                                    minHeight: { xs: 42, sm: 50 },
                                    borderRadius: { xs: 1.5, sm: 2 },
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: active ? "#211e1b" : "#ffffff",
                                    border: `1px solid ${active ? "#211e1b" : "#e6e1dc"
                                        }`,
                                    boxShadow: active ? "none" : cardShadow,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: 9, sm: 10 },
                                        fontWeight: 800,
                                        letterSpacing: 0.7,
                                        color: active ? "#ffffff" : "#77716c",
                                    }}
                                >
                                    {day}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.15,
                                        fontSize: { xs: 8, sm: 9 },
                                        color: active ? "#ff9b7d" : "#a29c96",
                                    }}
                                >
                                    {index + 1}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* Main workout summary */}
                <Box
                    sx={{
                        backgroundColor: "#fff3ee",
                        border: "1px solid #f3d5ca",
                        borderRadius: { xs: 2.5, md: 3 },
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2, md: 3 },
                        alignItems: { xs: "stretch", md: "center" },
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: spotlight
                            ? "0 18px 45px rgba(255, 92, 53, 0.12)"
                            : cardShadow,
                        transition: "box-shadow 400ms ease, transform 400ms ease",
                        transform: spotlight ? "translateY(-1px)" : "none",
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            sx={{
                                color: "#ff5c35",
                                fontSize: { xs: 9, sm: 10 },
                                fontWeight: 800,
                                letterSpacing: 1,
                                textTransform: "uppercase",
                            }}
                        >
                            Day {workout.dayNumber}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.4,
                                color: "#211e1b",
                                fontSize: { xs: 18, sm: 21, md: 24 },
                                fontWeight: 800,
                                lineHeight: 1.15,
                            }}
                        >
                            {workout.title}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.7,
                                color: "#716a64",
                                fontSize: { xs: 10, sm: 11 },
                            }}
                        >
                            {workout.exercises} exercises · {workout.totalSets} total sets
                        </Typography>

                        <Box
                            sx={{
                                mt: 1.5,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.8,
                            }}
                        >
                            <InfoPill
                                icon={<FitnessCenterRoundedIcon />}
                                text={`${workout.exercises} exercises`}
                            />

                            <InfoPill
                                icon={<AccessTimeRoundedIcon />}
                                text="45–60 min"
                            />

                            <InfoPill
                                icon={<LocalFireDepartmentRoundedIcon />}
                                text={`${workout.calories.minimum}–${workout.calories.maximum} kcal`}
                            />
                        </Box>
                    </Box>

                    {/* Circular progress */}
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: 90, sm: 100 },
                            height: { xs: 90, sm: 100 },
                            flexShrink: 0,
                            alignSelf: { xs: "center", md: "auto" },
                        }}
                    >
                        <CircularProgress
                            variant="determinate"
                            value={progress}
                            size="100%"
                            thickness={5}
                            sx={{
                                color: "#ff5c35",
                                "& .MuiCircularProgress-circle": {
                                    strokeLinecap: "round",
                                },
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: 20, sm: 23 },
                                    fontWeight: 800,
                                    color: "#211e1b",
                                    lineHeight: 1,
                                }}
                            >
                                {progress}%
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.4,
                                    fontSize: 8,
                                    fontWeight: 700,
                                    color: "#8a827c",
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                Complete
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Workout progress + calories */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 1.5, md: 2 },
                    }}
                >
                    <MetricCard
                        title="Session Progress"
                        value={`${workout.completedSets}/${workout.totalSets}`}
                        subtitle="sets completed"
                        progress={progress}
                    />

                    <MetricCard
                        title="Calorie Target"
                        value={`${workout.calories.minimum}–${workout.calories.maximum}`}
                        subtitle={`${workout.calories.earned} kcal earned`}
                        icon={<LocalFireDepartmentRoundedIcon />}
                    />
                </Box>

                {/* Warm up */}
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e0db",
                        borderRadius: { xs: 2, md: 2.5 },
                        p: { xs: 1.4, sm: 1.7 },
                        display: "flex",
                        alignItems: "center",
                        gap: 1.3,
                        boxShadow: cardShadow,
                    }}
                >
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            backgroundColor: "#fff0ea",
                            color: "#ff5c35",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <PlayArrowRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: 11, sm: 12 },
                                fontWeight: 800,
                                color: "#211e1b",
                            }}
                        >
                            Warm Up
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.2,
                                fontSize: 9,
                                color: "#847c75",
                            }}
                        >
                            Get your body ready before the session
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            ml: "auto",
                            fontSize: 9,
                            fontWeight: 700,
                            color: "#ff5c35",
                            whiteSpace: "nowrap",
                        }}
                    >
                        5 MIN
                    </Typography>
                </Box>

                {/* Exercises */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    {workout.exercisesList.map((exercise, index) => (
                        <ExerciseRow
                            key={exercise.id}
                            exercise={exercise}
                            index={index}
                            active={index === 0}
                            completed={index === 0}
                        />
                    ))}
                </Box>
            </Box>
        </WalkthroughDashboardFrame>
    );
};

interface InfoPillProps {
    icon: React.ReactNode;
    text: string;
}

const InfoPill: React.FC<InfoPillProps> = ({ icon, text }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.45,
            px: 0.8,
            py: 0.5,
            borderRadius: 1.5,
            backgroundColor: "#ffffff",
            border: "1px solid #f0dcd4",
        }}
    >
        <Box
            sx={{
                display: "flex",
                color: "#ff5c35",
                "& svg": {
                    fontSize: 12,
                },
            }}
        >
            {icon}
        </Box>

        <Typography
            sx={{
                fontSize: 8.5,
                fontWeight: 700,
                color: "#655e58",
            }}
        >
            {text}
        </Typography>
    </Box>
);

interface MetricCardProps {
    title: string;
    value: string;
    subtitle: string;
    progress?: number;
    icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    subtitle,
    progress,
    icon,
}) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e0db",
            borderRadius: { xs: 2, md: 2.5 },
            p: { xs: 1.4, sm: 1.7 },
            boxShadow: cardShadow,
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography
                sx={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#817a74",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                }}
            >
                {title}
            </Typography>

            {icon && (
                <Box
                    sx={{
                        color: "#ff5c35",
                        display: "flex",
                        "& svg": {
                            fontSize: 17,
                        },
                    }}
                >
                    {icon}
                </Box>
            )}
        </Box>

        <Box
            sx={{
                mt: 0.8,
                display: "flex",
                alignItems: "baseline",
                gap: 0.7,
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: 19, sm: 21 },
                    fontWeight: 800,
                    color: "#211e1b",
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    fontSize: 8.5,
                    color: "#928a83",
                }}
            >
                {subtitle}
            </Typography>
        </Box>

        {typeof progress === "number" && (
            <Box
                sx={{
                    mt: 1,
                    height: 5,
                    borderRadius: 10,
                    backgroundColor: "#f0ece8",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: `${progress}%`,
                        height: "100%",
                        borderRadius: 10,
                        backgroundColor: "#ff5c35",
                    }}
                />
            </Box>
        )}
    </Box>
);

interface ExerciseRowProps {
    exercise: {
        id: number;
        name: string;
        sets: number;
        reps: string;
    };
    index: number;
    active?: boolean;
    completed?: boolean;
}

const ExerciseRow: React.FC<ExerciseRowProps> = ({
    exercise,
    index,
    active = false,
    completed = false,
}) => (
    <Box
        sx={{
            backgroundColor: active ? "#fff3ee" : "#ffffff",
            border: `1px solid ${active ? "#f3d5ca" : "#e5e0db"}`,
            borderRadius: { xs: 2, md: 2.5 },
            p: { xs: 1.2, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.4 },
            boxShadow: active ? "0 8px 24px rgba(255, 92, 53, 0.08)" : cardShadow,
            transition: "all 400ms ease",
            transform: active ? "translateX(2px)" : "none",
        }}
    >
        <Box
            sx={{
                width: 27,
                height: 27,
                borderRadius: "50%",
                backgroundColor: active ? "#ff5c35" : "#f0ece8",
                color: active ? "#ffffff" : "#77716b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 10,
                fontWeight: 800,
            }}
        >
            {index + 1}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
                sx={{
                    fontSize: { xs: 10.5, sm: 11.5 },
                    fontWeight: 800,
                    color: "#211e1b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {exercise.name}
            </Typography>

            <Typography
                sx={{
                    mt: 0.25,
                    fontSize: 8.5,
                    color: "#888079",
                }}
            >
                {exercise.sets} sets · {exercise.reps} reps
            </Typography>
        </Box>

        {active && (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                    flexShrink: 0,
                }}
            >
                {[0, 1, 2].map((set) => (
                    <Box
                        key={set}
                        sx={{
                            width: { xs: 19, sm: 22 },
                            height: { xs: 19, sm: 22 },
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: set === 0 ? "#ff5c35" : "#f2eeea",
                            color: set === 0 ? "#ffffff" : "#9a928b",
                            fontSize: 7,
                            fontWeight: 800,
                        }}
                    >
                        {set + 1}
                    </Box>
                ))}
            </Box>
        )}

        {completed && !active && (
            <CheckCircleRoundedIcon
                sx={{
                    fontSize: 19,
                    color: "#ff5c35",
                    flexShrink: 0,
                }}
            />
        )}
    </Box>
);

export default WorkoutShowcase;