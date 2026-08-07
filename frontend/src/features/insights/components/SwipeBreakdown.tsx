import { motion } from "framer-motion";
import {
    FiHeart,
    FiX,
} from "react-icons/fi";

import type {
    Insights,
} from "../types/insights";

type SwipeBreakdownProps = {
    insights: Insights;
};

export default function SwipeBreakdown({
                                           insights,
                                       }: SwipeBreakdownProps) {
    const likedPercentage =
        Math.min(
            Math.max(
                insights.likeRatio,
                0,
            ),
            100,
        );

    const passedPercentage =
        100 - likedPercentage;

    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                relative
                min-h-[390px]
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-8
                backdrop-blur-xl
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    top-10
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-400/[0.06]
                    blur-[100px]
                "
            />

            <div className="relative z-10">
                <p
                    className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.24em]
                        text-violet-300/70
                    "
                >
                    Your decisions
                </p>

                <div
                    className="
                        mt-3
                        flex
                        items-end
                        justify-between
                        gap-6
                    "
                >
                    <div>
                        <p
                            className="
                                text-5xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {insights.likeRatio}
                            <span
                                className="
                                    ml-1
                                    text-2xl
                                    text-slate-500
                                "
                            >
                                %
                            </span>
                        </p>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-400
                            "
                        >
                            of discoveries made
                            the cut
                        </p>
                    </div>

                    <span
                        className="
                            rounded-full
                            border
                            border-emerald-400/15
                            bg-emerald-400/[0.06]
                            px-3
                            py-1.5
                            text-xs
                            text-emerald-300
                        "
                    >
                        Like rate
                    </span>
                </div>

                {/* Split bar */}

                <div className="mt-9">
                    <div
                        className="
                            flex
                            h-3
                            overflow-hidden
                            rounded-full
                            bg-white/[0.05]
                        "
                    >
                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: `${likedPercentage}%`,
                            }}
                            transition={{
                                delay: 0.4,
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
                                bg-gradient-to-r
                                from-cyan-400
                                to-emerald-400
                            "
                        />

                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: `${passedPercentage}%`,
                            }}
                            transition={{
                                delay: 0.5,
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
                                bg-gradient-to-r
                                from-violet-500/70
                                to-rose-400/70
                            "
                        />
                    </div>

                    <div
                        className="
                            mt-3
                            flex
                            justify-between
                            text-xs
                            text-slate-500
                        "
                    >
                        <span>Liked</span>
                        <span>Passed</span>
                    </div>
                </div>

                {/* Numbers */}

                <div
                    className="
                        mt-9
                        grid
                        grid-cols-2
                        gap-3
                    "
                >
                    <div
                        className="
                            rounded-[20px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-emerald-300
                            "
                        >
                            <FiHeart />

                            <span className="text-xs">
                                Liked
                            </span>
                        </div>

                        <p
                            className="
                                mt-4
                                text-3xl
                                font-semibold
                                text-white
                            "
                        >
                            {insights.songsLiked}
                        </p>
                    </div>

                    <div
                        className="
                            rounded-[20px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-rose-300
                            "
                        >
                            <FiX />

                            <span className="text-xs">
                                Passed
                            </span>
                        </div>

                        <p
                            className="
                                mt-4
                                text-3xl
                                font-semibold
                                text-white
                            "
                        >
                            {insights.songsPassed}
                        </p>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}