import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Box,
    Button,
    IconButton,
    Typography,
} from "@mui/material";

import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import NutritionShowcase from "../../client/walkthrough/NutritionShowcase";
import WorkoutShowcase from "../../client/walkthrough/WorkoutShowcase";
import ProgressShowcase from "../../client/walkthrough/ProgressShowcase";
import WelcomeShowcase from "../../client/walkthrough/WelcomeShowcase";

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
        title: "YOUR JOURNEY STARTS NOW.",
        description:
            "TRAIN SMARTER. NOT HARDER.",
        narration: "",
    },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

const GrindWalkthrough = () => {
    const [sceneIndex, setSceneIndex] =
        useState(0);

    const [isPaused, setIsPaused] =
        useState(false);

    const [voiceEnabled, setVoiceEnabled] =
        useState(true);

    /*
     * ============================================================
     * WELCOME CAPTION INDEX
     * ============================================================
     */

    const [captionIndex, setCaptionIndex] =
        useState(0);

    /*
     * Prevent stale speech events from
     * changing the current scene.
     */
    const narrationIdRef =
        useRef(0);

    const utteranceRef =
        useRef<SpeechSynthesisUtterance | null>(
            null
        );

    /*
     * Reference to final showcase video.
     */
    const videoRef =
        useRef<HTMLVideoElement | null>(
            null
        );

    const scene =
        SCENES[sceneIndex];

    /*
     * ============================================================
     * RESET CAPTION WHEN SCENE CHANGES
     * ============================================================
     */

    useEffect(() => {
        setCaptionIndex(0);
    }, [sceneIndex]);

    /*
     * ============================================================
     * STOP NARRATION
     * ============================================================
     */

    const stopNarration =
        useCallback(() => {
            narrationIdRef.current += 1;

            if (
                "speechSynthesis" in window
            ) {
                window.speechSynthesis.cancel();
            }

            utteranceRef.current =
                null;
        }, []);

    /*
     * ============================================================
     * MOVE TO NEXT SCENE
     * ============================================================
     */

    const moveToNextScene =
        useCallback(() => {
            setSceneIndex((current) => {
                if (
                    current >=
                    SCENES.length - 1
                ) {
                    return current;
                }

                return current + 1;
            });
        }, []);

    /*
     * ============================================================
     * VOICE NARRATION
     * ============================================================
     */

    useEffect(() => {
        if (!scene.narration) {
            return;
        }

        if (
            !voiceEnabled ||
            isPaused
        ) {
            return;
        }

        if (
            !("speechSynthesis" in window)
        ) {
            return;
        }

        const currentNarrationId =
            narrationIdRef.current + 1;

        narrationIdRef.current =
            currentNarrationId;

        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(
                scene.narration
            );

        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        utteranceRef.current =
            utterance;

        /*
         * ========================================================
         * CAPTION SYNCHRONIZATION
         * ========================================================
         *
         * Chrome's speech synthesis reports word boundaries.
         *
         * Every ~7 words we advance to the next caption.
         */

        utterance.onboundary = (
            event
        ) => {
            if (
                scene.id !== "welcome"
            ) {
                return;
            }

            if (
                event.name !== "word"
            ) {
                return;
            }

            const spokenText =
                scene.narration.slice(
                    0,
                    event.charIndex
                );

            const wordsSpoken =
                spokenText
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .length;

            const nextCaption =
                Math.floor(
                    wordsSpoken / 7
                );

            setCaptionIndex(
                Math.min(
                    nextCaption,
                    99
                )
            );
        };

        /*
         * ========================================================
         * NARRATION FINISHED
         * ========================================================
         */

        utterance.onend = () => {
            if (
                narrationIdRef.current !==
                currentNarrationId
            ) {
                return;
            }

            if (
                !voiceEnabled ||
                isPaused
            ) {
                return;
            }

            utteranceRef.current =
                null;

            moveToNextScene();
        };

        utterance.onerror = () => {
            if (
                narrationIdRef.current ===
                currentNarrationId
            ) {
                utteranceRef.current =
                    null;
            }
        };

        window.speechSynthesis.speak(
            utterance
        );

        return () => {
            if (
                narrationIdRef.current ===
                currentNarrationId
            ) {
                narrationIdRef.current += 1;
            }

            window.speechSynthesis.cancel();

            if (
                utteranceRef.current ===
                utterance
            ) {
                utteranceRef.current =
                    null;
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
            if (
                "speechSynthesis" in window
            ) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    /*
     * ============================================================
     * PREVIOUS
     * ============================================================
     */

    const handlePrevious = () => {
        if (sceneIndex <= 0) {
            return;
        }

        stopNarration();

        setSceneIndex((current) =>
            Math.max(
                current - 1,
                0
            )
        );
    };

    /*
     * ============================================================
     * NEXT
     * ============================================================
     */

    const handleNext = () => {
        if (
            sceneIndex >=
            SCENES.length - 1
        ) {
            return;
        }

        stopNarration();

        setSceneIndex((current) =>
            Math.min(
                current + 1,
                SCENES.length - 1
            )
        );
    };

    /*
     * ============================================================
     * PAUSE / PLAY
     * ============================================================
     */

    const handlePauseToggle = () => {
        /*
         * Final video scene.
         */
        if (
            scene.id === "journey"
        ) {
            if (videoRef.current) {
                if (
                    videoRef.current
                        .paused
                ) {
                    videoRef.current
                        .play()
                        .catch(() => {
                            // Browser may block playback.
                        });
                } else {
                    videoRef.current.pause();
                }
            }

            setIsPaused(
                (current) => !current
            );

            return;
        }

        /*
         * Speech synthesis.
         */
        if (
            !("speechSynthesis" in window)
        ) {
            setIsPaused(
                (current) => !current
            );

            return;
        }

        if (isPaused) {
            setIsPaused(false);

            if (
                window.speechSynthesis
                    .paused
            ) {
                window.speechSynthesis.resume();
            }

            return;
        }

        if (
            window.speechSynthesis
                .speaking
        ) {
            window.speechSynthesis.pause();
        }

        setIsPaused(true);
    };

    /*
     * ============================================================
     * SOUND TOGGLE
     * ============================================================
     */

    const handleVoiceToggle = () => {
        setVoiceEnabled((current) => {
            const nextValue =
                !current;

            /*
             * Final video.
             */
            if (
                scene.id === "journey"
            ) {
                if (
                    videoRef.current
                ) {
                    videoRef.current.muted =
                        !nextValue;
                }

                return nextValue;
            }

            /*
             * Narration.
             */
            if (!nextValue) {
                stopNarration();
            }

            return nextValue;
        });
    };

    /*
     * ============================================================
     * HOW GRIND WORKS
     * ============================================================
     */

    const handleHowGrindWorks = () => {
        stopNarration();

        window.location.href =
            "/#how-grind-works";
    };

    /*
     * ============================================================
     * SHOWCASE CONTENT
     * ============================================================
     */

    const renderSceneContent = () => {
        switch (
        scene.id as SceneId
        ) {
            case "welcome":
                return (
                    <WelcomeShowcase
                        narration={
                            scene.narration
                        }
                        captionIndex={
                            captionIndex
                        }
                    />
                );

            case "workout":
                return (
                    <WorkoutShowcase />
                );

            case "nutrition":
                return (
                    <NutritionShowcase />
                );

            case "progress":
                return (
                    <ProgressShowcase />
                );

            case "journey":
                return (
                    <Box
                        sx={{
                            width:
                                "100%",

                            height:
                                "100%",

                            overflow:
                                "hidden",

                            backgroundColor:
                                "#101010",
                        }}
                    >
                        <video
                            ref={videoRef}
                            src="/GRIND/videos/grind-intro.mp4"
                            autoPlay
                            playsInline
                            preload="auto"
                            muted={
                                !voiceEnabled
                            }
                            style={{
                                width:
                                    "100%",

                                height:
                                    "100%",

                                objectFit:
                                    "contain",

                                display:
                                    "block",

                                backgroundColor:
                                    "#000",
                            }}
                        />
                    </Box>
                );

            default:
                return null;
        }
    };

    const isFinalScene =
        sceneIndex ===
        SCENES.length - 1;

    const isScrollableShowcase =
        scene.id === "workout" ||
        scene.id === "nutrition" ||
        scene.id === "progress";

    /*
     * Welcome should also receive the
     * larger showcase dimensions.
     */
    const isLargeShowcase =
        isScrollableShowcase ||
        scene.id === "welcome";

    return (
        <Box
            sx={{
                minHeight:
                    "100vh",

                backgroundColor:
                    "#080808",

                color:
                    "#ffffff",

                position:
                    "relative",

                overflow:
                    "hidden",

                display:
                    "flex",

                flexDirection:
                    "column",
            }}
        >
            {/* =====================================================
                BACKGROUND GLOW
            ===================================================== */}

            <Box
                sx={{
                    position:
                        "absolute",

                    width: {
                        xs: 320,
                        md: 600,
                    },

                    height: {
                        xs: 320,
                        md: 600,
                    },

                    borderRadius:
                        "50%",

                    background:
                        "radial-gradient(circle, rgba(255,92,53,0.12) 0%, rgba(255,92,53,0) 70%)",

                    top: "25%",

                    left: "50%",

                    transform:
                        "translate(-50%, -50%)",

                    pointerEvents:
                        "none",
                }}
            />

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Box
                sx={{
                    position:
                        "relative",

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

                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",

                    borderBottom:
                        "1px solid #202020",

                    flexShrink: 0,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 21,
                            md: 26,
                        },

                        fontWeight:
                            900,

                        letterSpacing:
                            5,
                    }}
                >
                    GRIND
                    <Box
                        component="span"
                        sx={{
                            color:
                                "#ff5c35",
                        }}
                    >
                        .
                    </Box>
                </Typography>
            </Box>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <Box
                sx={{
                    position:
                        "relative",

                    zIndex: 1,

                    flex: 1,

                    minHeight: 0,

                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",

                    px: {
                        xs: 1.5,
                        sm: 3,
                        md: 5,
                    },

                    py: {
                        xs: 3,
                        sm: 4,
                        md: 4,
                    },

                    overflow:
                        "hidden",
                }}
            >
                <Box
                    key={scene.id}
                    sx={{
                        width:
                            "100%",

                        maxWidth:
                            1200,

                        display:
                            "flex",

                        flexDirection:
                            "column",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        animation:
                            "walkthroughSceneIn 650ms ease both",

                        "@keyframes walkthroughSceneIn":
                        {
                            from: {
                                opacity: 0,

                                transform:
                                    "translateY(18px)",
                            },

                            to: {
                                opacity: 1,

                                transform:
                                    "translateY(0)",
                            },
                        },
                    }}
                >
                    {/* =================================================
                        TOP TEXT
                    ================================================= */}

                    <Box
                        sx={{
                            width:
                                "100%",

                            textAlign:
                                "center",

                            flexShrink:
                                0,

                            mb: {
                                xs: 2.5,
                                sm: 3,
                                md: 3.5,
                            },
                        }}
                    >
                        {/* =================================================
                            EYEBROW
                            ALWAYS VISIBLE
                        ================================================= */}

                        <Typography
                            sx={{
                                color:
                                    "#ff5c35",

                                fontSize: {
                                    xs: 8,
                                    sm: 9,
                                    md: 10,
                                },

                                fontWeight:
                                    800,

                                letterSpacing:
                                    2,

                                /*
                                 * On welcome there is no
                                 * title underneath, so reduce
                                 * the bottom spacing.
                                 */
                                mb:
                                    scene.id ===
                                        "welcome"
                                        ? 0
                                        : 1.3,
                            }}
                        >
                            {scene.eyebrow}
                        </Typography>

                        {/* =================================================
                            TITLE + DESCRIPTION
                            HIDDEN ONLY ON WELCOME
                        ================================================= */}

                        {scene.id !==
                            "welcome" && (
                                <>
                                    <Typography
                                        component="h1"
                                        sx={{
                                            whiteSpace:
                                                "pre-line",

                                            fontSize: {
                                                xs: 27,
                                                sm: 40,
                                                md: 54,
                                            },

                                            lineHeight:
                                                1.02,

                                            fontWeight:
                                                900,

                                            letterSpacing:
                                            {
                                                xs: -0.8,
                                                md: -1.5,
                                            },

                                            maxWidth:
                                                850,

                                            mx:
                                                "auto",
                                        }}
                                    >
                                        {
                                            scene.title
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1.4,

                                            maxWidth:
                                                600,

                                            mx:
                                                "auto",

                                            color:
                                                scene.id ===
                                                    "journey"
                                                    ? "#ff5c35"
                                                    : "#8d8985",

                                            fontSize: {
                                                xs: 10,
                                                sm: 11,
                                                md: 13,
                                            },

                                            lineHeight:
                                                1.6,

                                            fontWeight:
                                                scene.id ===
                                                    "journey"
                                                    ? 800
                                                    : 400,

                                            letterSpacing:
                                                scene.id ===
                                                    "journey"
                                                    ? 1.5
                                                    : 0,
                                        }}
                                    >
                                        {
                                            scene.description
                                        }
                                    </Typography>
                                </>
                            )}
                    </Box>

                    {/* =================================================
                        SHOWCASE + CONTROLS
                    ================================================= */}

                    <Box
                        sx={{
                            width: "100%",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            flexWrap: {
                                xs: "wrap",
                                sm: "nowrap",
                            },

                            gap: {
                                xs: 1,
                                sm: 1.5,
                                md: 2,
                            },
                            position: "relative",

                        }}
                    >
                        {/* =================================================
                            LEFT SCROLL INDICATOR
                        ================================================= */}

                        {isScrollableShowcase && (
                            <Box
                                sx={{
                                    width: {
                                        xs: 28,
                                        sm: 34,
                                        md: 42,
                                    },

                                    height: {
                                        xs: 110,
                                        sm: 130,
                                        md: 150,
                                    },

                                    flexShrink: 0,

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    position: {
                                        xs: "absolute",
                                        sm: "relative",
                                    },

                                    left: {
                                        xs: -2,
                                        sm: "auto",
                                    },

                                    overflow: "hidden",

                                    "@keyframes scrollArrowFlow": {
                                        "0%": {
                                            transform: "translateY(-45px)",
                                            opacity: 0,
                                        },

                                        "15%": {
                                            opacity: 1,
                                        },

                                        "70%": {
                                            opacity: 0.45,
                                        },

                                        "100%": {
                                            transform: "translateY(65px)",
                                            opacity: 0,
                                        },
                                    },
                                }}
                            >
                                {/* =================================================
                                    SCROLL LABEL
                                ================================================= */}

                                <Typography
                                    sx={{
                                        position:
                                            "absolute",

                                        top: {
                                            xs: 4,
                                            sm: 6,
                                            md: 8,
                                        },

                                        color:
                                            "#68635f",

                                        fontSize: {
                                            xs: 5,
                                            sm: 6,
                                            md: 7,
                                        },

                                        fontWeight:
                                            800,

                                        letterSpacing:
                                            1.5,

                                        textTransform:
                                            "uppercase",

                                        zIndex: 2,

                                        whiteSpace:
                                            "nowrap",
                                    }}
                                >
                                    SCROLL
                                </Typography>

                                {[0, 1, 2, 3].map(
                                    (
                                        index
                                    ) => (
                                        <KeyboardArrowDownRoundedIcon
                                            key={
                                                index
                                            }
                                            sx={{
                                                position:
                                                    "absolute",

                                                color:
                                                    "#ff5c35",

                                                fontSize:
                                                {
                                                    xs: 25,
                                                    sm: 30,
                                                    md: 34,
                                                },

                                                animation:
                                                    "scrollArrowFlow 2.4s ease-in-out infinite",

                                                animationDelay:
                                                    `${index * 0.6}s`,

                                                opacity:
                                                    0,
                                            }}
                                        />
                                    )
                                )}
                            </Box>
                        )}

                        {/* =================================================
                            SHOWCASE WINDOW
                        ================================================= */}

                        <Box
                            sx={{
                                width:
                                    isLargeShowcase
                                        ? {
                                            xs: "calc(100vw - 105px)",
                                            sm: "min(78vw, 760px)",
                                            md: "min(72vw, 900px)",
                                            lg: "min(70vw, 1040px)",
                                        }
                                        : {
                                            xs: "calc(90vw)",
                                            sm: "min(62vw, 600px)",
                                            md: "min(58vw, 720px)",
                                            lg: "min(55vw, 820px)",
                                        },

                                maxWidth:
                                    isLargeShowcase
                                        ? 1040
                                        : 820,

                                height:
                                    isLargeShowcase
                                        ? {
                                            xs: "min(58vh, 470px)",
                                            sm: "min(62vh, 560px)",
                                            md: "min(64vh, 650px)",
                                            lg: "min(66vh, 700px)",
                                        }
                                        : {
                                            xs: "min(45vh, 320px)",
                                            sm: "min(50vh, 400px)",
                                            md: "min(52vh, 480px)",
                                            lg: "min(55vh, 540px)",
                                        },

                                flex: {
                                    xs: "0 0 auto",
                                    sm: 1,
                                },

                                minWidth: 0,

                                border:
                                    "1px solid #282828",

                                borderRadius: {
                                    xs: 1,
                                    md: 2,
                                },

                                backgroundColor:
                                    "#101010",

                                overflow:
                                    "hidden",

                                position:
                                    "relative",

                                "& > *": {
                                    width:
                                        "100%",

                                    height:
                                        "100%",

                                    maxWidth:
                                        "none",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width:
                                        "100%",

                                    height:
                                        "100%",

                                    overflowY:
                                        isScrollableShowcase
                                            ? "auto"
                                            : "hidden",

                                    overflowX:
                                        "hidden",

                                    scrollBehavior:
                                        "smooth",

                                    scrollbarWidth:
                                        "thin",

                                    "&::-webkit-scrollbar":
                                    {
                                        width: 5,
                                    },

                                    "&::-webkit-scrollbar-track":
                                    {
                                        background:
                                            "#101010",
                                    },

                                    "&::-webkit-scrollbar-thumb":
                                    {
                                        background:
                                            "#363636",

                                        borderRadius:
                                            10,
                                    },

                                    "&::-webkit-scrollbar-thumb:hover":
                                    {
                                        background:
                                            "#ff5c35",
                                    },
                                }}
                            >
                                {renderSceneContent()}
                            </Box>
                        </Box>

                        {/* =================================================
                            RIGHT CONTROL PANEL
                        ================================================= */}

                      <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: 52,
                                    md: 60,
                                },

                                flexShrink: 0,

                                flexBasis: {
                                    xs: "100%",
                                    sm: "auto",
                                },

                                display: "flex",

                                flexDirection: {
                                    xs: "row",
                                    sm: "column",
                                },

                                alignItems: "center",

                                justifyContent: "center",

                                gap: {
                                    xs: 1.2,
                                    sm: 1,
                                    md: 1.1,
                                },

                                mt: {
                                    xs: 1,
                                    sm: 0,
                                },
                            }}
                        >
                            {/* SOUND */}

                            <IconButton
                                onClick={
                                    handleVoiceToggle
                                }
                                aria-label={
                                    voiceEnabled
                                        ? "Disable audio"
                                        : "Enable audio"
                                }
                                sx={{
                                    width: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    height: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    flexShrink:
                                        0,

                                    border:
                                        "1px solid #383838",

                                    backgroundColor:
                                        voiceEnabled
                                            ? "rgba(255,92,53,0.08)"
                                            : "#151515",

                                    color:
                                        voiceEnabled
                                            ? "#ff5c35"
                                            : "#555",

                                    "&:hover":
                                    {
                                        borderColor:
                                            "#ff5c35",

                                        color:
                                            "#ff5c35",

                                        backgroundColor:
                                            "rgba(255,92,53,0.08)",
                                    },
                                }}
                            >
                                {voiceEnabled ? (
                                    <VolumeUpRoundedIcon
                                        sx={{
                                            fontSize:
                                            {
                                                xs: 16,
                                                sm: 18,
                                                md: 19,
                                            },
                                        }}
                                    />
                                ) : (
                                    <VolumeOffRoundedIcon
                                        sx={{
                                            fontSize:
                                            {
                                                xs: 16,
                                                sm: 18,
                                                md: 19,
                                            },
                                        }}
                                    />
                                )}
                            </IconButton>

                            {/* PREVIOUS */}

                            <IconButton
                                onClick={
                                    handlePrevious
                                }
                                disabled={
                                    sceneIndex ===
                                    0
                                }
                                aria-label="Previous scene"
                                sx={{
                                    width: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    height: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    flexShrink:
                                        0,

                                    border:
                                        "1px solid #ff5c35",

                                    backgroundColor:
                                        "rgba(255,92,53,0.08)",

                                    color:
                                        "#ff5c35",

                                    "&:hover":
                                    {
                                        backgroundColor:
                                            "#ff5c35",

                                        color:
                                            "#fff",
                                    },

                                    "&.Mui-disabled":
                                    {
                                        opacity:
                                            0.25,

                                        color:
                                            "#ff5c35",

                                        borderColor:
                                            "#ff5c35",
                                    },
                                }}
                            >
                                <ArrowBackIosNewRoundedIcon
                                    sx={{
                                        fontSize:
                                        {
                                            xs: 12,
                                            sm: 14,
                                            md: 15,
                                        },
                                    }}
                                />
                            </IconButton>

                            {/* PAUSE / PLAY */}

                            <IconButton
                                onClick={
                                    handlePauseToggle
                                }
                                aria-label={
                                    isPaused
                                        ? "Play"
                                        : "Pause"
                                }
                                sx={{
                                    width: {
                                        xs: 44,
                                        sm: 52,
                                        md: 58,
                                    },

                                    height: {
                                        xs: 44,
                                        sm: 52,
                                        md: 58,
                                    },

                                    flexShrink:
                                        0,

                                    border:
                                        "1px solid #383838",

                                    backgroundColor:
                                        isPaused
                                            ? "rgba(255,92,53,0.12)"
                                            : "#151515",

                                    color:
                                        isPaused
                                            ? "#ff5c35"
                                            : "#888",

                                    "&:hover":
                                    {
                                        borderColor:
                                            "#ff5c35",

                                        color:
                                            "#ff5c35",
                                    },
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize:
                                        {
                                            xs: 7,
                                            sm: 8,
                                            md: 9,
                                        },

                                        fontWeight:
                                            900,

                                        letterSpacing:
                                            0.7,
                                    }}
                                >
                                    {isPaused
                                        ? "PLAY"
                                        : "PAUSE"}
                                </Typography>
                            </IconButton>

                            {/* NEXT */}

                            <IconButton
                                onClick={
                                    handleNext
                                }
                                disabled={
                                    isFinalScene
                                }
                                aria-label="Next scene"
                                sx={{
                                    width: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    height: {
                                        xs: 36,
                                        sm: 42,
                                        md: 46,
                                    },

                                    flexShrink:
                                        0,

                                    border:
                                        "1px solid #ff5c35",

                                    backgroundColor:
                                        "rgba(255,92,53,0.08)",

                                    color:
                                        "#ff5c35",

                                    "&:hover":
                                    {
                                        backgroundColor:
                                            "#ff5c35",

                                        color:
                                            "#fff",
                                    },

                                    "&.Mui-disabled":
                                    {
                                        opacity:
                                            0.25,

                                        color:
                                            "#ff5c35",

                                        borderColor:
                                            "#ff5c35",
                                    },
                                }}
                            >
                                <ArrowForwardIosRoundedIcon
                                    sx={{
                                        fontSize:
                                        {
                                            xs: 12,
                                            sm: 14,
                                            md: 15,
                                        },
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* =================================================
                        FINAL CTA
                    ================================================= */}

                    {isFinalScene && (
                        <Button
                            onClick={
                                handleHowGrindWorks
                            }
                            variant="contained"
                            sx={{
                                mt: {
                                    xs: 2.5,
                                    md: 3,
                                },

                                px: {
                                    xs: 3,
                                    sm: 4,
                                },

                                py: {
                                    xs: 1,
                                    sm: 1.2,
                                },

                                borderRadius:
                                    0,

                                backgroundColor:
                                    "#ff5c35",

                                color:
                                    "#fff",

                                fontSize: {
                                    xs: 9,
                                    sm: 10,
                                },

                                fontWeight:
                                    900,

                                letterSpacing:
                                    1.5,

                                boxShadow:
                                    "none",

                                "&:hover":
                                {
                                    backgroundColor:
                                        "#ff5c35",

                                    boxShadow:
                                        "none",
                                },
                            }}
                        >
                            HOW GRIND WORKS
                        </Button>
                    )}
                </Box>
            </Box>

            {/* =====================================================
                PROGRESS
            ===================================================== */}

            <Box
                sx={{
                    position:
                        "relative",

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
                <Box
                    sx={{
                        display:
                            "flex",

                        gap: 0.5,

                        mb: 1.5,
                    }}
                >
                    {SCENES.map(
                        (
                            item,
                            index
                        ) => (
                            <Box
                                key={
                                    item.id
                                }
                                sx={{
                                    height: 2,

                                    flex: 1,

                                    backgroundColor:
                                        index <=
                                            sceneIndex
                                            ? "#ff5c35"
                                            : "#292929",

                                    transition:
                                        "background-color 300ms ease",
                                }}
                            />
                        )
                    )}
                </Box>

                <Box
                    sx={{
                        display:
                            "flex",

                        alignItems:
                            "center",

                        justifyContent:
                            "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            color:
                                "#5e5a57",

                            fontSize: 9,

                            fontFamily:
                                "monospace",

                            minWidth: 50,
                        }}
                    >
                        {String(
                            sceneIndex + 1
                        ).padStart(
                            2,
                            "0"
                        )}{" "}
                        /{" "}
                        {String(
                            SCENES.length
                        ).padStart(
                            2,
                            "0"
                        )}
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "#3d3a38",

                            fontSize: 8,

                            letterSpacing:
                                1,

                            textTransform:
                                "uppercase",
                        }}
                    >
                        {scene.id}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default GrindWalkthrough;