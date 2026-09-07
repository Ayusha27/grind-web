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
        backgroundColor: "#080808",
        color: "#f5f5f0",
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
          borderBottom: "1px solid #222",
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
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#f5f5f0",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: {
                xs: 34,
                md: 42,
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
                color: "#777",
                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },
                fontWeight: 700,
                letterSpacing: "0.7px",
                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#f5f5f0",
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
                borderColor: "#292929",
                color: "#f5f5f0",
                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },
                fontWeight: 700,
                letterSpacing: "0.7px",
                whiteSpace: "nowrap",

                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor:
                    "rgba(255, 92, 53, 0.06)",
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
          maxWidth: 620,
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
                fontSize: 28,
              }}
            />
          </Box>

          {/* =====================================================
              EYEBROW
          ===================================================== */}
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 10,
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
                xs: 58,
                sm: 68,
                md: 76,
              },
              lineHeight: 0.9,
              letterSpacing: "-1px",
              color: "#f5f5f0",
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
              color: "#777",
              fontSize: 13,
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
              border: "1px solid #292929",
              px: 2,
              py: 1,
            }}
          >
            <Typography
              sx={{
                color: "#777",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Expect to hear from us within{" "}
              <Box
                component="span"
                sx={{
                  color: "#f5f5f0",
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
              borderColor: "rgba(255, 126, 20, 0.45)",
              backgroundColor: "rgba(255, 126, 20, 0.07)",
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
                  color: "#f5f5f0",
                  fontSize: 18,
                  mt: 0.3,
                  flexShrink: 0,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    mb: 1,
                  }}
                >
                  What happens next?
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 11,
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
                    fontSize: 11,
                    lineHeight: 1.7,
                    mt: 2,
                  }}
                >
                  The next step is to review the available programme options
                  and choose the level of support that best fits your goals.
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 11,
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
              border: "1px solid #292929",
              backgroundColor: "#111",
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
                fontSize: 24,
                mb: 1.5,
              }}
            />

            <Typography
              sx={{
                color: "#f5f5f0",
                fontSize: 12,
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
                fontSize: 10,
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