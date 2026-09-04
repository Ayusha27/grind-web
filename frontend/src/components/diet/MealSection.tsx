import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import type { ReactNode } from "react";

import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
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
  selectedMeal: number | undefined;

  onToggleMeal: (
    optionIndex: number
  ) => void;
}

interface MealTheme {
  background: string;
  border: string;
  accent: string;
  text: string;
  buttonBackground: string;
  icon: ReactNode;
  subtitle: string;
}

const getMealTheme = (
  meal: string
): MealTheme => {
  const normalizedMeal =
    meal.trim().toLowerCase();

  if (normalizedMeal === "breakfast") {
    return {
      background: "#fff0e8",
      border: "#ffd8c9",
      accent: "#ff5c35",
      text: "#7c2d12",
      buttonBackground: "#ffe0d3",
      icon: (
        <BreakfastDiningOutlinedIcon />
      ),
      subtitle:
        "Choose one meal to start your day",
    };
  }

  if (normalizedMeal === "lunch") {
    return {
      background: "#edf8ed",
      border: "#d0ead0",
      accent: "#16a34a",
      text: "#166534",
      buttonBackground: "#dcefdc",
      icon: (
        <LunchDiningOutlinedIcon />
      ),
      subtitle:
        "Choose one meal for your mid-day fuel",
    };
  }

  if (
    normalizedMeal === "snack" ||
    normalizedMeal === "snacks"
  ) {
    return {
      background: "#f3eaff",
      border: "#e3d1ff",
      accent: "#7c3aed",
      text: "#5b21b6",
      buttonBackground: "#e8d8ff",
      icon: (
        <RestaurantMenuOutlinedIcon />
      ),
      subtitle:
        "Choose one meal for your energy boost",
    };
  }

  if (normalizedMeal === "dinner") {
    return {
      background: "#edf5ff",
      border: "#d3e5ff",
      accent: "#2563eb",
      text: "#1e40af",
      buttonBackground: "#dceaff",
      icon: (
        <DinnerDiningOutlinedIcon />
      ),
      subtitle:
        "Choose one meal to complete your day",
    };
  }

  return {
    background: "#f5f3ef",
    border: "#e0dbd4",
    accent: "#ff5c35",
    text: "#211e1b",
    buttonBackground: "#eeeae5",
    icon: (
      <RestaurantMenuOutlinedIcon />
    ),
    subtitle: "Choose one meal",
  };
};

const MealSection = ({
  meal,
  options,
  selectedMeal,
  onToggleMeal,
}: MealSectionProps) => {
  const theme = getMealTheme(meal);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minWidth: 0,
        mb: {
          xs: 3,
          sm: 3.5,
          md: 4,
        },
      }}
    >
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",

          display: "flex",
          alignItems: "center",

          gap: {
            xs: 1,
            sm: 1.25,
          },

          px: {
            xs: 1.25,
            sm: 1.75,
            md: 2,
          },

          py: {
            xs: 1,
            sm: 1.25,
          },

          mb: {
            xs: 1.25,
            sm: 1.5,
          },

          borderRadius: "12px",

          backgroundColor:
            theme.background,

          border: `1px solid ${theme.border}`,
        }}
      >
        {/* ICON */}

        <Box
          sx={{
            width: {
              xs: 36,
              sm: 40,
            },

            height: {
              xs: 36,
              sm: 40,
            },

            flexShrink: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "10px",

            backgroundColor:
              theme.buttonBackground,

            color: theme.accent,

            "& svg": {
              fontSize: {
                xs: 20,
                sm: 23,
              },
            },
          }}
        >
          {theme.icon}
        </Box>

        {/* TITLE */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: 15,
                sm: 16,
                md: 17,
              },

              lineHeight: 1.1,

              fontWeight: 900,

              color: theme.text,

              letterSpacing: "-0.15px",
            }}
          >
            {meal}
          </Typography>

          <Typography
            sx={{
              mt: 0.3,

              fontSize: {
                xs: 8.5,
                sm: 9,
                md: 9.5,
              },

              lineHeight: 1.35,

              color: theme.text,

              opacity: 0.75,
            }}
          >
            {theme.subtitle}
          </Typography>
        </Box>

        {/* SELECTION STATUS */}

        <Button
          disableRipple
          sx={{
            minWidth: "auto",

            flexShrink: 0,

            px: {
              xs: 1,
              sm: 1.25,
            },

            py: {
              xs: 0.55,
              sm: 0.65,
            },

            borderRadius: "999px",

            backgroundColor:
              selectedMeal !== undefined
                ? theme.buttonBackground
                : "rgba(255,255,255,.55)",

            color: theme.text,

            border:
              selectedMeal !== undefined
                ? "none"
                : `1px solid ${theme.border}`,

            fontSize: {
              xs: 7,
              sm: 7.5,
            },

            fontWeight: 800,

            textTransform: "uppercase",

            whiteSpace: "nowrap",

            pointerEvents: "none",

            "&:hover": {
              backgroundColor:
                selectedMeal !== undefined
                  ? theme.buttonBackground
                  : "rgba(255,255,255,.55)",
            },
          }}
        >
          {selectedMeal !== undefined
            ? "1 Selected"
            : "Choose One"}
        </Button>
      </Box>

      {/* =================================================
          MEAL OPTIONS
      ================================================= */}

      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          /*
           * Desktop/tablet:
           * normal responsive grid.
           */
          display: "grid",

          gridTemplateColumns: {
            xs: "none",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },

          gap: {
            sm: 1.5,
            md: 1.5,
          },

          /*
           * Mobile:
           * horizontal swipe area.
           */
          "@media (max-width:599px)": {
            display: "flex",

            overflowX: "auto",

            flexWrap: "nowrap",

            gap: 1.25,

            pb: 1,

            px: 0.05,

            scrollSnapType: "x mandatory",

            WebkitOverflowScrolling: "touch",

            scrollbarWidth: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
      >
        {options.map(
          (option, index) => (
            <Box
              key={`${meal}-${index}`}
              sx={{
                minWidth: 0,

                "@media (max-width:599px)": {
                  flex: "0 0 88%",

                  maxWidth: "88%",

                  scrollSnapAlign:
                    "start",
                },
              }}
            >
              <MealCard
                option={option}
                selected={
                  selectedMeal === index
                }
                onToggle={() =>
                  onToggleMeal(index)
                }
              />
            </Box>
          )
        )}
      </Box>

      {/* =================================================
          MOBILE SWIPE HINT
      ================================================= */}

      {options.length > 1 && (
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },

            alignItems: "center",
            justifyContent: "center",

            gap: 0.75,

            mt: 0.75,
          }}
        >
          <Typography
            sx={{
              fontSize: 7.5,
              color: "#8a837d",
              textTransform:
                "uppercase",
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            Swipe for more meals
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: theme.accent,
              lineHeight: 1,
            }}
          >
            →
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MealSection;