import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    LuFlame,
} from "react-icons/lu";

import {
    FiAward,
    FiCompass,
    FiEyeOff,
    FiMap,
    FiStar,
    FiX,
} from "react-icons/fi";

import type {
    IconType,
} from "react-icons";

import {
    useEffect,
    useRef,
} from "react";

import achievementSound
    from "@/assets/audio/achievement-unlock.mp3";

import type {
    AchievementUnlock,
} from "../types/achievement";


type AchievementUnlockToastProps = {
    achievement?: AchievementUnlock;
    onClose: () => void;
};


type AchievementVisual = {
    icon: IconType;
    iconClassName: string;
    glowClassName: string;
    borderClassName: string;
    labelClassName: string;
    rarity: string;
};


const achievementVisuals: Record<
    AchievementUnlock["type"],
    AchievementVisual
> = {
    BLIND_FAITH: {
        icon: FiEyeOff,
        iconClassName:
            "text-cyan-200",
        glowClassName:
            "bg-cyan-400/[0.12]",
        borderClassName:
            "border-cyan-300/[0.16]",
        labelClassName:
            "text-cyan-300/70",
        rarity:
            "Discovery",
    },

    OPEN_MIND: {
        icon: FiCompass,
        iconClassName:
            "text-violet-200",
        glowClassName:
            "bg-violet-500/[0.13]",
        borderClassName:
            "border-violet-300/[0.16]",
        labelClassName:
            "text-violet-300/70",
        rarity:
            "Discovery",
    },

    HOT_STREAK: {
        icon: LuFlame,
        iconClassName:
            "text-orange-200",
        glowClassName:
            "bg-orange-400/[0.12]",
        borderClassName:
            "border-orange-300/[0.16]",
        labelClassName:
            "text-orange-300/70",
        rarity:
            "Rare discovery",
    },

    FIRST_JOURNEY: {
        icon: FiMap,
        iconClassName:
            "text-fuchsia-200",
        glowClassName:
            "bg-fuchsia-500/[0.11]",
        borderClassName:
            "border-fuchsia-300/[0.16]",
        labelClassName:
            "text-fuchsia-300/70",
        rarity:
            "Milestone",
    },

    HIDDEN_GEM: {
        icon: FiStar,
        iconClassName:
            "text-emerald-200",
        glowClassName:
            "bg-emerald-400/[0.11]",
        borderClassName:
            "border-emerald-300/[0.16]",
        labelClassName:
            "text-emerald-300/70",
        rarity:
            "Rare discovery",
    },
};


export default function AchievementUnlockToast({
                                                   achievement,
                                                   onClose,
                                               }: AchievementUnlockToastProps) {
    const visual =
        achievement
            ? achievementVisuals[
                achievement.type
                ]
            : null;

    const Icon =
        visual?.icon ??
        FiAward;

    const audioRef =
        useRef<HTMLAudioElement | null>(
            null,
        );


    useEffect(() => {
        if (!achievement) {
            return;
        }

        if (!audioRef.current) {
            audioRef.current =
                new Audio(
                    achievementSound,
                );

            audioRef.current.volume =
                0.5;
        }

        const audio =
            audioRef.current;

        audio.currentTime = 0;

        audio.play().catch(() => {
            /*
             * Browser may block audio
             * before user interaction.
             */
        });
    }, [achievement]);


    return (
        <AnimatePresence>
            {achievement &&
                visual && (
                    <>
                        {/* Page afterglow */}

                        <motion.div
                            key={`afterglow-${achievement.type}`}
                            aria-hidden="true"
                            initial={{
                                opacity: 0,
                                scale: 0.72,
                            }}
                            animate={{
                                opacity: [
                                    0,
                                    0.58,
                                    0,
                                ],
                                scale: [
                                    0.72,
                                    1.08,
                                    1.26,
                                ],
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.9,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className={`
                                pointer-events-none
                                fixed
                                right-[-90px]
                                top-[-110px]
                                z-[190]
                                h-[430px]
                                w-[430px]
                                rounded-full
                                opacity-60
                                blur-[125px]

                                ${visual.glowClassName}
                            `}
                        />


                        {/* Achievement card */}

                        <motion.div
                            key={
                                achievement.type
                            }
                            initial={{
                                opacity: 0,
                                x: 46,
                                scale: 0.94,
                                filter:
                                    "blur(8px)",
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                filter:
                                    "blur(0px)",
                            }}
                            exit={{
                                opacity: 0,
                                x: 26,
                                scale: 0.97,
                                filter:
                                    "blur(5px)",
                            }}
                            transition={{
                                duration: 0.48,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className={`
                                fixed
                                right-6
                                top-6
                                z-[200]
                                w-[350px]
                                overflow-hidden
                                rounded-[26px]
                                border
                                bg-[#0D131E]/96
                                p-5
                                shadow-[0_28px_90px_rgba(0,0,0,0.5)]
                                backdrop-blur-2xl

                                ${visual.borderClassName}
                            `}
                        >
                            {/* Internal aura */}

                            <motion.div
                                aria-hidden="true"
                                initial={{
                                    opacity: 0,
                                    scale: 0.55,
                                }}
                                animate={{
                                    opacity: [
                                        0,
                                        1,
                                        0.65,
                                    ],
                                    scale: [
                                        0.55,
                                        1.2,
                                        1,
                                    ],
                                }}
                                transition={{
                                    delay: 0.05,
                                    duration: 0.9,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                className={`
                                    pointer-events-none
                                    absolute
                                    -right-16
                                    -top-20
                                    h-[190px]
                                    w-[190px]
                                    rounded-full
                                    blur-[80px]

                                    ${visual.glowClassName}
                                `}
                            />


                            {/* Shimmer sweep */}

                            <motion.div
                                aria-hidden="true"
                                initial={{
                                    x: "-140%",
                                    opacity: 0,
                                }}
                                animate={{
                                    x: "180%",
                                    opacity: [
                                        0,
                                        0.5,
                                        0,
                                    ],
                                }}
                                transition={{
                                    delay: 0.22,
                                    duration: 1.15,
                                    ease: "easeOut",
                                }}
                                className="
                                    pointer-events-none
                                    absolute
                                    top-0
                                    h-full
                                    w-[70px]
                                    rotate-[18deg]
                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/[0.08]
                                    to-transparent
                                    blur-md
                                "
                            />


                            {/* Close */}

                            <button
                                type="button"
                                onClick={
                                    onClose
                                }
                                aria-label="Dismiss achievement"
                                className="
                                    absolute
                                    right-3
                                    top-3
                                    z-20
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-slate-600
                                    transition
                                    hover:bg-white/[0.05]
                                    hover:text-white
                                "
                            >
                                <FiX />
                            </button>


                            {/* Content */}

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    gap-4
                                "
                            >
                                {/* Icon moment */}

                                <div
                                    className="
                                        relative
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                    "
                                >
                                    {/* Small burst lines */}

                                    {[
                                        0,
                                        1,
                                        2,
                                        3,
                                    ].map(
                                        (
                                            index,
                                        ) => (
                                            <motion.span
                                                key={
                                                    index
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0,
                                                    rotate:
                                                        index *
                                                        45,
                                                }}
                                                animate={{
                                                    opacity:
                                                        [
                                                            0,
                                                            0.8,
                                                            0,
                                                        ],
                                                    scale: [
                                                        0,
                                                        1,
                                                        1.4,
                                                    ],
                                                }}
                                                transition={{
                                                    delay:
                                                        0.12 +
                                                        index *
                                                        0.03,
                                                    duration:
                                                        0.7,
                                                    ease:
                                                        "easeOut",
                                                }}
                                                className="
                                                    absolute
                                                    h-[2px]
                                                    w-3
                                                    rounded-full
                                                    bg-white/60
                                                "
                                            />
                                        ),
                                    )}


                                    {/* Main sparkle */}

                                    <motion.span
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                            rotate:
                                                -30,
                                        }}
                                        animate={{
                                            opacity:
                                                [
                                                    0,
                                                    1,
                                                    1,
                                                    0,
                                                ],
                                            scale: [
                                                0,
                                                1.35,
                                                1,
                                                0.8,
                                            ],
                                            rotate: [
                                                -30,
                                                0,
                                                12,
                                            ],
                                        }}
                                        transition={{
                                            delay: 0.03,
                                            duration: 0.7,
                                            ease:
                                                "easeOut",
                                        }}
                                        className="
                                            pointer-events-none
                                            absolute
                                            -right-2
                                            -top-3
                                            text-[15px]
                                            text-white
                                            drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                        "
                                    >
                                        ✦
                                    </motion.span>


                                    {/* Secondary sparkle */}

                                    <motion.span
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        animate={{
                                            opacity:
                                                [
                                                    0,
                                                    0.7,
                                                    0,
                                                ],
                                            scale: [
                                                0,
                                                1,
                                                1.3,
                                            ],
                                        }}
                                        transition={{
                                            delay: 0.18,
                                            duration: 0.6,
                                        }}
                                        className="
                                            pointer-events-none
                                            absolute
                                            -bottom-1
                                            -left-2
                                            text-[8px]
                                            text-violet-200
                                            drop-shadow-[0_0_7px_rgba(196,181,253,0.8)]
                                        "
                                    >
                                        ✦
                                    </motion.span>


                                    {/* Achievement icon */}

                                    <motion.div
                                        initial={{
                                            rotate:
                                                -12,
                                            scale: 0.55,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: [
                                                -12,
                                                4,
                                                0,
                                            ],
                                            scale: [
                                                0.55,
                                                1.16,
                                                0.96,
                                                1,
                                            ],
                                            opacity: 1,
                                        }}
                                        transition={{
                                            delay: 0.1,
                                            duration: 0.65,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className={`
                                            relative
                                            z-10
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-[15px]
                                            border
                                            bg-white/[0.035]
                                            shadow-[0_0_30px_rgba(255,255,255,0.03)]

                                            ${visual.borderClassName}
                                            ${visual.iconClassName}
                                        `}
                                    >
                                        <Icon className="text-lg" />
                                    </motion.div>
                                </div>


                                {/* Copy */}

                                <div
                                    className="
                                        min-w-0
                                        flex-1
                                        pr-5
                                    "
                                >
                                    {/* Unlock + rarity */}

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                                y: 4,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: 0.12,
                                                duration: 0.35,
                                            }}
                                            className={`
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.22em]

                                                ${visual.labelClassName}
                                            `}
                                        >
                                            Achievement unlocked
                                        </motion.p>

                                        <span
                                            className="
                                                text-[8px]
                                                text-slate-700
                                            "
                                        >
                                            •
                                        </span>

                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                delay: 0.25,
                                            }}
                                            className="
                                                text-[8px]
                                                font-medium
                                                uppercase
                                                tracking-[0.16em]
                                                text-slate-600
                                            "
                                        >
                                            {
                                                visual.rarity
                                            }
                                        </motion.span>
                                    </div>


                                    {/* Title */}

                                    <motion.h3
                                        initial={{
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.16,
                                            duration: 0.4,
                                        }}
                                        className="
                                            mt-1
                                            text-[15px]
                                            font-semibold
                                            tracking-[-0.02em]
                                            text-white
                                        "
                                    >
                                        {
                                            achievement.title
                                        }
                                    </motion.h3>


                                    {/* Description */}

                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        transition={{
                                            delay: 0.22,
                                            duration: 0.4,
                                        }}
                                        className="
                                            mt-1
                                            text-xs
                                            leading-5
                                            text-slate-500
                                        "
                                    >
                                        {
                                            achievement.description
                                        }
                                    </motion.p>
                                </div>
                            </div>


                            {/* Draining timer */}

                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-px
                                    w-full
                                    bg-white/[0.04]
                                "
                            >
                                <motion.div
                                    initial={{
                                        scaleX: 1,
                                    }}
                                    animate={{
                                        scaleX: 0,
                                    }}
                                    transition={{
                                        duration: 3.8,
                                        ease: "linear",
                                    }}
                                    style={{
                                        transformOrigin:
                                            "left",
                                    }}
                                    className="
                                        h-full
                                        w-full
                                        bg-gradient-to-r
                                        from-cyan-300/70
                                        via-violet-300/80
                                        to-fuchsia-300/70
                                    "
                                />
                            </div>
                        </motion.div>
                    </>
                )}
        </AnimatePresence>
    );
}