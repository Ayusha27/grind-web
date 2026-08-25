import { Box, Container, Typography } from "@mui/material";

const StartJourneyHero = () => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#080808",
        color: "#f5f5f0",
        borderBottom: "1px solid #222",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          height: 72,
          borderBottom: "1px solid #222",
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
          <Typography
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 34,
                md: 42,
              },
              lineHeight: 1,
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

          <Typography
            sx={{
              color: "#666",
              fontSize: 11,
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
        {/* Background text */}
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
              xs: 150,
              md: 230,
            },
            lineHeight: 1,
            color: "#111",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          GRIND
        </Typography>

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1400,
            mx: "auto",
            px: {
              xs: 3,
              md: 6,
            },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: {
                xs: 10,
                md: 11,
              },
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Step 01 — Intake Form
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 58,
                sm: 78,
                md: 105,
              },
              lineHeight: 0.9,
              letterSpacing: -1,
              mb: 2.5,
            }}
          >
            START YOUR JOURNEY
          </Typography>

          <Typography
            sx={{
              maxWidth: 540,
              color: "#777",
              fontSize: {
                xs: 13,
                md: 14,
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