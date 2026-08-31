import { Box, MenuItem, Select, Typography } from "@mui/material";

interface WorkoutPeriodBarProps {
  month: number;
  week: number;
  onMonthChange: (value: number) => void;
  onWeekChange: (value: number) => void;
}

const WorkoutPeriodBar = ({
  month,
  week,
  onMonthChange,
  onWeekChange,
}: WorkoutPeriodBarProps) => {
  return (
    <Box
      sx={{
        height: 64,
        px: {
          xs: 2.5,
          md: 4,
        },

        backgroundColor: "#121317",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        borderBottom: "1px solid #272727",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 1.5,
            color: "#6f6b68",
            fontWeight: 700,
          }}
        >
          LOGGING TO
        </Typography>

        <Select
          value={month}
          onChange={(e) =>
            onMonthChange(Number(e.target.value))
          }
          size="small"
          variant="outlined"
          sx={{
            minWidth: 115,
            height: 38,

            color: "#ffffff",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b3937",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ff5c35",
            },

            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },
          }}
        >
          <MenuItem value={1}>Month 1</MenuItem>
          <MenuItem value={2}>Month 2</MenuItem>
          <MenuItem value={3}>Month 3</MenuItem>
        </Select>

        <Typography
          sx={{
            color: "#44413e",
          }}
        >
          |
        </Typography>

        <Select
          value={week}
          onChange={(e) =>
            onWeekChange(Number(e.target.value))
          }
          size="small"
          variant="outlined"
          sx={{
            minWidth: 110,
            height: 38,

            color: "#ffffff",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b3937",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ff5c35",
            },

            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },
          }}
        >
          <MenuItem value={1}>Week 1</MenuItem>
          <MenuItem value={2}>Week 2</MenuItem>
          <MenuItem value={3}>Week 3</MenuItem>
          <MenuItem value={4}>Week 4</MenuItem>
        </Select>
      </Box>

      <Typography
        sx={{
          fontSize: 10,
          color: "#ff5c35",
          fontWeight: 600,
        }}
      >
        ● Auto-syncing to Progress
      </Typography>
    </Box>
  );
};

export default WorkoutPeriodBar;