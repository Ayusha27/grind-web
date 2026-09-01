import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
}

const Section = ({ children, id }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: {
          xs: 8,
          md: 11,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1280,
          px: {
            xs: 2.5,
            md: 3,
          },
          mx: "auto",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Section;