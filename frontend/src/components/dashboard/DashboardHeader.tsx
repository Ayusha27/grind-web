import { Box, Typography } from "@mui/material";

interface DashboardHeaderProps {
  completedSets?: number;
  totalSets?: number;
  completedDays?: number;
  totalDays?: number;
  calories?: number;
}

interface HeaderStatProps {
  value: string;
  label: string;
  accent?: boolean;
}

const HeaderStat = ({
  value,
  label,
  accent = false,
}: HeaderStatProps) => {
  return (
    <Box
      sx={{
        minWidth: {
          xs: 80,
          sm: 105,
          md: 125,
        },
        px: {
          xs: 1.5,
          md: 2.5,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderLeft: "1px solid #292724",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 16,
            md: 21,
          },
          lineHeight: 1,
          fontWeight: 900,
          color: accent ? "#ff5c35" : "#ffffff",
          textAlign: "center",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 8,
          letterSpacing: 1.3,
          fontWeight: 700,
          color: "#716d69",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const DashboardHeader = ({
  completedSets = 0,
  totalSets = 0,
  completedDays = 0,
  totalDays = 5,
  calories = 0,
}: DashboardHeaderProps) => {
  return (
    <Box
      component="header"
      sx={{
        height: 72,
        backgroundColor: "#171614",
        borderBottom: "1px solid #252321",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* Logo */}
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: 22,
              md: 28,
            },
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 5,
            color: "#ffffff",
          }}
        >
          GRIND
          <Box
            component="span"
            sx={{
              color: "#ff5c35",
            }}
          >
            .
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 0.35,
            fontSize: 8,
            letterSpacing: 2.5,
            fontWeight: 700,
            color: "#716d69",
          }}
        >
          POWERED BY{" "}
          <Box
            component="span"
            sx={{
              color: "#ff5c35",
            }}
          >
            TREND
          </Box>
        </Typography>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <HeaderStat
          value={`${completedSets}/${totalSets}`}
          label="SETS DONE"
        />

        <HeaderStat
          value={`${completedDays}/${totalDays}`}
          label="DAYS DONE"
        />

        <HeaderStat
          value={`${calories}`}
          label="~KCAL TODAY"
          accent
        />
      </Box>
    </Box>
  );
};

export default DashboardHeader;