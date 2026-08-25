import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0b0b0b",
        borderTop: "1px solid #171717",
        py: {
          xs: 6,
          md: 7,
        },
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
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <Typography
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 34,
                md: 40,
              },
              lineHeight: 1,
              letterSpacing: "0.5px",
              color: "#f5f5f0",
              mb: 1.5,

              "&::after": {
                content: '"."',
                color: "primary.main",
              },
            }}
          >
            GRIND
          </Typography>

          {/* Tagline */}
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 12,
                md: 13,
              },
              mb: 2.5,
            }}
          >
            Making Personalized Fitness Accessible To All
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              width: 120,
              height: "1px",
              backgroundColor: "#292929",
              mx: "auto",
              mb: 2,
            }}
          />

          {/* Copyright */}
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 11,
            }}
          >
            © 2026 GRIND. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;