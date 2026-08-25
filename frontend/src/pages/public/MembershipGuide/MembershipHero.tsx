import { Box, Container, Typography } from "@mui/material";

const MembershipHero = () => {
  return (
    <Box
      component="section"
      sx={{
        pt: {
          xs: 10,
          md: 14,
        },
        pb: {
          xs: 10,
          md: 14,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: {
                xs: 13,
                md: 15,
              },
              fontWeight: 500,
              letterSpacing: 3,
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            Membership & Pricing Guide
          </Typography>

          <Typography
            component="h1"
            sx={{
              color: "text.primary",
              fontSize: {
                xs: 48,
                sm: 64,
                md: 82,
                lg: 96,
              },
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            Personalized Fitness.
            <br />
            Powered by AI.
            <br />
            Reviewed by Experts.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              maxWidth: 850,
              mx: "auto",
              mt: 4,
              fontSize: {
                xs: 14,
                md: 16,
              },
              lineHeight: 1.8,
            }}
          >
            Every GRIND programme is generated using AI and carefully reviewed
            by a human coach before delivery. This guide provides an overview
            of our membership plans, what's included, and optional services to
            help you choose the right journey for your goals.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipHero;