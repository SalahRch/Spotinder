import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    FiArrowRight,
    FiEyeOff,
    FiHeart,
    FiX,
} from "react-icons/fi";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";
import JourneyPersonaAtmosphere from "@/features/discovery/components/JourneyPersonaAtmosphere.tsx";

type DailyJourneyRecapProps = {
    open: boolean;
    recap?: DailyDiscoveryRecap;
    loading?: boolean;
    onClose: () => void;

    /*
     * We'll wire this to Journey Detail
     * once the route exists.
     */
    onViewJourney?: (
        recap: DailyDiscoveryRecap,
    ) => void;
};

function formatPersona(
    persona:
    DailyDiscoveryRecap["discoveryPersona"],
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(
            /\b\w/g,
            (letter) =>
                letter.toUpperCase(),
        );
}

export default function DailyJourneyRecap({
                                              open,
                                              recap,
                                              loading = false,
                                              onClose,
                                              onViewJourney,
                                          }: DailyJourneyRecapProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
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
                        duration: 0.22,
                    }}
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-[#060910]/82
                        px-6
                        py-8
                        backdrop-blur-xl
                    "
                >
                    {recap && (
                        <JourneyPersonaAtmosphere
                            persona={recap.discoveryPersona}
                        />
                    )}


                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 22,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 12,
                            scale: 0.98,
                        }}
                        transition={{
                            duration: 0.42,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            relative
                            w-full
                            max-w-[620px]
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.08]
                            bg-[#0D131E]/95
                            px-7
                            py-7
                            shadow-[0_35px_110px_rgba(0,0,0,0.5)]
                            backdrop-blur-2xl
                            md:px-9
                            md:py-8
                        "
                    >
                        {/* top glow */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                inset-x-16
                                top-0
                                h-px
                                bg-gradient-to-r
                                from-transparent
                                via-violet-300/60
                                to-transparent
                            "
                        />

                        {/* internal aura */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                -right-24
                                -top-24
                                h-[260px]
                                w-[260px]
                                rounded-full
                                bg-violet-500/[0.08]
                                blur-[90px]
                            "
                        />

                        <button
                            type="button"
                            aria-label="Close recap"
                            onClick={onClose}
                            className="
                                absolute
                                right-4
                                top-4
                                z-20
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                text-slate-500
                                transition
                                hover:bg-white/[0.07]
                                hover:text-white
                            "
                        >
                            <FiX />
                        </button>

                        {loading ||
                        !recap ? (
                            <div
                                className="
                                    flex
                                    min-h-[360px]
                                    items-center
                                    justify-center
                                "
                            >
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat:
                                        Infinity,
                                        ease: "linear",
                                    }}
                                    className="
                                        h-8
                                        w-8
                                        rounded-full
                                        border-2
                                        border-white/10
                                        border-t-violet-300
                                    "
                                />
                            </div>
                        ) : (
                            <div
                                className="
                                    relative
                                    z-10
                                "
                            >
                                {/* Header */}

                                <motion.header
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.08,
                                        duration: 0.5,
                                    }}
                                    className="
                                        text-center
                                    "
                                >
                                    <p
                                        className="
                                            text-[9px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.32em]
                                            text-violet-300/65
                                        "
                                    >
                                        Discovery Journey
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-[9px]
                                            uppercase
                                            tracking-[0.18em]
                                            text-slate-700
                                        "
                                    >
                                        {new Date(
                                            `${recap.date}T00:00:00`,
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                month:
                                                    "long",
                                                day:
                                                    "numeric",
                                                year:
                                                    "numeric",
                                            },
                                        )}
                                    </p>

                                    <motion.h1
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            filter:
                                                "blur(6px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter:
                                                "blur(0px)",
                                        }}
                                        transition={{
                                            delay: 0.16,
                                            duration: 0.58,
                                        }}
                                        className="
                                            mx-auto
                                            mt-5
                                            max-w-xl
                                            bg-gradient-to-r
                                            from-cyan-100
                                            via-white
                                            to-violet-200
                                            bg-clip-text
                                            text-3xl
                                            font-semibold
                                            tracking-[-0.05em]
                                            text-transparent
                                            md:text-[38px]
                                        "
                                    >
                                        {
                                            recap.journeyTitle
                                        }
                                    </motion.h1>

                                    <div
                                        className="
                                            mt-5
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    >
                                        <motion.span
                                            animate={{
                                                opacity: [
                                                    0.45,
                                                    1,
                                                    0.45,
                                                ],
                                                scale: [
                                                    1,
                                                    1.18,
                                                    1,
                                                ],
                                            }}
                                            transition={{
                                                duration: 2.8,
                                                repeat:
                                                Infinity,
                                                ease:
                                                    "easeInOut",
                                            }}
                                            className="
                                                h-1.5
                                                w-1.5
                                                rotate-45
                                                bg-violet-300
                                                shadow-[0_0_14px_rgba(196,181,253,0.75)]
                                            "
                                        />

                                        <span
                                            className="
                                                text-[9px]
                                                font-medium
                                                uppercase
                                                tracking-[0.2em]
                                                text-slate-600
                                            "
                                        >
                                            You discovered as
                                        </span>
                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            bg-gradient-to-r
                                            from-violet-300
                                            to-fuchsia-300
                                            bg-clip-text
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.28em]
                                            text-transparent
                                        "
                                    >
                                        The{" "}
                                        {formatPersona(
                                            recap.discoveryPersona,
                                        )}
                                    </p>

                                    <p
                                        className="
                                            mx-auto
                                            mt-4
                                            max-w-[460px]
                                            text-sm
                                            leading-6
                                            text-slate-400
                                        "
                                    >
                                        {
                                            recap.recapMessage
                                        }
                                    </p>
                                </motion.header>

                                {/* compact stats */}

                                <div
                                    className="
                                        mt-7
                                        grid
                                        grid-cols-3
                                        divide-x
                                        divide-white/[0.06]
                                        rounded-[20px]
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.02]
                                        px-2
                                        py-4
                                    "
                                >
                                    <CompactStat
                                        value={
                                            recap.explored
                                        }
                                        label="Explored"
                                    />

                                    <CompactStat
                                        value={
                                            recap.liked
                                        }
                                        label="Liked"
                                        icon={
                                            <FiHeart />
                                        }
                                    />

                                    <CompactStat
                                        value={`${Math.round(
                                            recap.likeRate,
                                        )}%`}
                                        label="Hit rate"
                                    />
                                </div>

                                {/* Adventure */}

                                <div
                                    className="
                                        mt-5
                                        rounded-[20px]
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.02]
                                        px-5
                                        py-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >
                                        <p
                                            className="
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.18em]
                                                text-cyan-300/70
                                            "
                                        >
                                            Adventure
                                        </p>

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {Math.round(
                                                recap.averageAdventureLevel,
                                            )}
                                            %
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            mt-3
                                            h-1
                                            overflow-hidden
                                            rounded-full
                                            bg-white/[0.06]
                                        "
                                    >
                                        <motion.div
                                            initial={{
                                                width: 0,
                                            }}
                                            animate={{
                                                width: `${Math.min(
                                                    recap.averageAdventureLevel,
                                                    100,
                                                )}%`,
                                            }}
                                            transition={{
                                                delay: 0.28,
                                                duration: 0.7,
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
                                                via-violet-400
                                                to-fuchsia-400
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Blind only if relevant */}

                                {recap.blindExplored >
                                    0 && (
                                        <div
                                            className="
                                            mt-3
                                            flex
                                            items-center
                                            justify-between
                                            rounded-[18px]
                                            border
                                            border-white/[0.05]
                                            bg-white/[0.015]
                                            px-5
                                            py-3
                                        "
                                        >
                                            <div
                                                className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                            >
                                                <FiEyeOff
                                                    className="
                                                    text-violet-300/70
                                                "
                                                />

                                                <span
                                                    className="
                                                    text-xs
                                                    text-slate-500
                                                "
                                                >
                                                Heard blind
                                            </span>
                                            </div>

                                            <span
                                                className="
                                                text-xs
                                                font-medium
                                                text-slate-300
                                            "
                                            >
                                            {
                                                recap.blindExplored
                                            }
                                                {" · "}
                                                {
                                                    recap.blindLiked
                                                }{" "}
                                                liked
                                        </span>
                                        </div>
                                    )}

                                {/* Actions */}

                                <div
                                    className="
                                        mt-7
                                        flex
                                        flex-col
                                        gap-3
                                        sm:flex-row
                                        sm:justify-center
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                onViewJourney
                                            ) {
                                                onViewJourney(
                                                    recap,
                                                );

                                                return;
                                            }

                                            onClose();
                                        }}
                                        className="
                                            group
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-violet-300/[0.18]
                                            bg-violet-300/[0.09]
                                            px-7
                                            py-3
                                            text-sm
                                            font-medium
                                            text-violet-100
                                            transition
                                            hover:border-violet-300/[0.30]
                                            hover:bg-violet-300/[0.14]
                                        "
                                    >
                                        View Journey

                                        <FiArrowRight
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            onClose
                                        }
                                        className="
                                            rounded-full
                                            border
                                            border-white/[0.07]
                                            bg-white/[0.025]
                                            px-6
                                            py-3
                                            text-sm
                                            text-slate-400
                                            transition
                                            hover:bg-white/[0.05]
                                            hover:text-white
                                        "
                                    >
                                        Keep exploring
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

type CompactStatProps = {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
};

function CompactStat({
                         value,
                         label,
                         icon,
                     }: CompactStatProps) {
    return (
        <div
            className="
                px-3
                text-center
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xl
                    font-semibold
                    text-white
                "
            >
                {icon && (
                    <span className="text-emerald-300">
                        {icon}
                    </span>
                )}

                {value}
            </div>

            <p
                className="
                    mt-1
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-slate-600
                "
            >
                {label}
            </p>
        </div>
    );
}