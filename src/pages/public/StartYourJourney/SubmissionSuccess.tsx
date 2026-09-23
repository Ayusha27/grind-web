import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink } from "react-router-dom";

const SubmissionSuccess = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <Box
        component="header"
        sx={{
          height: {
            xs: 64,
            md: 72,
          },

          borderBottom: "1px solid",
          borderBottomColor: "divider",

          display: "flex",
          alignItems: "center",

          px: {
            xs: 2.5,
            sm: 3,
            md: 6,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Logo */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 46,
                md: 57,
              },
              lineHeight: 1,
              flexShrink: 0,
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
          </Typography>

          {/* =====================================================
              RIGHT — NAVIGATION
          ===================================================== */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 0.75,
                sm: 1,
                md: 1.5,
              },
            }}
          >
            {/* Explore GRIND */}
            <Button
              component={RouterLink}
              to="/grind-walkthrough"
              variant="text"
              sx={{
                minWidth: "auto",

                height: {
                  xs: 30,
                  md: 34,
                },

                px: {
                  xs: 1,
                  sm: 1.5,
                  md: 2,
                },

                borderRadius: 0,

                color: "text.primary",
                opacity: 0.55,

                fontSize: {
                  xs: 11,
                  sm: 12,
                  md: 14,
                },

                fontWeight: 700,
                letterSpacing: "0.7px",
                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "text.primary",
                  opacity: 1,
                },
              }}
            >
              EXPLORE GRIND
            </Button>

            {/* Membership Guide */}
            <Button
              component={RouterLink}
              to="/membership-guide"
              variant="outlined"
              sx={{
                minWidth: "auto",

                height: {
                  xs: 30,
                  md: 34,
                },

                px: {
                  xs: 1,
                  sm: 1.5,
                  md: 2,
                },

                borderRadius: 0,

                borderColor: "divider",
                color: "text.primary",

                fontSize: {
                  xs: 11,
                  sm: 12,
                  md: 14,
                },

                fontWeight: 700,
                letterSpacing: "0.7px",
                whiteSpace: "nowrap",

                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(255, 92, 53, 0.06)",
                },
              }}
            >
              MEMBERSHIP GUIDE
            </Button>
          </Box>
        </Box>
      </Box>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <Container
        maxWidth={false}
        sx={{
          mx: "auto",

          px: 3,

          py: {
            xs: 6,
            md: 8,
          },

          flex: 1,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* =====================================================
              SUCCESS ICON
          ===================================================== */}

          <Box
            sx={{
              width: 48,
              height: 48,

              border: "1px solid",
              borderColor: "primary.main",

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon
              sx={{
                color: "primary.main",
                fontSize: 38,
              }}
            />
          </Box>

          {/* =====================================================
              EYEBROW
          ===================================================== */}

          <Typography
            sx={{
              color: "primary.main",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              mt: -1,
            }}
          >
            Submission Received
          </Typography>

          {/* =====================================================
              MAIN HEADING
          ===================================================== */}

          <Typography
            component="h1"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',

              fontSize: {
                xs: 78,
                sm: 92,
                md: 103,
              },

              lineHeight: 0.9,
              letterSpacing: "-1px",

              color: "text.primary",

              textTransform: "uppercase",
              maxWidth: 500,
            }}
          >
            YOU&apos;RE IN
            <br />
            THE GRIND
          </Typography>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <Typography
            sx={{
              color: "text.primary",
              opacity: 0.55,

              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 390,
            }}
          >
            Thanks for taking the first step. We&apos;ve received your intake
            form and are preparing your personalised programme.
          </Typography>

          {/* =====================================================
              ORANGE DIVIDER
          ===================================================== */}

          <Box
            sx={{
              width: 30,
              height: 2,
              backgroundColor: "primary.main",
              my: 1,
            }}
          />

          {/* =====================================================
              RESPONSE TIME
          ===================================================== */}

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",

              px: 2,
              py: 1,
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                opacity: 0.55,

                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Expect to hear from us within{" "}
              <Box
                component="span"
                sx={{
                  color: "text.primary",
                  opacity: 1,
                }}
              >
                48 hours
              </Box>
            </Typography>
          </Box>

          {/* =====================================================
              WHAT HAPPENS NEXT
          ===================================================== */}

          <Box
            sx={{
              width: "100%",

              border: "1px solid",
              borderColor: "primary.main",

              backgroundColor: "rgba(255, 92, 53, 0.07)",

              p: {
                xs: 2.5,
                md: 3,
              },

              textAlign: "left",
              mt: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "flex-start",
              }}
            >
              <CheckIcon
                sx={{
                  color: "primary.main",
                  fontSize: 24,
                  mt: 0.3,
                  flexShrink: 0,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  What happens next?
                </Typography>

                <Typography
                  sx={{
                    color: "text.primary",
                    opacity: 0.65,

                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  Our assessment engine will analyse your goals, lifestyle,
                  fitness experience and preferences to prepare a personalised
                  programme. Every programme is reviewed before finalisation
                  to ensure it aligns with your objectives and training level.
                </Typography>

                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: 15,
                    lineHeight: 1.7,
                    mt: 2,
                  }}
                >
                  The next step is to review the available programme options
                  and choose the level of support that best fits your goals.
                </Typography>

                <Typography
                  sx={{
                    color: "text.primary",
                    opacity: 0.65,

                    fontSize: 15,
                    lineHeight: 1.7,
                    mt: 2,
                  }}
                >
                  Once enrolled, you&apos;ll receive your personalised programme
                  through a private access link and can begin your training
                  journey.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* =====================================================
              COMMUNITY
          ===================================================== */}

          <Box
            sx={{
              width: "100%",

              border: "1px solid",
              borderColor: "divider",

              backgroundColor: "background.paper",

              p: {
                xs: 3,
                md: 3.5,
              },

              textAlign: "center",
            }}
          >
            <InstagramIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                mb: 1.5,
              }}
            />

            <Typography
              sx={{
                color: "text.primary",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.5px",
                mb: 1.5,
              }}
            >
              JOIN THE COMMUNITY
            </Typography>

            <Button
              component="a"
              href="https://instagram.com/grindfit.ai"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              sx={{
                minWidth: 80,
                height: 32,
                px: 2,
                borderRadius: "3px",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              @GRINDFIT.AI
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubmissionSuccess;