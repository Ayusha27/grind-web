import { Box, Typography } from "@mui/material";

interface WalkthroughDashboardFrameProps {
    activeSection:
    | "workout"
    | "diet"
    | "progress";

    children: React.ReactNode;

    spotlight?: boolean;
}

const WalkthroughDashboardFrame = ({
    activeSection,
    children,
    spotlight = false,
}: WalkthroughDashboardFrameProps) => {
    const navigationItems = [
        {
            id: "workout",
            label: "WORKOUT",
        },
        {
            id: "diet",
            label: "DIET",
        },
        {
            id: "progress",
            label: "PROGRESS",
        },
    ] as const;

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
            }}
        >
            {/* =====================================================
                DASHBOARD
            ===================================================== */}

            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    border:
                        "1px solid #dcd7d1",
                    borderRadius: {
                        xs: "10px",
                        md: "14px",
                    },
                    backgroundColor: "#f5f2ed",
                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.18)",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Dashboard header */}
                <Box
                    sx={{
                        height: {
                            xs: 48,
                            md: 56,
                        },
                        px: {
                            xs: 1.5,
                            md: 2.5,
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        backgroundColor:
                            "#1a1714",
                        color: "#fff",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 15,
                                md: 18,
                            },
                            fontWeight: 900,
                            letterSpacing: 3,
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
                            fontSize: 8,
                            color: "#aaa49e",
                            letterSpacing: 1,
                            fontWeight: 700,
                        }}
                    >
                        ALEX
                    </Typography>
                </Box>

                {/* Period bar */}
                <Box
                    sx={{
                        height: {
                            xs: 38,
                            md: 44,
                        },
                        px: {
                            xs: 1.5,
                            md: 2.5,
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        backgroundColor:
                            "#211e1b",
                        color: "#fff",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 8,
                            fontWeight: 800,
                            letterSpacing: 1,
                        }}
                    >
                        MONTH 1
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 8,
                            color: "#8d8985",
                            fontWeight: 700,
                        }}
                    >
                        WEEK 1
                    </Typography>
                </Box>

                {/* Navigation */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                        borderBottom:
                            "1px solid #ddd8d2",
                        backgroundColor:
                            "#fff",
                    }}
                >
                    {navigationItems.map(
                        (item) => {
                            const active =
                                activeSection ===
                                item.id;

                            return (
                                <Box
                                    key={
                                        item.id
                                    }
                                    sx={{
                                        py: {
                                            xs: 1,
                                            md: 1.2,
                                        },
                                        textAlign:
                                            "center",
                                        borderRight:
                                            "1px solid #e5e1dc",
                                        borderBottom:
                                            active
                                                ? "2px solid #ff5c35"
                                                : "2px solid transparent",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize:
                                            {
                                                xs: 7,
                                                md: 8,
                                            },
                                            fontWeight: 900,
                                            letterSpacing:
                                                1,
                                            color:
                                                active
                                                    ? "#ff5c35"
                                                    : "#77716b",
                                        }}
                                    >
                                        {
                                            item.label
                                        }
                                    </Typography>
                                </Box>
                            );
                        }
                    )}
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        maxHeight: {
                            xs: 500,
                            sm: 560,
                            md: 620,
                        },
                        overflow:
                            "hidden",
                    }}
                >
                    {children}
                </Box>
            </Box>

            {/* =====================================================
                SOFT SPOTLIGHT VIGNETTE
            ===================================================== */}

            {spotlight && (
                <Box
                    sx={{
                        position:
                            "absolute",
                        inset: 0,
                        zIndex: 5,
                        pointerEvents:
                            "none",
                        borderRadius: {
                            xs: "10px",
                            md: "14px",
                        },
                        boxShadow:
                            "inset 0 0 100px rgba(0,0,0,0.28)",
                        animation:
                            "walkthroughVignette 900ms ease both",

                        "@keyframes walkthroughVignette":
                        {
                            from: {
                                opacity: 0,
                            },
                            to: {
                                opacity: 1,
                            },
                        },
                    }}
                />
            )}
        </Box>
    );
};

export default WalkthroughDashboardFrame;