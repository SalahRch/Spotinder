import { motion } from "framer-motion";

type DiscoveryPersona =
    | "WILDCARD"
    | "EXPLORER"
    | "PURIST"
    | "ROMANTIC"
    | "CURATOR"
    | "WANDERER";

type JourneyPersonaAtmosphereProps = {
    persona: DiscoveryPersona;
};

export default function JourneyPersonaAtmosphere({
                                                     persona,
                                                 }: JourneyPersonaAtmosphereProps) {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            "
        >
            <PersonaGlow persona={persona} />

            {persona === "ROMANTIC" && (
                <RomanticMotif />
            )}

            {persona === "WANDERER" && (
                <WandererMotif />
            )}

            {persona === "EXPLORER" && (
                <ExplorerMotif />
            )}

            {persona === "PURIST" && (
                <PuristMotif />
            )}

            {persona === "CURATOR" && (
                <CuratorMotif />
            )}

            {persona === "WILDCARD" && (
                <WildcardMotif />
            )}
        </div>
    );
}

/* =========================================================
   PERSONA GLOW
   Shared atmospheric foundation.
   Color changes depending on persona.
   ========================================================= */

function PersonaGlow({
                         persona,
                     }: {
    persona: DiscoveryPersona;
}) {
    const glowClass =
        {
            ROMANTIC:
                "from-fuchsia-500/[0.16] via-violet-500/[0.11] to-transparent",

            WANDERER:
                "from-violet-500/[0.15] via-cyan-500/[0.10] to-transparent",

            EXPLORER:
                "from-cyan-500/[0.14] via-violet-500/[0.10] to-transparent",

            PURIST:
                "from-slate-300/[0.08] via-cyan-300/[0.07] to-transparent",

            CURATOR:
                "from-violet-400/[0.13] via-fuchsia-400/[0.09] to-transparent",

            WILDCARD:
                "from-fuchsia-500/[0.16] via-cyan-400/[0.12] to-transparent",
        }[persona];

    return (
        <motion.div
            animate={{
                scale: [
                    0.96,
                    1.06,
                    0.96,
                ],
                opacity: [
                    0.55,
                    0.9,
                    0.55,
                ],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={`
                absolute
                left-1/2
                top-1/2
                h-[560px]
                w-[780px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-r
                blur-[145px]
                ${glowClass}
            `}
        />
    );
}

/* =========================================================
   ROMANTIC
   Identity:
   Connection, emotion, two melodies finding each other.

   Two flowing musical paths intertwine around the card.
   ========================================================= */

function RomanticMotif() {
    return (
        <>
            {/* LEFT INTERTWINING MELODY */}

            <motion.svg
                viewBox="0 0 420 420"
                fill="none"
                animate={{
                    y: [
                        0,
                        -8,
                        0,
                    ],
                    opacity: [
                        0.55,
                        0.9,
                        0.55,
                    ],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -left-[2%]
                    top-[17%]
                    h-[430px]
                    w-[430px]
                    overflow-visible
                "
            >
                <path
                    d="
                        M 10 80
                        C 120 20, 180 160, 250 210
                        C 310 255, 340 310, 410 350
                    "
                    stroke="rgba(244,114,182,0.34)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />

                <path
                    d="
                        M 15 345
                        C 105 300, 165 235, 245 210
                        C 320 185, 345 105, 410 70
                    "
                    stroke="rgba(196,181,253,0.31)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />

                {/* Soft glow behind the paths */}

                <path
                    d="
                        M 10 80
                        C 120 20, 180 160, 250 210
                        C 310 255, 340 310, 410 350
                    "
                    stroke="rgba(244,114,182,0.10)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />

                <path
                    d="
                        M 15 345
                        C 105 300, 165 235, 245 210
                        C 320 185, 345 105, 410 70
                    "
                    stroke="rgba(196,181,253,0.09)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
            </motion.svg>

            {/* RIGHT INTERTWINING MELODY */}

            <motion.svg
                viewBox="0 0 420 420"
                fill="none"
                animate={{
                    y: [
                        0,
                        8,
                        0,
                    ],
                    opacity: [
                        0.5,
                        0.82,
                        0.5,
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -right-[2%]
                    top-[22%]
                    h-[420px]
                    w-[420px]
                    rotate-180
                    overflow-visible
                "
            >
                <path
                    d="
                        M 10 80
                        C 120 20, 180 160, 250 210
                        C 310 255, 340 310, 410 350
                    "
                    stroke="rgba(232,121,249,0.28)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />

                <path
                    d="
                        M 15 345
                        C 105 300, 165 235, 245 210
                        C 320 185, 345 105, 410 70
                    "
                    stroke="rgba(196,181,253,0.26)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />
            </motion.svg>

            <PulsePoint
                left="18%"
                top="36%"
                color="pink"
            />

            <PulsePoint
                left="82%"
                top="62%"
                color="violet"
                delay={0.8}
            />

            {/* Small symbolic accent */}

            <motion.div
                animate={{
                    opacity: [
                        0.28,
                        0.58,
                        0.28,
                    ],
                    scale: [
                        1,
                        1.08,
                        1,
                    ],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    bottom-[14%]
                    left-[19%]
                    text-[19px]
                    font-light
                    text-fuchsia-200/40
                "
            >
                ♡
            </motion.div>
        </>
    );
}

/* =========================================================
   WANDERER
   Identity:
   Movement, wandering, letting the journey choose the path.

   Continuous route + waypoints + destination.
   ========================================================= */

function WandererMotif() {
    return (
        <>
            <motion.svg
                viewBox="0 0 1400 700"
                preserveAspectRatio="none"
                fill="none"
                animate={{
                    opacity: [
                        0.55,
                        0.9,
                        0.55,
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    inset-[4%]
                    h-[92%]
                    w-[92%]
                "
            >
                {/* Glow under route */}

                <path
                    d="
                        M 30 480
                        C 160 350, 180 140, 360 150
                        C 520 160, 430 560, 650 570
                        C 870 580, 760 110, 1010 130
                        C 1200 145, 1160 430, 1370 330
                    "
                    stroke="rgba(34,211,238,0.07)"
                    strokeWidth="9"
                />

                {/* Moving route */}

                <motion.path
                    d="
                        M 30 480
                        C 160 350, 180 140, 360 150
                        C 520 160, 430 560, 650 570
                        C 870 580, 760 110, 1010 130
                        C 1200 145, 1160 430, 1370 330
                    "
                    stroke="rgba(196,181,253,0.32)"
                    strokeWidth="1.5"
                    strokeDasharray="7 12"
                    strokeLinecap="round"
                    animate={{
                        strokeDashoffset: [
                            0,
                            -38,
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </motion.svg>

            <Waypoint
                left="11%"
                top="64%"
            />

            <Waypoint
                left="20%"
                top="30%"
                delay={0.6}
            />

            <Waypoint
                left="80%"
                top="30%"
                delay={1.2}
            />

            <Waypoint
                left="89%"
                top="55%"
                delay={1.8}
            />

            {/* Destination */}

            <motion.div
                animate={{
                    rotate: [
                        45,
                        225,
                        405,
                    ],
                    opacity: [
                        0.4,
                        0.9,
                        0.4,
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    right-[9%]
                    top-[44%]
                    h-2
                    w-2
                    border
                    border-cyan-200/55
                    shadow-[0_0_14px_rgba(165,243,252,0.3)]
                "
            />
        </>
    );
}

/* =========================================================
   EXPLORER
   Identity:
   Unknown territory, searching, discovering something new.

   Topographic map + radar scanner + discovery points.
   ========================================================= */

function ExplorerMotif() {
    return (
        <>
            {/* TOPOGRAPHIC CONTOURS */}

            <div
                className="
                    absolute
                    -left-[4%]
                    top-[15%]
                    h-[430px]
                    w-[430px]
                "
            >
                {[0, 1, 2, 3, 4].map(
                    (
                        index,
                    ) => (
                        <motion.div
                            key={index}
                            animate={{
                                scale: [
                                    1,
                                    1.025,
                                    1,
                                ],
                                opacity: [
                                    0.26,
                                    0.52,
                                    0.26,
                                ],
                            }}
                            transition={{
                                duration:
                                    7 +
                                    index *
                                    0.6,
                                repeat:
                                Infinity,
                                ease:
                                    "easeInOut",
                            }}
                            className="
                                absolute
                                rounded-[48%_52%_42%_58%]
                                border
                                border-cyan-300/[0.20]
                            "
                            style={{
                                inset:
                                    index *
                                    30,
                                rotate:
                                    `${index * 11}deg`,
                            }}
                        />
                    ),
                )}
            </div>

            {/* RADAR */}

            <div
                className="
                    absolute
                    -right-[2%]
                    bottom-[12%]
                    h-[380px]
                    w-[380px]
                "
            >
                {[0, 1, 2].map(
                    (
                        index,
                    ) => (
                        <div
                            key={index}
                            className="
                                absolute
                                rounded-full
                                border
                                border-violet-300/[0.17]
                            "
                            style={{
                                inset:
                                    index *
                                    55,
                            }}
                        />
                    ),
                )}

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-px
                        w-[48%]
                        origin-left
                        bg-gradient-to-r
                        from-cyan-200/65
                        to-transparent
                    "
                />
            </div>

            <DiscoveryPoint
                left="17%"
                top="31%"
            />

            <DiscoveryPoint
                left="84%"
                top="67%"
                delay={0.8}
            />

            <DiscoveryPoint
                left="78%"
                top="28%"
                delay={1.4}
            />
        </>
    );
}

/* =========================================================
   PURIST
   Identity:
   Precision, consistency, harmony.

   Perfect mirrored audio waveforms.
   ========================================================= */

function PuristMotif() {
    const bars = [
        20,
        34,
        54,
        78,
        104,
        78,
        54,
        34,
        20,
    ];

    return (
        <>
            {/* LEFT WAVEFORM */}

            <div
                className="
                    absolute
                    left-[4%]
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    gap-[7px]
                "
            >
                {bars.map(
                    (
                        height,
                        index,
                    ) => (
                        <motion.span
                            key={index}
                            animate={{
                                height: [
                                    height *
                                    0.82,
                                    height,
                                    height *
                                    0.82,
                                ],
                                opacity: [
                                    0.3,
                                    0.68,
                                    0.3,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat:
                                Infinity,
                                delay:
                                    index *
                                    0.07,
                                ease:
                                    "easeInOut",
                            }}
                            style={{
                                height,
                            }}
                            className="
                                w-px
                                rounded-full
                                bg-cyan-200/50
                                shadow-[0_0_8px_rgba(165,243,252,0.25)]
                            "
                        />
                    ),
                )}
            </div>

            {/* RIGHT WAVEFORM */}

            <div
                className="
                    absolute
                    right-[4%]
                    top-1/2
                    flex
                    -translate-y-1/2
                    flex-row-reverse
                    items-center
                    gap-[7px]
                "
            >
                {bars.map(
                    (
                        height,
                        index,
                    ) => (
                        <motion.span
                            key={index}
                            animate={{
                                height: [
                                    height *
                                    0.82,
                                    height,
                                    height *
                                    0.82,
                                ],
                                opacity: [
                                    0.3,
                                    0.65,
                                    0.3,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat:
                                Infinity,
                                delay:
                                    index *
                                    0.07,
                                ease:
                                    "easeInOut",
                            }}
                            style={{
                                height,
                            }}
                            className="
                                w-px
                                rounded-full
                                bg-violet-200/45
                            "
                        />
                    ),
                )}
            </div>

            {/* Precision guides */}

            <div
                className="
                    absolute
                    left-[8%]
                    right-[8%]
                    top-[18%]
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-200/25
                    to-transparent
                "
            />

            <div
                className="
                    absolute
                    bottom-[18%]
                    left-[8%]
                    right-[8%]
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-violet-200/22
                    to-transparent
                "
            />
        </>
    );
}

/* =========================================================
   CURATOR
   Identity:
   Selection, taste, building a collection.

   Floating abstract album cards + ordered gallery grid.
   ========================================================= */

function CuratorMotif() {
    const cards = [
        {
            left: "8%",
            top: "24%",
            rotate: -7,
            delay: 0,
        },
        {
            left: "15%",
            top: "62%",
            rotate: 5,
            delay: 0.6,
        },
        {
            right: "9%",
            top: "28%",
            rotate: 6,
            delay: 0.3,
        },
        {
            right: "14%",
            top: "65%",
            rotate: -5,
            delay: 0.9,
        },
    ];

    return (
        <>
            {/* COLLECTION GRID */}

            <div
                className="
                    absolute
                    inset-[10%]
                    opacity-50
                    [background-image:linear-gradient(rgba(196,181,253,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(196,181,253,0.08)_1px,transparent_1px)]
                    [background-size:54px_54px]
                    [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]
                "
            />

            {/* ABSTRACT ALBUM CARDS */}

            {cards.map(
                (
                    card,
                    index,
                ) => (
                    <motion.div
                        key={index}
                        animate={{
                            y: [
                                0,
                                index %
                                2 ===
                                0
                                    ? -8
                                    : 8,
                                0,
                            ],
                            rotate: [
                                card.rotate,
                                card.rotate +
                                (index %
                                2 ===
                                0
                                    ? 2
                                    : -2),
                                card.rotate,
                            ],
                        }}
                        transition={{
                            duration:
                                7 +
                                index,
                            repeat:
                            Infinity,
                            ease:
                                "easeInOut",
                            delay:
                            card.delay,
                        }}
                        style={{
                            left:
                            card.left,
                            right:
                            card.right,
                            top:
                            card.top,
                        }}
                        className="
                            absolute
                            h-[74px]
                            w-[74px]
                            rounded-[14px]
                            border
                            border-violet-300/[0.22]
                            bg-gradient-to-br
                            from-violet-400/[0.14]
                            via-fuchsia-400/[0.06]
                            to-transparent
                            shadow-[0_12px_35px_rgba(139,92,246,0.10)]
                            backdrop-blur-sm
                        "
                    >
                        <div
                            className="
                                absolute
                                bottom-2
                                left-2
                                right-2
                                space-y-1
                            "
                        >
                            <div
                                className="
                                    h-px
                                    w-8
                                    bg-violet-200/30
                                "
                            />

                            <div
                                className="
                                    h-px
                                    w-5
                                    bg-fuchsia-200/25
                                "
                            />
                        </div>
                    </motion.div>
                ),
            )}

            <PulsePoint
                left="22%"
                top="47%"
                color="violet"
            />

            <PulsePoint
                left="79%"
                top="53%"
                color="pink"
                delay={0.8}
            />
        </>
    );
}

/* =========================================================
   WILDCARD
   Identity:
   Controlled chaos, unpredictability, surprise.

   Broken streaks + floating shards + sparks.
   ========================================================= */
function WildcardMotif() {
    const streaks = [
        {
            left: "5%",
            top: "20%",
            rotate: -24,
            width: 180,
        },
        {
            left: "11%",
            top: "70%",
            rotate: 17,
            width: 130,
        },
        {
            left: "76%",
            top: "22%",
            rotate: 25,
            width: 160,
        },
        {
            left: "73%",
            top: "72%",
            rotate: -18,
            width: 190,
        },
    ];

    const shards = [
        {
            left: "18%",
            top: "34%",
            rotate: 12,
        },
        {
            left: "81%",
            top: "38%",
            rotate: 45,
        },
        {
            left: "72%",
            top: "67%",
            rotate: 12,
        },
    ];

    const mysteryCards = [
        {
            left: "9%",
            top: "27%",
            rotate: -8,
            delay: 0,
        },
        {
            right: "9%",
            top: "31%",
            rotate: 7,
            delay: 0.7,
        },
        {
            right: "14%",
            top: "66%",
            rotate: -5,
            delay: 1.3,
        },
    ];

    return (
        <>
            {/* ENERGY STREAKS */}

            {streaks.map(
                (
                    streak,
                    index,
                ) => (
                    <motion.div
                        key={`streak-${index}`}
                        animate={{
                            x: [
                                0,
                                index % 2 === 0
                                    ? 24
                                    : -24,
                                0,
                            ],
                            scaleX: [
                                0.75,
                                1.18,
                                0.75,
                            ],
                            opacity: [
                                0.3,
                                0.82,
                                0.3,
                            ],
                        }}
                        transition={{
                            duration:
                                3.2 +
                                index * 0.45,
                            repeat:
                            Infinity,
                            ease:
                                "easeInOut",
                        }}
                        style={{
                            left:
                            streak.left,
                            top:
                            streak.top,
                            width:
                            streak.width,
                            rotate:
                            streak.rotate,
                        }}
                        className="
                            absolute
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-fuchsia-300/75
                            to-cyan-300/25
                            shadow-[0_0_12px_rgba(232,121,249,0.35)]
                        "
                    />
                ),
            )}

            {/* MYSTERY CARDS */}

            {mysteryCards.map(
                (
                    card,
                    index,
                ) => (
                    <motion.div
                        key={`mystery-${index}`}
                        animate={{
                            y: [
                                0,
                                index % 2 === 0
                                    ? -10
                                    : 8,
                                0,
                            ],

                            rotate: [
                                card.rotate,
                                card.rotate +
                                (index % 2 === 0
                                    ? 4
                                    : -4),
                                card.rotate,
                            ],

                            opacity: [
                                0.42,
                                0.78,
                                0.42,
                            ],
                        }}
                        transition={{
                            duration:
                                5.5 +
                                index * 1.1,
                            repeat:
                            Infinity,
                            ease:
                                "easeInOut",
                            delay:
                            card.delay,
                        }}
                        style={{
                            left:
                            card.left,
                            right:
                            card.right,
                            top:
                            card.top,
                        }}
                        className="
                            absolute
                            flex
                            h-[58px]
                            w-[58px]
                            items-center
                            justify-center
                            rounded-[16px]
                            border
                            border-fuchsia-300/[0.24]
                            bg-gradient-to-br
                            from-fuchsia-400/[0.10]
                            via-violet-400/[0.06]
                            to-cyan-400/[0.06]
                            shadow-[0_14px_40px_rgba(168,85,247,0.12)]
                            backdrop-blur-sm
                        "
                    >
                        <motion.span
                            animate={{
                                opacity: [
                                    0.35,
                                    0.9,
                                    0.35,
                                ],

                                scale: [
                                    1,
                                    1.1,
                                    1,
                                ],
                            }}
                            transition={{
                                duration:
                                    3.4 +
                                    index * 0.5,
                                repeat:
                                Infinity,
                                ease:
                                    "easeInOut",
                            }}
                            className="
                                text-[18px]
                                font-light
                                text-violet-100/65
                            "
                        >
                            ?
                        </motion.span>

                        {/* tiny unknown-track line */}

                        <div
                            className="
                                absolute
                                bottom-[8px]
                                left-[9px]
                                h-px
                                w-[17px]
                                rounded-full
                                bg-cyan-200/25
                            "
                        />
                    </motion.div>
                ),
            )}

            {/* FLOATING SHARDS */}

            {shards.map(
                (
                    shard,
                    index,
                ) => (
                    <motion.div
                        key={`shard-${index}`}
                        animate={{
                            rotate: [
                                shard.rotate,
                                shard.rotate +
                                (index % 2 === 0
                                    ? 18
                                    : -18),
                                shard.rotate,
                            ],

                            y: [
                                0,
                                -8,
                                0,
                            ],

                            opacity: [
                                0.35,
                                0.82,
                                0.35,
                            ],
                        }}
                        transition={{
                            duration:
                                4 +
                                index * 0.4,
                            repeat:
                            Infinity,
                            ease:
                                "easeInOut",
                        }}
                        style={{
                            left:
                            shard.left,
                            top:
                            shard.top,
                        }}
                        className="
                            absolute
                            h-3
                            w-3
                            border
                            border-cyan-200/45
                            shadow-[0_0_10px_rgba(165,243,252,0.15)]
                        "
                    />
                ),
            )}

            <PulsePoint
                left="13%"
                top="53%"
                color="pink"
            />

            <PulsePoint
                left="87%"
                top="57%"
                color="cyan"
                delay={0.5}
            />
        </>
    );
}

/* =========================================================
   SHARED HELPERS
   ========================================================= */

type PulsePointProps = {
    left: string;
    top: string;
    delay?: number;
    color:
        | "pink"
        | "violet"
        | "cyan";
};

function PulsePoint({
                        left,
                        top,
                        delay = 0,
                        color,
                    }: PulsePointProps) {
    const colorClass =
        {
            pink: `
                bg-fuchsia-200
                shadow-[0_0_18px_rgba(245,208,254,0.8)]
            `,

            violet: `
                bg-violet-200
                shadow-[0_0_18px_rgba(196,181,253,0.8)]
            `,

            cyan: `
                bg-cyan-200
                shadow-[0_0_18px_rgba(165,243,252,0.8)]
            `,
        }[color];

    return (
        <motion.span
            animate={{
                scale: [
                    1,
                    1.8,
                    1,
                ],
                opacity: [
                    0.35,
                    0.95,
                    0.35,
                ],
            }}
            transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                top,
            }}
            className={`
                absolute
                h-1.5
                w-1.5
                rounded-full
                ${colorClass}
            `}
        />
    );
}

function Waypoint({
                      left,
                      top,
                      delay = 0,
                  }: {
    left: string;
    top: string;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{
                scale: [
                    1,
                    1.18,
                    1,
                ],
                opacity: [
                    0.45,
                    0.9,
                    0.45,
                ],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                top,
            }}
            className="
                absolute
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                border
                border-violet-200/30
            "
        >
            <span
                className="
                    h-1
                    w-1
                    rounded-full
                    bg-violet-200
                    shadow-[0_0_12px_rgba(196,181,253,0.9)]
                "
            />
        </motion.div>
    );
}

function DiscoveryPoint({
                            left,
                            top,
                            delay = 0,
                        }: {
    left: string;
    top: string;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{
                scale: [
                    0.9,
                    1.15,
                    0.9,
                ],
                opacity: [
                    0.55,
                    1,
                    0.55,
                ],
            }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                top,
            }}
            className="
                absolute
                h-3
                w-3
                rounded-full
                border
                border-cyan-200/40
            "
        >
            <span
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-200
                    shadow-[0_0_14px_rgba(165,243,252,0.9)]
                "
            />
        </motion.div>
    );
}