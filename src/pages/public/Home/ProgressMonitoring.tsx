import { Box, Container, Typography } from "@mui/material";

const ProgressMonitoring = () => {
  const progressItems = [
    "Workout consistency",
    "Body weight",
    "Body measurements",
    "Training progress",
  ];

  return (
    <Box
      component="section"
      id="progress-monitoring"
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
          maxWidth: 960,
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
            KEEP TRACK OF YOUR JOURNEY
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
            YOUR DASHBOARD HELPS YOU MONITOR
          </Typography>
        </Box>

        {/* Content panel */}
        <Box
          sx={{
            backgroundColor: "#171717",
            border: "1px solid #292929",
            borderRadius: "10px",
            px: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            py: {
              xs: 3,
              md: 4,
            },
          }}
        >
          {/* Progress items */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: 1.5,
                md: 1.75,
              },
            }}
          >
            {progressItems.map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: {
                    xs: 15,
                    md: 16,
                  },
                  lineHeight: 1.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mr: 0.75,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </Box>

                {item}
              </Typography>
            ))}
          </Box>

          {/* Bottom message */}
          <Typography
            sx={{
              color: "primary.main",
              fontSize: {
                xs: 14,
                md: 15,
              },
              lineHeight: 1.6,
              mt: 2,
            }}
          >
            Every few weeks you'll be invited to update your progress and stay
            accountable throughout your journey.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProgressMonitoring;