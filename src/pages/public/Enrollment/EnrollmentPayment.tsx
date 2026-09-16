import { Box, Typography } from "@mui/material";

type EnrollmentPaymentProps = {
    amount: number;
    onPayment: () => void;
    disabled?: boolean;
    loading?: boolean;
};

const EnrollmentPayment = ({
    amount,
    onPayment,
    disabled = false,
    loading = false,
}: EnrollmentPaymentProps) => {
    return (
        <Box
            sx={{
                mt: { xs: 5, md: 6 },
                mb: { xs: 7, md: 9 },
            }}
        >
            <Box
                sx={{
                    border: "1px solid #242424",
                    backgroundColor: "#0d0d0d",
                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 3.5,
                    },
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "#777",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                        mb: 1,
                    }}
                >
                    SECURE YOUR PROGRAMME
                </Typography>

                <Typography
                    sx={{
                        color: "#f5f5f0",
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: {
                            xs: 30,
                            md: 38,
                        },
                        lineHeight: 1,
                        mb: 2.5,
                    }}
                >
                    ₹{amount.toLocaleString("en-IN")}
                </Typography>

                <Box
                    component="button"
                    type="button"
                    disabled={disabled || loading}
                    onClick={onPayment}
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        border: "none",
                        outline: "none",
                        cursor:
                            disabled || loading ? "not-allowed" : "pointer",
                        backgroundColor:
                            disabled || loading ? "#555" : "#ff8a2a",
                        color: "#050505",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "1.4px",
                        py: 1.8,
                        px: 3,
                        transition: "all 0.2s ease",

                        "&:hover": {
                            backgroundColor:
                                disabled || loading ? "#555" : "#ff9a47",
                        },

                        "&:disabled": {
                            opacity: 0.65,
                        },
                    }}
                >
                    {loading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
                </Box>

                <Typography
                    sx={{
                        color: "#555",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 9,
                        lineHeight: 1.6,
                        mt: 1.8,
                    }}
                >
                    You will be redirected to Razorpay to complete
                    your secure payment.
                </Typography>
            </Box>
        </Box>
    );
};

export default EnrollmentPayment;
