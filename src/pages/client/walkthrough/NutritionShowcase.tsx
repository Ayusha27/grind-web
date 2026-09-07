import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { WALKTHROUGH_NUTRITION } from "./walkthroughData";

const ORANGE = "#ff5c35";
const CREAM = "#f5f2ed";
const DARK = "#151515";
const GREEN = "#18b95d";

interface NutritionShowcaseProps {
    spotlight?: boolean;
}

type MealOption = {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
};

type Meal = {
    name: string;
    options: MealOption[];
};

type SelectedMeals = Record<number, number | null>;

const NutritionShowcase = ({
    spotlight = false,
}: NutritionShowcaseProps) => {
    const nutrition = WALKTHROUGH_NUTRITION;
    const meals = nutrition.meals as Meal[];

    /*
     * Local-only demo state.
     * Nothing here is saved to the real Diet page or backend.
     */
    const [selectedMeals, setSelectedMeals] =
        useState<SelectedMeals>(() => createEmptySelections(meals.length));

    /*
     * Small automatic demo:
     * one meal is selected every 1.8 seconds so the walkthrough
     * visibly demonstrates how Today's Nutrition changes.
     *
     * User clicks are still supported and immediately replace
     * the current selection for that meal section.
     */
    const [autoStep, setAutoStep] = useState(0);

    /*
     * The top bar is intentionally FIXED.
     * It represents the dashboard snapshot and does not react
     * to meal selection below.
     */
    const TOP_BAR_STATS = {
        mealsLogged: "3/4",
        dayComplete: "68%",
        calories: 350,
    };

    /*
     * Auto demo progressively selects one meal from each section.
     * This demonstrates that breakfast, lunch, snack and dinner
     * can all be logged at the same time.
     */
    useEffect(() => {
        if (meals.length === 0) return;

        const timer = window.setInterval(() => {
            setAutoStep((current) => current + 1);
        }, 1800);

        return () => window.clearInterval(timer);
    }, [meals.length]);

    useEffect(() => {
        if (meals.length === 0 || autoStep === 0) return;

        /*
         * Build a simple sequence:
         * 1. Breakfast
         * 2. Breakfast + Lunch
         * 3. Breakfast + Lunch + Snack
         * 4. Breakfast + Lunch + Snack + Dinner
         * 5. Reset
         */
        const completedMeals = autoStep % (meals.length + 1);

        if (completedMeals === 0) {
            setSelectedMeals(createEmptySelections(meals.length));
            return;
        }

        setSelectedMeals((current) => {
            const next = { ...current };

            for (
                let mealIndex = 0;
                mealIndex < completedMeals && mealIndex < meals.length;
                mealIndex += 1
            ) {
                if (next[mealIndex] === null || next[mealIndex] === undefined) {
                    next[mealIndex] = 0;
                }
            }

            return next;
        });
    }, [autoStep, meals.length]);

    const totals = useMemo(() => {
        return meals.reduce(
            (sum, meal, mealIndex) => {
                const optionIndex = selectedMeals[mealIndex];

                if (
                    optionIndex === null ||
                    optionIndex === undefined ||
                    !meal.options[optionIndex]
                ) {
                    return sum;
                }

                const option = meal.options[optionIndex];

                return {
                    calories: sum.calories + option.calories,
                    protein: sum.protein + option.protein,
                    carbs: sum.carbs + option.carbs,
                    fat: sum.fat + option.fat,
                    fibre: sum.fibre + option.fibre,
                };
            },
            {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                fibre: 0,
            },
        );
    }, [meals, selectedMeals]);

    const caloriePercent = Math.min(
        Math.round((totals.calories / nutrition.calories) * 100),
        100,
    );

    const handleMealSelect = (
        mealIndex: number,
        optionIndex: number,
    ) => {
        setSelectedMeals((current) => ({
            ...current,
            [mealIndex]:
                current[mealIndex] === optionIndex
                    ? null
                    : optionIndex,
        }));
    };

    const resetDiet = () => {
        setSelectedMeals(createEmptySelections(meals.length));
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
                animation: "nutritionShowcaseIn 500ms ease-out",
                "@keyframes nutritionShowcaseIn": {
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
            ===================================================== */}
            <Box
                sx={{
                    backgroundColor: DARK,
                    color: "#fff",
                    minHeight: { xs: 45, sm: 52, md: 58 },
                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: { xs: 1.5, sm: 2, md: 2.5 },
                        minWidth: { xs: 100, sm: 145, md: 180 },
                        borderRight: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: 14, sm: 17, md: 20 },
                            fontWeight: 900,
                            letterSpacing: "0.16em",
                        }}
                    >
                        GRIND
                        <Box component="span" sx={{ color: ORANGE }}>
                            .
                        </Box>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                >
                    <MiniHeaderStat
                        value={TOP_BAR_STATS.mealsLogged}
                        label="MEALS LOGGED"
                    />
                    <MiniHeaderStat
                        value={TOP_BAR_STATS.dayComplete}
                        label="DAY COMPLETE"
                    />
                    <MiniHeaderStat
                        value={TOP_BAR_STATS.calories}
                        label="~KCAL TODAY"
                        accent
                    />
                </Box>
            </Box>

            {/* =====================================================
                PERIOD / NAVIGATION
            ===================================================== */}
            <Box
                sx={{
                    backgroundColor: "#111214",
                    px: { xs: 1.5, sm: 2, md: 2.5 },
                    py: { xs: 0.8, sm: 1 },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
            >
                <Typography
                    sx={{
                        color: "#777",
                        fontSize: { xs: 7, sm: 8, md: 9 },
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                    }}
                >
                    LOGGING TO
                </Typography>

                <PeriodButton>Month 1</PeriodButton>

                <Typography sx={{ color: "#555", fontSize: 10 }}>
                    |
                </Typography>

                <PeriodButton>Week 1</PeriodButton>

                <Box
                    sx={{
                        ml: "auto",
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: ORANGE,
                        }}
                    />
                    <Typography
                        sx={{
                            color: ORANGE,
                            fontSize: { sm: 7, md: 8 },
                            fontWeight: 700,
                        }}
                    >
                        AUTO-SYNCING TO PROGRESS
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
                TABS
            ===================================================== */}
            <Box
                sx={{
                    backgroundColor: DARK,
                    color: "#fff",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    display: "flex",
                    alignItems: "stretch",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <DashboardTab label="🏆 WORKOUT" />
                <DashboardTab label="◉ DIET" active />
                <DashboardTab label="▥ PROGRESS" />
            </Box>

            {/* =====================================================
                CONTENT
            ===================================================== */}
            <Box
                sx={{
                    px: { xs: 1.25, sm: 1.75, md: 2 },
                    py: { xs: 1.25, sm: 1.75, md: 2 },
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 1, sm: 1.25, md: 1.5 },
                    position: "relative",
                }}
            >
                {/* AI Nutrition header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: "#211e1b",
                                fontSize: { xs: 15, sm: 18, md: 21 },
                                fontWeight: 800,
                                lineHeight: 1.15,
                            }}
                        >
                            AI Nutrition Plan
                        </Typography>
                        <Typography
                            sx={{
                                mt: 0.35,
                                color: "#837b74",
                                fontSize: { xs: 8, sm: 9, md: 10 },
                            }}
                        >
                            Personalized by GRIND AI
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.45,
                            flexShrink: 0,
                        }}
                    >
                        <LocalDrinkRoundedIcon
                            sx={{
                                color: "#59b6e6",
                                fontSize: { xs: 17, sm: 20, md: 23 },
                            }}
                        />
                        <Typography
                            sx={{
                                color: "#211e1b",
                                fontSize: { xs: 11, sm: 13, md: 15 },
                                fontWeight: 800,
                            }}
                        >
                            {nutrition.water}
                        </Typography>
                    </Box>
                </Box>

                {/* =================================================
                    TODAY'S NUTRITION
                ================================================== */}
                <Box
                    sx={{
                        backgroundColor: DARK,
                        borderRadius: { xs: 2, md: 2.5 },
                        p: { xs: 1.35, sm: 1.7, md: 2 },
                        color: "#fff",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#817b76",
                            fontSize: { xs: 6.5, sm: 7, md: 8 },
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                        }}
                    >
                        TODAY'S NUTRITION
                    </Typography>

                    <Box
                        sx={{
                            mt: 0.55,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.7,
                        }}
                    >
                        <LocalFireDepartmentRoundedIcon
                            sx={{
                                color: ORANGE,
                                fontSize: { xs: 22, sm: 25, md: 28 },
                            }}
                        />

                        <Typography
                            sx={{
                                color: "#fff",
                                fontSize: { xs: 21, sm: 25, md: 30 },
                                fontWeight: 800,
                                lineHeight: 1,
                                fontFamily: "monospace",
                                letterSpacing: "0.03em",
                            }}
                        >
                            {totals.calories} / {nutrition.calories} kcal
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 1.3,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(2, minmax(0, 1fr))",
                                sm: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: 0.8,
                        }}
                    >
                        <NutritionStat
                            label="PROTEIN"
                            value={totals.protein}
                            target={nutrition.protein}
                        />
                        <NutritionStat
                            label="CARBS"
                            value={totals.carbs}
                            target={nutrition.carbs}
                        />
                        <NutritionStat
                            label="FAT"
                            value={totals.fat}
                            target={nutrition.fat}
                        />
                        <NutritionStat
                            label="FIBRE"
                            value={totals.fibre}
                            target={nutrition.fibre}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 1.1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={resetDiet}
                            startIcon={
                                <RestartAltRoundedIcon
                                    sx={{ fontSize: "13px !important" }}
                                />
                            }
                            sx={{
                                minWidth: 0,
                                px: 1,
                                py: 0.45,
                                border: "1px solid #77716c",
                                borderRadius: 1,
                                color: "#a49d97",
                                fontSize: { xs: 6, sm: 6.5, md: 7 },
                                fontWeight: 700,
                                textTransform: "none",
                                "&:hover": {
                                    borderColor: "#aaa39d",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                },
                            }}
                        >
                            Reset Today's Diet
                        </Button>

                        <Typography
                            sx={{
                                color: "#9a938d",
                                fontSize: { xs: 6.5, sm: 7, md: 8 },
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {caloriePercent}% Complete
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 0.55,
                            height: { xs: 4, sm: 5 },
                            borderRadius: 99,
                            backgroundColor: "#4b4845",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                width: `${caloriePercent}%`,
                                height: "100%",
                                borderRadius: 99,
                                backgroundColor: ORANGE,
                                transition:
                                    "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        />
                    </Box>
                </Box>

                {/* Plan title */}
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #ded9d4",
                        borderRadius: 1.5,
                        px: { xs: 1.25, sm: 1.5 },
                        py: { xs: 0.9, sm: 1.1 },
                    }}
                >
                    <Typography
                        sx={{
                            color: "#242220",
                            fontSize: { xs: 11, sm: 13, md: 15 },
                            fontWeight: 800,
                        }}
                    >
                        {nutrition.planName}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 0.25,
                            color: "#8a827b",
                            fontSize: { xs: 6.5, sm: 7.5, md: 8 },
                        }}
                    >
                        Choose one option from each meal. Your daily nutrition
                        updates as you log each choice.
                    </Typography>
                </Box>

                {/* =================================================
                    MEALS
                ================================================== */}
                {meals.map((meal, mealIndex) => (
                    <MealSection
                        key={`${meal.name}-${mealIndex}`}
                        meal={meal}
                        mealIndex={mealIndex}
                        selectedOption={selectedMeals[mealIndex] ?? null}
                        onSelect={handleMealSelect}
                    />
                ))}
            </Box>
        </Box>
    );
};

/* ===============================================================
   HELPERS
================================================================ */

const createEmptySelections = (count: number): SelectedMeals =>
    Array.from({ length: count }).reduce<SelectedMeals>(
        (result, _, index) => {
            result[index] = null;
            return result;
        },
        {},
    );

const MiniHeaderStat = ({
    value,
    label,
    accent = false,
}: {
    value: string | number;
    label: string;
    accent?: boolean;
}) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
        }}
    >
        <Typography
            sx={{
                color: accent ? ORANGE : "#fff",
                fontSize: { xs: 10, sm: 12, md: 15 },
                fontWeight: 800,
                lineHeight: 1,
            }}
        >
            {value}
        </Typography>
        <Typography
            sx={{
                color: "#777",
                fontSize: { xs: 4.5, sm: 5.5, md: 6 },
                fontWeight: 700,
                letterSpacing: "0.1em",
                mt: 0.35,
            }}
        >
            {label}
        </Typography>
    </Box>
);

const PeriodButton = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <Box
        sx={{
            border: "1px solid #3b3b3d",
            borderRadius: 0.8,
            px: { xs: 0.8, sm: 1 },
            py: { xs: 0.35, sm: 0.45 },
        }}
    >
        <Typography
            sx={{
                color: "#ddd",
                fontSize: { xs: 6, sm: 7, md: 8 },
            }}
        >
            {children}
        </Typography>
    </Box>
);

const DashboardTab = ({
    label,
    active = false,
}: {
    label: string;
    active?: boolean;
}) => (
    <Box
        sx={{
            flex: 1,
            py: { xs: 0.7, sm: 0.9 },
            textAlign: "center",
            borderBottom: active
                ? `2px solid ${ORANGE}`
                : "2px solid transparent",
        }}
    >
        <Typography
            sx={{
                color: active ? "#fff" : "#777",
                fontSize: { xs: 6, sm: 7, md: 8 },
                fontWeight: 800,
                letterSpacing: "0.06em",
            }}
        >
            {label}
        </Typography>
    </Box>
);

const NutritionStat = ({
    label,
    value,
    target,
}: {
    label: string;
    value: number;
    target: number;
}) => {
    const percentage = Math.min(
        Math.round((value / target) * 100),
        100,
    );

    return (
        <Box
            sx={{
                backgroundColor: "#211e1b",
                border: "1px solid #383431",
                borderRadius: 1.2,
                px: { xs: 0.8, sm: 1 },
                py: { xs: 0.7, sm: 0.8 },
            }}
        >
            <Typography
                sx={{
                    color: "#8b847e",
                    fontSize: { xs: 5.5, sm: 6, md: 6.5 },
                    fontWeight: 700,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    mt: 0.3,
                    color: "#fff",
                    fontSize: { xs: 9, sm: 10, md: 11 },
                    fontWeight: 800,
                }}
            >
                {value} / {target} g
            </Typography>

            <Box
                sx={{
                    mt: 0.55,
                    height: 3,
                    borderRadius: 99,
                    backgroundColor: "#393532",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: `${percentage}%`,
                        height: "100%",
                        borderRadius: 99,
                        backgroundColor: ORANGE,
                        transition: "width 500ms ease",
                    }}
                />
            </Box>
        </Box>
    );
};

interface MealSectionProps {
    meal: Meal;
    mealIndex: number;
    selectedOption: number | null;
    onSelect: (mealIndex: number, optionIndex: number) => void;
}

const MealSection = ({
    meal,
    mealIndex,
    selectedOption,
    onSelect,
}: MealSectionProps) => {
    const orangeTheme = mealIndex % 2 === 0;
    const selectedMeal = selectedOption !== null;
    const accent = orangeTheme ? ORANGE : "#211e1b";

    return (
        <Box
            sx={{
                backgroundColor: orangeTheme ? "#fff3ee" : "#f1efec",
                border: `1px solid ${orangeTheme ? "#f3d5ca" : "#d9d4ce"
                    }`,
                borderRadius: { xs: 2, md: 2.5 },
                p: { xs: 1, sm: 1.25, md: 1.5 },
            }}
        >
            {/* Section header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 27, sm: 31, md: 35 },
                            height: { xs: 27, sm: 31, md: 35 },
                            borderRadius: 1,
                            backgroundColor: orangeTheme
                                ? "#ffe2d8"
                                : "#e4e0db",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <RestaurantRoundedIcon
                            sx={{
                                color: accent,
                                fontSize: { xs: 15, sm: 17, md: 19 },
                            }}
                        />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                color: "#211e1b",
                                fontSize: { xs: 10, sm: 11, md: 12 },
                                fontWeight: 800,
                            }}
                        >
                            {meal.name}
                        </Typography>
                        <Typography
                            sx={{
                                color: "#837b74",
                                fontSize: { xs: 6, sm: 6.5, md: 7 },
                            }}
                        >
                            Choose one meal for your day
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        px: 0.8,
                        py: 0.45,
                        borderRadius: 99,
                        backgroundColor: selectedMeal
                            ? orangeTheme
                                ? "#dff8e8"
                                : "#e0f3e7"
                            : orangeTheme
                                ? "#ffe2d8"
                                : "#e4e0db",
                        flexShrink: 0,
                    }}
                >
                    <Typography
                        sx={{
                            color: selectedMeal ? GREEN : accent,
                            fontSize: { xs: 5.5, sm: 6, md: 6.5 },
                            fontWeight: 800,
                        }}
                    >
                        {selectedMeal ? "1 SELECTED" : "CHOOSE ONE"}
                    </Typography>
                </Box>
            </Box>

            {/* Meal options */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: `repeat(${Math.min(meal.options.length, 3)}, minmax(0, 1fr))`,
                    },
                    gap: { xs: 0.8, sm: 1 },
                }}
            >
                {meal.options.map((option, optionIndex) => {
                    const selected = selectedOption === optionIndex;

                    return (
                        <MealOptionCard
                            key={option.name}
                            option={option}
                            selected={selected}
                            orangeTheme={orangeTheme}
                            onClick={() => onSelect(mealIndex, optionIndex)}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

const MealOptionCard = ({
    option,
    selected,
    orangeTheme,
    onClick,
}: {
    option: MealOption;
    selected: boolean;
    orangeTheme: boolean;
    onClick: () => void;
}) => {
    const accent = orangeTheme ? ORANGE : "#211e1b";

    return (
        <Box
            sx={{
                backgroundColor: selected ? "#f0fff6" : "#fff",
                border: selected
                    ? `2px solid ${GREEN}`
                    : "1px solid #ded9d4",
                borderRadius: { xs: 1.6, sm: 1.8 },
                p: { xs: 1, sm: 1.15 },
                cursor: "pointer",
                transition:
                    "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease",
                boxShadow: selected
                    ? "0 8px 22px rgba(24,185,93,0.10)"
                    : "0 5px 16px rgba(33,30,27,0.04)",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 22px rgba(33,30,27,0.08)",
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 0.7,
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        sx={{
                            color: "#211e1b",
                            fontSize: { xs: 9, sm: 10, md: 11 },
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        {option.name}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.35,
                            color: ORANGE,
                            fontSize: { xs: 6.5, sm: 7, md: 7.5 },
                            fontWeight: 800,
                        }}
                    >
                        {option.calories} • {option.protein} protein
                    </Typography>
                </Box>

                <Box
                    sx={{
                        px: 0.7,
                        py: 0.45,
                        borderRadius: 0.9,
                        backgroundColor: selected
                            ? "#1dbd62"
                            : "#fff0ea",
                        color: selected ? "#fff" : accent,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.25,
                    }}
                >
                    {selected && (
                        <CheckRoundedIcon sx={{ fontSize: 10 }} />
                    )}
                    <Typography
                        sx={{
                            fontSize: { xs: 5.5, sm: 6, md: 6.5 },
                            fontWeight: 800,
                        }}
                    >
                        {selected ? "ADDED" : "ADD MEAL"}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: 0.85,
                    pt: 0.75,
                    borderTop: "1px dashed #ded9d4",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 0.35,
                }}
            >
                <MealMetric label="CALORIES" value={`${option.calories}`} />
                <MealMetric label="PROTEIN" value={`${option.protein}`} />
                <MealMetric label="CARBS" value={`${option.carbs}`} />
                <MealMetric label="FAT" value={`${option.fat}`} />
                <MealMetric label="FIBRE" value={`${option.fibre}`} />
            </Box>

            <Box
                sx={{
                    mt: 0.75,
                    border: selected
                        ? `1px solid ${GREEN}`
                        : "1px solid #ded9d4",
                    borderRadius: 1,
                    py: 0.55,
                    textAlign: "center",
                    backgroundColor: selected ? "#f7fffa" : "#fff",
                }}
            >
                <Typography
                    sx={{
                        color: selected ? GREEN : "#77716b",
                        fontSize: { xs: 5.5, sm: 6, md: 6.5 },
                        fontWeight: 800,
                        letterSpacing: 0.4,
                    }}
                >
                    {selected ? "I HAD THIS ✓" : "TRACK THIS"}
                </Typography>
            </Box>
        </Box>
    );
};

const MealMetric = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <Box>
        <Typography
            sx={{
                color: "#aaa39c",
                fontSize: { xs: 4.5, sm: 5, md: 5.5 },
                fontWeight: 700,
            }}
        >
            {label}
        </Typography>
        <Typography
            sx={{
                mt: 0.15,
                color: "#302e2b",
                fontSize: { xs: 6.5, sm: 7, md: 7.5 },
                fontWeight: 800,
            }}
        >
            {value}
        </Typography>
    </Box>
);

export default NutritionShowcase;
