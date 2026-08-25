import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const MembershipGuide = () => {
  return (
    <Box
      component="section"
    //   id="membership"
      sx={{
        py: {
          xs: 7,
          md: 10,
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
        <Box
          sx={{
            backgroundColor: "#171717",
            border: "1px solid #292929",
            borderRadius: "10px",
            textAlign: "center",
            px: {
              xs: 3,
              sm: 5,
              md: 8,
            },
            py: {
              xs: 5,
              md: 7,
            },
          }}
        >
          {/* Eyebrow */}
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 14,
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            BEFORE YOU DECIDE
          </Typography>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 42,
                sm: 54,
                md: 64,
              },
              lineHeight: 0.95,
              mb: 2.5,
            }}
          >
            EXPLORE OUR MEMBERSHIP GUIDE
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 760,
              mx: "auto",
              color: "text.secondary",
              fontSize: {
                xs: 15,
                md: 17,
              },
              lineHeight: 1.7,
              mb: 3.5,
            }}
          >
            Every fitness journey is unique. Explore our membership plans,
            understand the features and support included, and discover how
            GRIND can personalize your transformation.
          </Typography>

          {/* CTA */}
          <Button
            component={RouterLink}
            to="/membership"
            variant="contained"
            color="primary"
            sx={{
              minWidth: 190,
              height: 48,
              px: 3,
              borderRadius: "4px",
              fontSize: 14,
            }}
          >
            VIEW MEMBERSHIP GUIDE
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipGuide;