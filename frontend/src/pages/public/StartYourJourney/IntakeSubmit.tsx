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
        borderTop: "1px solid #292929",

        "@media (max-width:600px)": {
          flexDirection: "column",
          alignItems: "stretch",
        },
      }}
    >
      <Typography
        sx={{
          maxWidth: 310,
          color: "#666",
          fontSize: 8,
          lineHeight: 1.5,
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#f5f5f0",
            fontWeight: 700,
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
          backgroundColor: "#ff7417",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.5px",

          "&:hover": {
            backgroundColor: "#ff7417",
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default IntakeSubmit;