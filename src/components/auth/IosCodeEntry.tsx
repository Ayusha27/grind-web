import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container, Card, CircularProgress, InputAdornment } from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import axios from "axios";

import { getDashboard } from "../../api/dashboardApi";
import { saveToken, clearToken } from "../../utils/auth";

interface IosCodeEntryProps {
    onSuccess: () => void;
}

/**
 * Shown in the installed iOS app when no valid token is
 * stored. The user enters their GRIND code once and it is
 * saved in the app's own storage for future launches.
 */
const IosCodeEntry: React.FC<IosCodeEntryProps> = ({ onSuccess }) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // The install guide copies the code to the clipboard,
    // so one tap fills it in here (iOS asks to allow paste).
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text.trim()) {
                setCode(text.trim());
                setError("");
            }
        } catch {
            setError("Couldn't paste. Tap and hold the field to paste instead.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = code.trim();
        if (!token) return;

        setLoading(true);
        setError("");

        // Save first so the API call is made with this code,
        // then confirm the backend accepts it.
        saveToken(token);

        try {
            const response = await getDashboard();

            if (!response.success) {
                throw new Error("Invalid code");
            }

            onSuccess();
        } catch (err) {
            clearToken();

            const status = axios.isAxiosError(err) ? err.response?.status : undefined;
            setError(
                status === undefined || status === 401 || status === 403
                    ? "That code didn't work. Please check it and try again."
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at top right, rgba(244, 121, 32, 0.15), transparent 400px), #0b0b0b",
                px: 2,
            }}
        >
            <Container maxWidth="sm" disableGutters>
                <Card sx={{ p: 4, borderRadius: 3, background: "rgba(23, 23, 23, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 22, color: "primary.main", mb: 1, textAlign: "center" }}>
                        Welcome to GRIND
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 15, lineHeight: 1.6, mb: 3, textAlign: "center" }}>
                        Paste the GRIND code shown when you installed the app. You'll only need to do this once.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Your GRIND code"
                            placeholder="e.g. GR_ABC_000123"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            error={!!error}
                            helperText={error || " "}
                            slotProps={{
                                htmlInput: {
                                    autoCapitalize: "characters",
                                    autoCorrect: "off",
                                    autoComplete: "off",
                                    spellCheck: false,
                                },
                                input: {
                                    endAdornment: navigator.clipboard?.readText ? (
                                        <InputAdornment position="end">
                                            <Button
                                                size="small"
                                                onClick={handlePaste}
                                                startIcon={<ContentPasteRoundedIcon />}
                                                sx={{ fontWeight: 700 }}
                                            >
                                                Paste
                                            </Button>
                                        </InputAdornment>
                                    ) : undefined,
                                },
                            }}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={loading || !code.trim()}
                            sx={{ py: 1.5, fontWeight: 700 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Continue"}
                        </Button>
                    </form>
                </Card>
            </Container>
        </Box>
    );
};

export default IosCodeEntry;
