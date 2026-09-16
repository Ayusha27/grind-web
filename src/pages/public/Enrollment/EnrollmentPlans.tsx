import { Box, Button, Typography } from "@mui/material";

export type EnrollmentPlan = {
    id: "3m" | "6m" | "12m";
    name: string;
    price: number;
    badge?: string;
    description: string;
    features: string[];
    buttonText: string;
};

type EnrollmentPlansProps = {
    plans: EnrollmentPlan[];
    selectedPlanId: EnrollmentPlan["id"] | null;
    onSelect: (plan: EnrollmentPlan) => void;
    discountPercent?: number;
    disabled?: boolean;
    loadingPlanId?: string | null;
};

/*
 * Membership Guide benefit calculations.
 *
 * 3M:
 * (₹3,499 - ₹0) / 4 months = ₹874.75 → ₹875
 *
 * 6M:
 * (₹7,999 - ₹2,198) / 8 months = ₹725.125 → ₹725
 *
 * 12M:
 * (₹12,999 - ₹5,594) / 15 months = ₹493.67 → ₹494
 */
const membershipValueData: Record<
    EnrollmentPlan["id"],
    {
        accessMonths: number;
        benefitValue: number;
        bonusItems: string[];
    }
> = {
    "3m": {
        accessMonths: 4,
        benefitValue: 0,
        bonusItems: [],
    },

    "6m": {
        accessMonths: 8,
        benefitValue: 2198,
        bonusItems: [
            "Lifestyle Consultation (Worth ₹1,599)",
            "Workout Refresh (Worth ₹599)",
        ],
    },

    "12m": {
        accessMonths: 15,
        benefitValue: 5594,
        bonusItems: [
            "2 Lifestyle Consultations (Worth ₹3,198)",
            "4 Workout Refreshes (Worth ₹2,396)",
        ],
    },
};

const EnrollmentPlans = ({
    plans,
    selectedPlanId,
    onSelect,
    discountPercent = 0,
    disabled = false,
    loadingPlanId = null,
}: EnrollmentPlansProps) => {
    const hasDiscount = discountPercent > 0;

    console.log("🔥 PLAN DISCOUNT:", {
        discountPercent,
        hasDiscount,
    });

    return (
        <Box
            sx={{
                mt: { xs: 7, md: 9 },
            }}
        >
            {/* SECTION TITLE */}
            <Typography
                component="h2"
                sx={{
                    color: "#f5f5f0",
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: {
                        xs: 32,
                        md: 42,
                    },
                    lineHeight: 1,
                    fontWeight: 400,
                    m: 0,
                    mb: 3.5,
                }}
            >
                CHOOSE YOUR PROGRAMME
            </Typography>

            {/* PLAN CARDS */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(3, 1fr)",
                    },
                    gap: 2,
                }}
            >
                {plans.map((plan) => {
                    const selected =
                        selectedPlanId === plan.id;

                    const valueData =
                        membershipValueData[plan.id];

                    /*
                     * Coupon discount
                     */
                    const discountAmount = hasDiscount
                        ? Math.round(
                            (plan.price * discountPercent) /
                            100
                        )
                        : 0;

                    /*
                     * Actual amount customer pays
                     */
                    const priceAfterDiscount =
                        Math.max(
                            plan.price -
                            discountAmount,
                            0
                        );

                    /*
                     * Effective monthly value
                     */
                    const effectiveValue =
                        Math.max(
                            priceAfterDiscount -
                            valueData.benefitValue,
                            0
                        );

                    const monthlyPrice =
                        Math.round(
                            effectiveValue /
                            valueData.accessMonths
                        );

                    const isLoading =
                        loadingPlanId === plan.id;

                    console.log(
                        "🔥 PLAN CALCULATION:",
                        plan.id,
                        {
                            originalPrice:
                                plan.price,
                            discountPercent,
                            discountAmount,
                            priceAfterDiscount,
                            benefitValue:
                                valueData.benefitValue,
                            accessMonths:
                                valueData.accessMonths,
                            monthlyPrice,
                        }
                    );

                    return (
                        <Box
                            key={plan.id}
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection:
                                    "column",
                                border: selected
                                    ? "1px solid #ff8a2a"
                                    : "1px solid #242424",
                                backgroundColor:
                                    "#0d0d0d",
                                p: {
                                    xs: 2.5,
                                    md: 3,
                                },
                                minHeight: {
                                    md: 410,
                                },
                            }}
                        >
                            {/* BADGE */}
                            {plan.badge && (
                                <Box
                                    sx={{
                                        position:
                                            "absolute",
                                        top: 0,
                                        right: 0,
                                        backgroundColor:
                                            "#ff8a2a",
                                        color: "#050505",
                                        px: 1.5,
                                        py: 0.7,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                '"Inter", sans-serif',
                                            fontSize: 8,
                                            fontWeight: 800,
                                            letterSpacing:
                                                "0.8px",
                                        }}
                                    >
                                        {plan.badge}
                                    </Typography>
                                </Box>
                            )}

                            {/* DURATION */}
                            <Typography
                                sx={{
                                    color: "#ff8a2a",
                                    fontFamily:
                                        '"Inter", sans-serif',
                                    fontSize: 9,
                                    fontWeight: 700,
                                    letterSpacing:
                                        "1.3px",
                                    mb: 1.5,
                                }}
                            >
                                {plan.id === "3m"
                                    ? "03 MONTHS"
                                    : plan.id === "6m"
                                        ? "06 MONTHS"
                                        : "12 MONTHS"}
                            </Typography>

                            {/* PLAN NAME */}
                            <Typography
                                sx={{
                                    color: "#f5f5f0",
                                    fontFamily:
                                        '"Bebas Neue", sans-serif',
                                    fontSize: {
                                        xs: 27,
                                        md: 30,
                                    },
                                    lineHeight: 1,
                                    mb: 1.5,
                                    pr: plan.badge
                                        ? 2
                                        : 0,
                                }}
                            >
                                {plan.name}
                            </Typography>

                            {/* PRICING */}
                            <Box
                                sx={{
                                    mb: 1.5,
                                }}
                            >
                                {/* ORIGINAL PRICE */}
                                {hasDiscount && (
                                    <Typography
                                        sx={{
                                            color: "#777",
                                            fontFamily:
                                                '"Bebas Neue", sans-serif',
                                            fontSize: {
                                                xs: 22,
                                                md: 25,
                                            },
                                            lineHeight: 1,
                                            textDecoration:
                                                "line-through",
                                            textDecorationThickness:
                                                "2px",
                                            mb: 0.5,
                                        }}
                                    >
                                        ₹
                                        {plan.price.toLocaleString(
                                            "en-IN"
                                        )}
                                    </Typography>
                                )}

                                {/* CURRENT / DISCOUNTED PRICE */}
                                <Typography
                                    sx={{
                                        color: "#f5f5f0",
                                        fontFamily:
                                            '"Bebas Neue", sans-serif',
                                        fontSize: {
                                            xs: 42,
                                            md: 48,
                                        },
                                        lineHeight: 0.95,
                                    }}
                                >
                                    ₹
                                    {priceAfterDiscount.toLocaleString(
                                        "en-IN"
                                    )}
                                </Typography>

                                {/* MONTHLY PRICE */}
                                <Typography
                                    sx={{
                                        color: "#ff8a2a",
                                        fontFamily:
                                            '"Inter", sans-serif',
                                        fontSize: 10,
                                        fontWeight: 600,
                                        mt: 0.7,
                                    }}
                                >
                                    ₹
                                    {monthlyPrice.toLocaleString(
                                        "en-IN"
                                    )}{" "}
                                    / month*
                                </Typography>
                            </Box>

                            {/* DESCRIPTION */}
                            <Typography
                                sx={{
                                    color: "#777",
                                    fontFamily:
                                        '"Inter", sans-serif',
                                    fontSize: 10,
                                    lineHeight: 1.65,
                                    mb: 2,
                                }}
                            >
                                {plan.description}
                            </Typography>

                            {/* FEATURES */}
                            <Box
                                component="ul"
                                sx={{
                                    m: 0,
                                    pl: 2,
                                    mb: 2,
                                    flexGrow: 1,

                                    "& li": {
                                        color: "#d0d0d0",
                                        fontFamily:
                                            '"Inter", sans-serif',
                                        fontSize: 9.5,
                                        lineHeight: 1.5,
                                        mb: 0.8,
                                        pl: 0.3,
                                    },
                                }}
                            >
                                {plan.features.map(
                                    (feature) => (
                                        <li
                                            key={feature}
                                        >
                                            {feature}
                                        </li>
                                    )
                                )}
                            </Box>

                            {/* INCLUDED BENEFITS */}
                            {valueData
                                .bonusItems.length >
                                0 && (
                                    <Box
                                        sx={{
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#ff8a2a",
                                                fontFamily:
                                                    '"Inter", sans-serif',
                                                fontSize: 8.5,
                                                fontWeight: 700,
                                                letterSpacing:
                                                    "0.8px",
                                                mb: 0.8,
                                            }}
                                        >
                                            INCLUDED
                                            BENEFITS
                                        </Typography>

                                        {valueData.bonusItems.map(
                                            (item) => (
                                                <Typography
                                                    key={
                                                        item
                                                    }
                                                    sx={{
                                                        color: "#888",
                                                        fontFamily:
                                                            '"Inter", sans-serif',
                                                        fontSize: 8.5,
                                                        lineHeight:
                                                            1.45,
                                                        mb: 0.35,
                                                    }}
                                                >
                                                    •{" "}
                                                    {item}
                                                </Typography>
                                            )
                                        )}

                                        <Typography
                                            sx={{
                                                color: "#aaa",
                                                fontFamily:
                                                    '"Inter", sans-serif',
                                                fontSize: 8.5,
                                                fontWeight: 600,
                                                mt: 0.7,
                                            }}
                                        >
                                            Total benefit
                                            value: ₹
                                            {valueData.benefitValue.toLocaleString(
                                                "en-IN"
                                            )}
                                        </Typography>
                                    </Box>
                                )}

                            {/* PURCHASE BUTTON */}
                            <Button
                                type="button"
                                disabled={
                                    disabled ||
                                    isLoading
                                }
                                onClick={() =>
                                    onSelect(plan)
                                }
                                sx={{
                                    width: "100%",
                                    borderRadius: 0,
                                    backgroundColor:
                                        disabled ||
                                            isLoading
                                            ? "#555"
                                            : "#171717",
                                    color:
                                        disabled ||
                                            isLoading
                                            ? "#999"
                                            : "#f5f5f0",
                                    border: "1px solid #ff8a2a",
                                    fontFamily:
                                        '"Inter", sans-serif',
                                    fontSize: 9,
                                    fontWeight: 800,
                                    letterSpacing:
                                        "0.8px",
                                    py: 1.5,
                                    cursor:
                                        disabled ||
                                            isLoading
                                            ? "not-allowed"
                                            : "pointer",
                                    opacity:
                                        disabled
                                            ? 0.65
                                            : 1,

                                    "&:hover": {
                                        backgroundColor:
                                            disabled ||
                                                isLoading
                                                ? "#555"
                                                : "#ff8a2a",
                                        color:
                                            disabled ||
                                                isLoading
                                                ? "#999"
                                                : "#050505",
                                        borderColor:
                                            "#ff8a2a",
                                    },

                                    "&:disabled": {
                                        cursor:
                                            "not-allowed",
                                    },
                                }}
                            >
                                {isLoading
                                    ? "PROCESSING..."
                                    : plan.buttonText}
                            </Button>
                        </Box>
                    );
                })}
            </Box>

            {/* MONTHLY VALUE NOTE */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mt: 4,
                }}
            >
                <Box
                    sx={{
                        height: "1px",
                        flex: 1,
                        maxWidth: 100,
                        backgroundColor:
                            "rgba(255,122,0,0.45)",
                    }}
                />

                <Typography
                    sx={{
                        color: "#666",
                        textAlign: "center",
                        fontFamily:
                            '"Inter", sans-serif',
                        fontSize: {
                            xs: 9,
                            md: 10,
                        },
                        lineHeight: 1.7,
                        px: 1,
                    }}
                >
                    *Monthly pricing is calculated
                    based on the benefits included and
                    the duration of your dashboard
                    access.
                </Typography>

                <Box
                    sx={{
                        height: "1px",
                        flex: 1,
                        maxWidth: 100,
                        backgroundColor:
                            "rgba(255,122,0,0.45)",
                    }}
                />
            </Box>
        </Box>
    );
};

export default EnrollmentPlans;