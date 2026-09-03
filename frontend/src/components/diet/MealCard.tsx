import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

export interface MealOption {
  name: string;

  calories?:
    | string
    | number;

  protein?:
    | string
    | number;

  carbs?:
    | string
    | number;

  fat?:
    | string
    | number;

  fibre?:
    | string
    | number;

  items: string[];
}

interface MealCardProps {
  option: MealOption;
  selected: boolean;
  onToggle: () => void;
}

const MealCard = ({
  option,
  selected,
  onToggle,
}: MealCardProps) => {
  return (
    <Box
      sx={{
        border: selected
          ? "1px solid #22c55e"
          : "1px solid #ddd8d2",

        backgroundColor: selected
          ? "#f3fff7"
          : "#fff",

        borderRadius: "9px",

        px: {
          xs: 1.4,
          md: 1.7,
        },

        py: 1.35,

        mb: 1.1,

        transition:
          "border-color 180ms ease, background-color 180ms ease",
      }}
    >
      {/* =================================================
          TOP
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 900,
              color: "#211e1b",
            }}
          >
            {option.name}
          </Typography>

          {(option.calories !==
            undefined ||
            option.protein !==
              undefined) && (
            <Typography
              sx={{
                mt: 0.3,
                fontSize: 9,
                color: "#ff5c35",
                fontWeight: 700,
              }}
            >
              {option.calories ??
                "-"}{" "}
              •{" "}
              {option.protein ??
                "-"}{" "}
              protein
            </Typography>
          )}
        </Box>

        <Button
          onClick={onToggle}
          size="small"
          startIcon={
            selected ? (
              <CheckIcon
                sx={{
                  fontSize: 12,
                }}
              />
            ) : undefined
          }
          sx={{
            minWidth: 0,
            height: 24,
            px: 1,
            borderRadius: "6px",

            backgroundColor:
              selected
                ? "#22c55e"
                : "#fff0eb",

            color: selected
              ? "#fff"
              : "#ff4b23",

            fontSize: 8,
            fontWeight: 800,
            textTransform:
              "uppercase",

            flexShrink: 0,

            "&:hover": {
              backgroundColor:
                selected
                  ? "#16a34a"
                  : "#ffe5dd",
            },
          }}
        >
          {selected
            ? "Added"
            : "Add Meal"}
        </Button>
      </Box>

      {/* =================================================
          FOOD ITEMS
      ================================================= */}

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection:
            "column",
          gap: 0.25,
        }}
      >
        {option.items.map(
          (item, index) => (
            <Typography
              key={`${item}-${index}`}
              sx={{
                fontSize: 9,
                lineHeight: 1.45,
                color: "#625c56",
              }}
            >
              • {item}
            </Typography>
          )
        )}
      </Box>

      {/* =================================================
          MACROS
      ================================================= */}

      {(option.calories !==
        undefined ||
        option.protein !==
          undefined ||
        option.carbs !==
          undefined ||
        option.fat !==
          undefined ||
        option.fibre !==
          undefined) && (
        <Box
          sx={{
            mt: 1.1,
            pt: 0.8,

            borderTop:
              "1px dashed #ddd8d2",

            display: "flex",
            flexWrap: "wrap",

            gap: {
              xs: 1.25,
              md: 2,
            },
          }}
        >
          <Macro
            label="Calories"
            value={
              option.calories ??
              "-"
            }
          />

          <Macro
            label="Protein"
            value={
              option.protein ??
              "-"
            }
          />

          <Macro
            label="Carbs"
            value={
              option.carbs ??
              "-"
            }
          />

          <Macro
            label="Fat"
            value={
              option.fat ??
              "-"
            }
          />

          <Macro
            label="Fibre"
            value={
              option.fibre ??
              "-"
            }
          />
        </Box>
      )}

      {/* =================================================
          TRACK
      ================================================= */}

      <Button
        onClick={onToggle}
        fullWidth
        sx={{
          mt: 1.1,
          height: 27,
          borderRadius: "5px",

          border: "1px solid",

          borderColor:
            selected
              ? "#22c55e"
              : "#ddd8d2",

          color: selected
            ? "#15803d"
            : "#6f6963",

          fontSize: 8,
          fontWeight: 800,
          textTransform:
            "uppercase",

          "&:hover": {
            borderColor:
              "#ff5c35",
            color:
              "#ff5c35",
            backgroundColor:
              "#fffaf7",
          },
        }}
      >
        {selected
          ? "I Had This ✓"
          : "Track This"}
      </Button>
    </Box>
  );
};

const Macro = ({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number;
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 7,
          color: "#88817a",
          textTransform:
            "uppercase",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 0.15,
          fontSize: 9,
          fontWeight: 700,
          color: "#302c28",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default MealCard;