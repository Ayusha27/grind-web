import {
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    FormControlLabel,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

import EnrollmentTerms from "./EnrollmentTerms";

export type EnrollmentDetailsData = {
    fullName: string;
    email: string;
    phone: string;
    acceptedTerms: boolean;
};

type EnrollmentDetailsProps = {
    data: EnrollmentDetailsData;
    onChange: (
        field: keyof EnrollmentDetailsData,
        value: string | boolean
    ) => void;
    errors?: {
        fullName?: string;
        email?: string;
        phone?: string;
        acceptedTerms?: string;
    };
};

const EnrollmentDetails = ({
    data,
    onChange,
    errors = {},
}: EnrollmentDetailsProps) => {
    const [termsOpen, setTermsOpen] = useState(false);

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            height: 46,
            borderRadius: 0,
            backgroundColor: "#f5f5f5",

            "& fieldset": {
                borderColor: "#222",
            },

            "&:hover fieldset": {
                borderColor: "#444",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#ff8a2a",
                borderWidth: 1,
            },

            "& input": {
                color: "#222",
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
            },
        },

        "& .MuiInputBase-input::placeholder": {
            color: "#777",
            opacity: 1,
        },
    };

    return (
        <>
            {/* =========================================================
                YOUR DETAILS
            ========================================================= */}

            <Box
                sx={{
                    mt: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        border: "1px solid #1d1d1d",
                        backgroundColor: "#0d0d0d",
                        p: {
                            xs: 2.5,
                            sm: 3,
                            md: 3.5,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            color: "#f5f5f0",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: {
                                xs: 16,
                                md: 17,
                            },
                            fontWeight: 600,
                            lineHeight: 1.2,
                            mb: {
                                xs: 2,
                                md: 2.5,
                            },
                        }}
                    >
                        Your Details
                    </Typography>

                    {/* Full Name */}

                    <TextField
                        fullWidth
                        value={data.fullName}
                        onChange={(event) =>
                            onChange(
                                "fullName",
                                event.target.value
                            )
                        }
                        placeholder="Full Name"
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName}
                        sx={fieldSx}
                    />

                    {/* Email */}

                    <TextField
                        fullWidth
                        value={data.email}
                        onChange={(event) =>
                            onChange(
                                "email",
                                event.target.value
                            )
                        }
                        placeholder="Email Address"
                        type="email"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        sx={{
                            ...fieldSx,
                            mt: {
                                xs: 1.5,
                                md: 2,
                            },
                        }}
                    />

                    {/* Phone */}

                    <TextField
                        fullWidth
                        value={data.phone}
                        onChange={(event) =>
                            onChange(
                                "phone",
                                event.target.value
                            )
                        }
                        placeholder="Phone Number"
                        type="tel"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        sx={{
                            ...fieldSx,
                            mt: {
                                xs: 1.5,
                                md: 2,
                            },
                        }}
                    />
                </Box>

                {/* =====================================================
                    TERMS AGREEMENT
                ===================================================== */}

                <Box
                    sx={{
                        mt: {
                            xs: 1.5,
                            md: 2,
                        },
                        border: "1px solid #1d1d1d",
                        backgroundColor: "#0d0d0d",
                        px: {
                            xs: 1.5,
                            md: 2,
                        },
                        py: {
                            xs: 1.2,
                            md: 1.4,
                        },
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={data.acceptedTerms}
                                onChange={(event) =>
                                    onChange(
                                        "acceptedTerms",
                                        event.target.checked
                                    )
                                }
                                sx={{
                                    p: 0,
                                    mr: 1,

                                    color: "#f5f5f5",

                                    "& .MuiSvgIcon-root": {
                                        fontSize: 17,
                                    },

                                    "&.Mui-checked": {
                                        color: "#ff8a2a",
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    color: "#f0f0f0",
                                    fontFamily: '"Inter", sans-serif',
                                    fontSize: {
                                        xs: 11.5,
                                        md: 13,
                                    },
                                    lineHeight: 1.5,
                                }}
                            >
                                I have read and agree to the{" "}
                                <Box
                                    component="span"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setTermsOpen(true);
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            setTermsOpen(true);
                                        }
                                    }}
                                    sx={{
                                        color: "#ff8a2a",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        textUnderlineOffset: "2px",
                                    }}
                                >
                                    Terms & Conditions
                                </Box>{" "}
                                of GRIND AI.
                            </Typography>
                        }
                        sx={{
                            m: 0,
                            alignItems: "center",
                        }}
                    />

                    {errors.acceptedTerms && (
                        <Typography
                            sx={{
                                color: "#ff8a2a",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 10,
                                mt: 1,
                            }}
                        >
                            {errors.acceptedTerms}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* =========================================================
                TERMS & CONDITIONS POPUP
            ========================================================= */}

            <Dialog
                open={termsOpen}
                onClose={() => setTermsOpen(false)}
                fullWidth
                maxWidth="md"
                scroll="paper"
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#0d0d0d",
                            color: "#f5f5f0",
                            border: "1px solid #2a2a2a",
                            borderRadius: 0,
                            backgroundImage: "none",
                            maxHeight: "80vh",
                        },
                    },
                }}
            >
                {/* Popup header */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #242424",
                        px: {
                            xs: 2.5,
                            md: 3.5,
                        },
                        py: {
                            xs: 2,
                            md: 2.5,
                        },
                    }}
                >
                    <IconButton
                        onClick={() => setTermsOpen(false)}
                        aria-label="Close terms and conditions"
                        sx={{
                            color: "#888",

                            "&:hover": {
                                color: "#ff8a2a",
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Popup content */}

                <DialogContent
                    sx={{
                        px: {
                            xs: 2.5,
                            md: 4,
                        },
                        py: {
                            xs: 3,
                            md: 4,
                        },

                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },

                        "&::-webkit-scrollbar-track": {
                            background: "#080808",
                        },

                        "&::-webkit-scrollbar-thumb": {
                            background: "#333",
                        },
                    }}
                >
                    <EnrollmentTerms />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EnrollmentDetails;
