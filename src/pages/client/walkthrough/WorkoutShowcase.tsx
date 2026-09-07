import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Checkbox,
    Typography,
} from "@mui/material";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { WALKTHROUGH_WORKOUT } from "./walkthroughData";

const ORANGE = "#ff5c35";
const CREAM = "#f5f2ed";
const DARK = "#151515";
const GREEN = "#43df91";

const ANIMATION_INTERVAL = 1600;

interface WorkoutShowcaseProps {
    spotlight?: boolean;
}

const WorkoutShowcase = ({
    spotlight = false,
}: WorkoutShowcaseProps) => {
    /*
     * ============================================================
     * DEMO ANIMATION STATE
     * ============================================================
     *
     * This state is intentionally local to the showcase.
     * It does NOT connect to the real workout page or API.
     */

    const [animatedSets, setAnimatedSets] = useState(
        4
    );

    const [activeExerciseIndex, setActiveExerciseIndex] =
        useState(0);

    const [showUpdate, setShowUpdate] =
        useState(false);

    /*
     * The showcase loops through a small workout story:
     *
     * 4 sets
     *   ↓
     * 5 sets
     *   ↓
     * 6 sets
     *   ↓
     * ...
     *   ↓
     * reset
     */

    const totalSets = WALKTHROUGH_WORKOUT.totalSets;

    const completedSets = Math.min(
        animatedSets,
        totalSets
    );

    const progressPercentage =
        totalSets > 0
            ? Math.round(
                (completedSets / totalSets) * 100
            )
            : 0;

    /*
     * Calories are derived from progress.
     *
     * This creates the same relationship as the real
     * workout page:
     *
     * more completed sets → more earned calories.
     */

    const earnedCalories = useMemo(() => {
        const minimum =
            WALKTHROUGH_WORKOUT.calories.minimum;

        const maximum =
            WALKTHROUGH_WORKOUT.calories.maximum;

        if (totalSets === 0) {
            return 0;
        }

        return Math.round(
            minimum +
            (maximum - minimum) *
            (completedSets / totalSets)
        );
    }, [completedSets, totalSets]);

    /*
     * ============================================================
     * AUTO DEMO
     * ============================================================
     */

    useEffect(() => {
        const timer = window.setInterval(() => {
            setAnimatedSets((current) => {
                if (current >= totalSets) {
                    return 4;
                }

                return current + 1;
            });

            setActiveExerciseIndex((current) => {
                const exerciseCount =
                    WALKTHROUGH_WORKOUT
                        .exercisesList.length;

                return (
                    (current + 1) %
                    Math.max(exerciseCount, 1)
                );
            });

            setShowUpdate(true);

            window.setTimeout(() => {
                setShowUpdate(false);
            }, 1100);
        }, ANIMATION_INTERVAL);

        return () => {
            window.clearInterval(timer);
        };
    }, [totalSets]);

    /*
     * ============================================================
     * DISPLAY EXERCISES
     * ============================================================
     *
     * We keep the preview intentionally compact.
     * The real workout page can have many exercises,
     * but the walkthrough only needs enough to communicate
     * how workout tracking works.
     */

    const exercises =
        WALKTHROUGH_WORKOUT.exercisesList;

    const visibleExercises = exercises.slice(
        0,
        3
    );

    /*
     * ============================================================
     * CALCULATE PER-EXERCISE COMPLETION
     * ============================================================
     */

    const getExerciseCompletedSets = (
        exerciseIndex: number
    ) => {
        const baseSets =
            exerciseIndex *
            2;

        return Math.max(
            0,
            Math.min(
                3,
                completedSets - baseSets
            )
        );
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: {
                    xs: "100%",
                    sm: 980,
                    md: 1040,
                },

                position: "relative",

                /*
                 * The showcase itself should feel like
                 * a real dashboard window.
                 */
                borderRadius: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                },

                overflow: "hidden",

                backgroundColor: CREAM,

                border:
                    spotlight
                        ? `1px solid rgba(255,92,53,0.45)`
                        : "1px solid rgba(255,255,255,0.12)",

                boxShadow:
                    spotlight
                        ? "0 20px 70px rgba(0,0,0,0.35)"
                        : "0 16px 50px rgba(0,0,0,0.25)",

                /*
                 * Subtle entrance animation.
                 */
                animation:
                    "workoutShowcaseIn 500ms ease-out",

                "@keyframes workoutShowcaseIn": {
                    from: {
                        opacity: 0,
                        transform:
                            "translateY(10px) scale(0.985)",
                    },
                    to: {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)",
                    },
                },
            }}
        >
            {/* =====================================================
                MINI DASHBOARD HEADER
            ====================================================== */}

            <Box
                sx={{
                    backgroundColor: DARK,
                    color: "#fff",

                    minHeight: {
                        xs: 45,
                        sm: 52,
                        md: 58,
                    },

                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                {/* Logo */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        px: {
                            xs: 1.5,
                            sm: 2,
                            md: 2.5,
                        },

                        minWidth: {
                            xs: 100,
                            sm: 145,
                            md: 180,
                        },

                        borderRight:
                            "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 14,
                                sm: 17,
                                md: 20,
                            },

                            fontWeight: 900,
                            letterSpacing:
                                "0.16em",
                        }}
                    >
                        GRIND
                        <Box
                            component="span"
                            sx={{
                                color: ORANGE,
                            }}
                        >
                            .
                        </Box>
                    </Typography>
                </Box>

                {/* Stats */}

                <Box
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                    }}
                >
                    <MiniHeaderStat
                        value={`${completedSets}/${totalSets}`}
                        label="SETS DONE"
                    />

                    <MiniHeaderStat
                        value={
                            completedSets >=
                                totalSets
                                ? "1/5"
                                : "0/5"
                        }
                        label="DAYS DONE"
                    />

                    <MiniHeaderStat
                        value={earnedCalories}
                        label="~KCAL TODAY"
                        accent
                    />
                </Box>
            </Box>

            {/* =====================================================
                PERIOD / NAVIGATION
            ====================================================== */}

            <Box
                sx={{
                    backgroundColor:
                        "#111214",

                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },

                    py: {
                        xs: 0.8,
                        sm: 1,
                    },

                    display: "flex",
                    alignItems: "center",
                    gap: 1,

                    borderBottom:
                        "1px solid rgba(255,255,255,0.07)",
                }}
            >
                <Typography
                    sx={{
                        color: "#777",
                        fontSize: {
                            xs: 7,
                            sm: 8,
                            md: 9,
                        },
                        fontWeight: 700,
                        letterSpacing:
                            "0.14em",
                    }}
                >
                    LOGGING TO
                </Typography>

                <PeriodButton>
                    Month 1
                </PeriodButton>

                <Typography
                    sx={{
                        color: "#555",
                        fontSize: 10,
                    }}
                >
                    |
                </Typography>

                <PeriodButton>
                    Week 1
                </PeriodButton>

                <Box
                    sx={{
                        ml: "auto",
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor:
                                ORANGE,
                        }}
                    />

                    <Typography
                        sx={{
                            color: ORANGE,
                            fontSize: {
                                sm: 7,
                                md: 8,
                            },
                            fontWeight: 700,
                        }}
                    >
                        AUTO-SYNCING TO
                        PROGRESS
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
                MAIN WORKOUT TAB
            ====================================================== */}

            <Box
                sx={{
                    backgroundColor: DARK,
                    color: "#fff",

                    px: {
                        xs: 1,
                        sm: 1.5,
                        md: 2,
                    },

                    display: "flex",
                    alignItems: "stretch",
                    borderBottom:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <WorkoutTab
                    active
                    label="🏆 WORKOUT"
                />

                <WorkoutTab label="◉ DIET" />

                <WorkoutTab label="▥ PROGRESS" />
            </Box>

            {/* =====================================================
                DAY NAVIGATION
            ====================================================== */}

            <Box
                sx={{
                    backgroundColor: DARK,
                    color: "#fff",

                    display: "grid",
                    gridTemplateColumns:
                        "repeat(5, 1fr)",

                    borderBottom:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                ].map((day, index) => (
                    <Box
                        key={day}
                        sx={{
                            py: {
                                xs: 0.75,
                                sm: 1,
                            },

                            px: 0.5,

                            textAlign: "center",

                            borderBottom:
                                index === 0
                                    ? `2px solid ${ORANGE}`
                                    : "2px solid transparent",

                            opacity:
                                index === 0
                                    ? 1
                                    : 0.35,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 12,
                                    sm: 15,
                                },

                                lineHeight: 1,
                                fontWeight: 800,
                            }}
                        >
                            {index + 1}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.25,
                                fontSize: {
                                    xs: 6,
                                    sm: 7,
                                    md: 8,
                                },

                                fontWeight: 700,
                                letterSpacing:
                                    "0.08em",

                                whiteSpace:
                                    "nowrap",
                                overflow:
                                    "hidden",
                                textOverflow:
                                    "ellipsis",
                            }}
                        >
                            {day}
                            {index === 0
                                ? " - Push"
                                : ""}
                        </Typography>

                        <Box
                            sx={{
                                width: 4,
                                height: 4,
                                borderRadius:
                                    "50%",
                                backgroundColor:
                                    index === 0
                                        ? ORANGE
                                        : "#555",
                                mx: "auto",
                                mt: 0.5,
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <Box
                sx={{
                    px: {
                        xs: 1.25,
                        sm: 1.75,
                        md: 2,
                    },

                    py: {
                        xs: 1.25,
                        sm: 1.75,
                        md: 2,
                    },

                    display: "flex",
                    flexDirection: "column",
                    gap: {
                        xs: 1,
                        sm: 1.25,
                        md: 1.5,
                    },

                    position: "relative",
                }}
            >
                {/* ================================================
                    WORKOUT SUMMARY
                ================================================= */}

                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1.5,

                        border:
                            "1px solid #ded9d4",

                        px: {
                            xs: 1.5,
                            sm: 2,
                            md: 2.5,
                        },

                        py: {
                            xs: 1.25,
                            sm: 1.5,
                            md: 1.75,
                        },

                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",

                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                display: "inline-flex",
                                px: 0.8,
                                py: 0.35,
                                borderRadius: 99,
                                backgroundColor:
                                    "#fff0ea",
                                mb: 0.7,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: ORANGE,
                                    fontSize: {
                                        xs: 6,
                                        sm: 7,
                                        md: 8,
                                    },
                                    fontWeight: 800,
                                    letterSpacing:
                                        "0.08em",
                                }}
                            >
                                • DAY 1
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color: "#181716",
                                fontSize: {
                                    xs: 14,
                                    sm: 17,
                                    md: 21,
                                },
                                lineHeight: 1.05,
                                fontWeight: 800,
                            }}
                        >
                            Monday – Push
                            <Box
                                component="span"
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "inline",
                                    },
                                }}
                            >
                                {" "}
                                (Chest Focus)
                            </Box>
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: {
                                    xs: 0.8,
                                    sm: 1.25,
                                },
                                mt: 0.7,
                            }}
                        >
                            <SummaryValue
                                value={
                                    exercises.length
                                }
                                label="exercises"
                            />

                            <SummaryValue
                                value={
                                    totalSets
                                }
                                label="total sets"
                            />

                            <SummaryValue
                                value={
                                    completedSets
                                }
                                label="done"
                                accent
                            />
                        </Box>
                    </Box>

                    {/* Progress circle */}

                    <ProgressCircle
                        percentage={
                            progressPercentage
                        }
                        completed={
                            completedSets
                        }
                        total={totalSets}
                    />
                </Box>

                {/* ================================================
                    CALORIE BANNER
                ================================================= */}

                <Box
                    sx={{
                        backgroundColor:
                            "#fff",

                        border:
                            `1px solid ${ORANGE}55`,

                        borderRadius: 1.5,

                        px: {
                            xs: 1.25,
                            sm: 1.75,
                            md: 2,
                        },

                        py: {
                            xs: 0.9,
                            sm: 1.1,
                            md: 1.25,
                        },

                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: 30,
                                sm: 36,
                                md: 40,
                            },
                            height: {
                                xs: 30,
                                sm: 36,
                                md: 40,
                            },
                            borderRadius: 1,
                            backgroundColor:
                                "#fff0ea",
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            flexShrink: 0,
                        }}
                    >
                        <LocalFireDepartmentRoundedIcon
                            sx={{
                                color: ORANGE,
                                fontSize: {
                                    xs: 19,
                                    sm: 23,
                                    md: 26,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                color: "#df3820",
                                fontSize: {
                                    xs: 12,
                                    sm: 15,
                                    md: 18,
                                },
                                fontWeight: 800,
                                lineHeight: 1,
                            }}
                        >
                            {
                                WALKTHROUGH_WORKOUT
                                    .calories
                                    .minimum
                            }
                            –
                            {
                                WALKTHROUGH_WORKOUT
                                    .calories
                                    .maximum
                            }{" "}
                            kcal
                        </Typography>

                        <Typography
                            sx={{
                                color: "#777",
                                fontSize: {
                                    xs: 6,
                                    sm: 7,
                                    md: 8,
                                },
                                mt: 0.3,
                            }}
                        >
                            Estimated range ·
                            Workout Day
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            ml: "auto",
                            flexShrink: 0,
                            backgroundColor:
                                "#fff0ea",
                            borderRadius: 99,
                            px: {
                                xs: 0.8,
                                sm: 1.1,
                            },
                            py: 0.55,
                        }}
                    >
                        <Typography
                            sx={{
                                color:
                                    "#df3820",
                                fontSize: {
                                    xs: 6,
                                    sm: 7,
                                    md: 8,
                                },
                                fontWeight: 800,
                            }}
                        >
                            Earned:{" "}
                            {earnedCalories}{" "}
                            kcal
                        </Typography>
                    </Box>
                </Box>

                {/* ================================================
                    SESSION PROGRESS
                ================================================= */}

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "space-between",
                            mb: 0.45,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#777",
                                fontSize: {
                                    xs: 6,
                                    sm: 7,
                                    md: 8,
                                },
                            }}
                        >
                            Session Progress
                        </Typography>

                        <Typography
                            sx={{
                                color: "#777",
                                fontSize: {
                                    xs: 6,
                                    sm: 7,
                                    md: 8,
                                },
                                fontWeight: 600,
                            }}
                        >
                            {completedSets}{" "}
                            of {totalSets} sets
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            height: {
                                xs: 4,
                                sm: 5,
                            },
                            borderRadius: 99,
                            backgroundColor:
                                "#ddd9d5",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                width: `${progressPercentage}%`,
                                height: "100%",
                                borderRadius: 99,
                                backgroundColor:
                                    ORANGE,

                                transition:
                                    "width 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        />
                    </Box>
                </Box>

                {/* ================================================
                    WARM-UP
                ================================================= */}

                <WarmupPreview />

                {/* ================================================
                    EXERCISES
                ================================================= */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection:
                            "column",
                        gap: 0.75,
                    }}
                >
                    {visibleExercises.map(
                        (
                            exercise,
                            exerciseIndex
                        ) => {
                            const exerciseCompleted =
                                getExerciseCompletedSets(
                                    exerciseIndex
                                );

                            const isActive =
                                exerciseIndex ===
                                activeExerciseIndex;

                            const completed =
                                exerciseCompleted >=
                                exercise.sets;

                            return (
                                <ExercisePreview
                                    key={
                                        exercise.id
                                    }
                                    number={
                                        exerciseIndex +
                                        1
                                    }
                                    name={
                                        exercise.name
                                    }
                                    reps={
                                        exercise.reps
                                    }
                                    sets={
                                        exercise.sets
                                    }
                                    completedSets={
                                        exerciseCompleted
                                    }
                                    completed={
                                        completed
                                    }
                                    active={
                                        isActive
                                    }
                                />
                            );
                        }
                    )}
                </Box>

                {/* ================================================
                    PROGRESS UPDATED TOAST
                ================================================= */}

                <Box
                    sx={{
                        position:
                            "absolute",

                        right: {
                            xs: 10,
                            sm: 18,
                            md: 22,
                        },

                        bottom: {
                            xs: 8,
                            sm: 12,
                            md: 16,
                        },

                        px: {
                            xs: 1,
                            sm: 1.25,
                            md: 1.5,
                        },

                        py: {
                            xs: 0.7,
                            sm: 0.8,
                        },

                        borderRadius: 1,

                        backgroundColor:
                            "#171717",

                        border:
                            `1px solid ${ORANGE}`,

                        opacity:
                            showUpdate ? 1 : 0,

                        transform:
                            showUpdate
                                ? "translateY(0)"
                                : "translateY(8px)",

                        transition:
                            "opacity 250ms ease, transform 250ms ease",

                        pointerEvents:
                            "none",

                        zIndex: 5,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#fff",
                            fontSize: {
                                xs: 7,
                                sm: 8,
                                md: 9,
                            },
                            fontWeight: 800,
                        }}
                    >
                        Progress Updated!
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "rgba(255,255,255,0.65)",
                            fontSize: {
                                xs: 6,
                                sm: 7,
                                md: 8,
                            },
                            mt: 0.2,
                        }}
                    >
                        {completedSets}/
                        {totalSets} sets ·{" "}
                        {earnedCalories} kcal
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

/* ===============================================================
   MINI HEADER STAT
================================================================ */

interface MiniHeaderStatProps {
    value: string | number;
    label: string;
    accent?: boolean;
}

const MiniHeaderStat = ({
    value,
    label,
    accent = false,
}: MiniHeaderStatProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderLeft:
                    "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <Typography
                sx={{
                    color: accent
                        ? ORANGE
                        : "#fff",
                    fontSize: {
                        xs: 10,
                        sm: 12,
                        md: 15,
                    },
                    fontWeight: 800,
                    lineHeight: 1,
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    color: "#777",
                    fontSize: {
                        xs: 4.5,
                        sm: 5.5,
                        md: 6,
                    },
                    fontWeight: 700,
                    letterSpacing:
                        "0.1em",
                    mt: 0.35,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

/* ===============================================================
   PERIOD BUTTON
================================================================ */

const PeriodButton = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.4,

                border:
                    "1px solid #3b3b3d",

                borderRadius: 0.8,

                px: {
                    xs: 0.8,
                    sm: 1,
                },

                py: {
                    xs: 0.35,
                    sm: 0.45,
                },
            }}
        >
            <Typography
                sx={{
                    color: "#ddd",
                    fontSize: {
                        xs: 6,
                        sm: 7,
                        md: 8,
                    },
                }}
            >
                {children}
            </Typography>

            <KeyboardArrowDownRoundedIcon
                sx={{
                    color: "#aaa",
                    fontSize: {
                        xs: 9,
                        sm: 11,
                    },
                }}
            />
        </Box>
    );
};

/* ===============================================================
   WORKOUT TAB
================================================================ */

const WorkoutTab = ({
    label,
    active = false,
}: {
    label: string;
    active?: boolean;
}) => {
    return (
        <Box
            sx={{
                flex: 1,

                py: {
                    xs: 0.7,
                    sm: 0.9,
                },

                textAlign: "center",

                borderBottom: active
                    ? `2px solid ${ORANGE}`
                    : "2px solid transparent",
            }}
        >
            <Typography
                sx={{
                    color: active
                        ? "#fff"
                        : "#777",

                    fontSize: {
                        xs: 6,
                        sm: 7,
                        md: 8,
                    },

                    fontWeight: 800,
                    letterSpacing:
                        "0.06em",
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

/* ===============================================================
   SUMMARY VALUE
================================================================ */

const SummaryValue = ({
    value,
    label,
    accent = false,
}: {
    value: number;
    label: string;
    accent?: boolean;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.3,
            }}
        >
            <Typography
                sx={{
                    color: accent
                        ? ORANGE
                        : "#242220",

                    fontSize: {
                        xs: 8,
                        sm: 9,
                        md: 10,
                    },

                    fontWeight: 800,
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    color: "#777",
                    fontSize: {
                        xs: 6,
                        sm: 7,
                        md: 8,
                    },
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

/* ===============================================================
   PROGRESS CIRCLE
================================================================ */

interface ProgressCircleProps {
    percentage: number;
    completed: number;
    total: number;
}

const ProgressCircle = ({
    percentage,
    completed,
    total,
}: ProgressCircleProps) => {
    const size = 58;
    const stroke = 5;
    const radius =
        (size - stroke) / 2;

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (percentage / 100) *
        circumference;

    return (
        <Box
            sx={{
                width: {
                    xs: 45,
                    sm: 52,
                    md: 58,
                },

                height: {
                    xs: 45,
                    sm: 52,
                    md: 58,
                },

                position: "relative",
                flexShrink: 0,
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${size} ${size}`}
                style={{
                    transform:
                        "rotate(-90deg)",
                }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#dedbd7"
                    strokeWidth={stroke}
                />

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={
                        circumference
                    }
                    strokeDashoffset={
                        offset
                    }
                    style={{
                        transition:
                            "stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                />
            </svg>

            <Box
                sx={{
                    position:
                        "absolute",
                    inset: 0,

                    display: "flex",
                    flexDirection:
                        "column",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                }}
            >
                <Typography
                    sx={{
                        color: "#242220",
                        fontSize: {
                            xs: 9,
                            sm: 10,
                            md: 12,
                        },
                        fontWeight: 800,
                        lineHeight: 1,
                    }}
                >
                    {percentage}%
                </Typography>

                <Typography
                    sx={{
                        color: "#888",
                        fontSize: {
                            xs: 5,
                            sm: 6,
                        },
                        mt: 0.25,
                    }}
                >
                    {completed}/{total}
                </Typography>
            </Box>
        </Box>
    );
};

/* ===============================================================
   WARM-UP PREVIEW
================================================================ */

const WarmupPreview = () => {
    const warmups = [
        "Arm Circles",
        "Shoulder Rolls",
        "Bodyweight Squats",
        "Hip Circles",
    ];

    return (
        <Box
            sx={{
                backgroundColor:
                    "#fff",

                border:
                    `1px solid ${ORANGE}55`,

                borderRadius: 1.5,

                overflow: "hidden",
            }}
        >
            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,

                    px: {
                        xs: 1,
                        sm: 1.25,
                    },

                    py: {
                        xs: 0.7,
                        sm: 0.9,
                    },

                    borderBottom:
                        "1px solid #e7e2de",
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: 22,
                            sm: 28,
                        },

                        height: {
                            xs: 22,
                            sm: 28,
                        },

                        borderRadius: 0.8,

                        backgroundColor:
                            "#fff0ea",

                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >
                    <LocalFireDepartmentRoundedIcon
                        sx={{
                            color: ORANGE,
                            fontSize: {
                                xs: 13,
                                sm: 17,
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{
                            color: "#272522",
                            fontSize: {
                                xs: 8,
                                sm: 9,
                                md: 10,
                            },
                            fontWeight: 800,
                            lineHeight: 1,
                        }}
                    >
                        Warm-Up First
                    </Typography>

                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: {
                                xs: 5,
                                sm: 6,
                                md: 7,
                            },
                            mt: 0.25,
                        }}
                    >
                        Prepare your body
                        before working
                        sets.
                    </Typography>
                </Box>
            </Box>

            {/* Warmups */}

            {warmups.map(
                (warmup, index) => (
                    <Box
                        key={warmup}
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",

                            px: {
                                xs: 1,
                                sm: 1.25,
                            },

                            py: {
                                xs: 0.55,
                                sm: 0.7,
                            },

                            borderBottom:
                                index <
                                    warmups.length -
                                    1
                                    ? "1px solid #ebe7e3"
                                    : "none",
                        }}
                    >
                        <Checkbox
                            size="small"
                            sx={{
                                p: 0,
                                mr: 0.7,

                                color: "#d5d1cc",

                                "& .MuiSvgIcon-root":
                                {
                                    fontSize: {
                                        xs: 15,
                                        sm: 18,
                                    },
                                },
                            }}
                        />

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    color:
                                        "#302e2b",
                                    fontSize: {
                                        xs: 6,
                                        sm: 7,
                                        md: 8,
                                    },
                                    fontWeight: 700,
                                }}
                            >
                                {warmup}
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "#888",
                                    fontSize: {
                                        xs: 5,
                                        sm: 6,
                                    },
                                }}
                            >
                                {index ===
                                    0
                                    ? "30 sec forward + 30 sec backward"
                                    : index ===
                                        1
                                        ? "10 reps each direction"
                                        : index ===
                                            2
                                            ? "12–15 controlled reps"
                                            : "10 reps each direction"}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 0.35,
                            }}
                        >
                            <Box
                                sx={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    gap: 0.2,
                                    backgroundColor:
                                        "#ff1515",
                                    color: "#fff",
                                    borderRadius: 0.5,
                                    px: {
                                        xs: 0.45,
                                        sm: 0.6,
                                    },
                                    py: 0.3,
                                }}
                            >
                                <PlayArrowRoundedIcon
                                    sx={{
                                        fontSize:
                                        {
                                            xs: 8,
                                            sm: 10,
                                        },
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontSize:
                                        {
                                            xs: 5,
                                            sm: 6,
                                        },
                                        fontWeight: 700,
                                    }}
                                >
                                    Watch
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    color:
                                        "#238044",
                                    fontSize: {
                                        xs: 5,
                                        sm: 6,
                                    },
                                    fontWeight: 700,
                                }}
                            >
                                WARM UP
                            </Typography>
                        </Box>
                    </Box>
                )
            )}
        </Box>
    );
};

/* ===============================================================
   EXERCISE PREVIEW
================================================================ */

interface ExercisePreviewProps {
    number: number;
    name: string;
    reps: string;
    sets: number;
    completedSets: number;
    completed: boolean;
    active: boolean;
}

const ExercisePreview = ({
    number,
    name,
    reps,
    sets,
    completedSets,
    completed,
    active,
}: ExercisePreviewProps) => {
    return (
        <Box
            sx={{
                backgroundColor:
                    completed
                        ? "#effff6"
                        : "#fff",

                border:
                    completed
                        ? `1px solid ${GREEN}`
                        : active
                            ? `1px solid ${ORANGE}66`
                            : "1px solid #ddd8d3",

                borderRadius: 1.5,

                overflow: "hidden",

                transition:
                    "background-color 350ms ease, border-color 350ms ease, box-shadow 350ms ease",

                boxShadow:
                    active
                        ? "0 4px 16px rgba(255,92,53,0.08)"
                        : "none",
            }}
        >
            {/* Exercise header */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",

                    px: {
                        xs: 0.9,
                        sm: 1.25,
                    },

                    py: {
                        xs: 0.7,
                        sm: 0.85,
                    },

                    gap: 0.8,
                }}
            >
                {/* Number */}

                <Box
                    sx={{
                        width: {
                            xs: 22,
                            sm: 27,
                        },

                        height: {
                            xs: 22,
                            sm: 27,
                        },

                        borderRadius: 0.8,

                        backgroundColor:
                            completed
                                ? GREEN
                                : "#e3dfdb",

                        color:
                            completed
                                ? "#12663f"
                                : "#666",

                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",

                        flexShrink: 0,

                        transition:
                            "background-color 350ms ease",
                    }}
                >
                    {completed ? (
                        <CheckRoundedIcon
                            sx={{
                                fontSize: {
                                    xs: 13,
                                    sm: 16,
                                },
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 7,
                                    sm: 8,
                                },
                                fontWeight: 800,
                            }}
                        >
                            {number}
                        </Typography>
                    )}
                </Box>

                {/* Name */}

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Typography
                        sx={{
                            color:
                                completed
                                    ? "#777"
                                    : "#292724",

                            textDecoration:
                                completed
                                    ? "line-through"
                                    : "none",

                            fontSize: {
                                xs: 7,
                                sm: 8,
                                md: 9,
                            },

                            fontWeight: 800,

                            whiteSpace:
                                "nowrap",
                            overflow:
                                "hidden",
                            textOverflow:
                                "ellipsis",

                            transition:
                                "color 300ms ease",
                        }}
                    >
                        {name}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#777",
                            fontSize: {
                                xs: 5,
                                sm: 6,
                                md: 7,
                            },
                        }}
                    >
                        {sets} × {reps}
                    </Typography>
                </Box>

                {/* Watch */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.2,

                        backgroundColor:
                            "#ff1010",

                        color: "#fff",

                        borderRadius: 0.6,

                        px: {
                            xs: 0.55,
                            sm: 0.75,
                        },

                        py: {
                            xs: 0.35,
                            sm: 0.45,
                        },
                    }}
                >
                    <PlayArrowRoundedIcon
                        sx={{
                            fontSize: {
                                xs: 8,
                                sm: 10,
                            },
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 5,
                                sm: 6,
                            },
                            fontWeight: 700,
                        }}
                    >
                        Watch
                    </Typography>
                </Box>

                <KeyboardArrowDownRoundedIcon
                    sx={{
                        color: "#777",
                        fontSize: {
                            xs: 13,
                            sm: 16,
                        },
                    }}
                />
            </Box>

            {/* Set progress */}

            <Box
                sx={{
                    px: {
                        xs: 1,
                        sm: 1.5,
                    },

                    pb: {
                        xs: 0.75,
                        sm: 1,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                    }}
                >
                    {Array.from({
                        length: sets,
                    }).map(
                        (_, setIndex) => {
                            const isCompleted =
                                setIndex <
                                completedSets;

                            return (
                                <Box
                                    key={
                                        setIndex
                                    }
                                    sx={{
                                        flex: 1,
                                        minWidth: 0,

                                        height: {
                                            xs: 3,
                                            sm: 4,
                                        },

                                        borderRadius:
                                            99,

                                        backgroundColor:
                                            isCompleted
                                                ? GREEN
                                                : "#e2ded9",

                                        transition:
                                            "background-color 350ms ease, transform 350ms ease",

                                        transform:
                                            isCompleted
                                                ? "scaleY(1.15)"
                                                : "scaleY(1)",
                                    }}
                                />
                            );
                        }
                    )}
                </Box>

                <Typography
                    sx={{
                        color: completed
                            ? "#25804f"
                            : "#888",

                        fontSize: {
                            xs: 5,
                            sm: 6,
                        },

                        fontWeight:
                            completed
                                ? 700
                                : 500,

                        mt: 0.4,
                    }}
                >
                    {completedSets} /{" "}
                    {sets} sets complete
                </Typography>
            </Box>
        </Box>
    );
};

export default WorkoutShowcase;