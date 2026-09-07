import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const FinalCTA = () => {
  return (
    <Box
      component="section"
      id="final-cta"
      sx={{
        backgroundColor: "primary.main",
        py: {
          xs: 6,
          md: 7,
        },
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
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {/* Heading */}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: {
                xs: 34,
                sm: 44,
                md: 52,
              },
              lineHeight: 0.95,
              fontWeight: 700,
              mb: 1,
            }}
          >
            READY TO START YOUR TRANSFORMATION?
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: {
                xs: 13,
                md: 15,
              },
              lineHeight: 1.5,
              mb: 2,
            }}
          >
            Get your personalized fitness assessment today.
          </Typography>

          {/* CTA */}
          <Button
            component={RouterLink}
            to="/start"
            variant="contained"
            sx={{
              backgroundColor: "#0b0b0b",
              color: "#ffffff",
              minWidth: 145,
              height: 42,
              px: 3,
              borderRadius: "3px",
              fontSize: 12,
              fontWeight: 700,

              "&:hover": {
                backgroundColor: "#171717",
              },
            }}
          >
            START MY JOURNEY
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FinalCTA;