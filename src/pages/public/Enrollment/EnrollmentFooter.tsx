import { Box, Typography } from "@mui/material";

const EnrollmentFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: { xs: 8, md: 10 },
                borderTop: "1px solid #242424",
                backgroundColor: "#050505",
                py: { xs: 4, md: 5 },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1280,
                    mx: "auto",
                    px: {
                        xs: 2.5,
                        sm: 3,
                        md: 4,
                    },
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    alignItems: {
                        xs: "flex-start",
                        md: "center",
                    },
                    justifyContent: "space-between",
                    gap: 3,
                }}
            >
                {/* Social */}
                <Typography
                    component="a"
                    href="https://www.instagram.com/grindfit.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: "#777",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.2px",
                        textDecoration: "none",
                        transition: "color 0.2s ease",

                        "&:hover": {
                            color: "#ff8a2a",
                        },
                    }}
                >
                    ◎ Follow @grindfit.ai
                </Typography>

                {/* Support */}
                <Typography
                    sx={{
                        color: "#666",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 10,
                        lineHeight: 1.5,
                    }}
                >
                    Need support? Contact us at{" "}
                    <Box
                        component="a"
                        href="mailto:support.grindfit.ai@trenddma.com"
                        sx={{
                            color: "#888",
                            textDecoration: "none",

                            "&:hover": {
                                color: "#ff8a2a",
                            },
                        }}
                    >
                        support.grindfit.ai@trenddma.com
                    </Box>
                </Typography>

                {/* Brand */}
                <Typography
                    sx={{
                        color: "#555",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "1px",
                    }}
                >
                    GRIND AI • POWERED BY TREND
                </Typography>
            </Box>
        </Box>
    );
};

export default EnrollmentFooter;
