import React, { useState } from "react";
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CloseIcon from "@mui/icons-material/Close";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import InstallDesktopRoundedIcon from "@mui/icons-material/InstallDesktopRounded";

import useInstallPrompt from "../../hooks/useInstallPrompt";

const DashboardHeader = () => {
  const {
    canInstall,
    isInstalled,
    installApp,
    isIOS,
    isSafari,
  } = useInstallPrompt();

  const [iosDialogOpen, setIosDialogOpen] = useState(false);

  const handleInstall = async () => {
    if (isIOS || isSafari) {
      setIosDialogOpen(true);
      return;
    }
    await installApp();
  };

  return (
    <Box
      component="header"
      sx={{
        minHeight: {
          xs: 64,
          sm: 72,
          md: 88,
        },

        backgroundColor: "#13131A",

        borderBottom:
          "1px solid #4C4A49",

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
          component="div"
          sx={{
            fontFamily:
              "'Archivo Black', sans-serif",

            fontSize: {
              xs: 20,
              sm: 21,
              md: 23,
            },

            fontWeight: 400,

            lineHeight: 1,

            letterSpacing: {
              xs: 4,
              sm: 4.5,
              md: 5,
            },

            color: "#FFFFFF",

            whiteSpace: "nowrap",
          }}
        >
          GRIND
          <Box
            component="span"
            sx={{
              color: "#FF5C35",
            }}
          >
            .
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 0.5,

            fontFamily:
              "'Archivo', sans-serif",

            fontSize: {
              xs: 7,
              sm: 8,
              md: 9,
            },

            lineHeight: 1,

            letterSpacing: {
              xs: 2,
              sm: 2.2,
              md: 2.5,
            },

            fontWeight: 600,

            color: "#4C4A49",

            whiteSpace: "nowrap",

            textTransform: "uppercase",
          }}
        >
          POWERED BY{" "}
          <Box
            component="span"
            sx={{
              color: "#FF5C35",
            }}
          >
            TREND
          </Box>
        </Typography>
      </Box>

      {/* ===================================================
          GET GRIND APP
          =================================================== */}

      {!isInstalled && (canInstall || isIOS || isSafari) && (
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

              color: "#FF5C35",

              fontFamily:
                "'Archivo', sans-serif",

              fontSize: {
                xs: 12,
                sm: 13,
                md: 15,
              },

              fontWeight: 600,

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
                xs: 40,
                sm: 44,
                md: 48,
              },

              height: {
                xs: 40,
                sm: 44,
                md: 48,
              },

              borderRadius: "4px",

              color: "#FF5C35",

              border:
                "1px solid #FF5C35",

              backgroundColor:
                "rgba(255, 92, 53, 0.04)",

              transition:
                "background-color 150ms ease, transform 150ms ease",

              "&:hover": {
                backgroundColor:
                  "rgba(255, 92, 53, 0.12)",

                color: "#FF5C35",

                transform:
                  "translateY(-1px)",
              },

              "&:focus-visible": {
                outline:
                  "2px solid #FF5C35",

                outlineOffset: 2,
              },
            }}
          >
            <DownloadRoundedIcon
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 23,
                  md: 25,
                },
              }}
            />
          </IconButton>
        </Box>
      )}

      <Dialog 
        open={iosDialogOpen} 
        onClose={() => setIosDialogOpen(false)}
        sx={{
            "& .MuiDialog-paper": {
                backgroundColor: "#171717",
                backgroundImage: "none",
                borderRadius: 3,
                border: "1px solid #292929",
                maxWidth: 400
            }
        }}
      >
        <DialogTitle sx={{ pr: 6 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                Install GRIND App
            </Typography>
            <IconButton 
                onClick={() => setIosDialogOpen(false)}
                sx={{ position: "absolute", right: 12, top: 12, color: "text.secondary" }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Typography sx={{ color: "text.secondary", mb: 3, fontSize: 15, lineHeight: 1.6 }}>
                To install the GRIND app on your {isIOS ? "iPhone or iPad" : "Mac"} for the best experience:
            </Typography>
            
            {isIOS ? (
                <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", p: 1.5, borderRadius: 2 }}>
                        <IosShareIcon sx={{ color: "#007AFF" }} />
                    </Box>
                    <Typography sx={{ fontSize: 15 }}>
                        <strong>1.</strong> Tap the <strong>Share</strong> button at the bottom of Safari.
                    </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", p: 1.5, borderRadius: 2 }}>
                        <AddBoxOutlinedIcon sx={{ color: "text.secondary" }} />
                    </Box>
                    <Typography sx={{ fontSize: 15 }}>
                        <strong>2.</strong> Scroll down and select <strong>Add to Home Screen</strong>.
                    </Typography>
                </Box>
                </>
            ) : (
                <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", p: 1.5, borderRadius: 2 }}>
                        <InstallDesktopRoundedIcon sx={{ color: "primary.main" }} />
                    </Box>
                    <Typography sx={{ fontSize: 15 }}>
                        <strong>1.</strong> Click <strong>File</strong> in the top menu bar of Safari.
                    </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", p: 1.5, borderRadius: 2 }}>
                        <AddBoxOutlinedIcon sx={{ color: "text.secondary" }} />
                    </Box>
                    <Typography sx={{ fontSize: 15 }}>
                        <strong>2.</strong> Select <strong>Add to Dock...</strong>
                    </Typography>
                </Box>
                </>
            )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
                onClick={() => setIosDialogOpen(false)}
                fullWidth
                variant="contained"
                sx={{ 
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontWeight: 700,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none"
                }}
            >
                Got it
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardHeader;