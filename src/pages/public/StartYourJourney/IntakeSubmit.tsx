import {
  Box,
  Button,
  Typography,
} from "@mui/material";

const IntakeSubmit = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        p: {
          xs: 2,
          md: 2.5,
        },

        // GRIND Charcoal Gray
        borderTop: "1px solid #4C4A49",

        "@media (max-width:600px)": {
          flexDirection: "column",
          alignItems: "stretch",
        },
      }}
    >
      <Typography
        sx={{
          maxWidth: 310,

          // White with reduced opacity for secondary text
          color: "#FFFFFF",
          opacity: 0.65,

          fontSize: 11,
          lineHeight: 1.5,
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            opacity: 1,
          }}
        >
          Your data stays with us.
        </Box>{" "}
        This intake form is the foundation of your
        personalised GRIND programme. Be as specific as
        possible — the more we know, the more we can
        deliver.
      </Typography>

      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: 110,
          height: 42,
          px: 3,

          borderRadius: 0,

          // GRIND Orange
          backgroundColor: "#FF5C35",
          color: "#FFFFFF",

          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "0.5px",

          "&:hover": {
            backgroundColor: "#FF5C35",
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default IntakeSubmit;