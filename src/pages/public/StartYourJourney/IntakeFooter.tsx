import {
  Box,
  Container,
  Typography,
} from "@mui/material";

const IntakeFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: {
          xs: 5,
          md: 7,
        },

        borderTop: "1px solid",
        borderTopColor: "divider",

        backgroundColor: "background.default",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: {
            xs: 2,
            md: 3,
          },
          py: {
            xs: 1.5,
            md: 1.75,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,

            "@media (max-width:600px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Typography
            sx={{
              color: "text.primary",
              opacity: 0.45,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            © 2026 GRIND — All rights reserved
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              opacity: 0.45,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Support: support@grindfit.ai
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default IntakeFooter;