import { Box, Button, Typography } from "@mui/material";

const IntakeSubmit = () => {
  return (
    <Box
      sx={{
        p: {
          xs: 3,
          md: 4,
        },
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "stretch",
          md: "center",
        },
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            mb: 0.75,
          }}
        >
          Your data stays with us.
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 12,
            lineHeight: 1.7,
            maxWidth: 650,
          }}
        >
          This intake form is the foundation of your
          personalised GRIND programme. Your information
          helps us create a plan around your goals,
          preferences and lifestyle.
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          minWidth: {
            xs: "100%",
            md: 150,
          },
          height: 46,
          borderRadius: "4px",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default IntakeSubmit;