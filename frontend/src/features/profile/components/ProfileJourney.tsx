import { motion } from "framer-motion";
import {
    FiHeart,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";

import type {
    Insights,
} from "@/features/insights/types/insights";

type ProfileJourneyProps = {
    insights: Insights;
};

function getPersonality(
    likeRatio: number,
) {
    if (likeRatio >= 80) {
        return {
            title: "The Open Ear",
            description:
                "You find something to love almost everywhere you explore.",
        };
    }

    if (likeRatio >= 60) {
        return {
            title: "The Explorer",
            description:
                "Curiosity keeps pulling you beyond the obvious.",
        };
    }

    if (likeRatio >= 40) {
        return {
            title: "The Curator",
            description:
                "You explore widely, but only the right tracks stay.",
        };
    }

    if (likeRatio >= 20) {
        return {
            title: "The Selective",
            description:
                "You know what works for you, and every right swipe earns its place.",
        };
    }

    return {
        title: "The Critic",
        description:
            "Hard to impress. Every discovery has to prove itself.",
    };
}

export default function ProfileJourney({
                                           insights,
                                       }: ProfileJourneyProps) {
    const personality =
        getPersonality(
            insights.likeRatio,
        );

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: 0.28,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                relative
                mt-6
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-8
                backdrop-blur-2xl
                lg:p-10
            "
        >
            {/* Atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-[360px]
                    w-[360px]
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/[0.07]
                    via-violet-500/[0.12]
                    to-fuchsia-500/[0.07]
                    blur-[110px]
                "
            />

            <div className="relative z-10">
                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-[0.24em]
                                text-violet-300/70
                            "
                        >
                            Your Spotinder journey
                        </p>

                        <h2
                            className="
                                mt-2
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            Your discovery story so far.
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-xl
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            A quick snapshot of how you&apos;ve
                            been exploring and shaping your taste.
                        </p>
                    </div>

                    <div
                        className="
                            rounded-full
                            border
                            border-violet-400/15
                            bg-violet-400/[0.06]
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-violet-200
                        "
                    >
                        {personality.title}
                    </div>
                </div>

                {/* Stats */}

                <div
                    className="
                        mt-8
                        grid
                        gap-3
                        md:grid-cols-3
                    "
                >
                    <div
                        className="
                            rounded-[22px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-cyan-400/15
                                bg-cyan-400/[0.07]
                                text-cyan-300
                            "
                        >
                            <FiZap />
                        </div>

                        <p
                            className="
                                mt-5
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {insights.totalSwipes}
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            tracks explored
                        </p>
                    </div>

                    <div
                        className="
                            rounded-[22px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-emerald-400/15
                                bg-emerald-400/[0.07]
                                text-emerald-300
                            "
                        >
                            <FiHeart />
                        </div>

                        <p
                            className="
                                mt-5
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {insights.songsLiked}
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            discoveries liked
                        </p>
                    </div>

                    <div
                        className="
                            rounded-[22px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-400/15
                                bg-violet-400/[0.07]
                                text-violet-300
                            "
                        >
                            <FiTrendingUp />
                        </div>

                        <p
                            className="
                                mt-5
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {
                                insights.discoveryScore
                            }
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            discovery score
                        </p>
                    </div>
                </div>

                {/* Personality summary */}

                <div
                    className="
                        mt-4
                        flex
                        flex-col
                        gap-4
                        rounded-[24px]
                        border
                        border-white/[0.06]
                        bg-white/[0.02]
                        px-6
                        py-5
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-[0.2em]
                                text-slate-600
                            "
                        >
                            Discovery personality
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            {personality.title}
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {personality.description}
                        </p>
                    </div>

                    <div
                        className="
                            min-w-[180px]
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                text-xs
                            "
                        >
                            <span className="text-slate-600">
                                Openness
                            </span>

                            <span className="text-violet-300">
                                {
                                    insights.discoveryScore
                                }
                                %
                            </span>
                        </div>

                        <div
                            className="
                                mt-2
                                h-1.5
                                overflow-hidden
                                rounded-full
                                bg-white/[0.07]
                            "
                        >
                            <motion.div
                                initial={{
                                    width: 0,
                                }}
                                animate={{
                                    width: `${Math.min(
                                        Math.max(
                                            insights.discoveryScore,
                                            0,
                                        ),
                                        100,
                                    )}%`,
                                }}
                                transition={{
                                    delay: 0.55,
                                    duration: 1,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
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
                </div>
            </div>
        </motion.section>
    );
}