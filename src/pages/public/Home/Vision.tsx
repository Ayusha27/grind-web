import { Box, Container, Grid, Typography } from "@mui/material";

import visionImage from "../../../assets/vision-image.jpg";

const Vision = () => {
  return (
    <Box
      component="section"
      id="vision"
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
          maxWidth: 1100,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Grid
          container
          spacing={{
            xs: 5,
            md: 7,
          }}
          sx={{
          alignItems: "center",
        }}
        >
          {/* Image */}
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              component="img"
              src={visionImage}
              alt="Person standing in front of a mountain at sunrise"
              sx={{
                width: "100%",
                height: {
                  xs: 380,
                  sm: 480,
                  md: 510,
                },
                display: "block",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #292929",
              }}
            />
          </Grid>

          {/* Content */}
          <Grid
            size={{
              xs: 12,
              md: 6,
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
              OUR VISION
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: 42,
                  sm: 54,
                  md: 64,
                },
                lineHeight: 0.95,
                mb: 2,
              }}
            >
              MAKING PERSONALIZED
              <br />
              FITNESS ACCESSIBLE TO ALL
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                color: "text.primary",
                fontSize: {
                  xs: 15,
                  md: 17,
                },
                lineHeight: 1.55,
              }}
            >
              Not everyone needs a celebrity trainer. Not everyone needs
              expensive coaching. Everyone deserves a plan designed
              specifically for them.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Vision;