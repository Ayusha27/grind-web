import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is GRIND completely online?",
    answer: "Yes. Everything happens virtually.",
  },
  {
    question: "Who creates my workout?",
    answer:
      "AI generates your personalized plan and an experienced coach reviews it before delivery.",
  },
  {
    question: "Is my diet personalized?",
    answer:
      "You receive personalized nutrition guidance. One-on-one nutrition consultation is available separately.",
  },
  {
    question: "Will someone check my exercise form?",
    answer:
      "Exercises include detailed demonstration videos and guidance.",
  },
  {
    question: "Do I get weekly coaching?",
    answer:
      "No. GRIND is an AI-powered coaching platform rather than a traditional weekly personal training service.",
  },
  {
    question: "Can my plan change later?",
    answer:
      "Future updates will allow recommendations based on your progress.",
  },
];

const FAQ = () => {
  return (
    <Box
      component="section"
      id="faq"
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
          maxWidth: 950,
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
            FAQ
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 42,
                sm: 54,
                md: 64,
              },
              lineHeight: 0.95,
            }}
          >
            YOUR QUESTIONS, ANSWERED
          </Typography>
        </Box>

        {/* FAQ Items */}
        <Box>
          {faqItems.map((item) => (
            <Accordion
              key={item.question}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: "#171717",
                color: "#f5f5f0",
                border: "1px solid #292929",
                borderRadius: "8px !important",
                mb: 1.5,

                "&::before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  borderColor: "#292929",
                  margin: "0 0 12px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "#f5f5f0",
                      fontSize: 22,
                    }}
                  />
                }
                sx={{
                  minHeight: 68,
                  px: {
                    xs: 2,
                    md: 3,
                  },

                  "&.Mui-expanded": {
                    minHeight: 68,
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },

                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    my: 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 16,
                      md: 18,
                    },
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: {
                    xs: 2,
                    md: 3,
                  },
                  pt: 0,
                  pb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#f5f5f0",
                    fontSize: {
                      xs: 14,
                      md: 16,
                    },
                    lineHeight: 1.5,
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;