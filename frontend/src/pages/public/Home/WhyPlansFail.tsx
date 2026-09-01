import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import Section from "../../../components/ui/Section";

import problemSection from "../../../assets/problem-section.jpg";

const WhyPlansFail = () => {
  const problems = [
    "People download random workout plans",
    "Watch random YouTube videos",
    "Try extreme diets",
    "Train inconsistently",
    "Then wonder why nothing changes",
  ];

  return (
    <Section id="why-plans-fail">
      <Grid
        container
        spacing={{
          xs: 5,
          md: 8,
        }}
        sx={{
          alignItems: "center",
        }}
      >
        {/* Content */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 16,
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            THE PROBLEM
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 48,
                sm: 58,
                md: 68,
              },
              lineHeight: 0.95,
              mb: 3.5,
            }}
          >
            WHY MOST FITNESS
            <br />
            PLANS FAIL
          </Typography>

          <List
            disablePadding
            sx={{
              mb: 3.5,
            }}
          >
            {problems.map((problem) => (
              <ListItem
                key={problem}
                disableGutters
                sx={{
                  py: 0.65,
                  display: "list-item",
                  listStyleType: "disc",
                  pl: 1.5,
                  ml: 1.5,
                }}
              >
                <Typography
                sx={{
                    fontSize: {
                    xs: 16,
                    md: 17,
                    },
                    lineHeight: 1.5,
                }}
                >
                {problem}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Typography
            sx={{
              color: "primary.main",
              fontSize: {
                xs: 20,
                md: 23,
              },
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Fitness shouldn't feel confusing.
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 16,
                md: 18,
              },
              lineHeight: 1.7,
            }}
          >
            You need a structured system that tells you exactly what to do,
            when to do it, and how to progress.
          </Typography>
        </Grid>

        {/* Image */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            component="img"
            src={problemSection}
            alt="Person struggling with a fitness routine"
            sx={{
              width: "100%",
              height: {
                xs: 350,
                sm: 450,
                md: 530,
              },
              objectFit: "cover",
              display: "block",
              borderRadius: "8px",
              border: "1px solid #292929",
            }}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default WhyPlansFail;