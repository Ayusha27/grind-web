import { Box, Container, Typography } from "@mui/material";

const terms = [
  "Pricing is subject to change without prior notice.",
  "This page is intended for informational purposes.",
  "Results vary based on consistency, nutrition and lifestyle.",
  "Individuals with medical conditions should consult a healthcare professional before beginning any fitness programme.",
  "Programme features may evolve as GRIND continues to improve the platform.",
];

const TermsAndConditions = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          py: { xs: 7, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 38, md: 50 },
              fontWeight: 800,
              lineHeight: 1,
              textTransform: "uppercase",
              mb: 5,
            }}
          >
            Terms & Conditions
          </Typography>

          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.025)",
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2.5,
                "& li": {
                  mb: 1.8,
                  pl: 0.5,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "text.primary",
                },
                "& li:last-child": {
                  mb: 0,
                },
              }}
            >
              {terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            mb: 1,
          }}
        >
          Need help choosing a plan?
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            mb: 3,
          }}
        >
          Email{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          >
            support@grindfit.ai
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          GRIND • Personalized Fitness Powered by AI & Reviewed by Experts
        </Typography>
      </Box>
    </>
  );
};

export default TermsAndConditions;