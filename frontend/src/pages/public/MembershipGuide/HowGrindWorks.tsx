import { Box, Container, Typography } from "@mui/material";

const steps = [
  "Complete the Fitness Assessment",
  "AI Creates Your Programme",
  "Coach Reviews & Refines",
  "Receive Dashboard Access",
  "Begin Your Transformation",
];

const HowGrindWorks = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 38, md: 50 },
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
            mb: 5,
          }}
        >
          How GRIND Works
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={step}
              sx={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.025)",
                minHeight: 110,
                p: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                {index + 1}. {step}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowGrindWorks;