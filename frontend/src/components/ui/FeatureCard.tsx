import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        p: {
          xs: 3,
          md: 4,
        },
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        transition: "border-color 0.2s ease, transform 0.2s ease",

        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-4px)",
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            color: "primary.main",
            mb: 2.5,
            display: "flex",
          }}
        >
          {icon}
        </Box>
      )}

      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: 30,
            md: 38,
          },
          lineHeight: 1,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 16,
          lineHeight: 1.7,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;