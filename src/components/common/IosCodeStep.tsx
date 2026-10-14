import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { getToken } from "../../utils/auth";

/**
 * Copy the user's GRIND code to the clipboard.
 *
 * The installed iOS app doesn't share storage with the
 * browser, so the user pastes this code on first launch.
 */
export const copyGrindCode = async (): Promise<boolean> => {
    const token = getToken();
    if (!token || !navigator.clipboard) return false;

    try {
        await navigator.clipboard.writeText(token);
        return true;
    } catch {
        return false;
    }
};

/**
 * Step 3 of the iOS install guide: show the user's code
 * so they can paste it in the installed app.
 */
const IosCodeStep: React.FC = () => {
    const token = getToken();
    const [copied, setCopied] = useState(false);

    if (!token) return null;

    const handleCopy = async () => {
        if (await copyGrindCode()) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", p: 1.5, borderRadius: 2 }}>
                    <KeyRoundedIcon sx={{ color: "primary.main" }} />
                </Box>
                <Typography sx={{ fontSize: 15 }}>
                    <strong>3.</strong> Open GRIND from your Home Screen and paste <strong>your code</strong>.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    p: 1.5,
                    pl: 2,
                    borderRadius: 2,
                    border: "1px dashed rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                }}
            >
                <Typography sx={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, wordBreak: "break-all" }}>
                    {token}
                </Typography>
                <Button
                    size="small"
                    onClick={handleCopy}
                    startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
                    sx={{ flexShrink: 0, fontWeight: 700 }}
                >
                    {copied ? "Copied" : "Copy"}
                </Button>
            </Box>
        </Box>
    );
};

export default IosCodeStep;
