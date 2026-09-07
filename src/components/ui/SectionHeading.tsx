import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          color: "primary.main",
          mb: 1,
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        {eyebrow}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: {
            xs: 42,
            md: 72,
          },
          lineHeight: 0.95,
          mb: description ? 3 : 2.5,
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            maxWidth: 850,
            mx: "auto",
            fontSize: {
              xs: 17,
              md: 20,
            },
            lineHeight: 1.8,
            color: "text.secondary",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;