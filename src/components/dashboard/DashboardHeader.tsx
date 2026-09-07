import { Box, IconButton, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import useInstallPrompt from "../../hooks/useInstallPrompt";

const DashboardHeader = () => {
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
      {/* ===================================================
          GRIND LOGO
          =================================================== */}

      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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

            whiteSpace: "nowrap",
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

            lineHeight: 1,

            letterSpacing: 2.5,

            fontWeight: 700,

            color: "#716d69",

            whiteSpace: "nowrap",
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

      {/* ===================================================
          GET GRIND APP
          =================================================== */}

      {!isInstalled && canInstall && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1,
              sm: 1.5,
            },
          }}
        >
          {/* Get Grind App text */}
          <Typography
            component="button"
            onClick={handleInstall}
            sx={{
              border: 0,
              background: "transparent",
              padding: 0,

              cursor: "pointer",

              color: "#ff5c35",

              fontSize: {
                xs: 13,
                sm: 15,
                md: 17,
              },

              fontWeight: 800,

              lineHeight: 1,

              whiteSpace: "nowrap",

              transition:
                "opacity 150ms ease",

              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            Get Grind App
          </Typography>

          {/* Download icon */}
          <IconButton
            type="button"
            onClick={handleInstall}
            aria-label="Get Grind App"
            sx={{
              width: {
                xs: 42,
                sm: 48,
                md: 52,
              },

              height: {
                xs: 42,
                sm: 48,
                md: 52,
              },

              borderRadius: 1.5,

              color: "#ff5c35",

              border:
                "1px solid #ff5c35",

              backgroundColor:
                "rgba(255, 92, 53, 0.04)",

              transition:
                "background-color 150ms ease, transform 150ms ease",

              "&:hover": {
                backgroundColor:
                  "rgba(255, 92, 53, 0.12)",

                color: "#ff5c35",

                transform:
                  "translateY(-1px)",
              },

              "&:focus-visible": {
                outline:
                  "2px solid #ff5c35",

                outlineOffset: 2,
              },
            }}
          >
            <DownloadRoundedIcon
              sx={{
                fontSize: {
                  xs: 23,
                  sm: 26,
                  md: 28,
                },
              }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default DashboardHeader;