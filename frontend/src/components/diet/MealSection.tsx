import {
  Box,
  Typography,
} from "@mui/material";

import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

import MealCard, {
  type MealOption,
} from "./MealCard";

interface MealSectionProps {
  meal: string;

  options: MealOption[];

  /*
   * Index of the selected option.
   *
   * undefined = nothing selected.
   */
  selectedMeal:
    | number
    | undefined;

  onToggleMeal: (
    optionIndex: number
  ) => void;
}

const MealSection = ({
  meal,
  options,
  selectedMeal,
  onToggleMeal,
}: MealSectionProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        mb: {
          xs: 2,
          md: 2.5,
        },
      }}
    >
      {/* =================================================
          MEAL HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mb: 1,
          minWidth: 0,
        }}
      >
        <RestaurantMenuOutlinedIcon
          sx={{
            fontSize: 16,
            color: "#ff5c35",
            flexShrink: 0,
          }}
        />

        <Typography
          component="h3"
          sx={{
            fontSize: 13,
            fontWeight: 900,
            color: "#211e1b",
            whiteSpace:
              "nowrap",
          }}
        >
          {meal}
        </Typography>

        <Typography
          sx={{
            ml: 0.5,
            fontSize: 8,
            color: "#8a837d",
            textTransform:
              "uppercase",
            whiteSpace:
              "nowrap",
          }}
        >
          Choose one
        </Typography>
      </Box>

      {/* =================================================
          OPTIONS
      ================================================= */}

      {options.map(
        (option, index) => (
          <MealCard
            key={`${meal}-${index}`}
            option={option}
            selected={
              selectedMeal === index
            }
            onToggle={() =>
              onToggleMeal(index)
            }
          />
        )
      )}
    </Box>
  );
};

export default MealSection;