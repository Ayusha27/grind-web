import { Box, Typography } from "@mui/material";

const terms = [
    "GRIND AI provides personalized fitness and wellness programmes based on the information submitted during the intake and assessment process.",
    "The programme is intended to provide general fitness, nutrition and lifestyle guidance and is not a substitute for professional medical advice, diagnosis or treatment.",
    "You are responsible for providing accurate and complete information regarding your health, fitness level, lifestyle, injuries and limitations.",
    "You should consult a qualified medical professional before beginning any exercise or nutrition programme if you have an existing medical condition, injury or other health concern.",
    "Results vary between individuals and GRIND AI does not guarantee specific weight loss, muscle gain, fitness or health outcomes.",
    "Membership and additional services are subject to the programme duration, pricing and inclusions selected during enrollment.",
    "Programme access is personal to the enrolled member and private programme links or credentials must not be shared with others.",
    "Payments made for programmes and additional services are subject to the applicable cancellation, refund and service terms.",
    "By completing enrollment, you confirm that you have read, understood and agreed to these Terms & Conditions.",
];

const EnrollmentTerms = () => {
    return (
        <Box>
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
                    mb: {
                        xs: 3,
                        md: 3.5,
                    },
                }}
            >
                TERMS & CONDITIONS
            </Typography>

            <Box
                component="ol"
                sx={{
                    m: 0,
                    pl: {
                        xs: 2,
                        md: 2.5,
                    },

                    "& li": {
                        color: "#999",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: {
                            xs: 10.5,
                            md: 11.5,
                        },
                        lineHeight: 1.75,
                        pl: 0.8,
                        mb: 1.5,
                    },

                    "& li:last-child": {
                        mb: 0,
                    },

                    "& li::marker": {
                        color: "#ff8a2a",
                        fontSize: 11,
                    },
                }}
            >
                {terms.map((term) => (
                    <li key={term}>
                        <Typography
                            component="span"
                            sx={{
                                color: "inherit",
                                fontFamily: "inherit",
                                fontSize: "inherit",
                                lineHeight: "inherit",
                            }}
                        >
                            {term}
                        </Typography>
                    </li>
                ))}
            </Box>
        </Box>
    );
};

export default EnrollmentTerms;