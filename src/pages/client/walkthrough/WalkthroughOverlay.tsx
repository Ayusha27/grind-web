import { Box, Typography } from "@mui/material";

interface WalkthroughOverlayProps {
    eyebrow: string;
    title: string;
    description: string;
    position?: "top" | "bottom";
}

const WalkthroughOverlay = ({
    eyebrow,
    title,
    description,
    position = "bottom",
}: WalkthroughOverlayProps) => {
    return (
        <Box
            sx={{
                position: "absolute",
                left: {
                    xs: 12,
                    sm: 20,
                    md: 28,
                },
                right: {
                    xs: 12,
                    sm: 20,
                    md: 28,
                },
                zIndex: 20,

                ...(position === "top"
                    ? {
                        top: {
                            xs: 12,
                            sm: 20,
                            md: 28,
                        },
                    }
                    : {
                        bottom: {
                            xs: 12,
                            sm: 20,
                            md: 28,
                        },
                    }),

                pointerEvents: "none",
            }}
        >
            <Box
                sx={{
                    maxWidth: {
                        xs: "100%",
                        sm: 500,
                        md: 580,
                    },
                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },
                    py: {
                        xs: 1.25,
                        sm: 1.5,
                        md: 2,
                    },
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor:
                        "rgba(8,8,8,0.88)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <Typography
                    sx={{
                        color: "#ff5c35",
                        fontSize: {
                            xs: 7,
                            sm: 8,
                            md: 9,
                        },
                        fontWeight: 900,
                        letterSpacing: 1.5,
                        mb: 0.6,
                    }}
                >
                    {eyebrow}
                </Typography>

                <Typography
                    sx={{
                        color: "#fff",
                        fontSize: {
                            xs: 13,
                            sm: 15,
                            md: 17,
                        },
                        fontWeight: 900,
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        mt: 0.6,
                        color: "#9c9792",
                        fontSize: {
                            xs: 8,
                            sm: 9,
                            md: 10,
                        },
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default WalkthroughOverlay;