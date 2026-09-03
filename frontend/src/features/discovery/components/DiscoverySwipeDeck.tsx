import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import DiscoverySwipeCard from "./DiscoverySwipeCard";

import type {
    DiscoverySwipeCardHandle,
    SwipeDirection,
} from "./DiscoverySwipeCard";

import type {
    Recommendation,
} from "../types/discovery";

export type DiscoverySwipeDeckHandle = {
    swipeLeft: () => Promise<void>;
    swipeRight: () => Promise<void>;
};

type DiscoverySwipeDeckProps = {
    recommendations: Recommendation[];
    blindMode?: boolean;

    hasInAppPlayback?: boolean;

    onPlay?: (
        recommendation: Recommendation,
    ) => Promise<void> | void;

    currentTrackId?: string | null;
    isPlaying?: boolean;
    position?: number;
    duration?: number;

    onSwipe?: (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => Promise<void> | void;
};

const DISCOVERY_TRACK_KEY =
    "spotinder-discovery-track";

const LEGACY_DISCOVERY_INDEX_KEY =
    "spotinder-discovery-index";

const DiscoverySwipeDeck = forwardRef<
    DiscoverySwipeDeckHandle,
    DiscoverySwipeDeckProps
>(
    function DiscoverySwipeDeck(
        {
            recommendations,
            blindMode = false,

            hasInAppPlayback = false,

            onPlay,

            currentTrackId = null,
            isPlaying = false,
            position = 0,
            duration = 0,

            onSwipe,
        },
        ref,
    ) {
    const [index, setIndex] =
        useState(() => {
            /*
             * Remove the old index-based persistence.
             *
             * The old implementation stored an array index,
             * which could become stale when Spotify/backend
             * returned a new recommendation pool.
             */
            sessionStorage.removeItem(
                LEGACY_DISCOVERY_INDEX_KEY,
            );

            const savedTrackId =
                sessionStorage.getItem(
                    DISCOVERY_TRACK_KEY,
                );

            if (!savedTrackId) {
                return 0;
            }

            const savedIndex =
                recommendations.findIndex(
                    (recommendation) =>
                        recommendation.id ===
                        savedTrackId,
                );

            /*
             * If the saved track still exists in this
             * recommendation pool, continue from it.
             *
             * Otherwise this is effectively a fresh deck,
             * so begin from the first recommendation.
             */
            return savedIndex >= 0
                ? savedIndex
                : 0;
        });

    const [
        swipeDirection,
        setSwipeDirection,
    ] = useState<SwipeDirection | null>(
        null,
    );

    const [
        dragProgress,
        setDragProgress,
    ] = useState(0);

    const currentCardRef =
        useRef<DiscoverySwipeCardHandle>(
            null,
        );

    const currentRecommendation =
        recommendations[index];

    const nextRecommendation =
        recommendations[index + 1];

    const thirdRecommendation =
        recommendations[index + 2];

    const handleSwipe = useCallback(
        (
            direction: SwipeDirection,
            recommendation: Recommendation,
        ) => {
            setSwipeDirection(direction);

            // Advance the interface immediately.
            setIndex((current) => {
                const nextIndex =
                    current + 1;

                const nextRecommendation =
                    recommendations[nextIndex];

                /*
                 * Persist the identity of the next card,
                 * not its position in the array.
                 */
                if (nextRecommendation) {
                    sessionStorage.setItem(
                        DISCOVERY_TRACK_KEY,
                        nextRecommendation.id,
                    );
                } else {
                    /*
                     * The current deck is exhausted.
                     * Don't leave stale persistence behind.
                     */
                    sessionStorage.removeItem(
                        DISCOVERY_TRACK_KEY,
                    );
                }

                return nextIndex;
            });

            setDragProgress(0);

            // Persist swipe in the background.
            void Promise.resolve(
                onSwipe?.(
                    direction,
                    recommendation,
                ),
            ).catch(
                (error: unknown) => {
                    console.error(
                        "Failed to persist swipe:",
                        error,
                    );
                },
            );

            window.setTimeout(() => {
                setSwipeDirection(null);
            }, 500);
        },
        [
            onSwipe,
            recommendations,
        ],
    );

    useImperativeHandle(
        ref,
        () => ({
            swipeLeft: async () => {
                await currentCardRef.current?.swipe(
                    "left",
                );
            },

            swipeRight: async () => {
                await currentCardRef.current?.swipe(
                    "right",
                );
            },
        }),
        [],
    );

    if (!currentRecommendation) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 18,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.45,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                    ],
                }}
                className="
                    flex
                    h-[550px]
                    w-full
                    max-w-[460px]
                    items-center
                    justify-center
                    rounded-[36px]
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-10
                    text-center
                    backdrop-blur-xl
                "
            >
                <div>
                    <p className="text-3xl">
                        ✨
                    </p>

                    <h2
                        className="
                            mt-5
                            text-2xl
                            font-semibold
                            text-slate-100
                        "
                    >
                        You’ve explored every song.
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-sm
                            text-sm
                            leading-6
                            text-slate-400
                        "
                    >
                        Increase Adventure Mode
                        or return later for a
                        fresh set of discoveries.
                    </p>
                </div>
            </motion.div>
        );
    }

    const glowColor =
        swipeDirection === "right"
            ? "rgba(52, 211, 153, 0.18)"
            : swipeDirection === "left"
                ? "rgba(251, 113, 133, 0.16)"
                : "rgba(139, 92, 246, 0.10)";

    return (
        <div
            className="
                relative
                h-[560px]
                w-full
                max-w-[460px]
            "
        >
            {/* Reactive ambient glow */}

            <motion.div
                animate={{
                    backgroundColor:
                    glowColor,

                    scale:
                        1 +
                        dragProgress * 0.1,

                    opacity:
                        0.62 +
                        dragProgress * 0.38,
                }}
                transition={{
                    duration: 0.18,
                    ease: "easeOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    inset-8
                    rounded-[40px]
                    blur-[85px]
                "
            />

            {/* Third card */}

            {thirdRecommendation && (
                <motion.div
                    key={`third-${thirdRecommendation.id}`}
                    initial={false}
                    animate={{
                        scale:
                            0.89 +
                            dragProgress *
                            0.05,

                        y:
                            26 -
                            dragProgress *
                            13,

                        opacity:
                            0.25 +
                            dragProgress *
                            0.18,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 25,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                >
                    <DiscoverySwipeCard
                        recommendation={
                            thirdRecommendation
                        }
                        blindMode={
                            blindMode
                        }
                        backgroundCard
                    />
                </motion.div>
            )}

            {/* Next card */}

            {nextRecommendation && (
                <motion.div
                    key={`next-${nextRecommendation.id}`}
                    initial={false}
                    animate={{
                        scale:
                            0.94 +
                            dragProgress *
                            0.06,

                        y:
                            13 -
                            dragProgress *
                            13,

                        opacity:
                            0.6 +
                            dragProgress *
                            0.4,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 25,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                >
                    <DiscoverySwipeCard
                        recommendation={
                            nextRecommendation
                        }
                        blindMode={
                            blindMode
                        }
                        backgroundCard
                    />
                </motion.div>
            )}

            {/* Current card */}

            <AnimatePresence mode="popLayout">
                <DiscoverySwipeCard
                    ref={currentCardRef}
                    key={`${currentRecommendation.id}-${index}`}
                    recommendation={
                        currentRecommendation
                    }
                    blindMode={
                        blindMode
                    }
                    hasInAppPlayback={
                        hasInAppPlayback
                    }
                    draggable
                    onPlay={
                        onPlay
                    }
                    currentTrackId={
                        currentTrackId
                    }
                    isPlaying={
                        isPlaying
                    }
                    position={
                        position
                    }
                    duration={
                        duration
                    }
                    onDragProgress={(progress) => {
                        setDragProgress(progress);
                    }}
                    onSwiped={
                        handleSwipe
                    }
                />
            </AnimatePresence>
        </div>
    );
});

export default DiscoverySwipeDeck;