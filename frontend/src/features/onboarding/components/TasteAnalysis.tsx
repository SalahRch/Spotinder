import { motion } from "framer-motion";

const analysisSteps = [
    "Reading your listening patterns",
    "Mapping your comfort zone",
    "Finding your discovery edges",
];

export default function TasteAnalysis() {
    return (
        <div
            className="
                mx-auto
                flex
                w-full
                max-w-[760px]
                flex-col
                items-center
                text-center
            "
        >
            {/* eyebrow */}

            <motion.p
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                    text-violet-300/70
                "
            >
                Building your discovery profile
            </motion.p>

            {/* central visual */}

            <div
                className="
                    relative
                    mt-12
                    flex
                    h-[260px]
                    w-[260px]
                    items-center
                    justify-center
                "
            >
                {/* ambient glow */}

                <motion.div
                    animate={{
                        scale: [
                            0.9,
                            1.08,
                            0.9,
                        ],
                        opacity: [
                            0.25,
                            0.55,
                            0.25,
                        ],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        h-[200px]
                        w-[200px]
                        rounded-full
                        bg-violet-500/20
                        blur-[70px]
                    "
                />

                {/* outer orbit */}

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        h-[220px]
                        w-[220px]
                        rounded-full
                        border
                        border-violet-300/[0.10]
                    "
                >
                    <div
                        className="
                            absolute
                            left-1/2
                            top-[-4px]
                            h-2
                            w-2
                            -translate-x-1/2
                            rounded-full
                            bg-violet-200
                            shadow-[0_0_18px_rgba(196,181,253,0.9)]
                        "
                    />
                </motion.div>

                {/* middle orbit */}

                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        h-[165px]
                        w-[165px]
                        rounded-full
                        border
                        border-cyan-300/[0.09]
                    "
                >
                    <div
                        className="
                            absolute
                            right-[8px]
                            top-[22px]
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-cyan-200
                            shadow-[0_0_16px_rgba(165,243,252,0.85)]
                        "
                    />
                </motion.div>

                {/* inner ring */}

                <motion.div
                    animate={{
                        scale: [
                            1,
                            1.06,
                            1,
                        ],
                    }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        h-[105px]
                        w-[105px]
                        rounded-full
                        border
                        border-fuchsia-300/[0.08]
                    "
                />

                {/* center */}

                <motion.div
                    animate={{
                        scale: [
                            1,
                            1.15,
                            1,
                        ],
                        opacity: [
                            0.75,
                            1,
                            0.75,
                        ],
                    }}
                    transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        relative
                        flex
                        h-[72px]
                        w-[72px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-[#111827]/90
                        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                        backdrop-blur-xl
                    "
                >
                    <div
                        className="
                            h-2.5
                            w-2.5
                            rotate-45
                            bg-gradient-to-br
                            from-cyan-200
                            to-violet-300
                            shadow-[0_0_24px_rgba(196,181,253,0.85)]
                        "
                    />
                </motion.div>
            </div>

            {/* title */}

            <motion.h1
                initial={{
                    opacity: 0,
                    y: 14,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.12,
                    duration: 0.6,
                }}
                className="
                    mt-4
                    bg-gradient-to-r
                    from-cyan-100
                    via-white
                    to-violet-200
                    bg-clip-text
                    text-4xl
                    font-semibold
                    tracking-[-0.055em]
                    text-transparent
                    md:text-5xl
                "
            >
                Mapping your taste.
            </motion.h1>

            <motion.p
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.2,
                    duration: 0.55,
                }}
                className="
                    mt-4
                    max-w-lg
                    text-sm
                    leading-7
                    text-slate-500
                "
            >
                Spotinder is reading the music
                already in your orbit and finding
                where your next discoveries can begin.
            </motion.p>

            {/* analysis steps */}

            <div
                className="
                    mt-10
                    grid
                    w-full
                    max-w-[620px]
                    gap-3
                    md:grid-cols-3
                "
            >
                {analysisSteps.map(
                    (
                        step,
                        index,
                    ) => (
                        <motion.div
                            key={step}
                            initial={{
                                opacity: 0,
                                y: 12,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay:
                                    0.32 +
                                    index *
                                    0.12,
                                duration: 0.45,
                            }}
                            className="
                                rounded-[18px]
                                border
                                border-white/[0.06]
                                bg-white/[0.025]
                                px-4
                                py-4
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-violet-300
                                    shadow-[0_0_10px_rgba(196,181,253,0.7)]
                                "
                            />

                            <p
                                className="
                                    mt-3
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-500
                                "
                            >
                                {step}
                            </p>
                        </motion.div>
                    ),
                )}
            </div>

            {/* loading indicator */}

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.7,
                }}
                className="
                    mt-9
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                "
            >
                <motion.span
                    animate={{
                        opacity: [
                            0.3,
                            1,
                            0.3,
                        ],
                    }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-300
                    "
                />

                Analyzing your Spotify profile
            </motion.div>
        </div>
    );
}