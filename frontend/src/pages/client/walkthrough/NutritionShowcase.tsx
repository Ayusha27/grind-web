import React from "react";
import { Box, Typography } from "@mui/material";
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import WalkthroughDashboardFrame from "./WalkthroughDashboardFrame";
import { WALKTHROUGH_NUTRITION } from "./walkthroughData";

interface NutritionShowcaseProps {
    spotlight?: boolean;
}

interface MealOption {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface Meal {
    name: string;
    options: MealOption[];
}

const NutritionShowcase: React.FC<NutritionShowcaseProps> = ({
    spotlight = true,
}) => {
    const nutrition = WALKTHROUGH_NUTRITION;

    return (
        <WalkthroughDashboardFrame
            activeSection="diet"
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
                {/* =====================================================
            HEADER
        ===================================================== */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        justifyContent: "space-between",
                        gap: 1.5,
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 17,
                                    sm: 20,
                                    md: 23,
                                },
                                fontWeight: 800,
                                color: "#211e1b",
                                lineHeight: 1.15,
                            }}
                        >
                            AI Nutrition Plan
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: {
                                    xs: 9.5,
                                    sm: 10.5,
                                },
                                color: "#837b74",
                            }}
                        >
                            Personalized nutrition built around your goals
                        </Typography>
                    </Box>

                    {/* Demo label */}
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

                {/* =====================================================
            CALORIE TARGET
        ===================================================== */}
                <Box
                    sx={{
                        backgroundColor: "#fff3ee",
                        border: "1px solid #f3d5ca",
                        borderRadius: {
                            xs: 2.5,
                            md: 3,
                        },
                        p: {
                            xs: 1.5,
                            sm: 2,
                            md: 2.5,
                        },
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        gap: {
                            xs: 1.5,
                            md: 2.5,
                        },
                        alignItems: {
                            xs: "stretch",
                            md: "center",
                        },
                        boxShadow: spotlight
                            ? "0 18px 45px rgba(255, 92, 53, 0.12)"
                            : "0 10px 30px rgba(33, 30, 27, 0.08)",
                        transition:
                            "box-shadow 400ms ease, transform 400ms ease",
                        transform: spotlight
                            ? "translateY(-1px)"
                            : "none",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 9,
                                fontWeight: 800,
                                letterSpacing: 0.8,
                                textTransform: "uppercase",
                                color: "#ff5c35",
                            }}
                        >
                            Daily target
                        </Typography>

                        <Box
                            sx={{
                                mt: 0.5,
                                display: "flex",
                                alignItems: "baseline",
                                gap: 0.7,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 28,
                                        sm: 34,
                                        md: 38,
                                    },
                                    fontWeight: 800,
                                    color: "#211e1b",
                                    lineHeight: 1,
                                }}
                            >
                                {nutrition.calories}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color: "#817971",
                                }}
                            >
                                kcal / day
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                mt: 0.7,
                                fontSize: 9.5,
                                color: "#817971",
                            }}
                        >
                            Your personalized daily nutrition target
                        </Typography>
                    </Box>

                    <NutritionProgress value={72} />
                </Box>

                {/* =====================================================
            MACROS
        ===================================================== */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            sm: "repeat(4, minmax(0, 1fr))",
                        },
                        gap: {
                            xs: 1,
                            sm: 1.2,
                        },
                    }}
                >
                    <MacroCard
                        label="Protein"
                        value={`${nutrition.protein}g`}
                        percentage={34}
                        orange
                    />

                    <MacroCard
                        label="Carbs"
                        value={`${nutrition.carbs}g`}
                        percentage={44}
                    />

                    <MacroCard
                        label="Fat"
                        value={`${nutrition.fat}g`}
                        percentage={22}
                    />

                    <MacroCard
                        label="Fibre"
                        value={`${nutrition.fibre}g`}
                        percentage={15}
                    />
                </Box>

                {/* =====================================================
            PLAN INFORMATION
        ===================================================== */}
                <Box
                    sx={{
                        backgroundColor: "#211e1b",
                        borderRadius: {
                            xs: 2,
                            md: 2.5,
                        },
                        p: {
                            xs: 1.4,
                            sm: 1.7,
                        },
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        gap: 1.2,
                    }}
                >
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            backgroundColor: "#332f2c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ff8b6d",
                            flexShrink: 0,
                        }}
                    >
                        <RestaurantRoundedIcon
                            sx={{
                                fontSize: 17,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 10.5,
                                    sm: 11.5,
                                },
                                fontWeight: 800,
                                color: "#ffffff",
                            }}
                        >
                            {nutrition.planName}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.25,
                                fontSize: 8.5,
                                color: "#aaa29b",
                            }}
                        >
                            Meals selected to support your nutrition goals
                        </Typography>
                    </Box>

                    {/* Water */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.6,
                            px: 1,
                            py: 0.6,
                            borderRadius: 1.5,
                            backgroundColor: "#302c29",
                            flexShrink: 0,
                        }}
                    >
                        <LocalDrinkRoundedIcon
                            sx={{
                                fontSize: 15,
                                color: "#ff8b6d",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 8.5,
                                fontWeight: 700,
                                color: "#ffffff",
                            }}
                        >
                            {nutrition.water}
                        </Typography>
                    </Box>
                </Box>

                {/* =====================================================
            MEALS
        ===================================================== */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.2,
                    }}
                >
                    {nutrition.meals.map((meal, index) => (
                        <MealSectionPreview
                            key={`${meal.name}-${index}`}
                            meal={meal}
                            index={index}
                        />
                    ))}
                </Box>
            </Box>
        </WalkthroughDashboardFrame>
    );
};

/* ===============================================================
   CALORIE PROGRESS
================================================================ */

const NutritionProgress: React.FC<{
    value: number;
}> = ({ value }) => (
    <Box
        sx={{
            width: {
                xs: "100%",
                md: 180,
            },
            flexShrink: 0,
        }}
    >
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.6,
            }}
        >
            <Typography
                sx={{
                    fontSize: 8.5,
                    fontWeight: 700,
                    color: "#80776f",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                }}
            >
                Daily progress
            </Typography>

            <Typography
                sx={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#ff5c35",
                }}
            >
                {value}%
            </Typography>
        </Box>

        <Box
            sx={{
                height: 7,
                backgroundColor: "#f1ddd6",
                borderRadius: 10,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: `${value}%`,
                    height: "100%",
                    backgroundColor: "#ff5c35",
                    borderRadius: 10,
                    transition: "width 700ms ease",
                }}
            />
        </Box>
    </Box>
);

/* ===============================================================
   MACRO CARD
================================================================ */

interface MacroCardProps {
    label: string;
    value: string;
    percentage: number;
    orange?: boolean;
}

const MacroCard: React.FC<MacroCardProps> = ({
    label,
    value,
    percentage,
    orange = false,
}) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e0db",
            borderRadius: {
                xs: 1.8,
                sm: 2,
            },
            p: {
                xs: 1.1,
                sm: 1.4,
            },
            boxShadow:
                "0 8px 25px rgba(33, 30, 27, 0.06)",
        }}
    >
        <Typography
            sx={{
                fontSize: 8.5,
                fontWeight: 700,
                color: "#8a827b",
                textTransform: "uppercase",
                letterSpacing: 0.5,
            }}
        >
            {label}
        </Typography>

        <Box
            sx={{
                mt: 0.4,
                display: "flex",
                alignItems: "baseline",
                gap: 0.4,
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: 17,
                        sm: 19,
                    },
                    fontWeight: 800,
                    color: "#211e1b",
                }}
            >
                {value}
            </Typography>

            <Typography
                sx={{
                    fontSize: 7.5,
                    color: "#9a928b",
                }}
            >
                target
            </Typography>
        </Box>

        <Box
            sx={{
                mt: 0.8,
                height: 4,
                backgroundColor: "#eeeae6",
                borderRadius: 10,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: `${Math.min(
                        percentage * 2.2,
                        100,
                    )}%`,
                    height: "100%",
                    backgroundColor: orange
                        ? "#ff5c35"
                        : "#211e1b",
                    borderRadius: 10,
                }}
            />
        </Box>
    </Box>
);

/* ===============================================================
   MEAL SECTION
================================================================ */

interface MealSectionPreviewProps {
    meal: Meal;
    index: number;
}

const MealSectionPreview: React.FC<
    MealSectionPreviewProps
> = ({ meal, index }) => {
    const orangeTheme = index % 2 === 0;

    /*
     * The walkthrough data contains multiple meal options.
     * We display the first option as the recommended option
     * and the remaining options as alternatives.
     */
    const recommendedOption = meal.options?.[0];

    const alternativeOptions = meal.options?.slice(1) ?? [];

    if (!recommendedOption) {
        return null;
    }

    return (
        <Box
            sx={{
                backgroundColor: orangeTheme
                    ? "#fff3ee"
                    : "#f1efec",
                border: `1px solid ${orangeTheme
                        ? "#f3d5ca"
                        : "#d9d4ce"
                    }`,
                borderRadius: {
                    xs: 2,
                    md: 2.5,
                },
                p: {
                    xs: 1.3,
                    sm: 1.5,
                },
                boxShadow:
                    "0 8px 25px rgba(33, 30, 27, 0.05)",
            }}
        >
            {/* Meal heading */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Box
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: 0.7,
                            color: orangeTheme
                                ? "#ff5c35"
                                : "#211e1b",
                            textTransform: "uppercase",
                        }}
                    >
                        {getMealLabel(index)}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.35,
                            fontSize: {
                                xs: 11,
                                sm: 12,
                            },
                            fontWeight: 800,
                            color: "#211e1b",
                        }}
                    >
                        {meal.name}
                    </Typography>
                </Box>

                {/* Recommended badge */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 0.8,
                        py: 0.45,
                        borderRadius: 1.2,
                        backgroundColor: orangeTheme
                            ? "#ffe4dc"
                            : "#e4e0db",
                        flexShrink: 0,
                    }}
                >
                    <CheckCircleRoundedIcon
                        sx={{
                            fontSize: 13,
                            color: orangeTheme
                                ? "#ff5c35"
                                : "#211e1b",
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 7.5,
                            fontWeight: 800,
                            color: orangeTheme
                                ? "#ff5c35"
                                : "#211e1b",
                        }}
                    >
                        RECOMMENDED
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          RECOMMENDED OPTION
      ===================================================== */}
            <Box
                sx={{
                    mt: 1,
                    p: {
                        xs: 1,
                        sm: 1.2,
                    },
                    borderRadius: 1.7,
                    backgroundColor: "#ffffff",
                    border:
                        "1px solid rgba(33, 30, 27, 0.07)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 10,
                            sm: 11,
                        },
                        fontWeight: 800,
                        color: "#211e1b",
                    }}
                >
                    {recommendedOption.name}
                </Typography>

                <Box
                    sx={{
                        mt: 0.9,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.7,
                    }}
                >
                    <NutritionPill
                        label="Calories"
                        value={`${recommendedOption.calories}`}
                        orange={orangeTheme}
                    />

                    <NutritionPill
                        label="Protein"
                        value={`${recommendedOption.protein}g`}
                        orange={orangeTheme}
                    />

                    <NutritionPill
                        label="Carbs"
                        value={`${recommendedOption.carbs}g`}
                        orange={orangeTheme}
                    />

                    <NutritionPill
                        label="Fat"
                        value={`${recommendedOption.fat}g`}
                        orange={orangeTheme}
                    />
                </Box>
            </Box>

            {/* =====================================================
          ALTERNATIVE OPTIONS
      ===================================================== */}
            {alternativeOptions.length > 0 && (
                <Box
                    sx={{
                        mt: 0.8,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.6,
                    }}
                >
                    {alternativeOptions.map((option) => (
                        <Box
                            key={option.name}
                            sx={{
                                px: 0.8,
                                py: 0.5,
                                borderRadius: 1,
                                backgroundColor:
                                    "rgba(255, 255, 255, 0.6)",
                                border:
                                    "1px solid rgba(33, 30, 27, 0.05)",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 7.5,
                                    color: "#756e68",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {option.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

/* ===============================================================
   NUTRITION PILL
================================================================ */

const NutritionPill: React.FC<{
    label: string;
    value: string;
    orange: boolean;
}> = ({ label, value }) => (
    <Box
        sx={{
            px: 0.75,
            py: 0.45,
            borderRadius: 1,
            backgroundColor: "#ffffff",
            border:
                "1px solid rgba(33, 30, 27, 0.07)",
        }}
    >
        <Typography
            component="span"
            sx={{
                fontSize: 7,
                color: "#918982",
            }}
        >
            {label}{" "}
        </Typography>

        <Typography
            component="span"
            sx={{
                fontSize: 7.5,
                fontWeight: 800,
                color: "#211e1b",
            }}
        >
            {value}
        </Typography>
    </Box>
);

/* ===============================================================
   MEAL LABEL
================================================================ */

const getMealLabel = (index: number): string => {
    const labels = [
        "Breakfast",
        "Lunch",
        "Snack",
        "Dinner",
    ];

    return labels[index] ?? "Meal";
};

export default NutritionShowcase;