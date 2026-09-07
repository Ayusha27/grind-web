import { Box, Container, Typography } from "@mui/material";

import howGrindWorks from "../../../assets/how-grind-works (1).jpg";

const HowGrindWorks = () => {
  return (
    <Box
      component="section"
      id="how-grind-works"
      sx={{
        py: {
          xs: 8,
          md: 12,
        },
        backgroundColor: "#0b0b0b",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Heading */}
        <Box
          sx={{
            textAlign: "center",
            mb: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 14,
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            HOW GRIND WORKS
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 40,
                sm: 52,
                md: 64,
              },
              lineHeight: 0.95,
              maxWidth: 1000,
              mx: "auto",
            }}
          >
            YOUR FITNESS JOURNEY IN FIVE SIMPLE STEPS
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              mx: "auto",
              mt: 3,
              color: "text.secondary",
              fontSize: {
                xs: 15,
                md: 17,
              },
              lineHeight: 1.7,
            }}
          >
            From your assessment to your personalized dashboard, every
            workout and nutrition plan is AI-generated, professionally
            reviewed, and delivered securely to you.
          </Typography>
        </Box>

        {/* Infographic */}
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            src={howGrindWorks}
            alt="How GRIND works in five steps"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HowGrindWorks;