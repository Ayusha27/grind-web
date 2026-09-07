import { Box, Container, Typography } from "@mui/material";

const reasons = [
  {
    title: "AI + Human Expertise",
    description:
      "Every programme is AI-generated and reviewed by a coach.",
  },
  {
    title: "Personalized Plans",
    description:
      "Designed around your goals, lifestyle and experience.",
  },
  {
    title: "Progress Tracking",
    description:
      "Track workouts and progress from your dashboard.",
  },
  {
    title: "Sustainable Results",
    description:
      "Built to create habits—not quick fixes.",
  },
];

const WhyGrind = () => {
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
            fontSize: {
              xs: 38,
              md: 50,
            },
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
            mb: 6,
          }}
        >
          Why GRIND?
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
          {reasons.map((reason) => (
            <Box
              key={reason.title}
              sx={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.025)",
                minHeight: 175,
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 18, md: 19 },
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                {reason.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              >
                {reason.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyGrind;