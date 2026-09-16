import { Box, Typography } from "@mui/material";

type EnrollmentSuccessProps = {
    programmeLink?: string;
    onContinue?: () => void;
};

const EnrollmentSuccess = ({
    programmeLink,
    onContinue,
}: EnrollmentSuccessProps) => {
    return (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 8, md: 12 },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 760,
                    border: "1px solid #242424",
                    backgroundColor: "#0d0d0d",
                    textAlign: "center",
                    px: { xs: 3, sm: 5, md: 7 },
                    py: { xs: 5, sm: 6, md: 7 },
                }}
            >
                {/* Status */}
                <Typography
                    sx={{
                        color: "#ff8a2a",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2px",
                        mb: 2,
                    }}
                >
                    ENROLLMENT COMPLETE
                </Typography>

                {/* Main heading */}
                <Typography
                    component="h1"
                    sx={{
                        color: "#f5f5f0",
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: {
                            xs: 42,
                            sm: 52,
                            md: 64,
                        },
                        fontWeight: 400,
                        lineHeight: 0.95,
                        letterSpacing: "0.5px",
                        m: 0,
                    }}
                >
                    YOU'RE IN.
                </Typography>

                <Typography
                    sx={{
                        color: "#888",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: {
                            xs: 11,
                            md: 12,
                        },
                        lineHeight: 1.7,
                        maxWidth: 560,
                        mx: "auto",
                        mt: 2.5,
                    }}
                >
                    Your enrollment has been successfully completed.
                    Your personalized GRIND AI programme is now being
                    prepared for you.
                </Typography>

                {/* Programme link */}
                {programmeLink && (
                    <Box
                        sx={{
                            mt: 4,
                            p: 2,
                            border: "1px solid #242424",
                            backgroundColor: "#080808",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#666",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 9,
                                letterSpacing: "1px",
                                mb: 1,
                            }}
                        >
                            YOUR PRIVATE PROGRAMME LINK
                        </Typography>

                        <Typography
                            component="a"
                            href={programmeLink}
                            sx={{
                                color: "#ff8a2a",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 11,
                                fontWeight: 600,
                                textDecoration: "none",
                                wordBreak: "break-all",

                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {programmeLink}
                        </Typography>
                    </Box>
                )}

                {/* Continue button */}
                {onContinue && (
                    <Box
                        component="button"
                        type="button"
                        onClick={onContinue}
                        sx={{
                            mt: 4,
                            border: "none",
                            backgroundColor: "#ff8a2a",
                            color: "#050505",
                            cursor: "pointer",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "1.3px",
                            px: 4,
                            py: 1.7,
                            transition: "background-color 0.2s ease",

                            "&:hover": {
                                backgroundColor: "#ff9a47",
                            },
                        }}
                    >
                        CONTINUE TO YOUR PROGRAMME
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EnrollmentSuccess;