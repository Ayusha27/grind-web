import React from "react";
import {
    Box,
    Typography,
} from "@mui/material";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

import WalkthroughDashboardFrame from "./WalkthroughDashboardFrame";
import { WALKTHROUGH_PROGRESS } from "./walkthroughData";

interface ProgressShowcaseProps {
    spotlight?: boolean;
}

const ProgressShowcase: React.FC<ProgressShowcaseProps> = ({
    spotlight = true,
}) => {
    const progress = WALKTHROUGH_PROGRESS;

    const weightDifference = progress.currentWeight - progress.startingWeight;

    return (
        <WalkthroughDashboardFrame
            activeSection="progress"
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
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: 17, sm: 20, md: 23 },
                                fontWeight: 800,
                                color: "#211e1b",
                                lineHeight: 1.15,
                            }}
                        >
                            Progress Tracker
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: { xs: 9.5, sm: 10.5 },
                                color: "#837b74",
                            }}
                        >
                            See how your consistency turns into measurable progress
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            px: 1.2,
                            py: 0.55,
                            borderRadius: 10,
                            backgroundColor: "rgba(255, 92, 53, 0.08)",
                            border: "1px solid rgba(255, 92, 53, 0.18)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 8.5,
                                fontWeight: 800,
                                letterSpacing: 0.7,
                                color: "#ff5c35",
                                textTransform: "uppercase",
                            }}
                        >
                            Demo preview
                        </Typography>
                    </Box>
                </Box>

                {/* Top stats */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(4, minmax(0, 1fr))",
                        },
                        gap: { xs: 1, md: 1.2 },
                    }}
                >
                    <StatCard
                        label="Starting Weight"
                        value={`${progress.startingWeight} kg`}
                    />

                    <StatCard
                        label="Current Weight"
                        value={`${progress.currentWeight} kg`}
                        accent
                    />

                    <StatCard
                        label="Weight Change"
                        value={`${weightDifference} kg`}
                        icon={<TrendingDownRoundedIcon />}
                        accent
                    />

                    <StatCard
                        label="Month Score"
                        value={`${progress.monthScore}%`}
                        icon={<EmojiEventsRoundedIcon />}
                    />
                </Box>

                {/* Summary */}
                <Box
                    sx={{
                        backgroundColor: "#211e1b",
                        borderRadius: { xs: 2.5, md: 3 },
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "stretch", md: "center" },
                        gap: { xs: 2, md: 3 },
                        boxShadow: spotlight
                            ? "0 18px 45px rgba(33, 30, 27, 0.18)"
                            : "0 10px 30px rgba(33, 30, 27, 0.1)",
                        transition: "box-shadow 400ms ease, transform 400ms ease",
                        transform: spotlight ? "translateY(-1px)" : "none",
                    }}
                >
                    <ScoreCircle score={progress.monthScore} />

                    <Box
                        sx={{
                            flex: 1,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(2, minmax(0, 1fr))",
                                sm: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: { xs: 1, sm: 0 },
                        }}
                    >
                        <SummaryMetric
                            icon={<FitnessCenterRoundedIcon />}
                            value={`${progress.sessionsCompleted}/${progress.totalSessions}`}
                            label="Sessions"
                        />

                        <SummaryMetric
                            icon={<LocalFireDepartmentRoundedIcon />}
                            value={`${progress.caloriesBurned}`}
                            label="Calories"
                        />

                        <SummaryMetric
                            icon={<CalendarMonthRoundedIcon />}
                            value={`${progress.activeWeeks}/${progress.totalWeeks}`}
                            label="Active Weeks"
                        />

                        <SummaryMetric
                            icon={<EmojiEventsRoundedIcon />}
                            value={`${progress.bestWeekScore}%`}
                            label="Best Week"
                        />
                    </Box>
                </Box>

                {/* Weekly weight tracker */}
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e0db",
                        borderRadius: { xs: 2, md: 2.5 },
                        p: { xs: 1.4, sm: 1.7, md: 2 },
                        boxShadow: "0 10px 30px rgba(33, 30, 27, 0.07)",
                    }}
                >
                    <SectionTitle
                        title="Weekly Weight Tracker"
                        subtitle="Demo measurements for the walkthrough"
                    />

                    <Box
                        sx={{
                            mt: 1.5,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: 1,
                        }}
                    >
                        {[
                            { week: "Week 1", weight: 82.0 },
                            { week: "Week 2", weight: 80.8 },
                            { week: "Week 3", weight: 79.2 },
                            { week: "Week 4", weight: 78.0 },
                        ].map((item, index) => (
                            <WeightCard
                                key={item.week}
                                week={item.week}
                                weight={item.weight}
                                active={index === 3}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Day breakdown */}
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e0db",
                        borderRadius: { xs: 2, md: 2.5 },
                        p: { xs: 1.4, sm: 1.7, md: 2 },
                        boxShadow: "0 10px 30px rgba(33, 30, 27, 0.07)",
                    }}
                >
                    <SectionTitle
                        title="Day Breakdown"
                        subtitle="Your weekly consistency"
                    />

                    <Box
                        sx={{
                            mt: 1.4,
                            display: "flex",
                            gap: 0.8,
                            overflowX: "auto",
                            pb: 0.5,
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        {["M", "T", "W", "T", "F", "S", "S"].map(
                            (day, index) => (
                                <DayCard
                                    key={`${day}-${index}`}
                                    day={day}
                                    completed={index < 5}
                                    active={index === 0}
                                />
                            ),
                        )}
                    </Box>
                </Box>

                {/* Weekly summary */}
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e0db",
                        borderRadius: { xs: 2, md: 2.5 },
                        p: { xs: 1.4, sm: 1.7, md: 2 },
                        boxShadow: "0 10px 30px rgba(33, 30, 27, 0.07)",
                    }}
                >
                    <SectionTitle
                        title="Weekly Summary"
                        subtitle="A quick look at your current week"
                    />

                    <Box
                        sx={{
                            mt: 1.5,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(3, minmax(0, 1fr))",
                            },
                        }}
                    >
                        <WeeklyMetric
                            value={`${progress.sessionsCompleted}`}
                            label="Sessions Completed"
                        />

                        <WeeklyMetric
                            value={`${progress.caloriesBurned}`}
                            label="Calories Burned"
                            bordered
                        />

                        <WeeklyMetric
                            value={`${progress.bestWeekScore}%`}
                            label="Week Score"
                            bordered
                        />
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 0.6,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 8.5,
                                    fontWeight: 700,
                                    color: "#817971",
                                }}
                            >
                                CONSISTENCY
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 8.5,
                                    fontWeight: 800,
                                    color: "#ff5c35",
                                }}
                            >
                                {progress.bestWeekScore}%
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                height: 5,
                                backgroundColor: "#efebe7",
                                borderRadius: 10,
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${progress.bestWeekScore}%`,
                                    height: "100%",
                                    borderRadius: 10,
                                    backgroundColor: "#ff5c35",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </WalkthroughDashboardFrame>
    );
};

interface StatCardProps {
    label: string;
    value: string;
    accent?: boolean;
    icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    accent = false,
    icon,
}) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e0db",
            borderRadius: { xs: 1.8, sm: 2 },
            p: { xs: 1.1, sm: 1.4 },
            boxShadow: "0 8px 25px rgba(33, 30, 27, 0.06)",
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
                    fontSize: 8,
                    fontWeight: 700,
                    color: "#89817a",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                }}
            >
                {label}
            </Typography>

            {icon && (
                <Box
                    sx={{
                        color: accent ? "#ff5c35" : "#211e1b",
                        display: "flex",
                        "& svg": {
                            fontSize: 15,
                        },
                    }}
                >
                    {icon}
                </Box>
            )}
        </Box>

        <Typography
            sx={{
                mt: 0.6,
                fontSize: { xs: 17, sm: 19 },
                fontWeight: 800,
                color: accent ? "#ff5c35" : "#211e1b",
            }}
        >
            {value}
        </Typography>
    </Box>
);

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => (
    <Box
        sx={{
            width: { xs: 86, sm: 100 },
            height: { xs: 86, sm: 100 },
            borderRadius: "50%",
            border: "7px solid #403b37",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            alignSelf: { xs: "center", md: "auto" },
        }}
    >
        <Box
            sx={{
                position: "absolute",
                inset: -7,
                borderRadius: "50%",
                border: "7px solid transparent",
                borderTopColor: "#ff5c35",
                borderRightColor: "#ff5c35",
                transform: "rotate(25deg)",
            }}
        />

        <Box
            sx={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: 21, sm: 25 },
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                }}
            >
                {score}%
            </Typography>

            <Typography
                sx={{
                    mt: 0.35,
                    fontSize: 7,
                    fontWeight: 700,
                    color: "#aaa29b",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                }}
            >
                Score
            </Typography>
        </Box>
    </Box>
);

const SummaryMetric: React.FC<{
    icon: React.ReactNode;
    value: string;
    label: string;
}> = ({ icon, value, label }) => (
    <Box
        sx={{
            px: { xs: 0.5, sm: 1.2 },
            py: { xs: 0.8, sm: 0 },
            borderLeft: { sm: "1px solid #403b37" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
        }}
    >
        <Box
            sx={{
                display: "flex",
                color: "#ff8b6d",
                mb: 0.5,
                "& svg": {
                    fontSize: 15,
                },
            }}
        >
            {icon}
        </Box>

        <Typography
            sx={{
                fontSize: { xs: 14, sm: 16 },
                fontWeight: 800,
                color: "#ffffff",
            }}
        >
            {value}
        </Typography>

        <Typography
            sx={{
                mt: 0.15,
                fontSize: 7.5,
                color: "#aaa29b",
                textAlign: { xs: "center", sm: "left" },
            }}
        >
            {label}
        </Typography>
    </Box>
);

const SectionTitle: React.FC<{
    title: string;
    subtitle: string;
}> = ({ title, subtitle }) => (
    <Box>
        <Typography
            sx={{
                fontSize: { xs: 11, sm: 12 },
                fontWeight: 800,
                color: "#211e1b",
            }}
        >
            {title}
        </Typography>

        <Typography
            sx={{
                mt: 0.25,
                fontSize: 8.5,
                color: "#8a827b",
            }}
        >
            {subtitle}
        </Typography>
    </Box>
);

const WeightCard: React.FC<{
    week: string;
    weight: number;
    active?: boolean;
}> = ({ week, weight, active = false }) => (
    <Box
        sx={{
            backgroundColor: active ? "#fff3ee" : "#f8f6f4",
            border: `1px solid ${active ? "#f3d5ca" : "#e7e2dd"}`,
            borderRadius: 1.8,
            p: 1.1,
        }}
    >
        <Typography
            sx={{
                fontSize: 8,
                fontWeight: 700,
                color: active ? "#ff5c35" : "#89817a",
                textTransform: "uppercase",
            }}
        >
            {week}
        </Typography>

        <Typography
            sx={{
                mt: 0.5,
                fontSize: 17,
                fontWeight: 800,
                color: "#211e1b",
            }}
        >
            {weight.toFixed(1)}
            <Typography
                component="span"
                sx={{
                    ml: 0.3,
                    fontSize: 8,
                    fontWeight: 600,
                    color: "#8e867f",
                }}
            >
                kg
            </Typography>
        </Typography>
    </Box>
);

const DayCard: React.FC<{
    day: string;
    completed: boolean;
    active?: boolean;
}> = ({ day, completed, active = false }) => (
    <Box
        sx={{
            minWidth: { xs: 48, sm: 58 },
            height: { xs: 52, sm: 62 },
            borderRadius: 1.7,
            backgroundColor: active
                ? "#211e1b"
                : completed
                    ? "#fff3ee"
                    : "#f4f1ee",
            border: `1px solid ${active
                    ? "#211e1b"
                    : completed
                        ? "#f3d5ca"
                        : "#e5e0db"
                }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.4,
        }}
    >
        <Typography
            sx={{
                fontSize: 9,
                fontWeight: 800,
                color: active
                    ? "#ffffff"
                    : completed
                        ? "#ff5c35"
                        : "#99918a",
            }}
        >
            {day}
        </Typography>

        <Box
            sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: completed ? "#ff5c35" : "#d3cec9",
            }}
        />
    </Box>
);

const WeeklyMetric: React.FC<{
    value: string;
    label: string;
    bordered?: boolean;
}> = ({ value, label, bordered = false }) => (
    <Box
        sx={{
            px: { xs: 0, sm: 1.5 },
            py: { xs: 1, sm: 0.5 },
            borderLeft: {
                sm: bordered ? "1px solid #e4dfda" : "none",
            },
            borderTop: {
                xs: bordered ? "1px solid #e4dfda" : "none",
                sm: "none",
            },
            textAlign: { xs: "center", sm: "left" },
        }}
    >
        <Typography
            sx={{
                fontSize: { xs: 18, sm: 20 },
                fontWeight: 800,
                color: "#211e1b",
            }}
        >
            {value}
        </Typography>

        <Typography
            sx={{
                mt: 0.25,
                fontSize: 8,
                color: "#8c847d",
            }}
        >
            {label}
        </Typography>
    </Box>
);

export default ProgressShowcase;