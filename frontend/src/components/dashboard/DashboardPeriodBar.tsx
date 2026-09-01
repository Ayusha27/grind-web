import {
  Box,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface DashboardPeriodBarProps {
  month: number;
  week: number;
  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
}

const MONTHS = [1, 2, 3];
const WEEKS = [1, 2, 3, 4];

const DashboardPeriodBar = ({
  month,
  week,
  onMonthChange,
  onWeekChange,
}: DashboardPeriodBarProps) => {
  return (
    <Box
      sx={{
        minHeight: 64,
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        backgroundColor: "#121317",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        borderBottom: "1px solid #272727",
      }}
    >
      {/* Period selectors */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 1,
            md: 1.5,
          },
        }}
      >
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
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
          onChange={(event) =>
            onMonthChange(Number(event.target.value))
          }
          size="small"
          sx={selectStyles}
        >
          {MONTHS.map((value) => (
            <MenuItem key={value} value={value}>
              Month {value}
            </MenuItem>
          ))}
        </Select>

        <Typography
          sx={{
            color: "#44413e",
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          |
        </Typography>

        <Select
          value={week}
          onChange={(event) =>
            onWeekChange(Number(event.target.value))
          }
          size="small"
          sx={selectStyles}
        >
          {WEEKS.map((value) => (
            <MenuItem key={value} value={value}>
              Week {value}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Sync status */}
      <Typography
        sx={{
          fontSize: {
            xs: 9,
            sm: 10,
          },
          color: "#ff5c35",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        ● Auto-syncing to Progress
      </Typography>
    </Box>
  );
};

const selectStyles = {
  minWidth: {
    xs: 95,
    sm: 110,
  },
  height: 38,
  color: "#ffffff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b3937",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5c35",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5c35",
  },

  "& .MuiSvgIcon-root": {
    color: "#ffffff",
  },
};

export default DashboardPeriodBar;