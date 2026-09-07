import { Box, Button, Typography } from "@mui/material";
import InstallDesktopRoundedIcon from "@mui/icons-material/InstallDesktopRounded";

import { useDashboard } from "../../context/DashboardContext";
import useInstallPrompt from "../../hooks/useInstallPrompt";

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

const DashboardHeader = () => {
  const { stats } = useDashboard();

  const {
    completedSets,
    totalSets,
    loggedDays,
    totalDays,
    calories,
  } = stats;

  const {
    canInstall,
    isInstalled,
    installApp,
  } = useInstallPrompt();

  const handleInstall = async () => {
    await installApp();
  };

  return (
    <Box
      component="header"
      sx={{
        minHeight: 72,
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
        gap: 2,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          flexShrink: 0,
        }}
      >
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

      {/* Right side */}
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          height: "100%",
          minWidth: 0,
        }}
      >
        {/* Install Grind */}
        {!isInstalled && canInstall && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: {
                xs: 0.8,
                sm: 1.5,
                md: 2,
              },
              borderLeft: "1px solid #292724",
            }}
          >
            <Button
              type="button"
              onClick={handleInstall}
              variant="contained"
              startIcon={
                <InstallDesktopRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 15,
                      sm: 17,
                    },
                  }}
                />
              }
              sx={{
                minHeight: {
                  xs: 34,
                  sm: 38,
                },
                px: {
                  xs: 1,
                  sm: 1.5,
                },
                borderRadius: 1.5,
                backgroundColor: "#ff5c35",
                color: "#ffffff",
                textTransform: "none",
                fontSize: {
                  xs: 8,
                  sm: 9,
                },
                fontWeight: 800,
                whiteSpace: "nowrap",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#e94d2b",
                  boxShadow: "none",
                },

                "& .MuiButton-startIcon": {
                  marginRight: {
                    xs: 0.3,
                    sm: 0.5,
                  },
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline",
                  },
                }}
              >
                Install Grind
              </Box>

              <Box
                component="span"
                sx={{
                  display: {
                    xs: "inline",
                    sm: "none",
                  },
                }}
              >
                Install
              </Box>
            </Button>
          </Box>
        )}

        {/* Stats */}
        <HeaderStat
          value={`${completedSets}/${totalSets}`}
          label="SETS DONE"
        />

        <HeaderStat
          value={`${loggedDays}/${totalDays}`}
          label="DAYS LOGGED"
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