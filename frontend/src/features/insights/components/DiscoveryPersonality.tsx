import { motion } from "framer-motion";
import {
    FiCompass,
    FiStar,
} from "react-icons/fi";

import type {
    Insights,
} from "../types/insights";

type DiscoveryPersonalityProps = {
    insights: Insights;
};

type Personality = {
    title: string;
    eyebrow: string;
    description: string;
    traits: string[];
};

function getPersonality(
    likeRatio: number,
): Personality {
    if (likeRatio >= 80) {
        return {
            title: "The Open Ear",
            eyebrow: "You find beauty everywhere",
            description:
                "You rarely shut the door on a new sound. Curiosity leads, and your collection grows wherever the music takes you.",
            traits: [
                "Open",
                "Curious",
                "Spontaneous",
            ],
        };
    }

    if (likeRatio >= 60) {
        return {
            title: "The Explorer",
            eyebrow: "Curiosity leads the way",
            description:
                "You give unfamiliar sounds a real chance. You know what works for you, but you’re always willing to wander beyond the obvious.",
            traits: [
                "Curious",
                "Open",
                "Balanced",
            ],
        };
    }

    if (likeRatio >= 40) {
        return {
            title: "The Curator",
            eyebrow: "Every track has to earn its place",
            description:
                "You explore widely, but you don’t keep everything. Your collection is shaped by intention rather than impulse.",
            traits: [
                "Selective",
                "Measured",
                "Intentional",
            ],
        };
    }

    if (likeRatio >= 20) {
        return {
            title: "The Selective",
            eyebrow: "Your taste has sharp edges",
            description:
                "You know what you’re looking for. New music gets a chance, but only the strongest discoveries survive the swipe.",
            traits: [
                "Focused",
                "Selective",
                "Precise",
            ],
        };
    }

    return {
        title: "The Critic",
        eyebrow: "Hard to impress",
        description:
            "You hold every discovery to a high standard. A right swipe from you means the track truly earned it.",
        traits: [
            "Demanding",
            "Precise",
            "Distinct",
        ],
    };
}

export default function DiscoveryPersonality({
                                                 insights,
                                             }: DiscoveryPersonalityProps) {
    const personality =
        getPersonality(
            insights.likeRatio,
        );

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 24,
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
                px-8
                py-9
                shadow-[0_30px_100px_rgba(0,0,0,0.22)]
                backdrop-blur-2xl
                lg:px-10
                lg:py-10
            "
        >
            {/* Atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-24
                    h-[430px]
                    w-[430px]
                    rounded-full
                    bg-gradient-to-br
                    from-violet-500/[0.12]
                    via-fuchsia-500/[0.08]
                    to-cyan-400/[0.08]
                    blur-[120px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[-160px]
                    left-[25%]
                    h-[320px]
                    w-[320px]
                    rounded-full
                    bg-cyan-400/[0.05]
                    blur-[120px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    grid
                    gap-12
                    lg:grid-cols-[1fr_420px]
                    lg:items-center
                "
            >
                {/* Copy */}

                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.26em]
                            text-violet-300/70
                        "
                    >
                        <FiStar />

                        Your discovery personality
                    </div>

                    <p
                        className="
                            mt-7
                            text-sm
                            font-medium
                            text-cyan-300/80
                        "
                    >
                        {personality.eyebrow}
                    </p>

                    <h2
                        className="
                            mt-2
                            text-4xl
                            font-semibold
                            leading-none
                            tracking-tight
                            text-white
                            sm:text-5xl
                        "
                    >
                        The
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
                            {personality.title.replace(
                                "The ",
                                "",
                            )}
                        </span>
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-sm
                            leading-7
                            text-slate-400
                            sm:text-base
                        "
                    >
                        {
                            personality.description
                        }
                    </p>

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            gap-2
                        "
                    >
                        {personality.traits.map(
                            (trait) => (
                                <span
                                    key={
                                        trait
                                    }
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        px-3.5
                                        py-2
                                        text-xs
                                        text-slate-300
                                        backdrop-blur-xl
                                    "
                                >
                                    {trait}
                                </span>
                            ),
                        )}
                    </div>

                    <div
                        className="
                            mt-8
                            max-w-md
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
                            <span className="text-slate-500">
                                Discovery openness
                            </span>

                            <span className="font-medium text-violet-300">
                                {
                                    insights.discoveryScore
                                }
                                %
                            </span>
                        </div>

                        <div
                            className="
                                mt-3
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
                                    duration: 1.1,
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

                {/* Visual */}

                <div
                    className="
                        relative
                        hidden
                        h-[340px]
                        lg:block
                    "
                >
                    {/* Main orbit */}

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 24,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[270px]
                            w-[270px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-violet-400/20
                        "
                    >
                        <div
                            className="
                                absolute
                                left-1/2
                                top-[-6px]
                                h-3
                                w-3
                                -translate-x-1/2
                                rounded-full
                                bg-cyan-300
                                shadow-[0_0_25px_rgba(103,232,249,0.7)]
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-6
                                right-5
                                h-2.5
                                w-2.5
                                rounded-full
                                bg-fuchsia-300
                                shadow-[0_0_20px_rgba(232,121,249,0.6)]
                            "
                        />
                    </motion.div>

                    {/* Inner orbit */}

                    <motion.div
                        animate={{
                            rotate: -360,
                        }}
                        transition={{
                            duration: 17,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[190px]
                            w-[190px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-cyan-400/15
                        "
                    >
                        <div
                            className="
                                absolute
                                right-3
                                top-8
                                h-2
                                w-2
                                rounded-full
                                bg-violet-300
                                shadow-[0_0_18px_rgba(167,139,250,0.7)]
                            "
                        />
                    </motion.div>

                    {/* Center */}

                    <motion.div
                        animate={{
                            scale: [
                                1,
                                1.06,
                                1,
                            ],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            flex
                            h-28
                            w-28
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.09]
                            bg-[#111827]/75
                            shadow-[0_0_70px_rgba(139,92,246,0.15)]
                            backdrop-blur-2xl
                        "
                    >
                        <div className="text-center">
                            <FiCompass className="mx-auto text-xl text-violet-300" />

                            <p
                                className="
                                    mt-2
                                    text-2xl
                                    font-semibold
                                    text-white
                                "
                            >
                                {
                                    insights.discoveryScore
                                }
                            </p>

                            <p
                                className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-600
                                "
                            >
                                openness
                            </p>
                        </div>
                    </motion.div>

                    {/* Floating labels */}

                    <motion.div
                        animate={{
                            y: [
                                0,
                                -7,
                                0,
                            ],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            left-2
                            top-16
                            rounded-full
                            border
                            border-white/[0.07]
                            bg-white/[0.03]
                            px-3
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                            backdrop-blur-xl
                        "
                    >
                        Curious
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [
                                0,
                                6,
                                0,
                            ],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            bottom-14
                            right-0
                            rounded-full
                            border
                            border-white/[0.07]
                            bg-white/[0.03]
                            px-3
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                            backdrop-blur-xl
                        "
                    >
                        Open
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [
                                0,
                                -5,
                                0,
                            ],
                        }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            bottom-4
                            left-16
                            rounded-full
                            border
                            border-white/[0.07]
                            bg-white/[0.03]
                            px-3
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                            backdrop-blur-xl
                        "
                    >
                        Balanced
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}