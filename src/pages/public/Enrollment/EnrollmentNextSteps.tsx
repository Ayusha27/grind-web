import { Box, Typography } from "@mui/material";

const steps = [
    {
        number: "01",
        title: "COMPLETE INTAKE FORM",
        description:
            "Provide your personal, fitness, lifestyle and health details.",
    },
    {
        number: "02",
        title: "AI ASSESSMENT GENERATED",
        description:
            "Your information is analysed to build your initial assessment.",
    },
    {
        number: "03",
        title: "EXPERT REVIEW",
        description:
            "Our experts review your assessment and identify the right approach.",
    },
    {
        number: "04",
        title: "PROGRAMME FINALIZED",
        description:
            "Your personalized programme is prepared based on your goals and needs.",
    },
    {
        number: "05",
        title: "PLAN DELIVERED VIA EMAIL",
        description:
            "Your programme details and private access link are sent to your email.",
    },
    {
        number: "06",
        title: "START TRAINING",
        description:
            "Access your programme and begin your GRIND journey.",
    },
];

const EnrollmentNextSteps = () => {
    return (
        <Box
            sx={{
                mt: { xs: 7, md: 8 },
            }}
        >
            {/* Section heading */}
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
                WHAT HAPPENS NEXT
            </Typography>

            {/* Steps */}
            <Box
                sx={{
                    width: "100%",
                    minWidth: 0,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "none",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(6, 1fr)",
                    },
                    gap: 1,

                    "@media (max-width:599px)": {
                        display: "flex",
                        overflowX: "auto",
                        flexWrap: "nowrap",
                        gap: 1.25,
                        pb: 1,
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    },
                }}
            >
                {steps.map((step) => (
                    <Box
                        key={step.number}
                        sx={{
                            minHeight: {
                                xs: 170,
                                sm: 185,
                                lg: 205,
                            },
                            border: "1px solid #242424",
                            backgroundColor: "#0d0d0d",
                            p: {
                                xs: 2,
                                md: 2.2,
                            },
                            display: "flex",
                            flexDirection: "column",
                            
                            "@media (max-width:599px)": {
                                flex: "0 0 82%",
                                maxWidth: "82%",
                                scrollSnapAlign: "start",
                            },
                        }}
                    >
                        {/* Number */}
                        <Typography
                            sx={{
                                color: "#ff8a2a",
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: {
                                    xs: 22,
                                    md: 25,
                                },
                                lineHeight: 1,
                                letterSpacing: "0.5px",
                            }}
                        >
                            {step.number}
                        </Typography>

                        {/* Title */}
                        <Typography
                            sx={{
                                color: "#f5f5f0",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: {
                                    xs: 11,
                                    md: 11.5,
                                },
                                fontWeight: 600,
                                lineHeight: 1.35,
                                letterSpacing: "0.2px",
                                mt: 2,
                            }}
                        >
                            {step.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                            sx={{
                                color: "#666",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 10.5,
                                lineHeight: 1.65,
                                mt: 1.2,
                            }}
                        >
                            {step.description}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Mobile swipe hint */}
            <Box
                sx={{
                    display: { xs: "flex", sm: "none" },
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 0.75,
                    mt: 1,
                    pr: 1
                }}
            >
                <Typography
                    sx={{
                        fontSize: 9,
                        color: "#666",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        letterSpacing: 0.2,
                    }}
                >
                    Swipe for next steps
                </Typography>
                <Typography
                    sx={{
                        fontSize: 10,
                        color: "#ff8a2a",
                        lineHeight: 1,
                    }}
                >
                    →
                </Typography>
            </Box>
        </Box>
    );
};

export default EnrollmentNextSteps;
