import { Box, Grid, Typography } from "@mui/material";
import Section from "../../../components/ui/Section";

const WhatIsGrind = () => {
  const features = [
    {
      title: "AI ASSESSMENT",
      description:
        "Analyze goals, fitness level, lifestyle and preferences.",
    },
    {
      title: "PERSONALIZED PROGRAM",
      description:
        "Workout and nutrition designed specifically for you.",
    },
    {
      title: "HUMAN REVIEWED",
      description:
        "Every programme reviewed before delivery.",
    },
  ];

  return (
    <Section id="about">
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
            fontSize: 16,
            fontWeight: 500,
            mb: 1.5,
          }}
        >
          WHAT IS GRIND
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: 42,
              sm: 54,
              md: 68,
            },
            lineHeight: 0.95,
          }}
        >
          BUILT AROUND YOU. NOT AROUND TEMPLATES.
        </Typography>
      </Box>

      {/* Feature cards */}
      <Grid
        container
        spacing={3}
      >
        {features.map((feature) => (
          <Grid
            key={feature.title}
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Box
              sx={{
                height: "100%",
                minHeight: {
                  xs: 150,
                  md: 170,
                },
                p: {
                  xs: 3,
                  md: 3.5,
                },
                backgroundColor: "#171717",
                border: "1px solid #292929",
                borderRadius: "10px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: {
                    xs: 17,
                    md: 18,
                  },
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 320,
                  fontSize: {
                    xs: 15,
                    md: 16,
                  },
                  lineHeight: 1.45,
                  color: "text.primary",
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default WhatIsGrind;