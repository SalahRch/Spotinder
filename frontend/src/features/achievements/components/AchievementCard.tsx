import {
    motion,
} from "framer-motion";

import {
    FiCompass,
    FiEyeOff,
    FiMap,
    FiStar,
} from "react-icons/fi";

import {
    LuFlame,
} from "react-icons/lu";

import type {
    IconType,
} from "react-icons";

import type {
    Achievement,
} from "../types/achievement";

type AchievementCardProps = {
    achievement: Achievement;
};

type AchievementVisual = {
    icon: IconType;
    accent: string;
    glow: string;
    border: string;
};

const visuals: Record<
    Achievement["type"],
    AchievementVisual
> = {
    BLIND_FAITH: {
        icon: FiEyeOff,
        accent:
            "text-cyan-200",
        glow:
            "bg-cyan-400/[0.08]",
        border:
            "border-cyan-300/[0.12]",
    },

    OPEN_MIND: {
        icon: FiCompass,
        accent:
            "text-violet-200",
        glow:
            "bg-violet-500/[0.08]",
        border:
            "border-violet-300/[0.12]",
    },

    HOT_STREAK: {
        icon: LuFlame,
        accent:
            "text-orange-200",
        glow:
            "bg-orange-400/[0.08]",
        border:
            "border-orange-300/[0.12]",
    },

    FIRST_JOURNEY: {
        icon: FiMap,
        accent:
            "text-fuchsia-200",
        glow:
            "bg-fuchsia-500/[0.08]",
        border:
            "border-fuchsia-300/[0.12]",
    },

    HIDDEN_GEM: {
        icon: FiStar,
        accent:
            "text-emerald-200",
        glow:
            "bg-emerald-400/[0.08]",
        border:
            "border-emerald-300/[0.12]",
    },
};

export default function AchievementCard({
                                            achievement,
                                        }: AchievementCardProps) {
    const visual =
        visuals[
            achievement.type
            ];

    const Icon =
        visual.icon;

    const hiddenLocked =
        achievement.hidden &&
        !achievement.unlocked;

    const rareUnlocked =
        achievement.unlocked &&
        achievement.rarity ===
        "RARE";

    const milestoneUnlocked =
        achievement.unlocked &&
        achievement.rarity ===
        "MILESTONE";

    return (
        <motion.article
            whileHover={
                achievement.unlocked
                    ? {
                        y: -4,
                    }
                    : undefined
            }
            transition={{
                duration: 0.28,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                ],
            }}
            className={`
                group
                relative
                min-h-[195px]
                overflow-hidden
                rounded-[26px]
                border
                p-5
                transition
                duration-300

                ${
                achievement.unlocked
                    ? `
                            bg-[#0E1520]/82
                            hover:bg-[#111927]/92
                            ${visual.border}
                        `
                    : hiddenLocked
                        ? `
                            border-white/[0.035]
                            bg-white/[0.012]
                          `
                        : `
                            border-white/[0.055]
                            bg-white/[0.022]
                          `
            }
            `}
        >
            {/* Unlocked glow */}

            {achievement.unlocked && (
                <motion.div
                    aria-hidden="true"
                    animate={{
                        opacity:
                            rareUnlocked
                                ? [
                                    0.6,
                                    1,
                                    0.6,
                                ]
                                : 0.75,
                    }}
                    transition={{
                        duration: 3.2,
                        repeat:
                            rareUnlocked
                                ? Infinity
                                : 0,
                        ease: "easeInOut",
                    }}
                    className={`
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-[180px]
                        w-[180px]
                        rounded-full
                        blur-[80px]

                        ${visual.glow}
                    `}
                />
            )}

            {/* Rare glint */}

            {rareUnlocked && (
                <motion.div
                    aria-hidden="true"
                    initial={{
                        x: "-140%",
                        opacity: 0,
                    }}
                    whileHover={{
                        x: "190%",
                        opacity: [
                            0,
                            0.5,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 1.1,
                        ease: "easeOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        top-0
                        h-full
                        w-[70px]
                        rotate-[16deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.06]
                        to-transparent
                        blur-md
                    "
                />
            )}

            {/* Milestone arc */}

            {milestoneUnlocked && (
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        right-[-45px]
                        top-[-55px]
                        h-[140px]
                        w-[140px]
                        rounded-full
                        border
                        border-fuchsia-300/[0.08]
                    "
                />
            )}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                "
            >
                {/* Top row */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    {/* Icon */}

                    <div
                        className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-[14px]
                            border
                            transition
                            duration-300

                            ${
                            achievement.unlocked
                                ? `
                                        bg-white/[0.035]
                                        ${visual.border}
                                        ${visual.accent}
                                    `
                                : hiddenLocked
                                    ? `
                                        border-white/[0.035]
                                        bg-white/[0.012]
                                        text-slate-700
                                      `
                                    : `
                                        border-white/[0.06]
                                        bg-white/[0.025]
                                        text-slate-600
                                      `
                        }
                        `}
                    >
                        {hiddenLocked ? (
                            <span
                                className="
                                    text-lg
                                    font-semibold
                                "
                            >
                                ?
                            </span>
                        ) : (
                            <Icon />
                        )}
                    </div>

                    {/* Status / rarity */}

                    <span
                        className={`
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]

                            ${
                            achievement.unlocked
                                ? rareUnlocked
                                    ? "text-orange-200/70"
                                    : milestoneUnlocked
                                        ? "text-fuchsia-200/70"
                                        : "text-slate-500"
                                : hiddenLocked
                                    ? "text-slate-800"
                                    : "text-slate-600"
                        }
                        `}
                    >
                        {achievement.unlocked
                            ? achievement.rarity
                            : "Locked"}
                    </span>
                </div>

                {/* Body */}

                <div className="mt-6">
                    <h3
                        className={`
                            text-base
                            font-semibold
                            tracking-[-0.03em]
                            transition
                            duration-300

                            ${
                            achievement.unlocked
                                ? "text-white"
                                : hiddenLocked
                                    ? "text-slate-700"
                                    : "text-slate-500"
                        }
                        `}
                    >
                        {hiddenLocked
                            ? "???"
                            : achievement.title}
                    </h3>

                    <p
                        className={`
                            mt-2
                            text-xs
                            leading-5
                            transition
                            duration-300

                            ${
                            achievement.unlocked
                                ? "text-slate-500"
                                : hiddenLocked
                                    ? "text-slate-800"
                                    : "text-slate-600"
                        }
                        `}
                    >
                        {hiddenLocked
                            ? "Keep exploring. Some achievements reveal themselves only when you find them."
                            : achievement.description}
                    </p>
                </div>

                {/* Footer */}

                <div
                    className="
                        mt-auto
                        pt-5
                    "
                >
                    {achievement.unlocked &&
                    achievement.unlockedAt ? (
                        <p
                            className="
                                text-[9px]
                                uppercase
                                tracking-[0.16em]
                                text-slate-600
                            "
                        >
                            Unlocked{" "}
                            {new Date(
                                achievement.unlockedAt,
                            ).toLocaleDateString(
                                undefined,
                                {
                                    month:
                                        "short",
                                    day:
                                        "numeric",
                                    year:
                                        "numeric",
                                },
                            )}
                        </p>
                    ) : (
                        <p
                            className={`
                                text-[9px]
                                uppercase
                                tracking-[0.16em]

                                ${
                                hiddenLocked
                                    ? "text-slate-800"
                                    : "text-slate-600"
                            }
                            `}
                        >
                            {hiddenLocked
                                ? "Keep exploring"
                                : "Not yet discovered"}
                        </p>
                    )}
                </div>
            </div>
        </motion.article>
    );
}