import { useCallback, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useNavigate } from "react-router-dom";

import NutritionShowcase from "../../client/walkthrough/NutritionShowcase";
import WorkoutShowcase from "../../client/walkthrough/WorkoutShowcase";
import ProgressShowcase from "../../client/walkthrough/ProgressShowcase";

const SCENES = [
    {
        id: "welcome",
        eyebrow: "WELCOME TO GRIND",
        title: "YOUR FITNESS JOURNEY,\nBUILT AROUND YOU.",
        description:
            "A personalized system for training, nutrition and progress.",
        narration:
            "Welcome to Grind. Your fitness journey is built around you, bringing training, nutrition and progress together in one personalized experience.",
    },
    {
        id: "workout",
        eyebrow: "01 / WORKOUT",
        title: "TRAIN WITH PURPOSE.",
        description:
            "Follow your personalized workouts, track every set and stay consistent.",
        narration:
            "Train with purpose. Follow your personalized workouts, track every set and build consistency one session at a time.",
    },
    {
        id: "nutrition",
        eyebrow: "02 / NUTRITION",
        title: "FUEL YOUR GOALS.",
        description:
            "Stay on top of calories, macros and structured meals built around your plan.",
        narration:
            "Fuel your goals. Stay on top of your calories, macros and structured meals with nutrition designed around your plan.",
    },
    {
        id: "progress",
        eyebrow: "03 / PROGRESS",
        title: "SEE YOUR PROGRESS.",
        description:
            "Track your consistency and results over time.",
        narration:
            "See your progress. Track your consistency, monitor your results and understand how your effort adds up over time.",
    },
    {
        id: "journey",
        eyebrow: "GRIND",
        title: "READY TO START?",
        description:
            "Your personalized fitness journey starts with a few simple questions.",
        narration:
            "Ready to start? Answer a few simple questions and Grind will build your personalized fitness journey around your goals.",
    },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

const GrindWalkthrough = () => {
    const navigate = useNavigate();

    const [sceneIndex, setSceneIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    /*
     * Used to make sure an old utterance cannot
     * accidentally advance the new scene.
     */
    const narrationIdRef = useRef(0);

    /*
     * Keep a reference to the current utterance.
     * This allows pause/resume and proper cleanup.
     */
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const scene = SCENES[sceneIndex];

    /*
     * ============================================================
     * STOP CURRENT NARRATION
     * ============================================================
     */

    const stopNarration = useCallback(() => {
        narrationIdRef.current += 1;

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        utteranceRef.current = null;
    }, []);

    /*
     * ============================================================
     * MOVE TO NEXT SCENE
     * ============================================================
     *
     * This is now called when the narration finishes.
     *
     * We DO NOT use a fixed 6-second timer anymore.
     */

    const moveToNextScene = useCallback(() => {
        setSceneIndex((current) => {
            if (current >= SCENES.length - 1) {
                return current;
            }

            return current + 1;
        });
    }, []);

    /*
     * ============================================================
     * VOICE NARRATION
     * ============================================================
     *
     * Every time a scene loads:
     *
     * 1. Cancel previous narration.
     * 2. Start the new narration.
     * 3. Wait for onend.
     * 4. Only then move to the next scene.
     */

    useEffect(() => {
        if (!voiceEnabled || isPaused) {
            return;
        }

        if (!("speechSynthesis" in window)) {
            /*
             * If speech synthesis is unavailable, we cannot
             * wait for audio completion.
             *
             * In that rare case, don't automatically advance.
             * The user can still use Next manually.
             */
            return;
        }

        const currentNarrationId = narrationIdRef.current + 1;

        narrationIdRef.current = currentNarrationId;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
            scene.narration
        );

        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        utteranceRef.current = utterance;

        utterance.onend = () => {
            /*
             * Ignore this callback if:
             *
             * - the user already changed scenes
             * - narration was disabled
             * - the component was cleaned up
             * - another narration replaced this one
             */
            if (
                narrationIdRef.current !==
                currentNarrationId
            ) {
                return;
            }

            if (isPaused || !voiceEnabled) {
                return;
            }

            /*
             * Only move forward after the COMPLETE
             * narration has finished.
             */
            if (sceneIndex < SCENES.length - 1) {
                moveToNextScene();
            }
        };

        utterance.onerror = () => {
            /*
             * Do not automatically skip the scene
             * when speech fails.
             *
             * User can continue manually.
             */
        };

        window.speechSynthesis.speak(utterance);

        return () => {
            /*
             * Invalidate this narration before cancelling it.
             */
            if (
                narrationIdRef.current ===
                currentNarrationId
            ) {
                narrationIdRef.current += 1;
            }

            window.speechSynthesis.cancel();

            if (utteranceRef.current === utterance) {
                utteranceRef.current = null;
            }
        };
    }, [
        sceneIndex,
        scene.narration,
        voiceEnabled,
        isPaused,
        moveToNextScene,
    ]);

    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */

    useEffect(() => {
        return () => {
            stopNarration();
        };
    }, [stopNarration]);

    /*
     * ============================================================
     * NAVIGATION
     * ============================================================
     *
     * Manual navigation immediately:
     *
     * 1. Stops current audio.
     * 2. Changes scene.
     * 3. New scene's useEffect starts new audio.
     */

    const handleNext = () => {
        if (sceneIndex >= SCENES.length - 1) {
            return;
        }

        stopNarration();

        setSceneIndex((current) =>
            Math.min(current + 1, SCENES.length - 1)
        );
    };

    const handlePrevious = () => {
        if (sceneIndex <= 0) {
            return;
        }

        stopNarration();

        setSceneIndex((current) =>
            Math.max(current - 1, 0)
        );
    };

    /*
     * ============================================================
     * PAUSE / PLAY
     * ============================================================
     */

    const handlePauseToggle = () => {
        if (!("speechSynthesis" in window)) {
            setIsPaused((current) => !current);
            return;
        }

        if (isPaused) {
            /*
             * Resume the existing audio if possible.
             *
             * If the browser has already cancelled the utterance,
             * the scene effect will start it again.
             */
            setIsPaused(false);

            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            return;
        }

        /*
         * Pause the actual voice.
         */
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }

        setIsPaused(true);
    };

    /*
     * ============================================================
     * VOICE TOGGLE
     * ============================================================
     */

    const handleVoiceToggle = () => {
        setVoiceEnabled((current) => {
            const nextValue = !current;

            if (!nextValue) {
                stopNarration();
            }

            return nextValue;
        });
    };

    /*
     * ============================================================
     * START JOURNEY
     * ============================================================
     */

    const handleStart = () => {
        stopNarration();
        navigate("/start-your-journey");
    };

    /*
     * ============================================================
     * SCENE CONTENT
     * ============================================================
     */

    const renderSceneContent = () => {
        switch (scene.id as SceneId) {
            case "welcome":
                return (
                    <DashboardPreview
                        label="YOUR GRIND DASHBOARD"
                        description="One place for your workouts, nutrition and progress."
                    />
                );

            case "workout":
                return <WorkoutShowcase />;

            case "nutrition":
                return <NutritionShowcase />;

            case "progress":
                return <ProgressShowcase />;

            case "journey":
                return (
                    <DashboardPreview
                        label="YOUR JOURNEY STARTS HERE"
                        description="Answer a few questions and let GRIND build your personalized plan."
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#080808",
                color: "#ffffff",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* =====================================================
                BACKGROUND GLOW
            ===================================================== */}

            <Box
                sx={{
                    position: "absolute",
                    width: {
                        xs: 320,
                        md: 600,
                    },
                    height: {
                        xs: 320,
                        md: 600,
                    },
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,92,53,0.12) 0%, rgba(255,92,53,0) 70%)",
                    top: "25%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }}
            />

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    height: {
                        xs: 64,
                        md: 76,
                    },
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #202020",
                    flexShrink: 0,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 21,
                            md: 26,
                        },
                        fontWeight: 900,
                        letterSpacing: 5,
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

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 0.5,
                            sm: 1,
                        },
                    }}
                >
                    {/* Voice toggle */}
                    <IconButton
                        onClick={handleVoiceToggle}
                        aria-label={
                            voiceEnabled
                                ? "Disable narration"
                                : "Enable narration"
                        }
                        sx={{
                            width: 32,
                            height: 32,
                            color: voiceEnabled
                                ? "#ff5c35"
                                : "#555",
                            "&:hover": {
                                backgroundColor:
                                    "rgba(255,92,53,0.08)",
                            },
                        }}
                    >
                        {voiceEnabled ? (
                            <VolumeUpRoundedIcon
                                sx={{
                                    fontSize: 17,
                                }}
                            />
                        ) : (
                            <VolumeOffRoundedIcon
                                sx={{
                                    fontSize: 17,
                                }}
                            />
                        )}
                    </IconButton>

                    <Button
                        onClick={handleStart}
                        sx={{
                            color: "#aaa",
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: 1.2,
                            px: 1,
                            "&:hover": {
                                color: "#fff",
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        START YOUR JOURNEY
                    </Button>
                </Box>
            </Box>

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: {
                        xs: 1.5,
                        sm: 3,
                        md: 5,
                    },
                    py: {
                        xs: 3,
                        sm: 4,
                        md: 5,
                    },
                    overflow: "hidden",
                }}
            >
                <Box
                    key={scene.id}
                    sx={{
                        width: "100%",
                        maxWidth: 1100,
                        height: "100%",
                        maxHeight: 900,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent:
                            scene.id === "workout" ||
                                scene.id === "nutrition" ||
                                scene.id === "progress"
                                ? "flex-start"
                                : "center",
                        animation:
                            "walkthroughSceneIn 650ms ease both",

                        "@keyframes walkthroughSceneIn": {
                            from: {
                                opacity: 0,
                                transform: "translateY(18px)",
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)",
                            },
                        },
                    }}
                >
                    {/* =================================================
                        SCENE HEADING
                    ================================================= */}

                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            flexShrink: 0,
                            mb: {
                                xs: 2.5,
                                md: 3.5,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#ff5c35",
                                fontSize: {
                                    xs: 8,
                                    md: 10,
                                },
                                fontWeight: 800,
                                letterSpacing: 2,
                                mb: 1.5,
                            }}
                        >
                            {scene.eyebrow}
                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                                fontSize: {
                                    xs: 27,
                                    sm: 40,
                                    md: 56,
                                },
                                lineHeight: {
                                    xs: 1.05,
                                    md: 1,
                                },
                                fontWeight: 900,
                                letterSpacing: {
                                    xs: -0.8,
                                    md: -1.8,
                                },
                                maxWidth: 850,
                                mx: "auto",
                            }}
                        >
                            {scene.title}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1.5,
                                maxWidth: 550,
                                mx: "auto",
                                color: "#8d8985",
                                fontSize: {
                                    xs: 11,
                                    sm: 12,
                                    md: 14,
                                },
                                lineHeight: 1.6,
                            }}
                        >
                            {scene.description}
                        </Typography>
                    </Box>

                    {/* =================================================
                        SCENE CONTENT
                    ================================================= */}

                    <Box
                        sx={{
                            width: "100%",
                            flex:
                                scene.id === "workout" ||
                                    scene.id === "nutrition" ||
                                    scene.id === "progress"
                                    ? 1
                                    : "none",
                            minHeight:
                                scene.id === "workout" ||
                                    scene.id === "nutrition" ||
                                    scene.id === "progress"
                                    ? 0
                                    : undefined,
                            display: "flex",
                            justifyContent: "center",
                            alignItems:
                                scene.id === "workout" ||
                                    scene.id === "nutrition" ||
                                    scene.id === "progress"
                                    ? "flex-start"
                                    : "center",
                            overflow:
                                scene.id === "workout" ||
                                    scene.id === "nutrition" ||
                                    scene.id === "progress"
                                    ? "auto"
                                    : "visible",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        {renderSceneContent()}
                    </Box>

                    {/* =================================================
                        FINAL CTA
                    ================================================= */}

                    {scene.id === "journey" && (
                        <Button
                            onClick={handleStart}
                            variant="contained"
                            sx={{
                                mt: 3,
                                px: 4,
                                py: 1.4,
                                borderRadius: 0,
                                backgroundColor: "#ff5c35",
                                color: "#fff",
                                fontSize: 9,
                                fontWeight: 900,
                                letterSpacing: 1.5,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#ff5c35",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            START YOUR JOURNEY
                        </Button>
                    )}
                </Box>
            </Box>

            {/* =====================================================
                BOTTOM CONTROLS
            ===================================================== */}

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                    },
                    pb: {
                        xs: 1.5,
                        md: 2.5,
                    },
                    flexShrink: 0,
                }}
            >
                {/* Progress bars */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        mb: 1.5,
                    }}
                >
                    {SCENES.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                height: 2,
                                flex: 1,
                                backgroundColor:
                                    index <= sceneIndex
                                        ? "#ff5c35"
                                        : "#292929",
                                transition:
                                    "background-color 300ms ease",
                            }}
                        />
                    ))}
                </Box>

                {/* Controls row */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#5e5a57",
                            fontSize: 9,
                            fontFamily: "monospace",
                            minWidth: 50,
                        }}
                    >
                        {String(sceneIndex + 1).padStart(2, "0")} /{" "}
                        {String(SCENES.length).padStart(2, "0")}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: {
                                xs: 0.2,
                                sm: 0.8,
                            },
                        }}
                    >
                        <Button
                            onClick={handlePrevious}
                            disabled={sceneIndex === 0}
                            sx={controlButtonStyles}
                        >
                            PREVIOUS
                        </Button>

                        <Button
                            onClick={handlePauseToggle}
                            sx={{
                                ...controlButtonStyles,
                                color: isPaused
                                    ? "#ff5c35"
                                    : "#777",
                            }}
                        >
                            {isPaused ? "PLAY" : "PAUSE"}
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={
                                sceneIndex ===
                                SCENES.length - 1
                            }
                            sx={controlButtonStyles}
                        >
                            NEXT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

/* ===============================================================
   DASHBOARD PREVIEW
================================================================ */

interface DashboardPreviewProps {
    label: string;
    description: string;
}

const DashboardPreview = ({
    label,
    description,
}: DashboardPreviewProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 900,
                height: {
                    xs: 190,
                    sm: 250,
                    md: 320,
                },
                border: "1px solid #282828",
                borderRadius: {
                    xs: 1,
                    md: 2,
                },
                backgroundColor: "#101010",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background grid */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.35,
                    backgroundImage:
                        "linear-gradient(#252525 1px, transparent 1px), linear-gradient(90deg, #252525 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Animated glow */}
            <Box
                sx={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,92,53,0.12) 0%, rgba(255,92,53,0) 70%)",
                    animation:
                        "previewGlow 3s ease-in-out infinite",
                    "@keyframes previewGlow": {
                        "0%, 100%": {
                            transform: "scale(0.9)",
                            opacity: 0.6,
                        },
                        "50%": {
                            transform: "scale(1.15)",
                            opacity: 1,
                        },
                    },
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "#ff5c35",
                        fontSize: {
                            xs: 8,
                            md: 9,
                        },
                        fontWeight: 900,
                        letterSpacing: 1.5,
                        mb: 1,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        color: "#777",
                        fontSize: {
                            xs: 10,
                            md: 12,
                        },
                        maxWidth: 400,
                        lineHeight: 1.6,
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

/* ===============================================================
   CONTROL STYLES
================================================================ */

const controlButtonStyles = {
    minWidth: 0,
    px: {
        xs: 0.7,
        sm: 1,
    },
    color: "#777",
    fontSize: 8,
    fontWeight: 800,
    letterSpacing: 1,
    "&:hover": {
        color: "#fff",
        backgroundColor: "transparent",
    },
    "&.Mui-disabled": {
        color: "#292929",
    },
};

export default GrindWalkthrough;