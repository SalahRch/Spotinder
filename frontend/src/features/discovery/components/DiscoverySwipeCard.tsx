import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";

import {
    motion,
    useAnimationControls,
    useMotionValue,
    useMotionValueEvent,
    useTransform,
} from "framer-motion";

import CardTilt from "./CardTilt";
import RecommendationCard from "./RecommendationCard";

import type { Recommendation } from "../types/discovery";

export type SwipeDirection =
    | "left"
    | "right";

export type DiscoverySwipeCardHandle = {
    swipe: (
        direction: SwipeDirection,
    ) => Promise<void>;
};

type DiscoverySwipeCardProps = {
    recommendation: Recommendation;
    draggable?: boolean;
    blindMode?: boolean;
    backgroundCard?: boolean;

    onPlay?: (
        recommendation: Recommendation,
    ) => Promise<void> | void;

    currentTrackId?: string | null;
    isPlaying?: boolean;
    position?: number;
    duration?: number;

    onDragProgress?: (
        progress: number,
    ) => void;

    onSwiped?: (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => Promise<void> | void;
};

const SWIPE_THRESHOLD = 120;
const EXIT_DISTANCE = 900;

const DiscoverySwipeCard = forwardRef<
    DiscoverySwipeCardHandle,
    DiscoverySwipeCardProps
>(function DiscoverySwipeCard(
    {
        recommendation,
        draggable = false,
        blindMode = false,
        backgroundCard = false,

        onPlay,

        currentTrackId = null,
        isPlaying = false,
        position = 0,
        duration = 0,

        onDragProgress,
        onSwiped,
    },
    ref,
) {
    const controls =
        useAnimationControls();

    const x = useMotionValue(0);

    const isSwipingRef =
        useRef(false);

    const rotate = useTransform(
        x,
        [-250, 250],
        [-12, 12],
    );

    const likeOpacity = useTransform(
        x,
        [25, 120],
        [0, 1],
    );

    const likeScale = useTransform(
        x,
        [25, 120],
        [0.82, 1],
    );

    const passOpacity = useTransform(
        x,
        [-120, -25],
        [1, 0],
    );

    const passScale = useTransform(
        x,
        [-120, -25],
        [1, 0.82],
    );

    useMotionValueEvent(
        x,
        "change",
        (latest) => {
            const progress = Math.min(
                Math.abs(latest) /
                SWIPE_THRESHOLD,
                1,
            );

            onDragProgress?.(progress);
        },
    );

    const swipeAway = useCallback(
        async (
            direction: SwipeDirection,
        ) => {
            if (isSwipingRef.current) {
                return;
            }

            isSwipingRef.current = true;

            const isRight =
                direction === "right";

            try {
                onDragProgress?.(1);

                await controls.start({
                    x: isRight
                        ? EXIT_DISTANCE
                        : -EXIT_DISTANCE,
                    rotate: isRight
                        ? 20
                        : -20,
                    opacity: 0,
                    scale: 0.94,
                    transition: {
                        duration: 0.42,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    },
                });

                onSwiped?.(
                    direction,
                    recommendation,
                );
            } catch (error) {
                isSwipingRef.current = false;
                onDragProgress?.(0);

                throw error;
            }
        },
        [
            controls,
            onDragProgress,
            onSwiped,
            recommendation,
        ],
    );

    const snapBack = useCallback(
        () => {
            onDragProgress?.(0);

            void controls.start({
                x: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                },
            });
        },
        [
            controls,
            onDragProgress,
        ],
    );

    useImperativeHandle(
        ref,
        () => ({
            swipe: swipeAway,
        }),
        [swipeAway],
    );

    return (
        <motion.div
            className={`
                absolute
                inset-0
                flex
                items-center
                justify-center
                ${
                draggable
                    ? `
                            z-20
                            cursor-grab
                            pointer-events-auto
                            active:cursor-grabbing
                        `
                    : `
                            z-0
                            pointer-events-none
                        `
            }
            `}
            drag={
                draggable &&
                !isSwipingRef.current
                    ? "x"
                    : false
            }
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            dragElastic={0.28}
            dragMomentum={false}
            animate={controls}
            style={{
                x,
                rotate,
                touchAction: "pan-y",
            }}
            whileDrag={{
                scale: 1.025,
                y: -4,
            }}
            onDragEnd={async (
                _,
                info,
            ) => {
                if (
                    !draggable ||
                    isSwipingRef.current
                ) {
                    return;
                }

                if (
                    info.offset.x >
                    SWIPE_THRESHOLD
                ) {
                    await swipeAway(
                        "right",
                    );
                    return;
                }

                if (
                    info.offset.x <
                    -SWIPE_THRESHOLD
                ) {
                    await swipeAway(
                        "left",
                    );
                    return;
                }

                snapBack();
            }}
        >
            <motion.div
                style={{
                    opacity: likeOpacity,
                    scale: likeScale,
                }}
                className="
                    pointer-events-none
                    absolute
                    right-8
                    top-12
                    z-40
                    rotate-12
                    rounded-xl
                    border-2
                    border-emerald-300
                    bg-emerald-400/10
                    px-4
                    py-2
                    text-xl
                    font-black
                    tracking-[0.18em]
                    text-emerald-300
                    shadow-[0_0_35px_rgba(52,211,153,0.18)]
                    backdrop-blur-md
                "
            >
                LIKE
            </motion.div>

            <motion.div
                style={{
                    opacity: passOpacity,
                    scale: passScale,
                }}
                className="
                    pointer-events-none
                    absolute
                    left-8
                    top-12
                    z-40
                    -rotate-12
                    rounded-xl
                    border-2
                    border-rose-300
                    bg-rose-400/10
                    px-4
                    py-2
                    text-xl
                    font-black
                    tracking-[0.18em]
                    text-rose-300
                    shadow-[0_0_35px_rgba(251,113,133,0.18)]
                    backdrop-blur-md
                "
            >
                PASS
            </motion.div>

            {draggable ? (
                <CardTilt>
                    <RecommendationCard
                        recommendation={recommendation}
                        blindMode={blindMode}
                        backgroundCard={backgroundCard}
                        onPlay={onPlay}
                        currentTrackId={currentTrackId}
                        isPlaying={isPlaying}
                        position={position}
                        duration={duration}
                    />
                </CardTilt>
            ) : (
                <RecommendationCard
                    recommendation={recommendation}
                    blindMode={blindMode}
                    backgroundCard={backgroundCard}
                    onPlay={onPlay}
                    currentTrackId={currentTrackId}
                    isPlaying={isPlaying}
                    position={position}
                    duration={duration}
                />
            )}
        </motion.div>
    );
});

export default DiscoverySwipeCard;