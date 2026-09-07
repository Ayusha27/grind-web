import { Box, Container, Typography } from "@mui/material";

interface FooterProps {
  variant?: "public" | "dashboard";
}

const Footer = ({
  variant = "public",
}: FooterProps) => {
  if (variant === "dashboard") {
    return <DashboardFooter />;
  }

  return <PublicFooter />;
};

const DashboardFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #ddd8d2",
        py: {
          xs: 3,
          md: 3.5,
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
          {/* Instagram */}
          <Typography
            component="a"
            href="#"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,

              color: "#ff5738",

              fontSize: {
                xs: 14,
                md: 16,
              },

              fontWeight: 700,

              textDecoration: "none",

              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <span
              style={{
                fontSize: "22px",
                lineHeight: 1,
              }}
            >
              ◎
            </span>

            Follow us on Instagram
          </Typography>

          {/* Support */}
          <Typography
            sx={{
              mt: 1.5,

              color: "#6f6964",

              fontSize: {
                xs: 13,
                md: 15,
              },

              fontWeight: 500,
            }}
          >
            Need support?{" "}
            <Box
              component="a"
              href="mailto:support.grindfit.ai@trenddma.com"
              sx={{
                color: "#ff5738",
                textDecoration: "none",
                fontWeight: 600,

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              support.grindfit.ai@trenddma.com
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const PublicFooter = () => {
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

          <Box
            sx={{
              width: 120,
              height: "1px",
              backgroundColor: "#292929",
              mx: "auto",
              mb: 2,
            }}
          />

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