import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, IconButton } from "@mui/material";
import InstallDesktopRoundedIcon from "@mui/icons-material/InstallDesktopRounded";
import CloseIcon from "@mui/icons-material/Close";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import useInstallPrompt from "../../hooks/useInstallPrompt";


interface InstallGrindButtonProps {
    fullWidth?: boolean;
}

const InstallGrindButton: React.FC<
    InstallGrindButtonProps
> = ({ fullWidth = false }) => {
    const {
        canInstall,
        isInstalled,
        installApp,
        isIOS
    } = useInstallPrompt();

    const [iosDialogOpen, setIosDialogOpen] = useState(false);

    // Don't show the button if Grind is already
    // installed as a web app.
    if (isInstalled) {
        return null;
    }

    // Chrome hasn't made the PWA install prompt
    // available yet, and we are not on iOS.
    if (!canInstall && !isIOS) {
        return null;
    }

    const handleInstall = async () => {
        if (isIOS) {
            setIosDialogOpen(true);
            return;
        }
        await installApp();
    };

    return (
        <>
        <Button
            type="button"
            onClick={handleInstall}
            variant="contained"
            fullWidth={fullWidth}
            startIcon={
                <InstallDesktopRoundedIcon />
            }
            sx={{
                backgroundColor: "#ff5c35",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 800,
                px: 2.5,
                py: 1,
                boxShadow: "none",

                "&:hover": {
                    backgroundColor: "#e94d2b",
                    boxShadow: "none",
                },

                "& .MuiButton-startIcon": {
                    marginRight: 0.7,
                },
            }}
        >
            Install Grind
        </Button>

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
                    To install the GRIND app on your iPhone or iPad for the best experience:
                </Typography>
                
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
        </>
    );
};

export default InstallGrindButton;