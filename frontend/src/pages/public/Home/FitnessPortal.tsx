import { Box, Container, Grid, Typography } from "@mui/material";

import workoutDashboard from "../../../assets/workout-dashboard.jpg";
import dietDashboard from "../../../assets/diet-dashboard.jpg";
import progressDashboard from "../../../assets/progress-dashboard.jpg";

interface PortalCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const portalCards: PortalCard[] = [
  {
    title: "WORKOUT TRACKING",
    description:
      "Follow your personalized workout plan, exercise instructions and daily schedule.",
    image: workoutDashboard,
    alt: "GRIND workout dashboard",
  },
  {
    title: "NUTRITION GUIDANCE",
    description:
      "Personalized nutrition recommendations aligned to your goals and lifestyle.",
    image: dietDashboard,
    alt: "GRIND nutrition dashboard",
  },
  {
    title: "PROGRESS TRACKING",
    description:
      "Track consistency, workout completion, calories burned and training progress.",
    image: progressDashboard,
    alt: "GRIND progress dashboard",
  },
];

const FitnessPortal = () => {
  return (
    <Box
      component="section"
      id="fitness-portal"
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
          maxWidth: 1200,
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
            YOUR PERSONAL FITNESS PORTAL
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 40,
                sm: 52,
                md: 62,
              },
              lineHeight: 0.95,
              maxWidth: 900,
              mx: "auto",
            }}
          >
            EVERYTHING YOU NEED TO FOLLOW.
            <br />
            YOUR PERSONALIZED FITNESS JOURNEY.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid
          container
          spacing={2.5}
        >
          {portalCards.map((card) => (
            <Grid
              key={card.title}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  overflow: "hidden",
                  backgroundColor: "#171717",
                  border: "1px solid #292929",
                  borderRadius: "10px",
                }}
              >
                {/* Dashboard image */}
                <Box
                  component="img"
                  src={card.image}
                  alt={card.alt}
                  sx={{
                    width: "100%",
                    height: {
                      xs: 230,
                      md: 250,
                    },
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />

                {/* Card content */}
                <Box
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: {
                        xs: 28,
                        md: 32,
                      },
                      lineHeight: 1,
                      mb: 1.5,
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: {
                        xs: 15,
                        md: 16,
                      },
                      lineHeight: 1.7,
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FitnessPortal;