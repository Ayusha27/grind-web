import { Box, Divider, Typography } from "@mui/material";

type EnrollmentSummaryProps = {
    planName: string;
    planPrice: number;
    discountPercent?: number;
    couponCode?: string;
};

const EnrollmentSummary = ({
    planName,
    planPrice,
    discountPercent = 0,
    couponCode = "",
}: EnrollmentSummaryProps) => {
    const discountAmount =
        discountPercent > 0
            ? Math.round((planPrice * discountPercent) / 100)
            : 0;

    const finalPrice = Math.max(planPrice - discountAmount, 0);

    return (
        <Box
            sx={{
                mt: { xs: 6, md: 7 },
            }}
        >
            {/* Heading */}
            <Typography
                component="h2"
                sx={{
                    color: "#f5f5f0",
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: {
                        xs: 32,
                        sm: 38,
                        md: 42,
                    },
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: "0.3px",
                    m: 0,
                    mb: { xs: 3, md: 3.5 },
                }}
            >
                ORDER SUMMARY
            </Typography>

            {/* Summary card */}
            <Box
                sx={{
                    border: "1px solid #242424",
                    backgroundColor: "#0d0d0d",
                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 3.5,
                    },
                }}
            >
                {/* Selected plan */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 3,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: "#666",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 9,
                                fontWeight: 600,
                                letterSpacing: "1.4px",
                                textTransform: "uppercase",
                                mb: 0.7,
                            }}
                        >
                            SELECTED PLAN
                        </Typography>

                        <Typography
                            sx={{
                                color: "#f5f5f0",
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: {
                                    xs: 24,
                                    md: 28,
                                },
                                lineHeight: 1.05,
                            }}
                        >
                            {planName}
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            color: "#f5f5f0",
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: {
                                xs: 26,
                                md: 30,
                            },
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                        }}
                    >
                        ₹{planPrice.toLocaleString("en-IN")}
                    </Typography>
                </Box>

                {/* Divider */}
                <Divider
                    sx={{
                        my: 2.5,
                        borderColor: "#242424",
                    }}
                />

                {/* Original price */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#777",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 11,
                        }}
                    >
                        Programme Fee
                    </Typography>

                    <Typography
                        sx={{
                            color: "#aaa",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 11,
                        }}
                    >
                        ₹{planPrice.toLocaleString("en-IN")}
                    </Typography>
                </Box>

                {/* Discount */}
                {discountAmount > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#777",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 11,
                            }}
                        >
                            Referral Discount
                            {couponCode ? ` (${couponCode})` : ""}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#ff8a2a",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 11,
                            }}
                        >
                            -₹{discountAmount.toLocaleString("en-IN")}
                        </Typography>
                    </Box>
                )}

                {/* Final total */}
                <Box
                    sx={{
                        mt: 2.5,
                        pt: 2.5,
                        borderTop: "1px solid #242424",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#f5f5f0",
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: {
                                xs: 20,
                                md: 23,
                            },
                            letterSpacing: "0.3px",
                        }}
                    >
                        TOTAL
                    </Typography>

                    <Typography
                        sx={{
                            color: "#ff8a2a",
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: {
                                xs: 30,
                                md: 36,
                            },
                            lineHeight: 1,
                        }}
                    >
                        ₹{finalPrice.toLocaleString("en-IN")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default EnrollmentSummary;