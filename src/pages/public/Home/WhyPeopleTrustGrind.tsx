import { Box, Grid, Typography } from "@mui/material";
import Section from "../../../components/ui/Section";

const WhyPeopleTrustGrind = () => {
  const points = [
    "Personalized—not template based",
    "Coach reviewed before delivery",
    "Built around your schedule and equipment",
    "Designed to evolve as you progress",
  ];

  return (
    <Section id="why-grind">
      {/* Section heading */}
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
            fontSize: 16,
            fontWeight: 500,
            mb: 1.5,
          }}
        >
          WHY PEOPLE TRUST GRIND
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: 46,
              sm: 58,
              md: 78,
            },
            lineHeight: 0.95,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          AI DOESN'T REPLACE EXPERTS.
          <br />
          IT MAKES THEM MORE EFFECTIVE.
        </Typography>
      </Box>

      {/* Main content card */}
      <Box
        sx={{
          backgroundColor: "#171717",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          p: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        {/* Description */}
        <Typography
          sx={{
            fontSize: {
              xs: 16,
              md: 20,
            },
            lineHeight: 1.9,
            color: "text.primary",
            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          At GRIND, AI does the heavy lifting by analyzing your goals, fitness
          level and lifestyle to create a personalized plan. Before you ever
          receive it, every workout and nutrition plan is reviewed by an
          experienced fitness coach to ensure it is practical, balanced and
          aligned with your goals.
        </Typography>

        {/* Points */}
        <Grid
          container
          spacing={2.5}
        >
          {points.map((point) => (
            <Grid
              key={point}
              size={{ xs: 12, md: 6 }}
            >
              <Box
                sx={{
                  minHeight: {
                    xs: 80,
                    md: 96,
                  },
                  px: {
                    xs: 2.5,
                    md: 3,
                  },
                  py: 2.5,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor: "#171717",
                  border: "1px solid #292929",
                  borderRadius: "10px",

                  textAlign: "center",

                  transition: "border-color 0.2s ease",

                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 16,
                      md: 18,
                    },
                    fontWeight: 500,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mr: 0.75,
                    }}
                  >
                    ✓
                  </Box>

                  {point}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Section>
  );
};

export default WhyPeopleTrustGrind;