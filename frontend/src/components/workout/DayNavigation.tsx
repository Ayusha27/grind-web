import { Box, Typography } from "@mui/material";

export interface WorkoutDay {
  id: number;
  dayNumber: number;
  label: string;
}

interface DayNavigationProps {
  days: WorkoutDay[];
  selectedDay: number;
  onDayChange: (dayNumber: number) => void;
}

const DayNavigation = ({
  days,
  selectedDay,
  onDayChange,
}: DayNavigationProps) => {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        height: {
          xs: 64,
          sm: 72,
        },
        display: "flex",
        backgroundColor: "#151513",
        borderBottom: "1px solid #292725",
      }}
    >
      {days.map((day) => {
        const isActive = day.dayNumber === selectedDay;

        return (
          <Box
            key={day.id}
            component="button"
            onClick={() => onDayChange(day.dayNumber)}
            sx={{
              position: "relative",
              flex: 1,
              minWidth: 0,

              border: 0,
              outline: "none",
              background: "transparent",

              cursor: "pointer",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              color: isActive ? "#ffffff" : "#55524f",

              transition: "color 0.2s ease",

              "&:hover": {
                color: isActive ? "#ffffff" : "#85817d",
              },

              // Active bottom border
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 3,
                backgroundColor: isActive
                  ? "#ff5c35"
                  : "transparent",
              },
            }}
          >
            {/* Day number */}
            <Typography
              component="span"
              sx={{
                fontSize: {
                  xs: 18,
                  sm: 23,
                },
                lineHeight: 1,
                fontWeight: 900,
                color: isActive ? "#ffffff" : "#55524f",
              }}
            >
              {day.dayNumber}
            </Typography>

            {/* Day label */}
            <Typography
              component="span"
              sx={{
                mt: 0.5,

                maxWidth: "90%",

                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",

                fontSize: {
                  xs: 8,
                  sm: 10,
                },

                letterSpacing: {
                  xs: 1,
                  sm: 1.4,
                },

                fontWeight: 700,

                color: isActive
                  ? "#d8d4d0"
                  : "#55524f",
              }}
            >
              {day.label}
            </Typography>

            {/* Active indicator */}
            <Box
              sx={{
                width: 5,
                height: 5,
                mt: 0.8,

                borderRadius: "50%",

                backgroundColor: isActive
                  ? "#ff5c35"
                  : "#3f3d3a",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default DayNavigation;