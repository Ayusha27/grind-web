import { Box, Container, Grid, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Box
      component="section"
      id="contact"
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
          maxWidth: 950,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#171717",
            border: "1px solid #292929",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Main content */}
          <Box
            sx={{
              textAlign: "center",
              px: {
                xs: 3,
                sm: 5,
                md: 8,
              },
              py: {
                xs: 5,
                md: 6,
              },
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontSize: 13,
                fontWeight: 500,
                mb: 1.5,
                letterSpacing: "0.3px",
              }}
            >
              NEED HELP DECIDING?
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: 42,
                  sm: 52,
                  md: 60,
                },
                lineHeight: 0.95,
                mb: 2.5,
              }}
            >
              LET'S TALK
            </Typography>

            <Typography
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                lineHeight: 1.7,
              }}
            >
              Whether you're unsure which membership is right for you, have
              questions about nutrition, or simply want to understand how GRIND
              works. We're happy to help.
            </Typography>
          </Box>

          {/* Contact details */}
          <Grid
            container
            sx={{
              borderTop: "1px solid #292929",
            }}
          >
            {/* Email */}
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
              sx={{
                borderRight: {
                  xs: "none",
                  md: "1px solid #292929",
                },
                borderBottom: {
                  xs: "1px solid #292929",
                  md: "none",
                },
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: 11,
                    fontWeight: 500,
                    mb: 0.75,
                  }}
                >
                  EMAIL
                </Typography>

                <Typography
                  component="a"
                  href="mailto:support@grindfit.ai"
                  sx={{
                    color: "#f5f5f0",
                    textDecoration: "none",
                    fontSize: {
                      xs: 16,
                      md: 18,
                    },
                    fontWeight: 600,

                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  support@grindfit.ai
                </Typography>
              </Box>
            </Grid>

            {/* Instagram */}
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: 11,
                    fontWeight: 500,
                    mb: 0.75,
                  }}
                >
                  INSTAGRAM
                </Typography>

                <Typography
                  component="a"
                  href="https://instagram.com/grindfit.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#f5f5f0",
                    textDecoration: "none",
                    fontSize: {
                      xs: 16,
                      md: 18,
                    },
                    fontWeight: 600,

                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  @grindfit.ai
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;