import {useRef, useState} from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    FiHeart,
    FiRefreshCw,
    FiSliders,
    FiX,
} from "react-icons/fi";

import { useAuth } from "@/features/auth/hooks/useAuth";
import AmbientBackground from "../components/AmbientBackground";
import DiscoverySwipeDeck, {
    type DiscoverySwipeDeckHandle,
} from "../components/DiscoverySwipeDeck";

import type { SwipeDirection } from "../components/DiscoverySwipeCard";
import type { Recommendation } from "../types/discovery";

import { useRecommendations } from "../hooks/useRecommendations";
import { useRecordSwipe } from "../hooks/useRecordSwipe";
import {usePlayer} from "@/features/player/context/SpotifyPlayerContext.tsx";
export default function DiscoverPage() {
    const { user } = useAuth();

    const swipeDeckRef =
        useRef<DiscoverySwipeDeckHandle>(null);

    const [sessionStats, setSessionStats] =
        useState({
            seen: 0,
            liked: 0,
        });

    const player =
        usePlayer();

    const handleRestartPlayback =
        async () => {
            if (!player.currentTrack) {
                return;
            }

            try {
                await player.restart();
            } catch (error) {
                console.error(
                    "Unable to restart Spotify playback:",
                    error,
                );

                toast.error(
                    "We couldn't restart the track.",
                );
            }
        };

    const handleTogglePlayback = async (
        recommendation: Recommendation,
    ) => {
        await player.toggleTrack(
            recommendation,
            "discover"
        );
    };

    const {
        data: recommendations = [],
        isLoading:
            recommendationsLoading,
        isError:
            recommendationsError,
        refetch:
            refetchRecommendations,
    } = useRecommendations();

    const recordSwipe =
        useRecordSwipe();

    const handleSwipe = async (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => {
        await player.stopAndReset();

        const isLike =
            direction === "right";

        setSessionStats((current) => ({
            seen:
                current.seen + 1,

            liked:
                current.liked +
                (isLike ? 1 : 0),
        }));

        const apiDirection =
            isLike
                ? "RIGHT"
                : "LEFT";

        try {
            await recordSwipe.mutateAsync({
                spotifyTrackId:
                recommendation.id,

                direction:
                apiDirection,

                blindMode:
                    false,
            });
        } catch {
            setSessionStats(
                (current) => ({
                    seen:
                        Math.max(
                            current.seen -
                            1,
                            0,
                        ),

                    liked:
                        Math.max(
                            current.liked -
                            (isLike
                                ? 1
                                : 0),
                            0,
                        ),
                }),
            );

            toast.error(
                "We couldn't save that swipe.",
            );

            await refetchRecommendations();
        }
    };

    if (recommendationsLoading) {
        return (
            <section
                className="
                    relative
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#0B0F17]
                    text-white
                "
            >
                <AmbientBackground />

                <div className="relative z-10 text-center">
                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-2
                            border-white/10
                            border-t-violet-400
                        "
                    />

                    <p className="mt-5 text-sm text-slate-400">
                        Preparing your discoveries...
                    </p>
                </div>
            </section>
        );
    }

    if (recommendationsError) {
        return (
            <section
                className="
                    relative
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#0B0F17]
                    px-6
                    text-center
                    text-white
                "
            >
                <AmbientBackground />

                <div className="relative z-10">
                    <h2 className="text-2xl font-semibold">
                        We couldn’t load your discoveries.
                    </h2>

                    <p className="mt-3 text-sm text-slate-400">
                        Check your Spotify connection and try again.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            void refetchRecommendations();
                        }}
                        className="
                            mt-6
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            transition
                            hover:border-white/20
                            hover:bg-white/10
                        "
                    >
                        Try again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F17]
            "
        >
            <AmbientBackground />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    min-h-screen
                    w-full
                    max-w-[1440px]
                    grid-cols-1
                    items-center
                    gap-10
                    px-6
                    py-10
                    xl:grid-cols-[minmax(230px,1fr)_460px_minmax(230px,1fr)]
                    xl:gap-8
                    xl:px-10
                    xl:py-6
                "
            >
                {/* ================= LEFT: GREETING ================= */}

                <section
                    className="
        order-1
        mx-auto
        w-full
        max-w-md
        text-center

        xl:mx-0
        xl:max-w-sm
        xl:self-start
        xl:pt-5
        xl:text-left
    "
                >
                    <p
                        className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.28em]
                            text-violet-300/70
                        "
                    >
                        Daily discovery
                    </p>

                    <h1
                        className="
                            mt-4
                            text-4xl
                            font-semibold
                            leading-[1.08]
                            tracking-tight
                            text-slate-100
                            xl:text-[42px]
                        "
                    >
                        Good evening,
                        <br className="hidden xl:block" />
                        {" "}
                        {user?.displayName ?? "explorer"}.
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-[220px]
                            text-sm
                            leading-7
                            text-slate-400
                            xl:mx-0
                            xl:text-base
                        "
                    >
                        Ready to find something you’ve never heard before?
                    </p>

                    <div
                        aria-hidden="true"
                        className="
                            mt-8
                            hidden
                            h-px
                            w-24
                            bg-gradient-to-r
                            from-violet-400/60
                            to-transparent
                            xl:block
                        "
                    />

                    <div
                        className="
                            mt-7
                            hidden
                            items-center
                            gap-3
                            text-xs
                            text-slate-500
                            xl:flex
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-cyan-300
                                shadow-[0_0_12px_rgba(103,232,249,0.75)]
                            "
                        />

                        Personalized from your Spotify taste
                    </div>

                </section>

                {/* ================= CENTER: DISCOVERY ================= */}

                <section
                    className="
                        order-2
                        relative
                        flex
                        min-w-0
                        flex-col
                        items-center
                        justify-center
                        xl:translate-y-3
                    "
                >
                    {/* Main ambient glow */}

                    <motion.div
                        aria-hidden="true"
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.4, 0.68, 0.4],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            pointer-events-none
                            absolute
                            top-10
                            h-[620px]
                            w-[620px]
                            rounded-full
                            bg-gradient-to-br
                            from-cyan-400/15
                            via-violet-500/15
                            to-fuchsia-500/10
                            blur-[180px]
                        "
                    />

                    {/* Ground glow */}

                    <motion.div
                        aria-hidden="true"
                        animate={{
                            scaleX: [1, 1.12, 1],
                            opacity: [0.16, 0.3, 0.16],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            pointer-events-none
                            absolute
                            top-[515px]
                            h-20
                            w-72
                            rounded-full
                            bg-violet-400/20
                            blur-[60px]
                        "
                    />

                    <div
                        className="
                            relative
                            z-10
                            w-full
                            max-w-[460px]
                        "
                    >
                        <DiscoverySwipeDeck
                            ref={swipeDeckRef}
                            recommendations={recommendations}
                            blindMode={false}
                            onPlay={handleTogglePlayback}
                            currentTrackId={
                                player.currentTrack?.id ?? null
                            }
                            isPlaying={
                                player.isPlaying
                            }
                            position={
                                player.position
                            }
                            duration={
                                player.duration
                            }
                            onSwipe={handleSwipe}
                        />
                    </div>

                    {/* Swipe actions */}

                    <div
                        className="
                            relative
                            z-10
                            -mt-1
                            flex
                            items-center
                            gap-6
                        "
                    >
                        <button
                            type="button"
                            aria-label="Pass song"
                            onClick={() => {
                                void swipeDeckRef.current?.swipeLeft();
                            }}
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-rose-400/20
                                bg-[#111827]/75
                                text-rose-300
                                shadow-[0_14px_34px_rgba(0,0,0,0.28)]
                                backdrop-blur-xl
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:border-rose-400/40
                                hover:bg-rose-400/10
                                hover:shadow-[0_0_35px_rgba(251,113,133,0.15)]
                            "
                        >
                            <FiX className="text-2xl" />
                        </button>

                        <button
                            type="button"
                            aria-label="Restart track"
                            title="Restart track"
                            disabled={!player.isPlaying}
                            onClick={() => {
                                void handleRestartPlayback();
                            }}
                            className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        text-slate-400
        transition
        duration-300

        hover:-translate-y-0.5
        hover:border-violet-400/30
        hover:bg-violet-400/[0.08]
        hover:text-violet-200
        hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]

        disabled:cursor-not-allowed
        disabled:opacity-30
        disabled:hover:translate-y-0
        disabled:hover:border-white/10
        disabled:hover:bg-white/5
        disabled:hover:text-slate-400
        disabled:hover:shadow-none
    "
                        >
                            <FiRefreshCw className="text-lg" />
                        </button>

                        <button
                            type="button"
                            aria-label="Like song"
                            onClick={() => {
                                void swipeDeckRef.current?.swipeRight();
                            }}
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-emerald-400/20
                                bg-[#111827]/75
                                text-emerald-300
                                shadow-[0_14px_34px_rgba(0,0,0,0.28)]
                                backdrop-blur-xl
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:border-emerald-400/40
                                hover:bg-emerald-400/10
                                hover:shadow-[0_0_35px_rgba(52,211,153,0.15)]
                            "
                        >
                            <FiHeart className="text-2xl" />
                        </button>
                    </div>

                    <p
                        className="
                            relative
                            z-10
                            mt-3
                            text-xs
                            text-slate-500
                        "
                    >
                        Drag the card or use the controls
                    </p>
                </section>

                {/* ================= RIGHT: SETTINGS ================= */}

                <aside
                    className="
                        order-3
                        mx-auto
                        flex
                        w-full
                        max-w-[320px]
                        flex-col
                        gap-4
                        xl:mx-0
                        xl:justify-self-end
                    "
                >
                    {/* Adventure */}

                    <section
                        className="
                            rounded-[24px]
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            p-6
                            shadow-[0_20px_60px_rgba(0,0,0,0.24)]
                            backdrop-blur-xl
                        "
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-violet-400/15
                                        bg-violet-400/[0.08]
                                        text-violet-300
                                    "
                                >
                                    <FiSliders />
                                </div>

                                <div>
                                    <h2 className="text-sm font-medium text-slate-100">
                                        Adventure
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Control how far recommendations move beyond your usual taste.
                                    </p>
                                </div>
                            </div>

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.05]
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                {user?.adventureLevel ?? 50}%
                            </span>
                        </div>

                        <div className="mt-6">
                            <div
                                className="
                                    relative
                                    h-1.5
                                    w-full
                                    rounded-full
                                    bg-white/10
                                "
                            >
                                <div
                                    className="
                                        h-full
                                        w-1/2
                                        rounded-full
                                        bg-gradient-to-r
                                        from-cyan-400
                                        to-violet-500
                                    "
                                />

                                <div
                                    className="
                                        absolute
                                        left-1/2
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-x-1/2
                                        -translate-y-1/2
                                        rounded-full
                                        border-2
                                        border-[#111827]
                                        bg-white
                                        shadow-[0_0_18px_rgba(255,255,255,0.38)]
                                    "
                                />
                            </div>

                            <div
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    justify-between
                                    text-[11px]
                                    text-slate-500
                                "
                            >
                                <span>Comfort zone</span>
                                <span>Explore everything</span>
                            </div>
                        </div>
                    </section>

                    {/* Blind Discovery */}

                    <button
                        type="button"
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-4
                            rounded-[22px]
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            px-5
                            py-4
                            text-left
                            shadow-[0_16px_50px_rgba(0,0,0,0.18)]
                            backdrop-blur-xl
                            transition
                            duration-300
                            hover:border-violet-400/25
                            hover:bg-white/[0.055]
                        "
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                Blind Discovery
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Hide the artist and track identity until you decide.
                            </p>
                        </div>

                        <span
                            className="
                                relative
                                h-6
                                w-11
                                shrink-0
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.06]
                                transition
                                group-hover:border-violet-400/25
                            "
                        >
                            <span
                                className="
                                    absolute
                                    left-1
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    rounded-full
                                    bg-slate-500
                                    shadow-md
                                "
                            />
                        </span>
                    </button>


                    {/* Today's Session */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.22,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
        rounded-[24px]
        border
        border-white/[0.07]
        bg-white/[0.035]
        p-5
        shadow-[0_20px_60px_rgba(0,0,0,0.2)]
        backdrop-blur-xl
    "
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-sm font-medium text-slate-100">
                                    Today&apos;s Session
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Your progress in this discovery run.
                                </p>
                            </div>

                            <div
                                className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-orange-400/15
                bg-orange-400/[0.08]
                text-lg
            "
                            >
                                🔥
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                                    <span className="text-sm text-slate-400">
                    Liked
                </span>
                                </div>

                                <motion.span
                                    key={sessionStats.liked}
                                    initial={{
                                        opacity: 0,
                                        y: 5,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="text-sm font-medium text-slate-100"
                                >
                                    {sessionStats.liked}
                                </motion.span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-cyan-400" />

                                    <span className="text-sm text-slate-400">
                    Seen
                </span>
                                </div>

                                <motion.span
                                    key={sessionStats.seen}
                                    initial={{
                                        opacity: 0,
                                        y: 5,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="text-sm font-medium text-slate-100"
                                >
                                    {sessionStats.seen}
                                </motion.span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                                    <span className="text-sm text-slate-400">
                    Streak
                </span>
                                </div>

                                <span className="text-sm font-medium text-slate-100">
                —
            </span>
                            </div>
                        </div>

                        <div className="my-5 h-px bg-white/[0.06]" />

                        <div>
                            <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">
                Daily goal
            </span>

                                <span className="text-slate-400">
                0 / 20
            </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width: "0%",
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.5,
                                    }}
                                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-violet-500
                    to-fuchsia-500
                "
                                />
                            </div>
                        </div>
                    </motion.section>





                    {/* Session detail */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            px-2
                            text-xs
                            text-slate-600
                        "
                    >
                        <span>
                            {recommendations.length} discoveries ready
                        </span>

                        <span className="text-violet-300/60">
                            Spotify connected
                        </span>
                    </div>
                </aside>
            </div>
        </section>
    );
}