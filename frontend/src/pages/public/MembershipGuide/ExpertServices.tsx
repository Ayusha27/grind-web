import { Box, Container, Typography } from "@mui/material";

const services = [
  {
    title: "Lifestyle Consultation",
    price: "₹1599",
    description:
      "Perfect for members looking for general guidance, accountability, and healthier daily habits.",
    features: [
      "30-Minute One-on-One Consultation",
      "Goal & Progress Review",
      "Lifestyle & Habit Assessment",
      "Training & Recovery Guidance",
      "General Nutrition Recommendations",
    ],
  },
  {
    title: "Personalized Nutrition",
    price: "₹4999",
    description:
      "Work with a Certified and experienced Functional Nutritionist to receive a personalized nutrition plan based on your health profile.",
    features: [
      "Blood Report Review",
      "Personalized Diet Plan",
      "Functional Nutrition Recommendations",
      "Supplement Guidance (If Required)",
    ],
    note:
      "Ideal for individuals managing PCOS, Diabetes, Thyroid Disorders, High Cholesterol, Fatty Liver, Digestive Health and other medical or lifestyle conditions.",
  },
  {
    title: "Workout Refresh",
    price: "₹599",
    description:
      "Receive an additional workout variation tailored to your progress and evolving fitness goals.",
    features: [
      "Additional Workout Variant",
      "Updated Exercise Selection",
      "Progressive Training Structure",
      "Suitable for Home or Gym",
    ],
  },
];

const ExpertServices = () => {
  return (
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
            mb: 4,
          }}
        >
          Expert Services
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            maxWidth: 900,
            fontSize: { xs: 14, md: 16 },
            lineHeight: 1.8,
            mb: 5,
          }}
        >
          Enhance your fitness journey with personalized services delivered by
          experienced coaches and certified professionals. All services are
          available as standalone offerings or alongside any GRIND membership.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {services.map((service) => (
            <Box
              key={service.title}
              sx={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.025)",
                p: 3.5,
                minHeight: 470,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  mb: 2.5,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: {
                    xs: 38,
                    md: 44,
                  },
                  fontWeight: 800,
                  lineHeight: 1,
                  mb: 2.5,
                }}
              >
                {service.price}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  lineHeight: 1.8,
                  mb: 2.5,
                }}
              >
                {service.description}
              </Typography>

              <Box
                component="ul"
                sx={{
                  m: 0,
                  pl: 2.2,
                  "& li": {
                    mb: 1.5,
                    pl: 0.5,
                    fontSize: 14,
                    lineHeight: 1.5,
                  },
                }}
              >
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </Box>

              {service.note && (
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: 13,
                    lineHeight: 1.8,
                    mt: 2,
                  }}
                >
                  {service.note}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ExpertServices;