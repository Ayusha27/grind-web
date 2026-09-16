import { Box, Button, Typography } from "@mui/material";

export type ExpertService = {
    id: string;
    title: string;
    price: number;
    description: string;
    highlight?: string;
    buttonText: string;
};

export type EnrollmentExpertServicesProps = {
    selectedServices?: string[];
    onToggle?: (serviceId: string) => void;
    onPurchase?: (service: ExpertService) => void;
};

export const services: ExpertService[] = [
    {
        id: "lifestyle",
        title: "Lifestyle Consultation",
        price: 1599,
        description:
            "Personalized guidance on nutrition habits, lifestyle optimization, fitness plateaus and sustainable transformation planning.",
        highlight:
            "Included free in 6 Month Transformation and 12 Month Lifestyle Evolution plans.",
        buttonText: "BOOK CONSULTATION",
    },
    {
        id: "nutrition",
        title: "Personalized Nutrition Programme",
        price: 4999,
        description:
            "Receive a comprehensive nutrition assessment from a Certified & Experienced Functional Nutritionist, including blood report review, medical history evaluation and a personalized nutrition plan designed around your health and fitness goals.",
        highlight:
            "Ideal for individuals managing PCOS, Diabetes, Thyroid Disorders, High Cholesterol, Fatty Liver, Digestive Health and other medical or lifestyle conditions.",
        buttonText: "BOOK NUTRITION PROGRAMME",
    },
    {
        id: "workout-variant",
        title: "Additional Workout Variant",
        price: 599,
        description:
            "Unlock an additional workout variant beyond those included in your programme.",
        highlight:
            "Ideal when you want greater exercise variety, need a change in training style, or are ready for a new challenge.",
        buttonText: "PURCHASE VARIANT",
    },
];

const EnrollmentExpertServices = ({
    selectedServices = [],
    onToggle,
    onPurchase,
}: EnrollmentExpertServicesProps) => {
    const handleServiceClick = (serviceId: string) => {
        onToggle?.(serviceId);
    };

    const handlePurchaseClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        service: ExpertService
    ) => {
        event.stopPropagation();
        onPurchase?.(service);
    };

    return (
        <Box
            sx={{
                mt: { xs: 7, md: 9 },
            }}
        >
            <Box
                sx={{
                    width: 42,
                    height: 2,
                    backgroundColor: "#ff8a2a",
                    mb: 2,
                }}
            />

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
                EXPERT SERVICES
            </Typography>

            <Typography
                sx={{
                    color: "#777",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: {
                        xs: 10,
                        md: 11,
                    },
                    lineHeight: 1.75,
                    maxWidth: 760,
                    mb: 3.5,
                }}
            >
                Access expert services delivered by experienced coaches and
                certified professionals to provide deeper personalization and
                support throughout your fitness journey. These services can be
                booked independently or alongside your GRIND membership.
            </Typography>

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
                {services.map((service) => {
                    const selected =
                        selectedServices.includes(
                            service.id
                        );

                    return (
                        <Box
                            key={service.id}
                            onClick={() =>
                                handleServiceClick(
                                    service.id
                                )
                            }
                            sx={{
                                border: selected
                                    ? "1px solid #ff8a2a"
                                    : "1px solid #242424",
                                backgroundColor:
                                    "#0d0d0d",
                                p: {
                                    xs: 2.5,
                                    md: 3,
                                },
                                cursor:
                                    onToggle
                                        ? "pointer"
                                        : "default",
                                transition:
                                    "border-color 0.2s ease",

                                "&:hover": {
                                    borderColor:
                                        onToggle
                                            ? "#555"
                                            : "#242424",
                                },

                                display: "flex",
                                flexDirection:
                                    "column",
                            }}
                        >
                            <Typography
                                sx={{
                                    color:
                                        "#f5f5f0",
                                    fontFamily:
                                        '"Bebas Neue", sans-serif',
                                    fontSize: {
                                        xs: 23,
                                        md: 25,
                                    },
                                    lineHeight:
                                        1.05,
                                    mb: 1.5,
                                }}
                            >
                                {service.title}
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "#777",
                                    fontFamily:
                                        '"Inter", sans-serif',
                                    fontSize: 10,
                                    lineHeight:
                                        1.65,
                                    minHeight: {
                                        md: 52,
                                    },
                                }}
                            >
                                {
                                    service.description
                                }
                            </Typography>

                            {service.highlight && (
                                <Typography
                                    sx={{
                                        color:
                                            "#999",
                                        fontFamily:
                                            '"Inter", sans-serif',
                                        fontSize:
                                            9,
                                        lineHeight:
                                            1.6,
                                        mt: 2,
                                    }}
                                >
                                    {
                                        service.highlight
                                    }
                                </Typography>
                            )}

                            <Box
                                sx={{
                                    mt: 3,
                                    pt: 2,
                                    borderTop:
                                        "1px solid #242424",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:
                                            "#ff8a2a",
                                        fontFamily:
                                            '"Bebas Neue", sans-serif',
                                        fontSize: 28,
                                        lineHeight:
                                            1,
                                    }}
                                >
                                    ₹
                                    {service.price.toLocaleString(
                                        "en-IN"
                                    )}
                                </Typography>
                            </Box>

                            <Button
                                type="button"
                                onClick={(event) =>
                                    handlePurchaseClick(
                                        event,
                                        service
                                    )
                                }
                                disableRipple
                                sx={{
                                    mt: 3,
                                    width: "100%",
                                    minHeight: {
                                        xs: 40,
                                        md: 40,
                                    },
                                    borderRadius: 0,
                                    border:
                                        "1px solid #ff8a2a",
                                    backgroundColor:
                                        "#ff8a2a",
                                    color:
                                        "#050505",
                                    fontFamily:
                                        '"Inter", sans-serif',
                                    fontSize: {
                                        xs: 10,
                                        md: 11,
                                    },
                                    fontWeight: 700,
                                    letterSpacing:
                                        "0.3px",
                                    textTransform:
                                        "uppercase",
                                    px: 1.5,

                                    "&:hover": {
                                        backgroundColor:
                                            "#ff8a2a",
                                        borderColor:
                                            "#ff8a2a",
                                    },
                                }}
                            >
                                {
                                    service.buttonText
                                }
                            </Button>
                        </Box>
                    );
                })}
            </Box>

            <Typography
                sx={{
                    color: "#777",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: {
                        xs: 8.5,
                        md: 9.5,
                    },
                    lineHeight: 1.7,
                    mt: 3,
                }}
            >
                AI-generated nutrition guidance included with all GRIND
                memberships is intended for educational purposes only.
                Personalized Nutrition Programmes are delivered by a Certified
                Functional Nutritionist. Individuals with medical conditions
                should consult their healthcare professional before making
                significant dietary or lifestyle changes.
            </Typography>
        </Box>
    );
};

export default EnrollmentExpertServices;