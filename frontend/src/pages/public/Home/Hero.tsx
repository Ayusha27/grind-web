import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import heroImage from "../../../assets/problem-section.jpg";

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: {
          xs: "calc(100vh - 84px)",
          md: "calc(100vh - 84px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",

        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.78),
            rgba(0, 0, 0, 0.88)
          ),
          url(${heroImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          mx: "auto",
          px: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: 48,
              sm: 64,
              md: 82,
              lg: 92,
            },
            lineHeight: 0.92,
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          FITNESS ISN'T ABOUT MOTIVATION.
          <br />
          IT'S ABOUT HAVING A PLAN.
        </Typography>

        <Typography
          sx={{
            maxWidth: 760,
            mx: "auto",
            mt: 3,
            mb: 3.5,
            fontSize: {
              xs: 16,
              md: 18,
            },
            lineHeight: 1.5,
            color: "#f5f5f0",
          }}
        >
          Most people don't fail because they lack discipline. They fail
          because they're following random workouts, generic diets and advice
          that wasn't built for them.
        </Typography>

        <Button
          component={RouterLink}
          to="/start-your-journey"
          variant="contained"
          color="primary"
          sx={{
            height: 48,
            px: 3,
            borderRadius: "4px",
            fontSize: 14,
          }}
        >
          START MY JOURNEY
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;