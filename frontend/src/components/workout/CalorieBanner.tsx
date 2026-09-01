import { Box, Typography } from "@mui/material";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

interface CalorieBannerProps {
  min?: number;
  max?: number;
  earned?: number;
  note?: string;
}

const CalorieBanner = ({
  min = 250,
  max = 350,
  earned = 0,
  note = "Estimated range · Workout Day",
}: CalorieBannerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        minHeight: 62,
        px: {
          xs: 1.75,
          md: 2.25,
        },
        py: 1.25,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "#fff7f3",
        border: "1px solid #ffd5c9",
        borderRadius: "12px",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.1,
        }}
      >
        {/* FIRE ICON */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",

            display: "grid",
            placeItems: "center",

            backgroundColor: "#ffe5dd",
            flexShrink: 0,
          }}
        >
          <LocalFireDepartmentOutlinedIcon
            sx={{
              fontSize: 18,
              color: "#dc2626",
            }}
          />
        </Box>

        {/* CALORIE TEXT */}
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#1a1714",
            }}
          >
            {min}–{max} kcal
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: 9,
              lineHeight: 1.2,
              color: "#77716b",
            }}
          >
            {note}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 9,
            lineHeight: 1.2,
            color: "#77716b",
          }}
        >
          Earned
        </Typography>

        <Typography
          sx={{
            mt: 0.15,
            fontSize: 17,
            lineHeight: 1.1,
            fontWeight: 900,
            color: "#dc2626",
          }}
        >
          {earned} kcal
        </Typography>
      </Box>
    </Box>
  );
};

export default CalorieBanner;