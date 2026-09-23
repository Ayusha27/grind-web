import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StartJourneyHero = () => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          height: 72,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          px: {
            xs: 3,
            md: 6,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* GRIND Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 46,
                md: 57,
              },
              lineHeight: 1,
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            GRIND
            <Box
              component="span"
              sx={{
                color: "primary.main",
              }}
            >
              .
            </Box>
          </Typography>

          {/* Copyright */}
          <Typography
            sx={{
              color: "secondary.main",
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            © 2026
          </Typography>
        </Box>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: {
            xs: 8,
            md: 11,
          },
        }}
      >
        {/* Background GRIND text */}
        <Typography
          aria-hidden="true"
          sx={{
            position: "absolute",
            right: {
              xs: -80,
              md: -30,
            },
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: {
              xs: 203,
              md: 311,
            },
            lineHeight: 1,

            color: "secondary.main",
            opacity: 0.2,

            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          GRIND
        </Typography>

        {/* Hero Content */}
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            mx: 0,
            px: {
              xs: 3,
              md: 6,
            },
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Step Label */}
          <Typography
            sx={{
              color: "primary.main",
              fontSize: {
                xs: 14,
                md: 15,
              },
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Step 01 — Intake Form
          </Typography>

          {/* Main Heading */}
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 78,
                sm: 105,
                md: 142,
              },
              lineHeight: 0.9,
              letterSpacing: -1,
              mb: 2.5,
              color: "text.primary",
            }}
          >
            START YOUR JOURNEY
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 540,
              color: "text.primary",
              opacity: 0.65,
              fontSize: {
                xs: 18,
                md: 19,
              },
              lineHeight: 1.75,
            }}
          >
            Tell us about yourself. Every rep, every goal, every limit — we
            need the full picture to build something that actually works for
            you.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default StartJourneyHero;