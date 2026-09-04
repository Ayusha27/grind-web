import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

export interface MealOption {
  name: string;

  calories?: string | number;
  protein?: string | number;
  carbs?: string | number;
  fat?: string | number;
  fibre?: string | number;

  /*
   * Frontend-normalized ingredients.
   */
  items?: string[];

  /*
   * Backend format.
   */
  ingredients?: string;
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
  const items =
    option.items ??
    (option.ingredients
      ? [option.ingredients]
      : []);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",

        border: selected
          ? "2px solid #22c55e"
          : "1px solid #ddd8d2",

        backgroundColor: selected
          ? "#f3fff7"
          : "#fff",

        borderRadius: "12px",

        boxShadow: selected
          ? "0 4px 18px rgba(34,197,94,.12)"
          : "0 2px 10px rgba(26,23,20,.045)",

        p: {
          xs: 1.5,
          sm: 1.6,
          md: 1.7,
        },

        /*
         * Keeps cards visually balanced
         * on desktop.
         */
        minHeight: {
          xs: 0,
          md: 235,
        },

        transition:
          "border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",

        "&:hover": {
          borderColor: selected
            ? "#22c55e"
            : "#cfc8c0",

          boxShadow: selected
            ? "0 4px 18px rgba(34,197,94,.12)"
            : "0 4px 14px rgba(26,23,20,.07)",
        },
      }}
    >
      {/* =================================================
          TOP
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",

          gap: 1,

          minWidth: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: {
                xs: 14,
                sm: 13.5,
                md: 14,
              },

              lineHeight: 1.25,

              fontWeight: 900,

              color: "#211e1b",

              wordBreak: "break-word",
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
                mt: 0.4,

                fontSize: {
                  xs: 9.5,
                  sm: 9.5,
                },

                lineHeight: 1.3,

                color: "#ff5c35",

                fontWeight: 800,
              }}
            >
              {option.calories ?? "-"}{" "}
              •{" "}
              {option.protein ?? "-"}{" "}
              protein
            </Typography>
          )}
        </Box>

        {/* SELECT BUTTON */}

        <Button
          onClick={onToggle}
          size="small"
          startIcon={
            selected ? (
              <CheckIcon
                sx={{
                  fontSize: 14,
                }}
              />
            ) : undefined
          }
          sx={{
            minWidth: "auto",

            flexShrink: 0,

            height: {
              xs: 34,
              sm: 30,
            },

            px: {
              xs: 1.15,
              sm: 1.15,
            },

            borderRadius: "8px",

            backgroundColor: selected
              ? "#22c55e"
              : "#fff0eb",

            color: selected
              ? "#fff"
              : "#ff4b23",

            fontSize: {
              xs: 7.5,
              sm: 7.5,
            },

            fontWeight: 900,

            textTransform: "uppercase",

            whiteSpace: "nowrap",

            "&:hover": {
              backgroundColor: selected
                ? "#16a34a"
                : "#ffe5dd",
            },

            "& .MuiButton-startIcon": {
              marginRight: 0.3,
            },
          }}
        >
          {selected
            ? "Added"
            : "Add Meal"}
        </Button>
      </Box>

      {/* =================================================
          INGREDIENTS
      ================================================= */}

      {items.length > 0 && (
        <Box
          sx={{
            mt: 1.15,

            minHeight: {
              xs: 0,
              md: 38,
            },

            display: "flex",

            flexDirection: "column",

            justifyContent: "flex-start",

            gap: 0.25,
          }}
        >
          {items.map(
            (item, index) => (
              <Typography
                key={`${item}-${index}`}
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 9.5,
                  },

                  lineHeight: 1.5,

                  color: "#625c56",

                  wordBreak:
                    "break-word",
                }}
              >
                • {item}
              </Typography>
            )
          )}
        </Box>
      )}

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
            mt: {
              xs: 1.25,
              md: 1.25,
            },

            pt: 1,

            borderTop:
              "1px dashed #ddd8d2",

            display: "grid",

            gridTemplateColumns:
              "repeat(5, minmax(0, 1fr))",

            gap: {
              xs: 0.5,
              sm: 0.75,
            },

            minWidth: 0,
          }}
        >
          <Macro
            label="Calories"
            value={
              option.calories ?? "-"
            }
          />

          <Macro
            label="Protein"
            value={
              option.protein ?? "-"
            }
          />

          <Macro
            label="Carbs"
            value={
              option.carbs ?? "-"
            }
          />

          <Macro
            label="Fat"
            value={
              option.fat ?? "-"
            }
          />

          <Macro
            label="Fibre"
            value={
              option.fibre ?? "-"
            }
          />
        </Box>
      )}

      {/* =================================================
          TRACK / SELECT
      ================================================= */}

      <Button
        onClick={onToggle}
        fullWidth
        sx={{
          mt: 1.25,

          height: {
            xs: 36,
            sm: 35,
          },

          borderRadius: "8px",

          border: "1px solid",

          borderColor: selected
            ? "#22c55e"
            : "#ddd8d2",

          backgroundColor: selected
            ? "#f7fff9"
            : "transparent",

          color: selected
            ? "#15803d"
            : "#6f6963",

          fontSize: {
            xs: 8,
            sm: 8,
          },

          fontWeight: 900,

          textTransform: "uppercase",

          letterSpacing: 0.2,

          "&:hover": {
            borderColor: selected
              ? "#22c55e"
              : "#ff5c35",

            color: selected
              ? "#15803d"
              : "#ff5c35",

            backgroundColor:
              selected
                ? "#f0fff4"
                : "#fffaf7",
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
  value: string | number;
}) => {
  return (
    <Box
      sx={{
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 6.5,
            sm: 7,
          },

          lineHeight: 1.2,

          color: "#88817a",

          textTransform: "uppercase",

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 0.25,

          fontSize: {
            xs: 9.5,
            sm: 9.5,
          },

          lineHeight: 1.2,

          fontWeight: 800,

          color: "#302c28",

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default MealCard;