import { Box, Button, Container, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box
  component="header"
  sx={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1200,
    height: 84,
    backgroundColor: "#0b0b0b",
    borderBottom: "1px solid #1d1d1d",
    display: "flex",
    alignItems: "center",
  }}
>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: {
            xs: 2.5,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{
              color: "#f5f5f0",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 38,
                md: 46,
              },
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            GRIND
            <Box
              component="span"
              sx={{
                color: "primary.main",
              }}
            >
              .
            </Box>
          </Link>

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={{
              xs: 2.5,
              md: 4,
            }}
            sx={{
              ml: "auto",
              mr: {
                xs: 3,
                md: 7,
              },
            }}
          >
            <Link
              href="#about"
              underline="none"
              sx={{
                color: "#f5f5f0",
                fontSize: 14,
                fontWeight: 700,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              ABOUT
            </Link>

            <Link
              component={RouterLink}
              to="/membership-guide"
              underline="none"
              sx={{
                color: "#f5f5f0",
                fontSize: 14,
                fontWeight: 700,
                whiteSpace: "nowrap",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              MEMBERSHIP GUIDE
            </Link>
          </Stack>

          {/* CTA */}
          <Button
            component={RouterLink}
            to="/start-your-journey"
            variant="contained"
            color="primary"
            sx={{
              minWidth: {
                xs: 160,
                md: 175,
              },
              height: 48,
              px: 3,
              borderRadius: "4px",
              fontSize: 14,
            }}
          >
            START YOUR JOURNEY
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;