import { Box, Typography } from "@mui/material";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

import type { MealOption } from "../../pages/client/diet/dietMockData";
import MealCard from "./MealCard";

interface MealSectionProps {
  meal: string;
  options: MealOption[];
  selectedMeals: string[];
  onToggleMeal: (key: string) => void;
}

const MealSection = ({
  meal,
  options,
  selectedMeals,
  onToggleMeal,
}: MealSectionProps) => {
  return (
    <Box
      sx={{
        mb: {
          xs: 2,
          md: 2.5,
        },
      }}
    >
      {/* MEAL HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mb: 1,
        }}
      >
        <RestaurantMenuOutlinedIcon
          sx={{
            fontSize: 16,
            color: "#ff5c35",
          }}
        />

        <Typography
          component="h3"
          sx={{
            fontSize: 13,
            fontWeight: 900,
            color: "#211e1b",
          }}
        >
          {meal}
        </Typography>

        <Typography
          sx={{
            ml: 0.5,
            fontSize: 8,
            color: "#8a837d",
            textTransform: "uppercase",
          }}
        >
          Choose one
        </Typography>
      </Box>

      {options.map((option, index) => {
        const key = `${meal}-${index}`;

        return (
          <MealCard
            key={key}
            option={option}
            selected={selectedMeals.includes(key)}
            onToggle={() => onToggleMeal(key)}
          />
        );
      })}
    </Box>
  );
};

export default MealSection;