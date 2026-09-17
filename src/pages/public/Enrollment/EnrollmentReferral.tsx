import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { validateAffiliate } from "../../../api/enrollmentApi";

type EnrollmentReferralProps = {
    referralCode: string;
    onChange: (value: string) => void;
    onValidated?: (data: {
        valid: boolean;
        discountPercent: number;
        couponCode: string;
    }) => void;
};

const EnrollmentReferral = ({
    referralCode,
    onChange,
    onValidated,
}: EnrollmentReferralProps) => {
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleApply = async () => {
        const code = referralCode.trim();

        if (!code) {
            setError("Please enter a referral code.");
            setMessage("");
            setApplied(false);

            onValidated?.({
                valid: false,
                discountPercent: 0,
                couponCode: "",
            });

            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response = await validateAffiliate({
                code,
            });

            if (response.success) {
                const discountPercent = response.discount ?? 0;
                const couponCode = response.code ?? code;

                setApplied(true);

                setMessage(
                    `🎉 Referral Code Applied! ${discountPercent}% OFF unlocked on all plans.`
                );

                onValidated?.({
                    valid: true,
                    discountPercent,
                    couponCode,
                });
            } else {
                setApplied(false);

                setError(
                    response.message ||
                    "Invalid or expired referral code."
                );

                onValidated?.({
                    valid: false,
                    discountPercent: 0,
                    couponCode: "",
                });
            }
        } catch (err) {
            console.error("Affiliate validation failed:", err);

            setApplied(false);

            setError(
                "Unable to validate the referral code. Please try again."
            );

            onValidated?.({
                valid: false,
                discountPercent: 0,
                couponCode: "",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (value: string) => {
        onChange(value);

        // A changed code is no longer considered validated.
        setApplied(false);
        setMessage("");
        setError("");

        onValidated?.({
            valid: false,
            discountPercent: 0,
            couponCode: "",
        });
    };

    return (
        <Box>
            <Typography
                sx={{
                    color: "#f5f5f0",
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: {
                        xs: 26,
                        md: 30,
                    },
                    lineHeight: 1,
                    mb: 2,
                }}
            >
                REFERRAL CODE
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                }}
            >
                <TextField
                    value={referralCode}
                    onChange={(event) =>
                        handleCodeChange(event.target.value)
                    }
                    placeholder="Enter Code"
                    fullWidth
                    disabled={loading}
                    error={Boolean(error)}
                    helperText={error || message}
                    sx={{
                        "& .MuiInputBase-root": {
                            color: "#f5f5f0",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 12,
                            backgroundColor: "#0d0d0d",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#242424",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#555",
                        },

                        "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            borderColor: "#ff8a2a",
                        },

                        "& .MuiFormHelperText-root": {
                            marginLeft: 0,
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 10,
                            color: applied
                                ? "#ff8a2a"
                                : "#ff6b6b",
                        },
                    }}
                />

                <Button
                    type="button"
                    onClick={handleApply}
                    disabled={loading}
                    sx={{
                        minWidth: 130,
                        height: 56,
                        borderRadius: 0,
                        border: "1px solid #ff8a2a",
                        backgroundColor: "transparent",
                        color: "#ff8a2a",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",

                        "&:hover": {
                            backgroundColor: "#ff8a2a",
                            color: "#050505",
                        },
                    }}
                >
                    {loading
                        ? "CHECKING..."
                        : applied
                            ? "APPLIED"
                            : "APPLY CODE"}
                </Button>
            </Box>
        </Box>
    );
};

export default EnrollmentReferral;
