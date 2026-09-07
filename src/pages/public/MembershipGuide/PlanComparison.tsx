import { Box, Container, Typography } from "@mui/material";

const rows = [
  ["Personalized Workout", "✓", "✓", "✓"],
  ["Nutrition Guidance", "✓", "✓", "✓"],
  ["Dashboard Access", "4 Months", "8 Months", "15 Months"],
  ["Complimentary Lifestyle Consultations", "—", "1", "2"],
  ["Complimentary Workout Refreshes", "—", "1", "4"],
  ["Priority Coach Review", "—", "✓", "✓"],
  ["Included Bonus Services Value", "—", "₹2,198", "₹5,594"],
];

const PlanComparison = () => {
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
            mb: 5,
          }}
        >
          Plan Comparison
        </Typography>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              minWidth: 700,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {["Feature", "3 Months", "6 Months", "12 Months"].map(
                (heading) => (
                  <Box
                    key={heading}
                    sx={{
                      p: 2,
                      borderRight: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {heading}
                    </Typography>
                  </Box>
                )
              )}
            </Box>

            {/* Rows */}
            {rows.map((row, index) => (
              <Box
                key={row[0]}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
                  borderBottom:
                    index === rows.length - 1
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {row.map((value, cellIndex) => (
                  <Box
                    key={`${row[0]}-${cellIndex}`}
                    sx={{
                      p: 2,
                      minHeight: 54,
                      display: "flex",
                      alignItems: "center",
                      borderRight:
                        cellIndex === row.length - 1
                          ? "none"
                          : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight:
                          row[0] === "Included Bonus Services Value"
                            ? 700
                            : 400,
                        color:
                          cellIndex === 0
                            ? "text.primary"
                            : "text.secondary",
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PlanComparison;