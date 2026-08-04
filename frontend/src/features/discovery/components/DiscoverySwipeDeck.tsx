import {
    forwardRef,
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
    onSwipe?: (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => Promise<void> | void;
};

const DiscoverySwipeDeck = forwardRef<
    DiscoverySwipeDeckHandle,
    DiscoverySwipeDeckProps
>(function DiscoverySwipeDeck(
    {
        recommendations,
        blindMode = false,
        onSwipe,
    },
    ref,
) {
    const [index, setIndex] = useState(0);

    const [swipeDirection, setSwipeDirection] =
        useState<SwipeDirection | null>(null);

    const currentCardRef =
        useRef<DiscoverySwipeCardHandle>(null);

    const currentRecommendation =
        recommendations[index];

    const nextRecommendation =
        recommendations[index + 1];

    const thirdRecommendation =
        recommendations[index + 2];

    const handleSwipe = async (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => {
        setSwipeDirection(direction);

        try {
            await onSwipe?.(
                direction,
                recommendation,
            );
        } finally {
            setIndex((current) => current + 1);

            window.setTimeout(() => {
                setSwipeDirection(null);
            }, 500);
        }
    };

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
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    flex
                    min-h-[600px]
                    w-full
                    max-w-[500px]
                    items-center
                    justify-center
                    rounded-[40px]
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
                        Increase Adventure Mode or return
                        later for a fresh set of discoveries.
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
                h-[610px]
                w-full
                max-w-[500px]
            "
        >
            <motion.div
                animate={{
                    backgroundColor: glowColor,
                    scale: swipeDirection
                        ? 1.08
                        : 1,
                    opacity: swipeDirection
                        ? 1
                        : 0.65,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    inset-8
                    rounded-[44px]
                    blur-[90px]
                "
            />

            {thirdRecommendation && (
                <motion.div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                    animate={{
                        scale: 0.89,
                        y: 28,
                        opacity: 0.28,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 25,
                    }}
                >
                    <DiscoverySwipeCard
                        recommendation={
                            thirdRecommendation
                        }
                        blindMode={blindMode}
                    />
                </motion.div>
            )}

            {nextRecommendation && (
                <motion.div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                    animate={{
                        scale: swipeDirection
                            ? 1
                            : 0.94,
                        y: swipeDirection
                            ? 0
                            : 14,
                        opacity: swipeDirection
                            ? 1
                            : 0.62,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 25,
                    }}
                >
                    <DiscoverySwipeCard
                        recommendation={
                            nextRecommendation
                        }
                        blindMode={blindMode}
                    />
                </motion.div>
            )}

            <AnimatePresence mode="popLayout">
                <DiscoverySwipeCard
                    ref={currentCardRef}
                    key={
                        currentRecommendation
                            .id
                    }
                    recommendation={
                        currentRecommendation
                    }
                    blindMode={blindMode}
                    draggable
                    onSwiped={handleSwipe}
                />
            </AnimatePresence>
        </div>
    );
});

export default DiscoverySwipeDeck;