import React from "react";
import { Button } from "@mui/material";
import InstallDesktopRoundedIcon from "@mui/icons-material/InstallDesktopRounded";
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
    } = useInstallPrompt();

    // Don't show the button if Grind is already
    // installed as a web app.
    if (isInstalled) {
        return null;
    }

    // Chrome hasn't made the PWA install prompt
    // available yet.
    if (!canInstall) {
        return null;
    }

    const handleInstall = async () => {
        await installApp();
    };

    return (
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
    );
};

export default InstallGrindButton;