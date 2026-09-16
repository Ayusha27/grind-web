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
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(6, 1fr)",
                    },
                    gap: 1,
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
        </Box>
    );
};

export default EnrollmentNextSteps;
