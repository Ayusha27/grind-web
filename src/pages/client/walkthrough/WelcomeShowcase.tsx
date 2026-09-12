import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

const ORANGE = "#ff5c35";
const DARK = "#080808";

interface WelcomeShowcaseProps {
    narration?: string;
    captionIndex?: number;
}

const WelcomeShowcase = ({
    narration =
    "Welcome to Grind. Your fitness journey is built around you, bringing training, nutrition and progress together in one personalized experience.",
    captionIndex = 0,
}: WelcomeShowcaseProps) => {
    /*
     * ============================================================
     * CAPTION LINES
     * ============================================================
     *
     * The narration is split into short lines so that the
     * text behaves like subtitles/captions.
     */

    const captionLines = useMemo(() => {
        const words = narration
            .trim()
            .split(/\s+/);

        const lines: string[] = [];

        /*
         * Number of words shown in each caption.
         */
        const wordsPerLine = 7;

        for (
            let i = 0;
            i < words.length;
            i += wordsPerLine
        ) {
            lines.push(
                words
                    .slice(
                        i,
                        i + wordsPerLine
                    )
                    .join(" ")
            );
        }

        return lines;
    }, [narration]);

    /*
     * Keep the supplied index within the
     * available caption range.
     */
    const safeCaptionIndex = Math.min(
        Math.max(captionIndex, 0),
        Math.max(
            captionLines.length - 1,
            0
        )
    );

    /*
     * Used to trigger a small fade whenever
     * the active caption changes.
     */
    const [
        captionAnimationKey,
        setCaptionAnimationKey,
    ] = useState(0);

    useEffect(() => {
        setCaptionAnimationKey(
            (current) => current + 1
        );
    }, [safeCaptionIndex]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: "100%",

                position: "relative",

                overflow: "hidden",

                backgroundColor: DARK,

                display: "flex",
                alignItems: "stretch",
            }}
        >
            {/* =====================================================
                SUBTLE BACKGROUND
            ===================================================== */}

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,

                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",

                    backgroundSize: {
                        xs: "30px 30px",
                        sm: "38px 38px",
                        md: "44px 44px",
                    },

                    pointerEvents: "none",
                }}
            />

            {/* =====================================================
                LEFT SIDE ORANGE GLOW
            ===================================================== */}

            <Box
                sx={{
                    position: "absolute",

                    width: {
                        xs: 280,
                        sm: 400,
                        md: 540,
                    },

                    height: {
                        xs: 280,
                        sm: 400,
                        md: 540,
                    },

                    left: {
                        xs: "20%",
                        sm: "22%",
                        md: "23%",
                    },

                    top: "55%",

                    transform:
                        "translate(-50%, -50%)",

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle, rgba(255,92,53,0.12) 0%, rgba(255,92,53,0.04) 38%, rgba(255,92,53,0) 72%)",

                    pointerEvents: "none",
                }}
            />

            {/* =====================================================
                MAIN TWO-COLUMN CONTENT
            ===================================================== */}

            <Box
                sx={{
                    position: "relative",

                    zIndex: 2,

                    width: "100%",

                    height: "100%",

                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                    },

                    alignItems: "stretch",
                }}
            >
                {/* =================================================
                    LEFT — STATIC MASCOT
                ================================================= */}

                <Box
                    sx={{
                        position: "relative",

                        minWidth: 0,

                        minHeight: {
                            xs: 220,
                            sm: "100%",
                        },

                        display: "flex",

                        alignItems: "flex-end",

                        justifyContent: "center",

                        overflow: "hidden",
                    }}
                >
                    {/* Mascot */}

                    <Box
                        component="img"
                        src="/GRIND/GrindMascot.svg"
                        alt="GRIND Mascot"
                        sx={{
                            position: "relative",

                            zIndex: 2,

                            width: {
                                xs: "84%",
                                sm: "100%",
                                md: "96%",
                            },

                            height: "100%",

                            maxWidth: {
                                xs: 330,
                                sm: 430,
                                md: 500,
                            },

                            objectFit: "contain",

                            objectPosition:
                                "center bottom",

                            display: "block",

                            /*
                             * IMPORTANT:
                             *
                             * There is intentionally NO
                             * animation here.
                             *
                             * The mascot remains completely
                             * static.
                             */

                            filter:
                                "drop-shadow(0 25px 40px rgba(0,0,0,0.55))",
                        }}
                    />
                </Box>

                {/* =================================================
                    CENTER DIVIDER
                ================================================= */}

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },

                        position: "absolute",

                        left: "50%",

                        top: "10%",
                        bottom: "10%",

                        width: "1px",

                        background:
                            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)",

                        zIndex: 5,
                    }}
                />

                {/* =================================================
                    RIGHT — CAPTIONS
                ================================================= */}

                <Box
                    sx={{
                        minWidth: 0,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        px: {
                            xs: 3,
                            sm: 3.5,
                            md: 5,
                            lg: 6,
                        },

                        py: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",

                            maxWidth: 450,
                        }}
                    >
                        {/* =================================================
                            CAPTION CONTAINER
                        ================================================= */}

                        <Box
                            sx={{
                                position: "relative",

                                minHeight: {
                                    xs: 155,
                                    sm: 190,
                                    md: 220,
                                },

                                display: "flex",

                                flexDirection:
                                    "column",

                                justifyContent:
                                    "center",

                                pl: {
                                    xs: 0,
                                    sm: 2.5,
                                    md: 3,
                                },

                                pt: {
                                    xs: 2,
                                    sm: 0,
                                },

                                borderLeft: {
                                    xs: "none",
                                    sm: `2px solid ${ORANGE}`,
                                },

                                borderTop: {
                                    xs: `2px solid ${ORANGE}`,
                                    sm: "none",
                                },
                            }}
                        >
                            {/* =================================================
                                CAPTION LINES
                            ================================================= */}

                            <Box
                                sx={{
                                    display: "flex",

                                    flexDirection:
                                        "column",

                                    gap: {
                                        xs: 0.8,
                                        sm: 1,
                                        md: 1.1,
                                    },
                                }}
                            >
                                {captionLines.map(
                                    (
                                        line,
                                        index
                                    ) => {
                                        const isActive =
                                            index ===
                                            safeCaptionIndex;

                                        const isPast =
                                            index <
                                            safeCaptionIndex;

                                        const isFuture =
                                            index >
                                            safeCaptionIndex;

                                        return (
                                            <Typography
                                                key={`${line}-${index}-${captionAnimationKey}`}
                                                sx={{
                                                    color:
                                                        isActive
                                                            ? "#f5f2ed"
                                                            : isPast
                                                                ? "#68635f"
                                                                : "#393633",

                                                    fontSize: {
                                                        xs: 16,
                                                        sm: 19,
                                                        md: 22,
                                                    },

                                                    lineHeight:
                                                        1.35,

                                                    fontWeight:
                                                        isActive
                                                            ? 600
                                                            : 400,

                                                    letterSpacing:
                                                        "-0.01em",

                                                    opacity:
                                                        isFuture
                                                            ? 0.38
                                                            : 1,

                                                    transition:
                                                        "color 350ms ease, opacity 350ms ease, font-weight 350ms ease",

                                                    animation:
                                                        isActive
                                                            ? "captionAppear 350ms ease both"
                                                            : "none",

                                                    "@keyframes captionAppear":
                                                    {
                                                        from: {
                                                            opacity: 0.5,

                                                            transform:
                                                                "translateX(5px)",
                                                        },

                                                        to: {
                                                            opacity: 1,

                                                            transform:
                                                                "translateX(0)",
                                                        },
                                                    },

                                                    position:
                                                        "relative",

                                                    "&::before":
                                                        isActive
                                                            ? {
                                                                content:
                                                                    '""',

                                                                position:
                                                                    "absolute",

                                                                left: {
                                                                    xs: -15,
                                                                    sm: -26,
                                                                },

                                                                top:
                                                                    "50%",

                                                                width: {
                                                                    xs: 5,
                                                                    sm: 6,
                                                                },

                                                                height: {
                                                                    xs: 5,
                                                                    sm: 6,
                                                                },

                                                                borderRadius:
                                                                    "50%",

                                                                backgroundColor:
                                                                    ORANGE,

                                                                boxShadow:
                                                                    `0 0 12px ${ORANGE}`,

                                                                transform:
                                                                    "translateY(-50%)",
                                                            }
                                                            : undefined,
                                                }}
                                            >
                                                {line}
                                            </Typography>
                                        );
                                    }
                                )}
                            </Box>

                            {/* =================================================
                                SMALL STATUS
                            ================================================= */}

                            <Box
                                sx={{
                                    display: "flex",

                                    alignItems:
                                        "center",

                                    justifyContent: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },

                                    gap: 1,

                                    mt: {
                                        xs: 2.5,
                                        sm: 3,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 5,
                                        height: 5,

                                        borderRadius:
                                            "50%",

                                        backgroundColor:
                                            ORANGE,

                                        boxShadow:
                                            `0 0 10px ${ORANGE}`,
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color:
                                            "#68635f",

                                        fontSize: {
                                            xs: 7,
                                            sm: 8,
                                            md: 9,
                                        },

                                        fontWeight: 800,

                                        letterSpacing:
                                            1.5,

                                        textTransform:
                                            "uppercase",
                                    }}
                                >
                                    GRIND
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default WelcomeShowcase;