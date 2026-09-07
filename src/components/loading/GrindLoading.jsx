/* eslint-disable no-unused-vars */
import { Box, keyframes } from "@mui/material";

// Circle stroke animation - draws around like SVG stroke-dasharray
const circleStrokeDraw = keyframes`
  0% {
    stroke-dashoffset: 565;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

// G character fade and scale in
const gCharacterReveal = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Orange ball bounce entrance from below
const ballBounceIn = keyframes`
  0% {
    transform: translateY(100px) scale(0);
    opacity: 0;
  }
  60% {
    transform: translateY(-15px) scale(1);
    opacity: 1;
  }
  80% {
    transform: translateY(0px) scale(1);
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
`;

// Continuous subtle bounce after initial entrance
const ballIdleBounce = keyframes`
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1);
  }
`;

// Text fade in
const textFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Dot pulse
const dotPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

/**
 * EXACT GRIND LOGO LOADING SCREEN
 */
export const GrindLoading= () => {
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 194px)",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >

            {/* Main logo container */}
            <Box
                sx={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                }}
            >

                {/* SVG Circle stroke - draws in like animation */}
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    style={{
                        position: "absolute",
                        zIndex: 3,
                    }}
                >
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        // stroke="#ffffff"
                        strokeWidth="3"
                        strokeDasharray="565"
                        style={{
                            animation: `${circleStrokeDraw} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                        }}
                    />
                </svg>

                {/* G Character - Black in the video! */}
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 10,
                        fontSize: "140px",
                        fontWeight: "900",
                        color: "#f8f8f8ff",
                        letterSpacing: "-10px",
                        lineHeight: "1",
                        fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                        animation: `${gCharacterReveal} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both`,
                        textShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    G
                </Box>

                {/* Orange Ball - Bottom right, bounces in */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#FF6B35",
                        bottom: "90px",
                        right: "80px",
                        zIndex: 11,
                        boxShadow: `
              0 8px 20px rgba(255, 107, 53, 0.7),
              0 0 30px rgba(255, 107, 53, 0.5),
              inset -2px -2px 8px rgba(0, 0, 0, 0.2)
            `,
                        animation: `${ballBounceIn} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both, ${ballIdleBounce} 2s ease-in-out infinite 1.8s`,
                    }}
                />
            </Box>

            {/* Loading text section */}
            <Box
                sx={{
                    textAlign: "center",
                    zIndex: 2,
                    animation: `${textFadeIn} 0.8s ease-out 1.2s both`,
                    marginTop: "-4rem",
                }}
            >
                <Box
                    sx={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#ffffff",
                        letterSpacing: "2px",
                        marginBottom: "12px",
                        fontFamily: "'Helvetica Neue', 'Segoe UI', sans-serif",
                        textTransform: "uppercase",
                    }}
                >
                    Loading Your Progress
                </Box>

                <Box
                    sx={{
                        fontSize: "12px",
                        color: "#999",
                        fontWeight: "400",
                        letterSpacing: "0.8px",
                        marginBottom: "24px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
                    }}
                >
                    Grinding your data
                </Box>

                {/* Animated dots */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {[0, 1, 2].map((index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#FF6B35",
                                animation: `${dotPulse} 1.4s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`,
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default GrindLoading;