import { motion } from "framer-motion";
import {
    FiBarChart2,
    FiHeart,
    FiZap,
} from "react-icons/fi";

import type {
    Insights,
} from "../types/insights";

type InsightsHeroProps = {
    insights: Insights;
};

export default function InsightsHero({
                                         insights,
                                     }: InsightsHeroProps) {
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
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-8
                py-9
                shadow-[0_30px_100px_rgba(0,0,0,0.28)]
                backdrop-blur-2xl
                lg:px-10
                lg:py-10
            "
        >
            {/* Ambient atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-28
                    h-[430px]
                    w-[430px]
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/10
                    via-violet-500/15
                    to-fuchsia-500/10
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[-120px]
                    left-[25%]
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-violet-500/[0.07]
                    blur-[100px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    grid
                    gap-10
                    lg:grid-cols-[1fr_auto]
                    lg:items-end
                "
            >
                {/* Main copy */}

                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.28em]
                            text-violet-300/75
                        "
                    >
                        <FiBarChart2 />

                        Your listening DNA
                    </div>

                    <h1
                        className="
                            mt-5
                            max-w-2xl
                            text-4xl
                            font-semibold
                            leading-[1.05]
                            tracking-tight
                            text-white
                            sm:text-5xl
                        "
                    >
                        You don&apos;t just listen.
                        <br />

                        <span
                            className="
                                bg-gradient-to-r
                                from-cyan-300
                                via-violet-300
                                to-fuchsia-300
                                bg-clip-text
                                text-transparent
                            "
                        >
                            You explore.
                        </span>
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-xl
                            text-sm
                            leading-7
                            text-slate-400
                            sm:text-base
                        "
                    >
                        Every swipe leaves a signal.
                        Here&apos;s what your discovery
                        habits are starting to say about
                        your taste.
                    </p>
                </div>

                {/* Hero metrics */}

                <div
                    className="
                        grid
                        min-w-[280px]
                        grid-cols-2
                        gap-3
                    "
                >
                    <motion.div
                        whileHover={{
                            y: -3,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
                            rounded-[22px]
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            p-5
                            backdrop-blur-xl
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
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -3,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
                            rounded-[22px]
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            p-5
                            backdrop-blur-xl
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
                            made the cut
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}