import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FiMusic,
    FiPlay,
} from "react-icons/fi";

import type {
    OnboardingProfile,
} from "../types/onboarding";

type TasteAnalysisProps = {
    profile?: OnboardingProfile;
};

const statuses = [
    {
        label:
            "Reading your listening patterns",
        description:
            "Looking at the songs and artists you return to most.",
    },
    {
        label:
            "Finding your core artists",
        description:
            "Identifying the names that define your current listening world.",
    },
    {
        label:
            "Mapping your comfort zone",
        description:
            "Understanding where your taste feels most familiar.",
    },
    {
        label:
            "Finding your discovery edges",
        description:
            "Looking for where Spotinder can push your sound next.",
    },
];

const particles = [
    {
        x: -205,
        y: -90,
        size: 5,
    },
    {
        x: 185,
        y: -120,
        size: 4,
    },
    {
        x: -230,
        y: 30,
        size: 3,
    },
    {
        x: 220,
        y: 50,
        size: 5,
    },
    {
        x: -155,
        y: 155,
        size: 4,
    },
    {
        x: 165,
        y: 165,
        size: 3,
    },
    {
        x: -55,
        y: -180,
        size: 3,
    },
    {
        x: 65,
        y: 190,
        size: 4,
    },
    {
        x: -180,
        y: 105,
        size: 3,
    },
    {
        x: 195,
        y: -25,
        size: 3,
    },
];

const notePositions = [
    {
        left: "12%",
        top: "23%",
        rotate: -12,
        scale: 0.9,
    },
    {
        left: "78%",
        top: "18%",
        rotate: 10,
        scale: 1.05,
    },
    {
        left: "20%",
        top: "68%",
        rotate: -8,
        scale: 1,
    },
    {
        left: "73%",
        top: "70%",
        rotate: 14,
        scale: 0.85,
    },
];

export default function TasteAnalysis({
                                          profile,
                                      }: TasteAnalysisProps) {
    const [
        statusIndex,
        setStatusIndex,
    ] = useState(0);

    useEffect(() => {
        const interval =
            window.setInterval(
                () => {
                    setStatusIndex(
                        (current) =>
                            Math.min(
                                current + 1,
                                statuses.length - 1,
                            ),
                    );
                },
                1500,
            );

        return () => {
            window.clearInterval(
                interval,
            );
        };
    }, []);

    const artistLabels =
        useMemo(
            () =>
                profile?.topArtists
                    .slice(0, 4) ??
                [],
            [profile],
        );

    const activeStatus =
        statuses[statusIndex];

    return (
        <div
            className="
                mx-auto
                flex
                w-full
                max-w-[980px]
                flex-col
                items-center
                text-center
            "
        >
            {/* Eyebrow */}

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
                    duration: 0.45,
                }}
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.34em]
                    text-violet-300/70
                "
            >
                Building your discovery profile
            </motion.p>

            {/* Music cloud */}

            <div
                className="
                    relative
                    mt-8
                    h-[440px]
                    w-full
                    max-w-[760px]
                "
            >
                {/* Ambient aura */}

                <motion.div
                    animate={{
                        scale: [
                            0.9,
                            1.08,
                            0.9,
                        ],
                        opacity: [
                            0.16,
                            0.34,
                            0.16,
                        ],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[300px]
                        w-[440px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-violet-500/20
                        blur-[120px]
                    "
                />

                {/* Cloud container */}

                <motion.div
                    animate={{
                        y: [
                            0,
                            -8,
                            0,
                        ],
                        x: [
                            0,
                            4,
                            0,
                        ],
                        rotate: [
                            0,
                            0.6,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        inset-0
                    "
                >
                    {/* Curved traces */}

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[220px]
                            w-[560px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rotate-[12deg]
                            rounded-[50%]
                            border
                            border-violet-300/[0.06]
                        "
                    />

                    <motion.div
                        animate={{
                            rotate: -360,
                        }}
                        transition={{
                            duration: 34,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[180px]
                            w-[500px]
                            -translate-x-1/2
                            -translate-y-1/2
                            -rotate-[14deg]
                            rounded-[50%]
                            border
                            border-cyan-300/[0.05]
                        "
                    />

                    {/* Floating notes */}

                    {notePositions.map(
                        (
                            note,
                            index,
                        ) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity:
                                        0.45 +
                                        index *
                                        0.08,
                                    scale:
                                    note.scale,
                                    y: [
                                        0,
                                        index % 2 ===
                                        0
                                            ? -8
                                            : 8,
                                        0,
                                    ],
                                    rotate: [
                                        note.rotate,
                                        note.rotate +
                                        (index %
                                        2 ===
                                        0
                                            ? 4
                                            : -4),
                                        note.rotate,
                                    ],
                                }}
                                transition={{
                                    opacity: {
                                        delay:
                                            0.1 +
                                            index *
                                            0.08,
                                        duration:
                                            0.45,
                                    },
                                    y: {
                                        duration:
                                            3.5 +
                                            index *
                                            0.5,
                                        repeat:
                                        Infinity,
                                        ease:
                                            "easeInOut",
                                    },
                                    rotate: {
                                        duration:
                                            4 +
                                            index *
                                            0.4,
                                        repeat:
                                        Infinity,
                                        ease:
                                            "easeInOut",
                                    },
                                }}
                                style={{
                                    left:
                                    note.left,
                                    top:
                                    note.top,
                                }}
                                className={`
                                    absolute
                                    ${
                                    index %
                                    2 ===
                                    0
                                        ? "text-cyan-200"
                                        : "text-violet-200"
                                }
                                `}
                            >
                                <FiMusic
                                    className="
                                        h-7
                                        w-7
                                        drop-shadow-[0_0_10px_rgba(196,181,253,0.45)]
                                    "
                                />
                            </motion.div>
                        ),
                    )}

                    {/* Play fragments */}

                    <motion.div
                        animate={{
                            y: [
                                0,
                                -6,
                                0,
                            ],
                            opacity: [
                                0.3,
                                0.7,
                                0.3,
                            ],
                        }}
                        transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            left-[30%]
                            top-[28%]
                            text-fuchsia-200/70
                        "
                    >
                        <FiPlay />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [
                                0,
                                6,
                                0,
                            ],
                            opacity: [
                                0.25,
                                0.55,
                                0.25,
                            ],
                        }}
                        transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            right-[28%]
                            bottom-[24%]
                            text-cyan-200/70
                        "
                    >
                        <FiPlay />
                    </motion.div>

                    {/* Waveforms */}

                    <Waveform
                        className="
                            left-[15%]
                            top-[45%]
                        "
                    />

                    <Waveform
                        className="
                            right-[14%]
                            top-[38%]
                        "
                        reverse
                    />

                    {/* Discovery particles */}

                    {particles.map(
                        (
                            particle,
                            index,
                        ) => (
                            <motion.span
                                key={index}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    x: 0,
                                    y: 0,
                                }}
                                animate={{
                                    opacity:
                                        0.35 +
                                        (index %
                                            3) *
                                        0.16,
                                    scale: 1,
                                    x:
                                    particle.x,
                                    y:
                                    particle.y,
                                }}
                                transition={{
                                    delay:
                                        0.1 +
                                        index *
                                        0.06,
                                    duration: 0.8,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                style={{
                                    width:
                                    particle.size,
                                    height:
                                    particle.size,
                                }}
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full

                                    ${
                                    index %
                                    3 ===
                                    0
                                        ? `
                                                bg-cyan-200
                                                shadow-[0_0_14px_rgba(165,243,252,0.8)]
                                            `
                                        : index %
                                        3 ===
                                        1
                                            ? `
                                                bg-violet-200
                                                shadow-[0_0_14px_rgba(196,181,253,0.8)]
                                            `
                                            : `
                                                bg-fuchsia-200
                                                shadow-[0_0_14px_rgba(245,208,254,0.7)]
                                            `
                                }
                                `}
                            />
                        ),
                    )}

                    {/* Real artists appear after data resolves */}

                    <AnimatePresence>
                        {artistLabels.length >
                            0 && (
                                <>
                                    {artistLabels.map(
                                        (
                                            artist,
                                            index,
                                        ) => {
                                            const positions =
                                                [
                                                    "left-[42%] top-[7%]",
                                                    "right-[5%] top-[48%]",
                                                    "left-[45%] bottom-[3%]",
                                                    "left-[2%] top-[54%]",
                                                ];

                                            return (
                                                <motion.span
                                                    key={
                                                        artist
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                        filter:
                                                            "blur(6px)",
                                                    }}
                                                    animate={{
                                                        opacity:
                                                            0.45,
                                                        scale: 1,
                                                        filter:
                                                            "blur(0px)",
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.2 +
                                                            index *
                                                            0.08,
                                                        duration:
                                                            0.5,
                                                    }}
                                                    className={`
                                                    absolute
                                                    text-[8px]
                                                    font-medium
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-slate-500
                                                    ${positions[index]}
                                                `}
                                                >
                                                    {
                                                        artist
                                                    }
                                                </motion.span>
                                            );
                                        },
                                    )}
                                </>
                            )}
                    </AnimatePresence>

                    {/* Center identity */}

                    <motion.div
                        animate={{
                            scale: [
                                1,
                                1.08,
                                1,
                            ],
                            boxShadow: [
                                "0 0 24px rgba(139,92,246,0.12)",
                                "0 0 52px rgba(139,92,246,0.30)",
                                "0 0 24px rgba(139,92,246,0.12)",
                            ],
                        }}
                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            flex
                            h-[104px]
                            w-[104px]
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-[#101724]/90
                            backdrop-blur-xl
                        "
                    >
                        <motion.div
                            animate={{
                                rotate: [
                                    45,
                                    135,
                                    225,
                                    405,
                                ],
                                scale: [
                                    1,
                                    1.15,
                                    1,
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                h-3
                                w-3
                                bg-gradient-to-br
                                from-cyan-200
                                via-violet-200
                                to-fuchsia-200
                                shadow-[0_0_24px_rgba(196,181,253,0.9)]
                            "
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Live status */}

            <div
                className="
                    flex
                    min-h-[78px]
                    flex-col
                    items-center
                    justify-center
                "
            >
                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={
                            activeStatus.label
                        }
                        initial={{
                            opacity: 0,
                            y: 8,
                            filter:
                                "blur(5px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter:
                                "blur(0px)",
                        }}
                        exit={{
                            opacity: 0,
                            y: -8,
                            filter:
                                "blur(5px)",
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                        className="
                            text-center
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-3
                            "
                        >
                            <motion.span
                                animate={{
                                    scale: [
                                        1,
                                        1.45,
                                        1,
                                    ],
                                    opacity: [
                                        0.35,
                                        1,
                                        0.35,
                                    ],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-cyan-300
                                    shadow-[0_0_12px_rgba(103,232,249,0.8)]
                                "
                            />

                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.22em]
                                    text-slate-300
                                "
                            >
                                {
                                    activeStatus.label
                                }
                            </p>
                        </div>

                        <p
                            className="
                                mt-3
                                text-xs
                                text-slate-600
                            "
                        >
                            {
                                activeStatus.description
                            }
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress */}

            <div
                className="
                    mt-5
                    flex
                    items-center
                    gap-3
                "
            >
                {statuses.map(
                    (
                        status,
                        index,
                    ) => (
                        <motion.span
                            key={
                                status.label
                            }
                            animate={{
                                scale:
                                    index ===
                                    statusIndex
                                        ? 1.25
                                        : 1,

                                opacity:
                                    index <=
                                    statusIndex
                                        ? 1
                                        : 0.25,
                            }}
                            className={`
                                h-1.5
                                w-1.5
                                rounded-full

                                ${
                                index <=
                                statusIndex
                                    ? "bg-violet-300"
                                    : "bg-slate-700"
                            }
                            `}
                        />
                    ),
                )}
            </div>

            <AnimatePresence>
                {profile && (
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 6,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.45,
                        }}
                        className="
                            mt-5
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.24em]
                            text-violet-300/45
                        "
                    >
                        Your profile is taking shape
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

type WaveformProps = {
    className: string;
    reverse?: boolean;
};

function Waveform({
                      className,
                      reverse = false,
                  }: WaveformProps) {
    const heights =
        reverse
            ? [
                10,
                22,
                14,
                30,
                18,
            ]
            : [
                18,
                30,
                14,
                24,
                10,
            ];

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 0.55,
            }}
            transition={{
                delay: 0.35,
                duration: 0.45,
            }}
            className={`
                absolute
                flex
                h-8
                items-center
                gap-[3px]
                ${className}
            `}
        >
            {heights.map(
                (
                    height,
                    index,
                ) => (
                    <motion.span
                        key={index}
                        animate={{
                            height: [
                                height,
                                Math.min(
                                    height *
                                    1.55,
                                    34,
                                ),
                                height,
                            ],
                        }}
                        transition={{
                            duration:
                                0.8 +
                                index *
                                0.11,
                            repeat:
                            Infinity,
                            ease:
                                "easeInOut",
                        }}
                        style={{
                            height,
                        }}
                        className="
                            w-[2px]
                            rounded-full
                            bg-gradient-to-t
                            from-cyan-300/30
                            to-violet-200/80
                            shadow-[0_0_8px_rgba(165,243,252,0.25)]
                        "
                    />
                ),
            )}
        </motion.div>
    );
}