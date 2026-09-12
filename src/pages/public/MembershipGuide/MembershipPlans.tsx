import { Box, Container, Typography } from "@mui/material";

interface Plan {
  duration: string;
  name: string;
  price: string;
  monthlyPrice: string;
  description: string;
  features: string[];
  badge?: string;
  bonus?: {
    items: string[];
    total: string;
  };
}

const plans: Plan[] = [
  {
    duration: "3M KICKSTART",
    name: "",
    price: "₹3,499",
    monthlyPrice: "₹875 / month*",
    description: "Perfect for beginners building consistency.",
    badge: "FOUNDATION",
    features: [
      "Personalized Workout Programme",
      "AI Nutrition Guidance",
      "Workout Tracking",
      "4 Months Dashboard Access",
    ],
  },
  {
    duration: "6M TRANSFORMATION",
    name: "",
    price: "₹7,999",
    monthlyPrice: "₹725 / month*",
    description:
      "For noticeable transformation and lifestyle change.",
    badge: "MOST POPULAR",
    features: [
      "Everything in Kickstart",
      "1 Complimentary Lifestyle Consultation",
      "1 Complimentary Workout Refresh",
      "Priority Review",
      "8 Months Dashboard Access",
    ],
    bonus: {
      items: [
        "Lifestyle Consultation (Worth ₹1,599)",
        "Workout Refresh (Worth ₹599)",
      ],
      total: "₹2,198",
    },
  },
  {
    duration: "12M LIFESTYLE EVOLUTION",
    name: "",
    price: "₹12,999",
    monthlyPrice: "₹494 / month*",
    description: "For long-term health and performance.",
    badge: "BEST VALUE",
    features: [
      "Everything in Transformation",
      "2 Complimentary Lifestyle Consultations",
      "4 Complimentary Workout Refreshes",
      "Annual Roadmap",
      "15 Months Dashboard Access",
    ],
    bonus: {
      items: [
        "2 Lifestyle Consultations (Worth ₹3,198)",
        "4 Workout Refreshes (Worth ₹2,396)",
      ],
      total: "₹5,594",
    },
  },
];

const MembershipPlans = () => {
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
          Membership Plans
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            maxWidth: 850,
            fontSize: { xs: 14, md: 16 },
            lineHeight: 1.8,
            mb: 5,
          }}
        >
          Every membership includes an AI-generated, coach-reviewed workout
          plan, personalized nutrition guidance and dashboard access. As you
          move up the plan, you unlock additional expert support and
          complimentary premium services—giving you even greater value at no
          additional cost.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 2.5,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => {
            const highlighted = plan.badge === "MOST POPULAR";

            return (
              <Box
                key={plan.duration}
                sx={{
                  position: "relative",
                  border: highlighted
                    ? "1px solid #ff7a00"
                    : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.025)",
                  p: 3.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.badge && (
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: 16,
                      fontWeight: 700,
                      mb: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.badge}
                  </Typography>
                )}

                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 700,
                    mb: 2.5,
                    textTransform: "uppercase",
                  }}
                >
                  {plan.duration}
                </Typography>

                {/* Pricing */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2.5,
                  }}
                >
                  {/* Main plan price */}
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: {
                        xs: 36,
                        md: 40,
                      },
                      fontWeight: 800,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.price}
                  </Typography>

                  {/* Effective monthly price */}
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: {
                        xs: 15,
                        md: 16,
                      },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      animation:
                        "monthlyPricePulse 1.8s ease-in-out infinite",

                      "@keyframes monthlyPricePulse": {
                        "0%, 100%": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                        "50%": {
                          opacity: 0.65,
                          transform: "scale(1.04)",
                        },
                      },
                    }}
                  >
                    {plan.monthlyPrice}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    lineHeight: 1.7,
                    mb: 2.5,
                  }}
                >
                  {plan.description}
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
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </Box>

                {plan.bonus && (
                  <Box
                    sx={{
                      mt: "auto",
                      pt: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid rgba(255,122,0,0.45)",
                        backgroundColor: "rgba(255,122,0,0.06)",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: 700,
                          fontSize: 15,
                          mb: 1.5,
                        }}
                      >
                        Included Bonus Services
                      </Typography>

                      {plan.bonus.items.map((item) => (
                        <Typography
                          key={item}
                          sx={{
                            color: "text.secondary",
                            fontSize: 13,
                            lineHeight: 1.7,
                          }}
                        >
                          ✓ {item}
                        </Typography>
                      ))}

                      <Typography
                        sx={{
                          color: "primary.main",
                          fontSize: 17,
                          fontWeight: 700,
                          mt: 1.5,
                        }}
                      >
                        Total Bonus Value: {plan.bonus.total}
                      </Typography>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 13,
                          lineHeight: 1.6,
                          mt: 0.5,
                        }}
                      >
                        Included at no additional cost with this membership.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Pricing explanation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Box
            sx={{
              height: "1px",
              flex: 1,
              maxWidth: 100,
              backgroundColor: "rgba(255,122,0,0.45)",
            }}
          />

          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: {
                xs: 11,
                md: 13,
              },
              lineHeight: 1.7,
              maxWidth: 850,
              px: 1,
            }}
          >
            *Monthly pricing is calculated based on the benefits included and
            the duration of your dashboard access.
          </Typography>

          <Box
            sx={{
              height: "1px",
              flex: 1,
              maxWidth: 100,
              backgroundColor: "rgba(255,122,0,0.45)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPlans;