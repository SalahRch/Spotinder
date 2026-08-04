import {
    FiHeart,
    FiRefreshCw,
    FiSliders,
    FiX,
} from "react-icons/fi";

import { useAuth } from "@/features/auth/hooks/useAuth";

import AmbientBackground from "../components/AmbientBackground";

import toast from "react-hot-toast";

import { useRecommendations } from "../hooks/useRecommendations";
import { useRecordSwipe } from "../hooks/useRecordSwipe";

import type { SwipeDirection } from "../components/DiscoverySwipeCard";

import DiscoverySwipeDeck, {
    type DiscoverySwipeDeckHandle
} from "@/features/discovery/components/DiscoverySwipeDeck.tsx";
import {useRef} from "react";
import type {Recommendation} from "@/features/discovery/types/discovery.ts";

export default function DiscoverPage() {
    const { user } = useAuth();

    const swipeDeckRef =
        useRef<DiscoverySwipeDeckHandle>(null);

    const {
        data: recommendations = [],
        isLoading: recommendationsLoading,
        isError: recommendationsError,
        refetch: refetchRecommendations,
    } = useRecommendations();

    const recordSwipe = useRecordSwipe();

    const handleSwipe = async (
        direction: SwipeDirection,
        recommendation: Recommendation,
    ) => {
        const apiDirection =
            direction === "right"
                ? "RIGHT"
                : "LEFT";

        try {
            await recordSwipe.mutateAsync({
                spotifyTrackId: recommendation.id,
                direction: apiDirection,
                blindMode: false,
            });
        } catch {
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
                flex
                min-h-[calc(100vh-96px)]
                items-center
                justify-center
                rounded-[36px]
                border
                border-white/[0.06]
                bg-[#0B0F17]/70
                text-white
            "
            >
                <div className="text-center">
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
                flex
                min-h-[calc(100vh-96px)]
                items-center
                justify-center
                rounded-[36px]
                border
                border-white/[0.06]
                bg-[#0B0F17]/70
                px-6
                text-center
                text-white
            "
            >
                <div>
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
                min-h-[calc(100vh-96px)]
                overflow-hidden
                rounded-[36px]
                border
                border-white/[0.06]
                bg-[#0B0F17]/70
            "
        >
            <AmbientBackground />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[calc(100vh-96px)]
                    max-w-7xl
                    flex-col
                    px-6
                    py-8
                    lg:px-10
                "
            >
                <header
                    className="
                        flex
                        flex-col
                        gap-5
                        lg:flex-row
                        lg:items-start
                        lg:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-sm
                                font-medium
                                uppercase
                                tracking-[0.22em]
                                text-violet-300/70
                            "
                        >
                            Daily discovery
                        </p>

                        <h1
                            className="
                                mt-3
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-slate-100
                                md:text-4xl
                            "
                        >
                            Good evening, {user?.displayName ?? "explorer"}.
                        </h1>

                        <p className="mt-3 text-slate-400">
                            Ready to find something you’ve never heard before?
                        </p>
                    </div>

                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            py-2.5
                            text-sm
                            text-slate-300
                            backdrop-blur-xl
                        "
                    >
                        <FiSliders className="text-violet-300" />

                        Adventure

                        <span className="font-medium text-white">
                            {user?.adventureLevel ?? 50}%
                        </span>
                    </div>
                </header>

                <div
                    className="
        flex
        flex-1
        flex-col
        items-center
        justify-start
        pb-6
        pt-8
    "
                >


                    <DiscoverySwipeDeck
                        ref={swipeDeckRef}
                        recommendations={recommendations}
                        blindMode={false}
                        onSwipe={handleSwipe}
                    />


                    <div
                        className="
                            mt-7
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
                                bg-rose-400/5
                                text-xl
                                text-rose-300
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
                            aria-label="Replay preview"
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
                                hover:border-white/20
                                hover:bg-white/10
                                hover:text-white
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
                                bg-emerald-400/5
                                text-xl
                                text-emerald-300
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

                    <p className="mt-4 text-xs text-slate-500">
                        Drag the card or use the controls
                    </p>
                </div>

                <footer
                    className="
                        flex
                        flex-col
                        gap-5
                        border-t
                        border-white/[0.06]
                        pt-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <button
                        type="button"
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            py-2.5
                            text-sm
                            text-slate-300
                            transition
                            hover:border-violet-400/30
                            hover:bg-white/10
                        "
                    >
                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-slate-500
                            "
                        />

                        Blind Discovery
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">
                            Comfort zone
                        </span>

                        <div
                            className="
                                relative
                                h-1.5
                                w-36
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
                                    border-[#0B0F17]
                                    bg-white
                                    shadow-lg
                                "
                            />
                        </div>

                        <span className="text-xs text-slate-500">
                            Explore
                        </span>
                    </div>
                </footer>
            </div>
        </section>
    );
}