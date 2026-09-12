import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Box,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import WorkoutShowcase from "../../client/walkthrough/WorkoutShowcase";
import NutritionShowcase from "../../client/walkthrough/NutritionShowcase";
import ProgressShowcase from "../../client/walkthrough/ProgressShowcase";

interface PortalSlide {
  title: string;
  description: string;
  showcase: React.ReactNode;
}

const portalSlides: PortalSlide[] = [
  {
    title: "WORKOUT TRACKING",
    description:
      "Follow your personalized workout plan, exercise instructions and daily schedule.",
    showcase: <WorkoutShowcase spotlight />,
  },
  {
    title: "NUTRITION GUIDANCE",
    description:
      "Personalized nutrition recommendations aligned to your goals and lifestyle.",
    showcase: <NutritionShowcase spotlight />,
  },
  {
    title: "PROGRESS TRACKING",
    description:
      "Track consistency, workout completion, calories burned and training progress.",
    showcase: <ProgressShowcase spotlight />,
  },
];

const FitnessPortal = () => {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  /*
   * ============================================================
   * SHOWCASE REFS
   * ============================================================
   */

  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const showcaseContentRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Used to stop the automatic scroll animation
   * when changing slides.
   */

  const animationFrameRef =
    useRef<number | null>(null);

  const animationStartRef =
    useRef<number | null>(null);

  const pauseUntilRef =
    useRef(0);

  /*
   * Prevents the animation from starting before
   * the showcase has been properly measured.
   */

  const [contentDistance, setContentDistance] =
    useState(0);

  const activeSlide =
    portalSlides[activeIndex];

  /*
   * ============================================================
   * MEASURE SHOWCASE CONTENT
   * ============================================================
   *
   * We calculate how much content exists below the
   * visible window.
   *
   * Example:
   *
   * viewport = 500px
   * content  = 760px
   *
   * animation distance = 260px
   *
   * This means we never guess the scroll amount.
   */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const content =
      showcaseContentRef.current;

    if (!viewport || !content) {
      return;
    }

    const measure = () => {
      const distance =
        Math.max(
          0,
          content.scrollHeight -
          viewport.clientHeight
        );

      setContentDistance(distance);
    };

    measure();

    const resizeObserver =
      new ResizeObserver(measure);

    resizeObserver.observe(viewport);
    resizeObserver.observe(content);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex]);

  /*
   * ============================================================
   * AUTOMATIC SHOWCASE SCROLL ANIMATION
   * ============================================================
   *
   * This creates a slow camera-like movement:
   *
   * TOP
   * ↓
   * ↓
   * BOTTOM
   * pause
   * ↑
   * ↑
   * TOP
   * pause
   * repeat
   *
   * The user cannot interact with this scroll.
   */

  useEffect(() => {
    const content =
      showcaseContentRef.current;

    if (!content) {
      return;
    }

    /*
     * Cancel any previous animation.
     */

    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    }

    animationStartRef.current = null;

    /*
     * Always reset the new showcase to the top.
     */

    content.style.transform =
      "translate3d(0, 0, 0)";

    /*
     * If the showcase doesn't have any
     * hidden content, there is nothing
     * to animate.
     */

    if (contentDistance <= 2) {
      return;
    }

    /*
     * Animation settings.
     *
     * Longer durations make this feel like
     * a subtle product-demo camera movement
     * rather than a distracting animation.
     */

    const travelDuration = 6500;
    const pauseDuration = 1800;

    let direction: "down" | "up" =
      "down";

    let phase: "pause" | "travel" =
      "pause";

    pauseUntilRef.current =
      performance.now() +
      pauseDuration;

    const animate = (
      timestamp: number
    ) => {
      /*
       * Initial pause at the top.
       */

      if (phase === "pause") {
        if (
          timestamp <
          pauseUntilRef.current
        ) {
          animationFrameRef.current =
            requestAnimationFrame(
              animate
            );

          return;
        }

        phase = "travel";

        animationStartRef.current =
          timestamp;
      }

      if (
        animationStartRef.current === null
      ) {
        animationStartRef.current =
          timestamp;
      }

      const elapsed =
        timestamp -
        animationStartRef.current;

      const progress = Math.min(
        elapsed / travelDuration,
        1
      );

      /*
       * Ease in/out.
       *
       * This prevents the showcase from
       * suddenly starting or stopping.
       */

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 -
          Math.pow(
            -2 * progress + 2,
            2
          ) / 2;

      const y =
        direction === "down"
          ? -contentDistance * eased
          : -contentDistance *
          (1 - eased);

      content.style.transform =
        `translate3d(0, ${y}px, 0)`;

      /*
       * Reached the end of the movement.
       */

      if (progress >= 1) {
        phase = "pause";

        pauseUntilRef.current =
          timestamp +
          pauseDuration;

        animationStartRef.current =
          null;

        direction =
          direction === "down"
            ? "up"
            : "down";
      }

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }

      /*
       * Reset position when leaving
       * the slide.
       */

      content.style.transform =
        "translate3d(0, 0, 0)";
    };
  }, [
    activeIndex,
    contentDistance,
  ]);

  /*
   * ============================================================
   * CHANGE SHOWCASE
   * ============================================================
   */

  const changeSlide = (
    direction: number
  ) => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    /*
     * Stop the current showcase animation
     * immediately.
     */

    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      animationFrameRef.current =
        null;
    }

    window.setTimeout(() => {
      setActiveIndex((current) => {
        const nextIndex =
          current + direction;

        if (nextIndex < 0) {
          return (
            portalSlides.length - 1
          );
        }

        if (
          nextIndex >=
          portalSlides.length
        ) {
          return 0;
        }

        return nextIndex;
      });

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 180);
  };

  /*
   * ============================================================
   * DOT NAVIGATION
   * ============================================================
   */

  const goToSlide = (
    index: number
  ) => {
    if (
      index === activeIndex ||
      isTransitioning
    ) {
      return;
    }

    setIsTransitioning(true);

    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      animationFrameRef.current =
        null;
    }

    window.setTimeout(() => {
      setActiveIndex(index);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 180);
  };

  return (
    <Box
      component="section"
      id="fitness-portal"
      sx={{
        py: {
          xs: 8,
          md: 12,
        },

        backgroundColor: "#0b0b0b",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1200,

          mx: "auto",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <Box
          sx={{
            textAlign: "center",

            mb: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <Typography
            sx={{
              color: "primary.main",

              fontSize: 14,

              fontWeight: 500,

              mb: 1.5,
            }}
          >
            YOUR PERSONAL FITNESS PORTAL
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 40,
                sm: 52,
                md: 62,
              },

              lineHeight: 0.95,

              maxWidth: 900,

              mx: "auto",
            }}
          >
            EVERYTHING YOU NEED TO FOLLOW.
            <br />
            YOUR PERSONALIZED FITNESS JOURNEY.
          </Typography>
        </Box>

        {/* =====================================================
            SHOWCASE + SIDE NAVIGATION
        ====================================================== */}

        <Box
          sx={{
            width: "100%",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            gap: {
              xs: 0.8,
              sm: 1.5,
              md: 2,
            },
          }}
        >
          {/* ===================================================
              PREVIOUS BUTTON
          ==================================================== */}

          <IconButton
            aria-label="Previous showcase"
            onClick={() =>
              changeSlide(-1)
            }
            disabled={isTransitioning}
            sx={{
              flexShrink: 0,

              width: {
                xs: 34,
                sm: 42,
                md: 48,
              },

              height: {
                xs: 34,
                sm: 42,
                md: 48,
              },

              color: "#ffffff",

              backgroundColor: "#171717",

              border:
                "1px solid #292929",

              transition:
                "background-color 200ms ease, border-color 200ms ease, transform 200ms ease",

              "&:hover": {
                backgroundColor:
                  "#222222",

                borderColor:
                  "primary.main",

                transform:
                  "translateX(-2px)",
              },

              "&.Mui-disabled": {
                color: "#555555",
              },
            }}
          >
            <ArrowBackIosNewRoundedIcon
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 17,
                  md: 19,
                },
              }}
            />
          </IconButton>

          {/* ===================================================
              SHOWCASE VIEWPORT
          ==================================================== */}

          <Box
            ref={viewportRef}
            sx={{
              flex: 1,

              minWidth: 0,

              maxWidth: 1040,

              /*
               * Fixed window.
               *
               * IMPORTANT:
               * overflow is hidden, so the user
               * cannot scroll this area.
               */

              height: {
                xs: 360,
                sm: 440,
                md: 500,
              },

              overflow: "hidden",

              position: "relative",

              borderRadius: {
                xs: "7px",
                md: "10px",
              },

              /*
               * Showcase transition when changing
               * Workout / Nutrition / Progress.
               */

              opacity:
                isTransitioning
                  ? 0
                  : 1,

              transform:
                isTransitioning
                  ? "translateY(12px) scale(0.985)"
                  : "translateY(0) scale(1)",

              transition:
                "opacity 180ms ease, transform 180ms ease",

              pointerEvents:
                isTransitioning
                  ? "none"
                  : "auto",

              /*
               * Make absolutely sure no browser
               * scrollbar appears.
               */

              scrollbarWidth: "none",

              msOverflowStyle:
                "none",

              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {/* =================================================
                MOVING SHOWCASE CONTENT
            ================================================= */}

            <Box
              ref={showcaseContentRef}
              sx={{
                width: "100%",

                willChange:
                  "transform",

                /*
                 * Do not add a CSS transition here.
                 * The requestAnimationFrame animation
                 * controls the movement smoothly.
                 */

                transform:
                  "translate3d(0, 0, 0)",

                backfaceVisibility:
                  "hidden",

                WebkitBackfaceVisibility:
                  "hidden",
              }}
            >
              {activeSlide.showcase}
            </Box>
          </Box>

          {/* ===================================================
              NEXT BUTTON
          ==================================================== */}

          <IconButton
            aria-label="Next showcase"
            onClick={() =>
              changeSlide(1)
            }
            disabled={isTransitioning}
            sx={{
              flexShrink: 0,

              width: {
                xs: 34,
                sm: 42,
                md: 48,
              },

              height: {
                xs: 34,
                sm: 42,
                md: 48,
              },

              color: "#ffffff",

              backgroundColor: "#171717",

              border:
                "1px solid #292929",

              transition:
                "background-color 200ms ease, border-color 200ms ease, transform 200ms ease",

              "&:hover": {
                backgroundColor:
                  "#222222",

                borderColor:
                  "primary.main",

                transform:
                  "translateX(2px)",
              },

              "&.Mui-disabled": {
                color: "#555555",
              },
            }}
          >
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 17,
                  md: 19,
                },
              }}
            />
          </IconButton>
        </Box>

        {/* =====================================================
            SHOWCASE TITLE + DESCRIPTION
        ====================================================== */}

        <Box
          sx={{
            textAlign: "center",

            mt: {
              xs: 2.5,
              md: 3,
            },

            minHeight: {
              xs: 80,
              md: 75,
            },

            opacity:
              isTransitioning
                ? 0
                : 1,

            transform:
              isTransitioning
                ? "translateY(8px)"
                : "translateY(0)",

            transition:
              "opacity 180ms ease, transform 180ms ease",
          }}
        >
          <Typography
            sx={{
              fontFamily:
                '"Bebas Neue", sans-serif',

              fontSize: {
                xs: 27,
                md: 33,
              },

              lineHeight: 1,

              mb: 1.2,
            }}
          >
            {activeSlide.title}
          </Typography>

          <Typography
            sx={{
              maxWidth: 650,

              mx: "auto",

              px: {
                xs: 2,
                md: 0,
              },

              color:
                "text.secondary",

              fontSize: {
                xs: 13,
                md: 15,
              },

              lineHeight: 1.65,
            }}
          >
            {activeSlide.description}
          </Typography>
        </Box>

        {/* =====================================================
            DOT NAVIGATION
        ====================================================== */}

        <Box
          sx={{
            mt: {
              xs: 1,
              md: 1.5,
            },

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",

            gap: 1.2,
          }}
        >
          {portalSlides.map(
            (slide, index) => {
              const isActive =
                index === activeIndex;

              return (
                <Box
                  key={slide.title}
                  component="button"
                  type="button"
                  aria-label={`Show ${slide.title.toLowerCase()}`}
                  aria-current={
                    isActive
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    goToSlide(index)
                  }
                  sx={{
                    width: isActive
                      ? 9
                      : 7,

                    height: isActive
                      ? 9
                      : 7,

                    minWidth: 0,

                    minHeight: 0,

                    padding: 0,

                    border: 0,

                    borderRadius:
                      "50%",

                    cursor: isActive
                      ? "default"
                      : "pointer",

                    backgroundColor:
                      isActive
                        ? "primary.main"
                        : "#555555",

                    opacity: isActive
                      ? 1
                      : 0.65,

                    transition:
                      "width 200ms ease, height 200ms ease, background-color 200ms ease, opacity 200ms ease",

                    "&:hover": {
                      opacity: 1,

                      backgroundColor:
                        "primary.main",
                    },
                  }}
                />
              );
            }
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default FitnessPortal;