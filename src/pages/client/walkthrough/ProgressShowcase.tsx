import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MonitorWeightRoundedIcon from "@mui/icons-material/MonitorWeightRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

import { WALKTHROUGH_PROGRESS } from "./walkthroughData";

const ORANGE = "#ff5c35";
const CREAM = "#f5f2ed";
const DARK = "#151515";
const MUTED = "#837b74";
const GREEN = "#18b95d";

const ANIMATION_INTERVAL = 1800;

interface ProgressShowcaseProps {
    spotlight?: boolean;
}

type DemoDay = {
    day: string;
    label: string;
    completed: boolean;
    calories: number;
};

type DemoWeek = {
    week: number;
    sessionsCompleted: number;
    totalSessions: number;
    caloriesBurned: number;
    weekScore: number;
    days: DemoDay[];
};

const createDays = (completedDays: number, calories: number): DemoDay[] => [
    {
        day: "Day 1",
        label: "Monday - Push",
        completed: completedDays >= 1,
        calories: completedDays >= 1 ? Math.round(calories * 0.22) : 0,
    },
    {
        day: "Day 2",
        label: "Tuesday - Pull",
        completed: completedDays >= 2,
        calories: completedDays >= 2 ? Math.round(calories * 0.21) : 0,
    },
    {
        day: "Day 3",
        label: "Wednesday - Legs",
        completed: completedDays >= 3,
        calories: completedDays >= 3 ? Math.round(calories * 0.23) : 0,
    },
    {
        day: "Day 4",
        label: "Thursday - Upper Body Strength",
        completed: completedDays >= 4,
        calories: completedDays >= 4 ? Math.round(calories * 0.18) : 0,
    },
    {
        day: "Day 5",
        label: "Friday - Hypertrophy & Conditioning",
        completed: completedDays >= 5,
        calories: completedDays >= 5 ? Math.round(calories * 0.16) : 0,
    },
];

const DEMO_WEEKS: DemoWeek[] = [
    {
        week: 1,
        sessionsCompleted: 3,
        totalSessions: 5,
        caloriesBurned: 1260,
        weekScore: 60,
        days: createDays(3, 1260),
    },
    {
        week: 2,
        sessionsCompleted: 4,
        totalSessions: 5,
        caloriesBurned: 1680,
        weekScore: 78,
        days: createDays(4, 1680),
    },
    {
        week: 3,
        sessionsCompleted: 5,
        totalSessions: 5,
        caloriesBurned: 2140,
        weekScore: 94,
        days: createDays(5, 2140),
    },
    {
        week: 4,
        sessionsCompleted: 4,
        totalSessions: 5,
        caloriesBurned: 1840,
        weekScore: 86,
        days: createDays(4, 1840),
    },
];

const MONTH_DATA = [
    {
        month: "M1",
        workouts: 12,
        calories: 3840,
        score: 80,
    },
    {
        month: "M2",
        workouts: 15,
        calories: 4620,
        score: 88,
    },
    {
        month: "M3",
        workouts: 18,
        calories: 5280,
        score: 94,
    },
];

const ProgressShowcase: React.FC<ProgressShowcaseProps> = ({
    spotlight = false,
}) => {
    /*
     * ============================================================
     * LOCAL DEMO STATE
     * ============================================================
     *
     * This showcase is intentionally independent from the real
     * Progress page and backend. It demonstrates how progress
     * changes as a user becomes more consistent.
     */

    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedWeek, setSelectedWeek] = useState(1);

    const [demoStep, setDemoStep] = useState(0);

    /*
     * Weekly weights are user-entered values.
     * We intentionally start empty so the showcase does not
     * pretend that a user has already entered measurements.
     */
    const [weights, setWeights] = useState<Record<number, number | null>>({
        1: null,
        2: null,
        3: null,
        4: null,
    });

    /*
     * The top dashboard bar is fixed.
     * It must not react to week/month changes below.
     */
    const TOP_BAR_STATS = {
        setsDone: "18/24",
        daysDone: "12/15",
        calories: 3840,
    };

    /*
     * ============================================================
     * AUTOMATIC PROGRESS STORY
     * ============================================================
     *
     * The walkthrough gradually moves the demo from an early
     * progress state to a stronger one, then starts again.
     */

    useEffect(() => {
        const timer = window.setInterval(() => {
            setDemoStep((current) => (current + 1) % 6);
        }, ANIMATION_INTERVAL);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (demoStep === 0) {
            setSelectedMonth(1);
            setSelectedWeek(1);
        } else if (demoStep === 1) {
            setSelectedMonth(1);
            setSelectedWeek(2);
        } else if (demoStep === 2) {
            setSelectedMonth(1);
            setSelectedWeek(3);
        } else if (demoStep === 3) {
            setSelectedMonth(2);
            setSelectedWeek(2);
        } else if (demoStep === 4) {
            setSelectedMonth(3);
            setSelectedWeek(3);
        }
    }, [demoStep]);

    const selectedWeekData = useMemo(() => {
        return DEMO_WEEKS[selectedWeek - 1] ?? DEMO_WEEKS[0];
    }, [selectedWeek]);

    const monthProgress = useMemo(() => {
        const month = MONTH_DATA[selectedMonth - 1] ?? MONTH_DATA[0];

        return {
            ...month,
            sessionsCompleted: month.workouts,
            totalSessions: 20,
            activeWeeks: Math.min(4, Math.ceil(month.workouts / 5)),
            totalWeeks: 4,
        };
    }, [selectedMonth]);

    /*
     * ============================================================
     * WEIGHT + BMI ARE DRIVEN BY THE WEEKLY WEIGHT TRACKER
     * ============================================================
     *
     * The latest entered weekly weight becomes the current weight.
     * Until the user enters a value, current weight remains the
     * starting weight, so weight change stays at 0 and BMI stays
     * at the starting-weight BMI.
     */
    const currentEnteredWeight = useMemo(() => {
        for (let week = 4; week >= 1; week -= 1) {
            const value = weights[week];

            if (
                value !== null &&
                value !== undefined &&
                Number.isFinite(value) &&
                value > 0
            ) {
                return value;
            }
        }

        return WALKTHROUGH_PROGRESS.startingWeight;
    }, [weights]);

    const weightChange =
        currentEnteredWeight -
        WALKTHROUGH_PROGRESS.startingWeight;

    const bmi = useMemo(() => {
        /*
         * Demo height is 178 cm.
         * BMI updates immediately when the weekly weight changes.
         */
        const heightMeters = 1.78;

        return (
            currentEnteredWeight /
            (heightMeters * heightMeters)
        );
    }, [currentEnteredWeight]);

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
        setSelectedWeek(1);
    };

    const handleWeightChange = (
        week: number,
        value: string
    ) => {
        if (value === "") {
            setWeights((previous) => ({
                ...previous,
                [week]: null,
            }));
            return;
        }

        const parsed = Number(value);

        if (
            Number.isFinite(parsed) &&
            parsed > 0
        ) {
            setWeights((previous) => ({
                ...previous,
                [week]: parsed,
            }));
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: {
                    xs: "100%",
                    sm: 1040,
                    md: 1120,
                },
                position: "relative",
                borderRadius: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                },
                overflow: "hidden",
                backgroundColor: CREAM,
                border: spotlight
                    ? `1px solid rgba(255,92,53,0.45)`
                    : "1px solid rgba(255,255,255,0.12)",
                boxShadow: spotlight
                    ? "0 20px 70px rgba(0,0,0,0.35)"
                    : "0 16px 50px rgba(0,0,0,0.25)",
                animation: "progressShowcaseIn 500ms ease-out",
                "@keyframes progressShowcaseIn": {
                    from: {
                        opacity: 0,
                        transform: "translateY(10px) scale(0.985)",
                    },
                    to: {
                        opacity: 1,
                        transform: "translateY(0) scale(1)",
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
                            letterSpacing: "0.16em",
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

                <TopBarStat
                    value={TOP_BAR_STATS.setsDone}
                    label="SETS DONE"
                />

                <TopBarStat
                    value={TOP_BAR_STATS.daysDone}
                    label="DAYS DONE"
                />

                <TopBarStat
                    value={TOP_BAR_STATS.calories.toLocaleString()}
                    label="KCAL TOTAL"
                    accent
                />
            </Box>

            {/* =====================================================
                PERIOD BAR
            ====================================================== */}

            <Box
                sx={{
                    minHeight: {
                        xs: 42,
                        sm: 48,
                    },
                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    backgroundColor: "#101113",
                    borderTop:
                        "1px solid rgba(255,255,255,0.04)",
                    borderBottom:
                        "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                    }}
                >
                    <SmallSelector
                        label={`Month ${selectedMonth}`}
                    />

                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.25)",
                            fontSize: 14,
                        }}
                    >
                        |
                    </Typography>

                    <SmallSelector
                        label={`Week ${selectedWeek}`}
                    />
                </Box>

                <Typography
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },
                        fontSize: 8,
                        fontWeight: 800,
                        color: ORANGE,
                    }}
                >
                    • Auto-syncing Progress
                </Typography>
            </Box>

            {/* =====================================================
                MINI NAVIGATION
            ====================================================== */}

            <Box
                sx={{
                    minHeight: {
                        xs: 40,
                        sm: 46,
                    },
                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },
                    display: "flex",
                    alignItems: "stretch",
                    gap: {
                        xs: 1.5,
                        sm: 3,
                    },
                    backgroundColor: DARK,
                }}
            >
                <NavItem
                    icon="🏆"
                    label="WORKOUT"
                />

                <NavItem
                    icon="🍽"
                    label="DIET"
                />

                <NavItem
                    icon="📊"
                    label="PROGRESS"
                    active
                />
            </Box>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <Box
                sx={{
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: {
                        xs: 1.5,
                        md: 2,
                    },
                    maxHeight: {
                        xs: 620,
                        sm: 700,
                        md: 760,
                    },
                    overflow: "hidden",
                }}
            >
                {/* Progress Overview */}

                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 16,
                                sm: 19,
                                md: 22,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                            lineHeight: 1.1,
                        }}
                    >
                        Progress Overview
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.35,
                            fontSize: {
                                xs: 8,
                                sm: 9,
                            },
                            color: MUTED,
                        }}
                    >
                        Track your consistency and see your progress over time.
                    </Typography>
                </Box>

                {/* Top progress stats */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            sm: "repeat(5, minmax(0, 1fr))",
                        },
                        gap: {
                            xs: 0.8,
                            sm: 1,
                        },
                    }}
                >
                    <ProgressStatCard
                        icon={<MonitorWeightRoundedIcon />}
                        value={`${WALKTHROUGH_PROGRESS.startingWeight.toFixed(1)} kg`}
                        label="Starting Weight"
                    />

                    <ProgressStatCard
                        icon={<MonitorWeightRoundedIcon />}
                        value={`${currentEnteredWeight.toFixed(1)} kg`}
                        label="Current Weight"
                        accent
                    />

                    <ProgressStatCard
                        icon={<TrendingDownRoundedIcon />}
                        value={`${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)} kg`}
                        label="Weight Change"
                    />

                    <ProgressStatCard
                        icon={<BarChartRoundedIcon />}
                        value="5 ft 10 in"
                        label="Height"
                    />

                    <ProgressStatCard
                        icon={<FitnessCenterRoundedIcon />}
                        value={bmi.toFixed(1)}
                        label="BMI"
                        accent
                        status="Healthy"
                    />
                </Box>

                {/* Progress tracker */}

                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 15,
                                sm: 17,
                                md: 19,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                            mb: 1,
                        }}
                    >
                        Progress Tracker
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.7,
                        }}
                    >
                        {[1, 2, 3].map((month) => (
                            <Button
                                key={month}
                                onClick={() =>
                                    handleMonthChange(month)
                                }
                                disableRipple
                                sx={{
                                    flex: {
                                        xs: 1,
                                        sm: "none",
                                    },
                                    minWidth: {
                                        sm: 100,
                                    },
                                    minHeight: {
                                        xs: 32,
                                        sm: 36,
                                    },
                                    px: {
                                        xs: 1,
                                        sm: 2,
                                    },
                                    borderRadius: 4,
                                    textTransform: "none",
                                    fontSize: {
                                        xs: 8.5,
                                        sm: 9.5,
                                    },
                                    fontWeight: 800,
                                    color:
                                        selectedMonth === month
                                            ? "#fff"
                                            : "#3a3531",
                                    backgroundColor:
                                        selectedMonth === month
                                            ? ORANGE
                                            : "#fff",
                                    border:
                                        selectedMonth === month
                                            ? `1px solid ${ORANGE}`
                                            : "1px solid #e4dfda",
                                    "&:hover": {
                                        backgroundColor:
                                            selectedMonth === month
                                                ? ORANGE
                                                : "#f8f6f4",
                                    },
                                }}
                            >
                                Month {month}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* Month summary */}

                <Box
                    sx={{
                        borderRadius: {
                            xs: 2,
                            sm: 2.5,
                        },
                        backgroundColor: "#1b1b1b",
                        color: "#fff",
                        px: {
                            xs: 1,
                            sm: 1.5,
                            md: 2,
                        },
                        py: {
                            xs: 1.2,
                            sm: 1.5,
                        },
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            sm: "1.2fr repeat(3, 1fr)",
                        },
                        gap: {
                            xs: 1,
                            sm: 0,
                        },
                        boxShadow: "0 10px 25px rgba(0,0,0,0.14)",
                    }}
                >
                    <MonthScore
                        score={monthProgress.score}
                        sessionsCompleted={
                            monthProgress.sessionsCompleted
                        }
                        totalSessions={
                            monthProgress.totalSessions
                        }
                    />

                    <SummaryMetric
                        icon={<FitnessCenterRoundedIcon />}
                        value={String(monthProgress.sessionsCompleted)}
                        label="Workouts Done"
                        sublabel={`Out of ${monthProgress.totalSessions} planned`}
                    />

                    <SummaryMetric
                        icon={<LocalFireDepartmentRoundedIcon />}
                        value={monthProgress.calories.toLocaleString()}
                        label="Calories Burned"
                        sublabel="Total this month"
                    />

                    <SummaryMetric
                        icon={<CalendarMonthRoundedIcon />}
                        value={`${monthProgress.activeWeeks}/${monthProgress.totalWeeks}`}
                        label="Active Weeks"
                        sublabel={`Best: ${Math.max(
                            monthProgress.score,
                            WALKTHROUGH_PROGRESS.bestWeekScore
                        )}% week score`}
                    />
                </Box>

                {/* Weekly detail */}

                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 12,
                                sm: 14,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                            mb: 0.8,
                        }}
                    >
                        Weekly Detail
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.6,
                        }}
                    >
                        {[1, 2, 3, 4].map((week) => (
                            <Button
                                key={week}
                                onClick={() => setSelectedWeek(week)}
                                disableRipple
                                sx={{
                                    minWidth: {
                                        xs: 48,
                                        sm: 56,
                                    },
                                    minHeight: {
                                        xs: 28,
                                        sm: 31,
                                    },
                                    px: 0.8,
                                    borderRadius: 1.5,
                                    textTransform: "none",
                                    fontSize: {
                                        xs: 7.5,
                                        sm: 8,
                                    },
                                    fontWeight: 800,
                                    color:
                                        selectedWeek === week
                                            ? "#fff"
                                            : "#766f69",
                                    backgroundColor:
                                        selectedWeek === week
                                            ? ORANGE
                                            : "#fff",
                                    border:
                                        selectedWeek === week
                                            ? `1px solid ${ORANGE}`
                                            : "1px solid #e4dfda",
                                    "&:hover": {
                                        backgroundColor:
                                            selectedWeek === week
                                                ? ORANGE
                                                : "#f8f6f4",
                                    },
                                }}
                            >
                                Week {week}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* Day breakdown */}

                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 11,
                                sm: 13,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                            mb: 0.8,
                        }}
                    >
                        Week {selectedWeek} — Day Breakdown
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(5, minmax(110px, 1fr))",
                                sm: "repeat(5, minmax(0, 1fr))",
                            },
                            gap: {
                                xs: 0.8,
                                sm: 1,
                            },
                            overflowX: {
                                xs: "auto",
                                sm: "hidden",
                            },
                            pb: {
                                xs: 0.3,
                                sm: 0,
                            },
                        }}
                    >
                        {selectedWeekData.days.map((day) => (
                            <DayCard
                                key={day.day}
                                day={day}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Weekly summary */}

                <Box
                    sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e0db",
                        borderRadius: 2,
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        py: {
                            xs: 1,
                            sm: 1.2,
                        },
                    }}
                >
                    <WeeklyMetric
                        value={`${selectedWeekData.sessionsCompleted}/${selectedWeekData.totalSessions}`}
                        label="SESSIONS"
                    />

                    <WeeklyMetric
                        value={selectedWeekData.caloriesBurned.toLocaleString()}
                        label="CALORIES"
                        bordered
                    />

                    <WeeklyMetric
                        value={`${selectedWeekData.weekScore}%`}
                        label="WEEK SCORE"
                        bordered
                        accent
                    />
                </Box>

                {/* Weekly weight tracker */}

                <Box
                    sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e0db",
                        borderRadius: 2,
                        p: {
                            xs: 1.2,
                            sm: 1.5,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 11,
                                sm: 13,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                        }}
                    >
                        Weekly Weight Tracker
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.25,
                            mb: 1,
                            fontSize: {
                                xs: 6.5,
                                sm: 7.5,
                            },
                            color: "#918981",
                        }}
                    >
                        Enter your weekly weight to update Current Weight,
                        Weight Change and BMI.
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(2, minmax(0, 1fr))",
                                sm: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: 0.8,
                        }}
                    >
                        {[1, 2, 3, 4].map((week) => (
                            <Box
                                key={week}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    minWidth: 0,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: 7.5,
                                            sm: 8,
                                        },
                                        fontWeight: 800,
                                        color: "#3c3733",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Week {week}
                                </Typography>

                                <TextField
                                    value={
                                        weights[week] ?? ""
                                    }
                                    onChange={(event) =>
                                        handleWeightChange(
                                            week,
                                            event.target.value
                                        )
                                    }
                                    placeholder="kg"
                                    size="small"
                                    fullWidth
                                    type="number"
                                    inputMode="decimal"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            height: {
                                                xs: 28,
                                                sm: 31,
                                            },
                                            borderRadius: 1.2,
                                            backgroundColor: "#fff",
                                            fontSize: {
                                                xs: 8,
                                                sm: 8.5,
                                            },
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            py: 0,
                                            px: 0.8,
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Three month overview */}

                <Box
                    sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e0db",
                        borderRadius: 2,
                        p: {
                            xs: 1.2,
                            sm: 1.5,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 11,
                                sm: 13,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                        }}
                    >
                        3-Month Overview
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.2,
                            fontSize: 7,
                            color: "#99918a",
                        }}
                    >
                        Workouts • Calories • Score
                    </Typography>

                    <Box
                        sx={{
                            mt: 1,
                            height: {
                                xs: 92,
                                sm: 110,
                            },
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3, minmax(0, 1fr))",
                            gap: 1,
                            alignItems: "end",
                            borderBottom: "1px solid #eee9e4",
                            px: {
                                xs: 0.5,
                                sm: 1,
                            },
                        }}
                    >
                        {MONTH_DATA.map((month) => (
                            <MonthChartColumn
                                key={month.month}
                                month={month}
                                active={
                                    selectedMonth ===
                                    Number(
                                        month.month.replace(
                                            "M",
                                            ""
                                        )
                                    )
                                }
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

const TopBarStat: React.FC<{
    value: string;
    label: string;
    accent?: boolean;
}> = ({ value, label, accent = false }) => (
    <Box
        sx={{
            flex: 1,
            minWidth: 0,
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
                fontSize: {
                    xs: 12,
                    sm: 15,
                    md: 17,
                },
                fontWeight: 900,
                lineHeight: 1,
                color: accent ? ORANGE : "#fff",
            }}
        >
            {value}
        </Typography>

        <Typography
            sx={{
                mt: 0.35,
                fontSize: {
                    xs: 5.5,
                    sm: 6.5,
                },
                letterSpacing: 1,
                fontWeight: 700,
                color: "rgba(255,255,255,0.42)",
            }}
        >
            {label}
        </Typography>
    </Box>
);

const SmallSelector: React.FC<{
    label: string;
}> = ({ label }) => (
    <Box
        sx={{
            px: {
                xs: 0.9,
                sm: 1.2,
            },
            py: {
                xs: 0.45,
                sm: 0.55,
            },
            borderRadius: 1.5,
            border:
                "1px solid rgba(255,255,255,0.12)",
            backgroundColor:
                "rgba(255,255,255,0.025)",
        }}
    >
        <Typography
            sx={{
                fontSize: {
                    xs: 7.5,
                    sm: 8.5,
                },
                color: "#eee",
                fontWeight: 600,
                whiteSpace: "nowrap",
            }}
        >
            {label}⌄
        </Typography>
    </Box>
);

const NavItem: React.FC<{
    icon: string;
    label: string;
    active?: boolean;
}> = ({ icon, label, active = false }) => (
    <Box
        sx={{
            minWidth: {
                xs: 62,
                sm: 78,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.35,
            position: "relative",
        }}
    >
        <Typography
            component="span"
            sx={{
                fontSize: {
                    xs: 9,
                    sm: 10,
                },
            }}
        >
            {icon}
        </Typography>

        <Typography
            sx={{
                fontSize: {
                    xs: 7,
                    sm: 8,
                },
                fontWeight: 800,
                letterSpacing: 0.6,
                color: active ? "#fff" : "#7f7b78",
            }}
        >
            {label}
        </Typography>

        {active && (
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 2,
                    borderRadius: 2,
                    backgroundColor: ORANGE,
                }}
            />
        )}
    </Box>
);

const ProgressStatCard: React.FC<{
    icon: React.ReactNode;
    value: string;
    label: string;
    accent?: boolean;
    status?: string;
}> = ({
    icon,
    value,
    label,
    accent = false,
    status,
}) => (
        <Box
            sx={{
                minWidth: 0,
                minHeight: {
                    xs: 62,
                    sm: 70,
                },
                backgroundColor: "#fff",
                border: "1px solid #e5e0db",
                borderRadius: 1.8,
                px: {
                    xs: 0.8,
                    sm: 1,
                },
                display: "flex",
                alignItems: "center",
                gap: {
                    xs: 0.7,
                    sm: 0.9,
                },
                boxShadow: "0 4px 14px rgba(50,40,30,0.04)",
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: 26,
                        sm: 30,
                    },
                    height: {
                        xs: 26,
                        sm: 30,
                    },
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff3ee",
                    color: ORANGE,
                    "& svg": {
                        fontSize: {
                            xs: 14,
                            sm: 16,
                        },
                    },
                }}
            >
                {icon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: 11,
                            sm: 13,
                        },
                        fontWeight: 900,
                        color: accent ? ORANGE : "#211e1b",
                        lineHeight: 1.1,
                        whiteSpace: "nowrap",
                    }}
                >
                    {value}
                </Typography>

                <Typography
                    sx={{
                        mt: 0.35,
                        fontSize: {
                            xs: 6.5,
                            sm: 7.5,
                        },
                        fontWeight: 700,
                        color: "#837b74",
                        whiteSpace: "nowrap",
                    }}
                >
                    {label}
                </Typography>

                {status && (
                    <Typography
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                            mt: 0.25,
                            fontSize: 6.5,
                            fontWeight: 800,
                            color: GREEN,
                        }}
                    >
                        {status}
                    </Typography>
                )}
            </Box>
        </Box>
    );

const MonthScore: React.FC<{
    score: number;
    sessionsCompleted: number;
    totalSessions: number;
}> = ({
    score,
    sessionsCompleted,
    totalSessions,
}) => (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                    xs: "center",
                    sm: "flex-start",
                },
                gap: {
                    xs: 0.8,
                    sm: 1.2,
                },
                minWidth: 0,
                borderRight: {
                    sm: "1px solid rgba(255,255,255,0.14)",
                },
                pb: {
                    xs: 0.8,
                    sm: 0,
                },
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: 50,
                        sm: 62,
                    },
                    height: {
                        xs: 50,
                        sm: 62,
                    },
                    flexShrink: 0,
                    borderRadius: "50%",
                    border: "5px solid #565656",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 13,
                            sm: 16,
                        },
                        fontWeight: 900,
                    }}
                >
                    {score}%
                </Typography>
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontSize: {
                            xs: 7,
                            sm: 8,
                        },
                        fontWeight: 800,
                        color: "#fff",
                    }}
                >
                    MONTH SCORE
                </Typography>

                <Typography
                    sx={{
                        mt: 0.25,
                        fontSize: {
                            xs: 7,
                            sm: 8,
                        },
                        color: "#ddd",
                    }}
                >
                    {sessionsCompleted}/{totalSessions} sessions
                </Typography>

                <Box
                    sx={{
                        mt: 0.45,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.35,
                    }}
                >
                    <EmojiEventsRoundedIcon
                        sx={{
                            fontSize: {
                                xs: 10,
                                sm: 12,
                            },
                            color: ORANGE,
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 6.5,
                                sm: 7,
                            },
                            fontWeight: 800,
                            color: ORANGE,
                        }}
                    >
                        {score >= 85 ? "Great work" : "Keep going"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

const SummaryMetric: React.FC<{
    icon: React.ReactNode;
    value: string;
    label: string;
    sublabel: string;
}> = ({
    icon,
    value,
    label,
    sublabel,
}) => (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minWidth: 0,
                px: {
                    xs: 0.4,
                    sm: 1,
                },
                borderLeft: {
                    sm: "1px solid rgba(255,255,255,0.14)",
                },
            }}
        >
            <Box
                sx={{
                    color: ORANGE,
                    "& svg": {
                        fontSize: {
                            xs: 16,
                            sm: 19,
                        },
                    },
                }}
            >
                {icon}
            </Box>

            <Typography
                sx={{
                    mt: 0.15,
                    fontSize: {
                        xs: 13,
                        sm: 16,
                    },
                    fontWeight: 900,
                    lineHeight: 1,
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    mt: 0.35,
                    fontSize: {
                        xs: 6.5,
                        sm: 7.5,
                    },
                    fontWeight: 800,
                    color: "#eee",
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    mt: 0.2,
                    fontSize: {
                        xs: 5.5,
                        sm: 6.5,
                    },
                    color: "#8f8f8f",
                    whiteSpace: "nowrap",
                }}
            >
                {sublabel}
            </Typography>
        </Box>
    );

const DayCard: React.FC<{
    day: DemoDay;
}> = ({ day }) => (
    <Box
        sx={{
            minWidth: 0,
            minHeight: {
                xs: 70,
                sm: 82,
            },
            borderRadius: 1.8,
            backgroundColor: day.completed
                ? "#fff3ee"
                : "#fff",
            border: `1px solid ${day.completed
                    ? "#f3d5ca"
                    : "#e5e0db"
                }`,
            px: 0.7,
            py: 0.8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
        }}
    >
        <Typography
            sx={{
                fontSize: {
                    xs: 7.5,
                    sm: 8.5,
                },
                fontWeight: 800,
                color: "#77716b",
            }}
        >
            {day.day}
        </Typography>

        <Typography
            sx={{
                mt: 0.45,
                fontSize: {
                    xs: 6,
                    sm: 6.8,
                },
                fontWeight: 800,
                color: day.completed
                    ? ORANGE
                    : "#aaa29b",
                whiteSpace: "nowrap",
            }}
        >
            {day.label}
        </Typography>

        <Typography
            sx={{
                mt: 0.55,
                fontSize: {
                    xs: 6,
                    sm: 6.8,
                },
                color: "#aaa29b",
            }}
        >
            Completion:{" "}
            <Box
                component="span"
                sx={{
                    color: day.completed
                        ? GREEN
                        : "#aaa29b",
                    fontWeight: 800,
                }}
            >
                {day.completed ? "100%" : "—"}
            </Box>
        </Typography>

        <Typography
            sx={{
                mt: 0.15,
                fontSize: {
                    xs: 6,
                    sm: 6.8,
                },
                color: "#aaa29b",
            }}
        >
            Calories:{" "}
            {day.completed
                ? day.calories
                : "—"}
        </Typography>

        <Box
            sx={{
                position: "absolute",
                left: 6,
                right: 6,
                bottom: 5,
                height: 3,
                borderRadius: 5,
                backgroundColor: day.completed
                    ? ORANGE
                    : "#e9e4df",
            }}
        />
    </Box>
);

const WeeklyMetric: React.FC<{
    value: string;
    label: string;
    bordered?: boolean;
    accent?: boolean;
}> = ({
    value,
    label,
    bordered = false,
    accent = false,
}) => (
        <Box
            sx={{
                textAlign: "center",
                px: 0.7,
                borderLeft: bordered
                    ? "1px solid #eee9e4"
                    : "none",
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: 13,
                        sm: 15,
                    },
                    fontWeight: 900,
                    color: accent
                        ? ORANGE
                        : "#211e1b",
                    lineHeight: 1,
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    mt: 0.35,
                    fontSize: {
                        xs: 5.8,
                        sm: 6.5,
                    },
                    color: "#8c847d",
                    letterSpacing: 0.5,
                }}
            >
                {label}
            </Typography>
        </Box>
    );

const MonthChartColumn: React.FC<{
    month: {
        month: string;
        workouts: number;
        calories: number;
        score: number;
    };
    active: boolean;
}> = ({ month, active }) => {
    const workoutHeight = Math.max(
        5,
        (month.workouts / 20) * 48
    );

    const caloriesHeight = Math.max(
        5,
        (month.calories / 6000) * 48
    );

    const scoreHeight = Math.max(
        5,
        (month.score / 100) * 48
    );

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 0.5,
                pb: 0.5,
                opacity: active ? 1 : 0.72,
            }}
        >
            <Box
                sx={{
                    height: 55,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 0.35,
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: 5,
                            sm: 7,
                        },
                        height: workoutHeight,
                        borderRadius: "3px 3px 0 0",
                        backgroundColor: ORANGE,
                        transition:
                            "height 400ms ease",
                    }}
                />

                <Box
                    sx={{
                        width: {
                            xs: 5,
                            sm: 7,
                        },
                        height: caloriesHeight,
                        borderRadius: "3px 3px 0 0",
                        backgroundColor: "#5978d9",
                        transition:
                            "height 400ms ease",
                    }}
                />

                <Box
                    sx={{
                        width: {
                            xs: 5,
                            sm: 7,
                        },
                        height: scoreHeight,
                        borderRadius: "3px 3px 0 0",
                        backgroundColor: GREEN,
                        transition:
                            "height 400ms ease",
                    }}
                />
            </Box>

            <Typography
                sx={{
                    fontSize: 6.5,
                    fontWeight: 800,
                    color: active
                        ? "#211e1b"
                        : "#aaa29b",
                }}
            >
                {month.month}
            </Typography>
        </Box>
    );
};

export default ProgressShowcase;
