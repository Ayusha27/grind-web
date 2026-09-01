import { Box, Container, Grid, Typography } from "@mui/material";

const CompleteFitnessEcosystem = () => {
  const includedItems = [
    "Personalized workout plan",
    "Personalized default nutrition guidance",
    "Coach-reviewed program",
    "Exercise demonstration videos",
    "Progress dashboard",
  ];

  const notIncludedItems = [
    "One-on-one personal training",
    "Weekly live coaching",
    "Exercise form review",
    "Daily accountability coaching",
  ];

  return (
    <Box
      component="section"
      id="what-you-receive"
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
            WHAT YOU RECEIVE
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
            }}
          >
            A COMPLETE FITNESS ECOSYSTEM
          </Typography>
        </Box>

        {/* Panels */}
        <Grid
          container
          spacing={2.5}
        >
          {/* Everything Included */}
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: "#171717",
                border: "1px solid #292929",
                borderRadius: "10px",
                p: {
                  xs: 3,
                  md: 3.5,
                },
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: {
                    xs: 15,
                    md: 16,
                  },
                  fontWeight: 700,
                  mb: 2.5,
                }}
              >
                EVERYTHING INCLUDED
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {includedItems.map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      fontSize: {
                        xs: 14,
                        md: 15,
                      },
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Not Included */}
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: "#171717",
                border: "1px solid #292929",
                borderRadius: "10px",
                p: {
                  xs: 3,
                  md: 3.5,
                },
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: {
                    xs: 15,
                    md: 16,
                  },
                  fontWeight: 700,
                  mb: 2.5,
                }}
              >
                NOT INCLUDED
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {notIncludedItems.map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      fontSize: {
                        xs: 14,
                        md: 15,
                      },
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>

              <Typography
                sx={{
                  mt: 2.5,
                  fontSize: {
                    xs: 13,
                    md: 14,
                  },
                  fontStyle: "italic",
                  color: "text.secondary",
                }}
              >
                These may become premium add-ons in the future.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompleteFitnessEcosystem;