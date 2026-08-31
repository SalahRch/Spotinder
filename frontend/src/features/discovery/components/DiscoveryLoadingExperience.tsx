import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    FiActivity,
    FiCompass,
    FiDisc,
    FiMusic,
    FiRadio,
    FiStar,
    FiZap,
} from "react-icons/fi";

import AmbientBackground from "./AmbientBackground";

import { useAuth } from "@/features/auth/hooks/useAuth";

/* =========================================================
   Loading journey
   ========================================================= */

const loadingStages = [
    {
        eyebrow: "Musical fingerprint",
        title: "Reading the shape of your taste",
        description:
            "Finding the sounds that make your listening history uniquely yours.",
        shortLabel: "Reading your taste",
    },
    {
        eyebrow: "Taste map",
        title: "Mapping your music world",
        description:
            "Connecting the patterns and sounds you keep coming back to.",
        shortLabel: "Mapping connections",
    },
    {
        eyebrow: "Nearby sounds",
        title: "Exploring familiar territory",
        description:
            "Following musical connections just beyond what you already love.",
        shortLabel: "Exploring nearby",
    },
    {
        eyebrow: "Adventure mode",
        title: "Venturing beyond your comfort zone",
        description:
            "Moving further through your taste space in search of something unexpected.",
        shortLabel: "Pushing outward",
    },
    {
        eyebrow: "Deep discovery",
        title: "Looking beyond the obvious picks",
        description:
            "Digging through new corners of your music world for discoveries worth hearing.",
        shortLabel: "Digging deeper",
    },
    {
        eyebrow: "Discovery deck",
        title: "Bringing the best finds together",
        description:
            "Shaping your discoveries into a session made for this moment.",
        shortLabel: "Building your deck",
    },
    {
        eyebrow: "Final touches",
        title: "Your next sound is almost here",
        description:
            "Still exploring. The best finds are rarely the obvious ones.",
        shortLabel: "Final touches",
    },
] as const;

const STAGE_INTERVAL = 5200;

/* =========================================================
   Universe
   ========================================================= */

type UniverseNodeKind =
    | "core"
    | "nearby"
    | "frontier"
    | "emerging";

type UniverseNode = {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    revealStage: number;
    kind: UniverseNodeKind;
};

const universeNodes: UniverseNode[] = [
    {
        id: "favorite",
        label: "Favorites",
        x: 50,
        y: 9,
        size: 11,
        revealStage: 1,
        kind: "core",
    },
    {
        id: "your-sound",
        label: "Your sound",
        x: 25,
        y: 28,
        size: 9,
        revealStage: 1,
        kind: "core",
    },
    {
        id: "on-repeat",
        label: "On repeat",
        x: 75,
        y: 28,
        size: 9,
        revealStage: 1,
        kind: "core",
    },

    {
        id: "nearby",
        label: "Nearby",
        x: 16,
        y: 57,
        size: 9,
        revealStage: 2,
        kind: "nearby",
    },
    {
        id: "connected",
        label: "Connected",
        x: 84,
        y: 57,
        size: 9,
        revealStage: 2,
        kind: "nearby",
    },
    {
        id: "new-angle",
        label: "New angle",
        x: 50,
        y: 82,
        size: 8,
        revealStage: 2,
        kind: "nearby",
    },

    {
        id: "frontier",
        label: "Frontier",
        x: 5,
        y: 36,
        size: 8,
        revealStage: 3,
        kind: "frontier",
    },
    {
        id: "uncharted",
        label: "Uncharted",
        x: 95,
        y: 36,
        size: 8,
        revealStage: 3,
        kind: "frontier",
    },
    {
        id: "further-out",
        label: "Further out",
        x: 27,
        y: 86,
        size: 7,
        revealStage: 3,
        kind: "frontier",
    },

    {
        id: "hidden-gem",
        label: "Hidden gem",
        x: 6,
        y: 77,
        size: 7,
        revealStage: 4,
        kind: "emerging",
    },
    {
        id: "unexpected",
        label: "Unexpected",
        x: 94,
        y: 77,
        size: 7,
        revealStage: 4,
        kind: "emerging",
    },
    {
        id: "new-world",
        label: "New world",
        x: 73,
        y: 7,
        size: 7,
        revealStage: 4,
        kind: "emerging",
    },
];

const equalizerBars = [
    24,
    37,
    50,
    32,
    44,
    28,
    40,
];

const discoveryTiles = [
    {
        id: "tile-1",
        x: -205,
        y: -115,
        rotate: -8,
        icon: FiMusic,
    },
    {
        id: "tile-2",
        x: 205,
        y: -90,
        rotate: 8,
        icon: FiStar,
    },
    {
        id: "tile-3",
        x: -195,
        y: 130,
        rotate: -6,
        icon: FiDisc,
    },
    {
        id: "tile-4",
        x: 195,
        y: 125,
        rotate: 7,
        icon: FiMusic,
    },
];

/* =========================================================
   Helpers
   ========================================================= */

function getNodeStyle(
    kind: UniverseNodeKind,
) {
    switch (kind) {
        case "core":
            return {
                dot: "bg-violet-100",
                glow:
                    "shadow-[0_0_24px_rgba(196,181,253,0.9)]",
                text: "text-violet-100/90",
            };

        case "nearby":
            return {
                dot: "bg-cyan-200",
                glow:
                    "shadow-[0_0_24px_rgba(103,232,249,0.8)]",
                text: "text-cyan-100/85",
            };

        case "frontier":
            return {
                dot: "bg-fuchsia-200",
                glow:
                    "shadow-[0_0_24px_rgba(240,171,252,0.75)]",
                text: "text-fuchsia-100/85",
            };

        case "emerging":
            return {
                dot: "bg-amber-200",
                glow:
                    "shadow-[0_0_24px_rgba(253,230,138,0.7)]",
                text: "text-amber-100/85",
            };
    }
}

function getAdventureCopy(
    adventureLevel: number,
) {
    if (adventureLevel >= 80) {
        return {
            label: "Far & wide",
            description:
                "Exploring well beyond your usual listening territory.",
        };
    }

    if (adventureLevel >= 55) {
        return {
            label: "Adventurous",
            description:
                "Balancing familiar sounds with more distant discoveries.",
        };
    }

    if (adventureLevel >= 30) {
        return {
            label: "Curious",
            description:
                "Staying connected to your taste while testing nearby sounds.",
        };
    }

    return {
        label: "Close to home",
        description:
            "Keeping this session close to the sounds you already know.",
    };
}

type DiscoveryLoadingExperienceProps = {
    complete?: boolean;
    discoveryCount?: number;
};

/* =========================================================
   Component
   ========================================================= */

export default function DiscoveryLoadingExperience({
                                                       complete = false,
                                                       discoveryCount = 0,
                                                   }: DiscoveryLoadingExperienceProps) {
    const { user } = useAuth();

    const [
        stageIndex,
        setStageIndex,
    ] = useState(0);

    useEffect(() => {
        const interval =
            window.setInterval(() => {
                setStageIndex((current) =>
                    Math.min(
                        current + 1,
                        loadingStages.length - 1,
                    ),
                );
            }, STAGE_INTERVAL);

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    const stage =
        loadingStages[stageIndex];

    const adventureLevel =
        user?.adventureLevel ?? 50;

    const showCompletion =
        complete && discoveryCount > 0;

    const completionLabel =
        discoveryCount === 1
            ? "discovery found"
            : "discoveries found";

    const adventureCopy =
        getAdventureCopy(adventureLevel);

    const visibleNodes =
        useMemo(
            () =>
                universeNodes.filter(
                    (node) =>
                        node.revealStage <=
                        stageIndex,
                ),
            [stageIndex],
        );

    const hasTasteMap =
        stageIndex >= 1;

    const hasNearby =
        stageIndex >= 2;

    const exploringFrontier =
        stageIndex >= 3;

    const findingGems =
        stageIndex >= 4;

    const buildingDeck =
        stageIndex >= 5;

    const universeScale =
        0.97 +
        (adventureLevel / 100) * 0.06;

    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F17]
                px-5
                py-6
                text-white
            "
        >
            <AmbientBackground />

            {/* =================================================
                Atmosphere
               ================================================= */}

            <motion.div
                aria-hidden="true"
                animate={{
                    scale: [
                        0.92,
                        1.08,
                        0.92,
                    ],
                    opacity: [
                        0.24,
                        0.48,
                        0.24,
                    ],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[950px]
                    w-[950px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/[0.07]
                    via-violet-500/[0.14]
                    to-fuchsia-500/[0.07]
                    blur-[220px]
                "
            />

            <motion.div
                aria-hidden="true"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 110,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[850px]
                    w-[850px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/[0.025]
                "
            />

            {/* =================================================
                Shell
               ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[calc(100vh-3rem)]
                    w-full
                    max-w-[1420px]
                    flex-col
                "
            >
                {/* =================================================
                    Header
                   ================================================= */}

                <header
                    className="
                        flex
                        shrink-0
                        flex-col
                        items-center
                        text-center
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <span
                            className="
                                h-px
                                w-10
                                bg-gradient-to-r
                                from-transparent
                                to-violet-300/45
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.42em]
                                text-violet-300/75
                            "
                        >
                            Spotinder Discovery
                        </span>

                        <span
                            className="
                                h-px
                                w-10
                                bg-gradient-to-l
                                from-transparent
                                to-violet-300/45
                            "
                        />
                    </motion.div>

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.1,
                            duration: 0.6,
                        }}
                        className="
                            mt-3
                            text-xl
                            font-medium
                            tracking-tight
                            text-slate-400
                            sm:text-[24px]
                        "
                    >
                        Mapping{" "}
                        <span className="text-slate-100">
                            {user?.displayName
                                ? `${user.displayName}'s`
                                : "your"}
                        </span>{" "}
                        music world
                    </motion.h1>
                </header>

                {/* =================================================
                    DESKTOP COMPOSITION

                    Left:
                    current discovery stage

                    Center:
                    musical universe

                    Right:
                    Adventure
                   ================================================= */}

                <div
                    className="
                        relative
                        mt-3
                        flex
                        flex-1
                        items-center
                        justify-center

                        lg:grid
                        lg:grid-cols-[minmax(220px,280px)_minmax(500px,650px)_minmax(220px,280px)]
                        lg:gap-5

                        xl:grid-cols-[280px_minmax(560px,680px)_280px]
                        xl:gap-8
                    "
                >
                    {/* =================================================
                        LEFT — live stage
                       ================================================= */}

                    <motion.aside
                        initial={{
                            opacity: 0,
                            x: -18,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.35,
                            duration: 0.65,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            relative
                            z-30
                            hidden
                            lg:block
                        "
                    >
                        {/* connector */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                left-full
                                top-1/2
                                h-px
                                w-8
                                bg-gradient-to-r
                                from-violet-300/35
                                to-violet-300/5

                                xl:w-12
                            "
                        />

                        <motion.span
                            aria-hidden="true"
                            animate={{
                                opacity: [
                                    0.25,
                                    1,
                                    0.25,
                                ],
                                scale: [
                                    0.8,
                                    1.25,
                                    0.8,
                                ],
                            }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                -right-[35px]
                                top-1/2
                                h-1.5
                                w-1.5
                                -translate-y-1/2
                                rounded-full
                                bg-violet-200
                                shadow-[0_0_12px_rgba(196,181,253,0.8)]

                                xl:-right-[51px]
                            "
                        />

                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[26px]
                                border
                                border-white/[0.08]
                                bg-[#101621]/70
                                p-5
                                shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                                backdrop-blur-2xl
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    -left-16
                                    -top-16
                                    h-36
                                    w-36
                                    rounded-full
                                    bg-violet-500/10
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-violet-300/10
                                            bg-violet-400/[0.08]
                                            text-violet-200
                                        "
                                    >
                                        <FiActivity />
                                    </span>

                                    <span
                                        className="
                                            text-[9px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.23em]
                                            text-slate-500
                                        "
                                    >
                                        Live search
                                    </span>
                                </div>

                                <motion.span
                                    animate={{
                                        opacity: [
                                            0.35,
                                            1,
                                            0.35,
                                        ],
                                    }}
                                    transition={{
                                        duration: 1.7,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        bg-emerald-400
                                        shadow-[0_0_10px_rgba(52,211,153,0.7)]
                                    "
                                />
                            </div>

                            <AnimatePresence
                                mode="wait"
                            >
                                <motion.div
                                    key={stageIndex}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                        filter:
                                            "blur(3px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter:
                                            "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -6,
                                        filter:
                                            "blur(3px)",
                                    }}
                                    transition={{
                                        duration: 0.35,
                                    }}
                                    className="
                                        relative
                                        mt-7
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <FiRadio
                                            className="
                                                text-[11px]
                                                text-violet-300
                                            "
                                        />

                                        <span
                                            className="
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.22em]
                                                text-violet-300/70
                                            "
                                        >
                                            {
                                                stage.eyebrow
                                            }
                                        </span>
                                    </div>

                                    <h2
                                        className="
                                            mt-3
                                            text-[21px]
                                            font-semibold
                                            leading-[1.18]
                                            tracking-tight
                                            text-slate-100
                                        "
                                    >
                                        {stage.title}
                                    </h2>

                                    <p
                                        className="
                                            mt-3
                                            text-[12px]
                                            leading-5
                                            text-slate-500
                                        "
                                    >
                                        {
                                            stage.description
                                        }
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div
                                className="
                                    relative
                                    mt-7
                                    border-t
                                    border-white/[0.06]
                                    pt-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                    "
                                >
                                    <span
                                        className="
                                            text-[9px]
                                            font-medium
                                            uppercase
                                            tracking-[0.18em]
                                            text-slate-600
                                        "
                                    >
                                        Searching
                                    </span>

                                    <span
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        {stageIndex + 1}/
                                        {
                                            loadingStages.length
                                        }
                                    </span>
                                </div>

                                <div
                                    className="
                                        mt-3
                                        flex
                                        gap-1.5
                                    "
                                >
                                    {loadingStages.map(
                                        (
                                            _,
                                            index,
                                        ) => {
                                            const active =
                                                index ===
                                                stageIndex;

                                            const complete =
                                                index <
                                                stageIndex;

                                            return (
                                                <motion.span
                                                    key={
                                                        index
                                                    }
                                                    animate={{
                                                        flex:
                                                            active
                                                                ? 2.5
                                                                : 1,
                                                        opacity:
                                                            active ||
                                                            complete
                                                                ? 1
                                                                : 0.2,
                                                    }}
                                                    className={`
                                                        h-[3px]
                                                        rounded-full

                                                        ${
                                                        active
                                                            ? "bg-violet-200"
                                                            : complete
                                                                ? "bg-cyan-300/70"
                                                                : "bg-slate-700"
                                                    }
                                                    `}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.aside>

                    {/* =================================================
                        CENTER — universe
                       ================================================= */}

                    <div
                        className="
                            relative
                            z-20
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <motion.div
                            animate={{
                                scale:
                                    hasTasteMap
                                        ? universeScale
                                        : 0.93,
                            }}
                            transition={{
                                duration: 1.5,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                relative

                                h-[390px]
                                w-[390px]

                                sm:h-[470px]
                                sm:w-[470px]

                                lg:h-[clamp(470px,67vh,610px)]
                                lg:w-[clamp(470px,67vh,610px)]
                            "
                        >
                            {/* Center glow */}

                            <motion.div
                                aria-hidden="true"
                                animate={{
                                    scale: [
                                        0.88,
                                        1.12,
                                        0.88,
                                    ],
                                    opacity: [
                                        0.2,
                                        0.46,
                                        0.2,
                                    ],
                                }}
                                transition={{
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    absolute
                                    inset-[22%]
                                    rounded-full
                                    bg-violet-500/20
                                    blur-[105px]
                                "
                            />

                            {/* Rings */}

                            <motion.div
                                aria-hidden="true"
                                initial={{
                                    opacity: 0,
                                    scale: 0.45,
                                }}
                                animate={{
                                    opacity:
                                        hasTasteMap
                                            ? 1
                                            : 0.2,

                                    scale:
                                        hasTasteMap
                                            ? 1
                                            : 0.5,
                                }}
                                transition={{
                                    duration: 1.3,
                                }}
                                className="
                                    absolute
                                    inset-[32%]
                                    rounded-full
                                    border
                                    border-violet-300/[0.14]
                                "
                            />

                            <motion.div
                                aria-hidden="true"
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                animate={{
                                    opacity:
                                        hasNearby
                                            ? 1
                                            : 0,

                                    scale:
                                        hasNearby
                                            ? 1
                                            : 0.55,
                                }}
                                transition={{
                                    duration: 1.5,
                                }}
                                className="
                                    absolute
                                    inset-[18%]
                                    rounded-full
                                    border
                                    border-cyan-300/[0.1]
                                "
                            />

                            <motion.div
                                aria-hidden="true"
                                initial={{
                                    opacity: 0,
                                    scale: 0.55,
                                }}
                                animate={{
                                    opacity:
                                        exploringFrontier
                                            ? 1
                                            : 0,

                                    scale:
                                        exploringFrontier
                                            ? 1
                                            : 0.6,
                                }}
                                transition={{
                                    duration: 1.7,
                                }}
                                className="
                                    absolute
                                    inset-[4%]
                                    rounded-full
                                    border
                                    border-fuchsia-300/[0.08]
                                "
                            />

                            {/* Rotating arcs */}

                            <motion.div
                                aria-hidden="true"
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="
                                    absolute
                                    inset-[18%]
                                    rounded-full
                                    border-t
                                    border-r
                                    border-violet-300/[0.17]
                                "
                            />

                            <motion.div
                                aria-hidden="true"
                                animate={{
                                    rotate: -360,
                                }}
                                transition={{
                                    duration: 45,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="
                                    absolute
                                    inset-[4%]
                                    rounded-full
                                    border-b
                                    border-l
                                    border-cyan-300/[0.11]
                                "
                            />

                            <AnimatePresence>
                                {showCompletion && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 14,
                                            scale: 0.96,
                                            filter: "blur(5px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -8,
                                        }}
                                        transition={{
                                            delay: 0.18,
                                            duration: 0.5,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className="
                pointer-events-none
                absolute
                top-[64%]
                left-1/2
                z-50
                -translate-x-1/2
                whitespace-nowrap
                rounded-2xl
                border
                border-emerald-300/[0.12]
                bg-[#0D1519]/90
                px-5
                py-3
                text-center
                shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(52,211,153,0.08)]
                backdrop-blur-2xl
            "
                                    >
                                        <div
                                            className="
                    flex
                    items-center
                    justify-center
                    gap-2
                "
                                        >
                                            <motion.span
                                                initial={{
                                                    scale: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.3,
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 16,
                                                }}
                                                className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-300
                        shadow-[0_0_12px_rgba(110,231,183,0.9)]
                    "
                                            />

                                            <span
                                                className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-emerald-200/80
                    "
                                            >
                    Discovery complete
                </span>
                                        </div>

                                        <div
                                            className="
                    mt-1
                    text-[18px]
                    font-semibold
                    tracking-tight
                    text-slate-100
                "
                                        >
                                            {discoveryCount}{" "}
                                            {completionLabel}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* =================================================
                                Connections
                               ================================================= */}

                            <svg
                                aria-hidden="true"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    overflow-visible
                                "
                            >
                                <defs>
                                    <linearGradient
                                        id="spotinder-connection"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgb(103 232 249)"
                                            stopOpacity="0.14"
                                        />

                                        <stop
                                            offset="48%"
                                            stopColor="rgb(196 181 253)"
                                            stopOpacity="0.62"
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="rgb(240 171 252)"
                                            stopOpacity="0.14"
                                        />
                                    </linearGradient>

                                    <filter id="connection-glow">
                                        <feGaussianBlur
                                            stdDeviation="0.22"
                                            result="blur"
                                        />

                                        <feMerge>
                                            <feMergeNode
                                                in="blur"
                                            />
                                            <feMergeNode
                                                in="SourceGraphic"
                                            />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {visibleNodes.map(
                                    (node) => (
                                        <motion.line
                                            key={`connection-${node.id}`}
                                            x1="50"
                                            y1="50"
                                            x2={node.x}
                                            y2={node.y}
                                            stroke="url(#spotinder-connection)"
                                            strokeWidth="0.32"
                                            vectorEffect="non-scaling-stroke"
                                            filter="url(#connection-glow)"
                                            initial={{
                                                pathLength:
                                                    0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                pathLength:
                                                    1,
                                                opacity: 1,
                                            }}
                                            transition={{
                                                duration:
                                                    1.1,
                                                delay:
                                                    node.revealStage *
                                                    0.07,
                                                ease: "easeOut",
                                            }}
                                        />
                                    ),
                                )}

                                {hasNearby && (
                                    <>
                                        <motion.line
                                            x1="25"
                                            y1="28"
                                            x2="16"
                                            y2="57"
                                            stroke="url(#spotinder-connection)"
                                            strokeWidth="0.22"
                                            initial={{
                                                pathLength:
                                                    0,
                                            }}
                                            animate={{
                                                pathLength:
                                                    1,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                        />

                                        <motion.line
                                            x1="75"
                                            y1="28"
                                            x2="84"
                                            y2="57"
                                            stroke="url(#spotinder-connection)"
                                            strokeWidth="0.22"
                                            initial={{
                                                pathLength:
                                                    0,
                                            }}
                                            animate={{
                                                pathLength:
                                                    1,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                        />

                                        <motion.line
                                            x1="16"
                                            y1="57"
                                            x2="50"
                                            y2="82"
                                            stroke="url(#spotinder-connection)"
                                            strokeWidth="0.2"
                                            initial={{
                                                pathLength:
                                                    0,
                                            }}
                                            animate={{
                                                pathLength:
                                                    1,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                        />

                                        <motion.line
                                            x1="84"
                                            y1="57"
                                            x2="50"
                                            y2="82"
                                            stroke="url(#spotinder-connection)"
                                            strokeWidth="0.2"
                                            initial={{
                                                pathLength:
                                                    0,
                                            }}
                                            animate={{
                                                pathLength:
                                                    1,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                        />
                                    </>
                                )}
                            </svg>

                            {/* =================================================
                                Nodes
                               ================================================= */}

                            <AnimatePresence>
                                {visibleNodes.map(
                                    (
                                        node,
                                        index,
                                    ) => {
                                        const style =
                                            getNodeStyle(
                                                node.kind,
                                            );

                                        return (
                                            <motion.div
                                                key={
                                                    node.id
                                                }
                                                initial={{
                                                    opacity:
                                                        0,
                                                    scale:
                                                        0,
                                                }}
                                                animate={{
                                                    opacity:
                                                        1,
                                                    scale:
                                                        1,
                                                    y: [
                                                        0,
                                                        index %
                                                        2 ===
                                                        0
                                                            ? -4
                                                            : 4,
                                                        0,
                                                    ],
                                                }}
                                                transition={{
                                                    opacity:
                                                        {
                                                            duration:
                                                                0.65,
                                                        },

                                                    scale: {
                                                        type: "spring",
                                                        stiffness:
                                                            190,
                                                        damping:
                                                            18,
                                                    },

                                                    y: {
                                                        duration:
                                                            4 +
                                                            index *
                                                            0.13,
                                                        repeat:
                                                        Infinity,
                                                        ease: "easeInOut",
                                                    },
                                                }}
                                                style={{
                                                    left: `${node.x}%`,
                                                    top: `${node.y}%`,
                                                }}
                                                className="
                                                    absolute
                                                    z-30
                                                    -translate-x-1/2
                                                    -translate-y-1/2
                                                "
                                            >
                                                <div
                                                    className="
                                                        relative
                                                        flex
                                                        flex-col
                                                        items-center
                                                    "
                                                >
                                                    <motion.span
                                                        aria-hidden="true"
                                                        animate={{
                                                            scale: [
                                                                1,
                                                                2.1,
                                                            ],
                                                            opacity:
                                                                [
                                                                    0.18,
                                                                    0,
                                                                ],
                                                        }}
                                                        transition={{
                                                            duration:
                                                                3.2 +
                                                                index *
                                                                0.08,
                                                            repeat:
                                                            Infinity,
                                                            ease: "easeOut",
                                                        }}
                                                        style={{
                                                            width:
                                                                node.size +
                                                                5,
                                                            height:
                                                                node.size +
                                                                5,
                                                        }}
                                                        className="
                                                            absolute
                                                            rounded-full
                                                            border
                                                            border-white/15
                                                        "
                                                    />

                                                    <motion.span
                                                        animate={{
                                                            scale: [
                                                                1,
                                                                1.25,
                                                                1,
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration:
                                                                2.8 +
                                                                index *
                                                                0.12,
                                                            repeat:
                                                            Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                        style={{
                                                            width:
                                                            node.size,
                                                            height:
                                                            node.size,
                                                        }}
                                                        className={`
                                                            block
                                                            rounded-full
                                                            ${style.dot}
                                                            ${style.glow}
                                                        `}
                                                    />

                                                    <span
                                                        className={`
                                                            absolute
                                                            top-[18px]
                                                            whitespace-nowrap
                                                            text-[10px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-[0.14em]
                                                            sm:text-[11px]
                                                            ${style.text}
                                                        `}
                                                    >
                                                        {
                                                            node.label
                                                        }
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    },
                                )}
                            </AnimatePresence>

                            {/* =================================================
                                Traveling signals
                               ================================================= */}

                            {exploringFrontier && (
                                <>
                                    <motion.div
                                        aria-hidden="true"
                                        animate={{
                                            opacity: [
                                                0,
                                                1,
                                                1,
                                                0,
                                            ],
                                            x: [
                                                0,
                                                -205,
                                            ],
                                            y: [
                                                0,
                                                -100,
                                            ],
                                        }}
                                        transition={{
                                            duration: 3.8,
                                            repeat:
                                            Infinity,
                                            repeatDelay:
                                                0.8,
                                            ease: "easeInOut",
                                        }}
                                        className="
                                            absolute
                                            left-1/2
                                            top-1/2
                                            z-20
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-cyan-100
                                            shadow-[0_0_18px_rgba(165,243,252,1)]
                                        "
                                    />

                                    <motion.div
                                        aria-hidden="true"
                                        animate={{
                                            opacity: [
                                                0,
                                                1,
                                                1,
                                                0,
                                            ],
                                            x: [
                                                0,
                                                210,
                                            ],
                                            y: [
                                                0,
                                                -85,
                                            ],
                                        }}
                                        transition={{
                                            duration: 4.2,
                                            delay: 0.8,
                                            repeat:
                                            Infinity,
                                            repeatDelay:
                                                0.7,
                                            ease: "easeInOut",
                                        }}
                                        className="
                                            absolute
                                            left-1/2
                                            top-1/2
                                            z-20
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-fuchsia-100
                                            shadow-[0_0_18px_rgba(245,208,254,1)]
                                        "
                                    />

                                    <motion.div
                                        aria-hidden="true"
                                        animate={{
                                            opacity: [
                                                0,
                                                0.9,
                                                0.9,
                                                0,
                                            ],
                                            x: [
                                                0,
                                                -120,
                                            ],
                                            y: [
                                                0,
                                                190,
                                            ],
                                        }}
                                        transition={{
                                            duration: 4.5,
                                            delay: 1.6,
                                            repeat:
                                            Infinity,
                                            repeatDelay:
                                                0.9,
                                            ease: "easeInOut",
                                        }}
                                        className="
                                            absolute
                                            left-1/2
                                            top-1/2
                                            z-20
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-violet-100
                                            shadow-[0_0_18px_rgba(221,214,254,1)]
                                        "
                                    />
                                </>
                            )}

                            {/* =================================================
                                Discovery tiles
                               ================================================= */}

                            <AnimatePresence>
                                {findingGems &&
                                    discoveryTiles.map(
                                        (
                                            tile,
                                            index,
                                        ) => {
                                            const Icon =
                                                tile.icon;

                                            return (
                                                <motion.div
                                                    key={
                                                        tile.id
                                                    }
                                                    initial={{
                                                        opacity:
                                                            0,
                                                        x: tile.x,
                                                        y: tile.y,
                                                        rotate:
                                                        tile.rotate,
                                                        scale:
                                                            0.65,
                                                    }}
                                                    animate={
                                                        buildingDeck
                                                            ? {
                                                                opacity:
                                                                    [
                                                                        0,
                                                                        0.9,
                                                                        0,
                                                                    ],
                                                                x: [
                                                                    tile.x,
                                                                    0,
                                                                ],
                                                                y: [
                                                                    tile.y,
                                                                    0,
                                                                ],
                                                                rotate:
                                                                    [
                                                                        tile.rotate,
                                                                        0,
                                                                    ],
                                                                scale:
                                                                    [
                                                                        0.9,
                                                                        0.42,
                                                                    ],
                                                            }
                                                            : {
                                                                opacity:
                                                                    0.82,
                                                                x: tile.x,
                                                                y: [
                                                                    tile.y,
                                                                    tile.y -
                                                                    7,
                                                                    tile.y,
                                                                ],
                                                                rotate:
                                                                tile.rotate,
                                                                scale:
                                                                    1,
                                                            }
                                                    }
                                                    transition={
                                                        buildingDeck
                                                            ? {
                                                                duration:
                                                                    3.2,
                                                                delay:
                                                                    index *
                                                                    0.4,
                                                                repeat:
                                                                Infinity,
                                                                repeatDelay:
                                                                    1,
                                                                ease: [
                                                                    0.22,
                                                                    1,
                                                                    0.36,
                                                                    1,
                                                                ],
                                                            }
                                                            : {
                                                                opacity:
                                                                    {
                                                                        duration:
                                                                            0.6,
                                                                    },
                                                                scale:
                                                                    {
                                                                        duration:
                                                                            0.6,
                                                                    },
                                                                y: {
                                                                    duration:
                                                                        4 +
                                                                        index *
                                                                        0.3,
                                                                    repeat:
                                                                    Infinity,
                                                                    ease: "easeInOut",
                                                                },
                                                            }
                                                    }
                                                    className="
                                                        absolute
                                                        left-1/2
                                                        top-1/2
                                                        z-20
                                                        -ml-7
                                                        -mt-8
                                                        flex
                                                        h-16
                                                        w-14
                                                        items-center
                                                        justify-center
                                                        overflow-hidden
                                                        rounded-[16px]
                                                        border
                                                        border-white/[0.1]
                                                        bg-[#111827]/85
                                                        shadow-[0_18px_45px_rgba(0,0,0,0.4)]
                                                        backdrop-blur-xl
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            absolute
                                                            inset-0
                                                            bg-gradient-to-br
                                                            from-cyan-400/[0.08]
                                                            via-violet-400/[0.1]
                                                            to-fuchsia-400/[0.08]
                                                        "
                                                    />

                                                    <Icon
                                                        className="
                                                            relative
                                                            z-10
                                                            text-lg
                                                            text-violet-100/80
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            absolute
                                                            bottom-1.5
                                                            left-1/2
                                                            h-[2px]
                                                            w-5
                                                            -translate-x-1/2
                                                            rounded-full
                                                            bg-white/10
                                                        "
                                                    />
                                                </motion.div>
                                            );
                                        },
                                    )}
                            </AnimatePresence>

                            {/* =================================================
                                Taste core
                               ================================================= */}

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    z-40
                                    -translate-x-1/2
                                    -translate-y-1/2
                                "
                            >
                                <motion.div
                                    aria-hidden="true"
                                    animate={{
                                        scale: [
                                            0.75,
                                            1.95,
                                        ],
                                        opacity: [
                                            0.32,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3.3,
                                        repeat:
                                        Infinity,
                                        ease: "easeOut",
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        rounded-full
                                        border
                                        border-violet-300/30
                                    "
                                />

                                <motion.div
                                    aria-hidden="true"
                                    animate={{
                                        scale: [
                                            0.75,
                                            1.95,
                                        ],
                                        opacity: [
                                            0.23,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3.3,
                                        delay: 1.1,
                                        repeat:
                                        Infinity,
                                        ease: "easeOut",
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        rounded-full
                                        border
                                        border-cyan-300/25
                                    "
                                />

                                <motion.div
                                    animate={{
                                        scale: showCompletion
                                            ? [
                                                1,
                                                1.18,
                                                1.04,
                                            ]
                                            : buildingDeck
                                                ? [
                                                    1,
                                                    1.08,
                                                    1,
                                                ]
                                                : [
                                                    1,
                                                    1.04,
                                                    1,
                                                ],

                                        boxShadow: showCompletion
                                            ? [
                                                "0 0 55px rgba(52,211,153,0.18)",
                                                "0 0 150px rgba(52,211,153,0.48)",
                                                "0 0 85px rgba(139,92,246,0.28)",
                                            ]
                                            : [
                                                "0 0 55px rgba(139,92,246,0.22)",
                                                "0 0 115px rgba(139,92,246,0.42)",
                                                "0 0 55px rgba(139,92,246,0.22)",
                                            ],
                                    }}
                                    transition={
                                        showCompletion
                                            ? {
                                                duration: 0.75,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            }
                                            : {
                                                duration:
                                                    buildingDeck
                                                        ? 2
                                                        : 3.8,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }
                                    }
                                    className="
                                        relative
                                        flex
                                        h-[132px]
                                        w-[132px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/[0.12]
                                        bg-[#111827]/95
                                        shadow-[0_28px_80px_rgba(0,0,0,0.45)]
                                        backdrop-blur-2xl
                                    "
                                >
                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute
                                            inset-4
                                            rounded-full
                                            bg-gradient-to-br
                                            from-cyan-400/[0.1]
                                            via-violet-400/[0.15]
                                            to-fuchsia-400/[0.1]
                                            blur-xl
                                        "
                                    />
                                    <AnimatePresence mode="wait">
                                        {showCompletion ? (
                                            <motion.div
                                                key="complete"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                    rotate: -12,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotate: 0,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 220,
                                                    damping: 16,
                                                }}
                                                className="
                relative
                z-10
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-emerald-300/20
                bg-emerald-300/[0.08]
            "
                                            >
                                                <motion.svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="
                    h-6
                    w-6
                    text-emerald-200
                "
                                                >
                                                    <motion.path
                                                        d="M5 12.5L9.2 16.5L19 7"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{
                                                            pathLength: 0,
                                                        }}
                                                        animate={{
                                                            pathLength: 1,
                                                        }}
                                                        transition={{
                                                            delay: 0.15,
                                                            duration: 0.45,
                                                            ease: "easeOut",
                                                        }}
                                                    />
                                                </motion.svg>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="equalizer"
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.75,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                }}
                                                className="
                relative
                z-10
                flex
                items-center
                gap-[4px]
            "
                                            >
                                                {equalizerBars.map(
                                                    (
                                                        height,
                                                        index,
                                                    ) => (
                                                        <motion.span
                                                            key={`${height}-${index}`}
                                                            animate={{
                                                                height: [
                                                                    height *
                                                                    0.42,
                                                                    height,
                                                                    height *
                                                                    0.6,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration:
                                                                    0.85 +
                                                                    index *
                                                                    0.09,
                                                                repeat:
                                                                Infinity,
                                                                repeatType:
                                                                    "mirror",
                                                                ease: "easeInOut",
                                                            }}
                                                            style={{
                                                                height,
                                                            }}
                                                            className="
                            w-[4px]
                            rounded-full
                            bg-gradient-to-t
                            from-violet-500
                            via-violet-200
                            to-cyan-100
                        "
                                                        />
                                                    ),
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <span
                                    className="
                                        absolute
                                        left-1/2
                                        top-[148px]
                                        -translate-x-1/2
                                        whitespace-nowrap
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.26em]
                                        text-violet-100/60
                                    "
                                >
                                    Your taste
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* =================================================
                        RIGHT — Adventure
                       ================================================= */}

                    <motion.aside
                        initial={{
                            opacity: 0,
                            x: 18,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.4,
                            duration: 0.65,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            relative
                            z-30
                            hidden
                            lg:block
                        "
                    >
                        {/* connector */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                right-full
                                top-1/2
                                h-px
                                w-8
                                bg-gradient-to-l
                                from-violet-300/35
                                to-violet-300/5

                                xl:w-12
                            "
                        />

                        <motion.span
                            aria-hidden="true"
                            animate={{
                                opacity: [
                                    0.25,
                                    1,
                                    0.25,
                                ],
                                scale: [
                                    0.8,
                                    1.25,
                                    0.8,
                                ],
                            }}
                            transition={{
                                duration: 2.2,
                                delay: 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                -left-[35px]
                                top-1/2
                                h-1.5
                                w-1.5
                                -translate-y-1/2
                                rounded-full
                                bg-violet-200
                                shadow-[0_0_12px_rgba(196,181,253,0.8)]

                                xl:-left-[51px]
                            "
                        />

                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[26px]
                                border
                                border-white/[0.08]
                                bg-[#101621]/70
                                p-5
                                shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                                backdrop-blur-2xl
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-14
                                    -top-14
                                    h-36
                                    w-36
                                    rounded-full
                                    bg-fuchsia-500/10
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    relative
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-fuchsia-300/10
                                        bg-fuchsia-400/[0.07]
                                        text-fuchsia-200
                                    "
                                >
                                    <FiCompass />
                                </span>

                                <span
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.23em]
                                        text-slate-500
                                    "
                                >
                                    Adventure mode
                                </span>
                            </div>

                            <div
                                className="
                                    relative
                                    mt-6
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-end
                                        gap-2
                                    "
                                >
                                    <motion.span
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.6,
                                        }}
                                        className="
                                            text-[46px]
                                            font-semibold
                                            leading-none
                                            tracking-[-0.05em]
                                            text-slate-100
                                        "
                                    >
                                        {
                                            adventureLevel
                                        }
                                    </motion.span>

                                    <span
                                        className="
                                            mb-1
                                            text-lg
                                            font-medium
                                            text-violet-300
                                        "
                                    >
                                        %
                                    </span>
                                </div>

                                <div
                                    className="
                                        mt-3
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <FiZap
                                        className="
                                            text-xs
                                            text-violet-300
                                        "
                                    />

                                    <span
                                        className="
                                            text-[11px]
                                            font-semibold
                                            text-violet-200
                                        "
                                    >
                                        {
                                            adventureCopy.label
                                        }
                                    </span>
                                </div>

                                <p
                                    className="
                                        mt-3
                                        text-[12px]
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    {
                                        adventureCopy.description
                                    }
                                </p>
                            </div>

                            <div
                                className="
                                    relative
                                    mt-6
                                    border-t
                                    border-white/[0.06]
                                    pt-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <span
                                        className="
                                            text-[9px]
                                            font-medium
                                            uppercase
                                            tracking-[0.18em]
                                            text-slate-600
                                        "
                                    >
                                        Comfort
                                    </span>

                                    <span
                                        className="
                                            text-[9px]
                                            font-medium
                                            uppercase
                                            tracking-[0.18em]
                                            text-slate-600
                                        "
                                    >
                                        Explore
                                    </span>
                                </div>

                                <div
                                    className="
                                        relative
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
                                            width: `${adventureLevel}%`,
                                        }}
                                        transition={{
                                            delay: 0.65,
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
                                            from-cyan-300
                                            via-violet-400
                                            to-fuchsia-400
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>

                {/* =================================================
                    MOBILE/TABLET narrative

                    Desktop gets the side panels.
                    Smaller screens keep the useful information below.
                   ================================================= */}

                <div
                    className="
                        mx-auto
                        mt-1
                        w-full
                        max-w-[500px]
                        lg:hidden
                    "
                >
                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key={stageIndex}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -6,
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
                                    gap-2
                                "
                            >
                                <FiRadio
                                    className="
                                        text-[10px]
                                        text-violet-300
                                    "
                                />

                                <span
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.24em]
                                        text-violet-300/70
                                    "
                                >
                                    {
                                        stage.eyebrow
                                    }
                                </span>
                            </div>

                            <h2
                                className="
                                    mt-2
                                    text-xl
                                    font-semibold
                                    text-slate-100
                                "
                            >
                                {stage.title}
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-[420px]
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                {
                                    stage.description
                                }
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div
                        className="
                            mx-auto
                            mt-4
                            flex
                            w-fit
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            px-4
                            py-2
                            backdrop-blur-xl
                        "
                    >
                        <FiCompass
                            className="
                                text-xs
                                text-violet-300
                            "
                        />

                        <span
                            className="
                                text-[9px]
                                uppercase
                                tracking-[0.16em]
                                text-slate-500
                            "
                        >
                            Adventure
                        </span>

                        <div
                            className="
                                h-1
                                w-16
                                overflow-hidden
                                rounded-full
                                bg-white/10
                            "
                        >
                            <motion.div
                                initial={{
                                    width: 0,
                                }}
                                animate={{
                                    width: `${adventureLevel}%`,
                                }}
                                transition={{
                                    duration: 1,
                                }}
                                className="
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-cyan-300
                                    to-violet-400
                                "
                            />
                        </div>

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                text-violet-100
                            "
                        >
                            {adventureLevel}%
                        </span>
                    </div>
                </div>

                {/* =================================================
                    Minimal footer
                   ================================================= */}

                <footer
                    className="
                        mt-2
                        flex
                        shrink-0
                        flex-col
                        items-center
                        pb-1
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        {loadingStages.map(
                            (_, index) => {
                                const active =
                                    index ===
                                    stageIndex;

                                const complete =
                                    index <
                                    stageIndex;

                                return (
                                    <motion.span
                                        key={index}
                                        animate={{
                                            width: active
                                                ? 28
                                                : complete
                                                    ? 8
                                                    : 5,

                                            opacity:
                                                active ||
                                                complete
                                                    ? 1
                                                    : 0.2,
                                        }}
                                        transition={{
                                            duration:
                                                0.35,
                                        }}
                                        className={`
                                            h-[3px]
                                            rounded-full

                                            ${
                                            active
                                                ? "bg-violet-200"
                                                : complete
                                                    ? "bg-cyan-300/70"
                                                    : "bg-slate-700"
                                        }
                                        `}
                                    />
                                );
                            },
                        )}
                    </div>

                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <motion.span
                            animate={{
                                opacity: [
                                    0.35,
                                    1,
                                    0.35,
                                ],
                                scale: [
                                    0.9,
                                    1.15,
                                    0.9,
                                ],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-400
                                shadow-[0_0_12px_rgba(52,211,153,0.7)]
                            "
                        />

                        <AnimatePresence
                            mode="wait"
                        >
                            <motion.span
                                key={
                                    stage.shortLabel
                                }
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-[0.18em]
                                    text-slate-600
                                "
                            >
                                {
                                    stage.shortLabel
                                }{" "}
                                · personalized from
                                your Spotify taste
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </footer>
            </div>
        </section>
    );
}