import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    useState,
    type ReactNode,
} from "react";

import {
    FiArrowRight,
    FiEyeOff,
    FiHeart,
    FiShare2,
    FiX,
} from "react-icons/fi";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";
import JourneySharePreview from "@/features/discovery/components/JourneySharePreview.tsx";

type DailyJourneyRecapProps = {
    open: boolean;
    recap?: DailyDiscoveryRecap;
    loading?: boolean;
    onClose: () => void;
};

function formatPersona(
    persona: DailyDiscoveryRecap["discoveryPersona"],
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}

function getBlindMessage(
    liked: number,
    explored: number,
) {
    if (explored === 0) {
        return "You kept every discovery in the light.";
    }

    if (liked === explored) {
        return "Every blind discovery became a favorite.";
    }

    if (liked === 0) {
        return "None of your blind discoveries made the cut.";
    }

    return `${liked} of your ${explored} blind discoveries became favorites.`;
}

export default function DailyJourneyRecap({
                                              open,
                                              recap,
                                              loading = false,
                                              onClose,
                                          }: DailyJourneyRecapProps) {

    const [
        sharePreviewOpen,
        setSharePreviewOpen,
    ] = useState(false);

    return (
        <>
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
                        duration: 0.25,
                    }}
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        overflow-y-auto
                        bg-[#060910]/85
                        p-6
                        backdrop-blur-2xl
                    "
                >
                    {/* Ambient aurora */}

                    <motion.div
                        aria-hidden="true"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.8,
                        }}
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-[650px]
                            w-[650px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-gradient-to-br
                            from-cyan-400/15
                            via-violet-500/20
                            to-fuchsia-500/10
                            blur-[150px]
                        "
                    />

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 15,
                            scale: 0.98,
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
                        className="
                            relative
                            w-full
                            max-w-[760px]
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-white/[0.08]
                            bg-[#0D131E]/90
                            p-8
                            shadow-[0_40px_120px_rgba(0,0,0,0.5)]
                            backdrop-blur-3xl
                            md:p-10
                        "
                    >
                        {/* Spotinder aura */}

                        <div
                            aria-hidden="true"
                            className="
        pointer-events-none
        absolute
        -left-32
        -top-32
        h-[360px]
        w-[360px]
        rounded-full
        bg-violet-500/[0.10]
        blur-[110px]
    "
                        />

                        <div
                            aria-hidden="true"
                            className="
        pointer-events-none
        absolute
        -right-32
        -top-20
        h-[340px]
        w-[340px]
        rounded-full
        bg-cyan-400/[0.08]
        blur-[110px]
    "
                        />

                        <motion.div
                            aria-hidden="true"
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 35,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
        pointer-events-none
        absolute
        left-1/2
        top-[125px]
        h-[210px]
        w-[500px]
        -translate-x-1/2
        rounded-[50%]
        border
        border-violet-300/[0.035]
    "
                        />
                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                inset-x-20
                                top-0
                                h-px
                                bg-gradient-to-r
                                from-transparent
                                via-violet-300/60
                                to-transparent
                            "
                        />

                        <button
                            type="button"
                            aria-label="Close recap"
                            onClick={onClose}
                            className="
                                absolute
                                right-6
                                top-6
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.04]
                                text-slate-400
                                transition
                                hover:bg-white/[0.08]
                                hover:text-white
                            "
                        >
                            <FiX />
                        </button>

                        {loading || !recap ? (
                            <div
                                className="
                                    flex
                                    min-h-[480px]
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
                                        repeat: Infinity,
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
                            <>
                                <motion.header
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1,
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="
        relative
        z-10
        text-center
    "
                                >
                                    <p
                                        className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.34em]
            text-violet-300/70
        "
                                    >
                                        Discovery Journey
                                    </p>

                                    <p
                                        className="
            mt-3
            text-[10px]
            uppercase
            tracking-[0.22em]
            text-slate-600
        "
                                    >
                                        {new Date(
                                            `${recap.date}T00:00:00`,
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            },
                                        )}
                                    </p>

                                    <motion.h1
                                        initial={{
                                            opacity: 0,
                                            y: 12,
                                            filter: "blur(8px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.65,
                                        }}
                                        className="
            mx-auto
            mt-7
            max-w-2xl
            bg-gradient-to-r
            from-cyan-200
            via-violet-200
            to-fuchsia-300
            bg-clip-text
            text-4xl
            font-semibold
            tracking-[-0.055em]
            text-transparent
            md:text-[52px]
            md:leading-[1.05]
        "
                                    >
                                        {recap.journeyTitle}
                                    </motion.h1>

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.92,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{
                                            delay: 0.38,
                                            duration: 0.5,
                                        }}
                                        className="
            relative
            mx-auto
            mt-7
            flex
            max-w-md
            flex-col
            items-center
        "
                                    >
                                        {/* little journey symbol */}

                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 1],
                                                opacity: [0.55, 1, 0.55],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="
                mb-3
                h-1.5
                w-1.5
                rotate-45
                bg-violet-300
                shadow-[0_0_18px_rgba(196,181,253,0.8)]
            "
                                        />

                                        <span
                                            className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-slate-600
            "
                                        >
            You discovered as
        </span>

                                        <span
                                            className="
                mt-2
                bg-gradient-to-r
                from-violet-300
                to-fuchsia-300
                bg-clip-text
                text-sm
                font-semibold
                uppercase
                tracking-[0.32em]
                text-transparent
            "
                                        >
            The{" "}
                                            {formatPersona(
                                                recap.discoveryPersona,
                                            )}
        </span>
                                    </motion.div>

                                    <p
                                        className="
            mx-auto
            mt-5
            max-w-lg
            text-sm
            leading-7
            text-slate-400
        "
                                    >
                                        {recap.recapMessage}
                                    </p>
                                </motion.header>

                                <div
                                    className="
                                        my-9
                                        h-px
                                        bg-white/[0.06]
                                    "
                                />

                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                        md:grid-cols-4
                                    "
                                >
                                    <Stat
                                        value={recap.explored}
                                        label="Explored"
                                    />

                                    <Stat
                                        value={recap.liked}
                                        label="Favorites"
                                        icon={<FiHeart />}
                                    />

                                    <Stat
                                        value={`${Math.round(
                                            recap.likeRate,
                                        )}%`}
                                        label="Hit rate"
                                    />

                                    <Stat
                                        value={recap.blindExplored}
                                        label="Heard blind"
                                    />
                                </div>

                                <div
                                    className="
                                        mt-4
                                        grid
                                        gap-3
                                        md:grid-cols-2
                                    "
                                >
                                    <div
                                        className="
                                            rounded-[22px]
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
                                                gap-3
                                                text-violet-300
                                            "
                                        >
                                            <FiEyeOff />

                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.18em]
                                                "
                                            >
                                                Blind instinct
                                            </p>
                                        </div>

                                        <p
                                            className="
                                                mt-4
                                                text-2xl
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {recap.blindLiked}
                                            <span
                                                className="
                                                    text-slate-600
                                                "
                                            >
                                                {" "}
                                                /{" "}
                                                {
                                                    recap.blindExplored
                                                }
                                            </span>
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                leading-5
                                                text-slate-500
                                            "
                                        >
                                            {getBlindMessage(
                                                recap.blindLiked,
                                                recap.blindExplored,
                                            )}
                                        </p>
                                    </div>

                                    <div
                                        className="
        rounded-[22px]
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
                                            justify-between
                                        "
                                    >
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-[0.18em]
                                                text-cyan-300
                                            "
                                        >
                                            Adventure Level
                                        </p>

                                        <span
                                            className="
                text-xl
                font-semibold
                tracking-[-0.03em]
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
            mt-4
            h-1.5
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
                                                width: `${Math.min(
                                                    recap.averageAdventureLevel,
                                                    100,
                                                )}%`,
                                            }}
                                            transition={{
                                                delay: 0.4,
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
                to-violet-500
            "
                                        />
                                        </div>
                                        <div
                                            className="
                                                mt-3
                                                flex
                                                items-center
                                                justify-between
                                                text-[10px]
                                                uppercase
                                                tracking-wide
                                                text-slate-600
                                            "
                                        >
                                            <span>
                                                Comfort zone
                                            </span>

                                            <span>
                                                Explore everything
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="
                                        mt-8
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
                                            setSharePreviewOpen(true);
                                        }}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-violet-400/20
                                            bg-violet-400/[0.08]
                                            px-6
                                            py-3
                                            text-sm
                                            font-medium
                                            text-violet-200
                                            transition
                                            hover:border-violet-400/35
                                            hover:bg-violet-400/[0.13]
                                        "
                                    >
                                        <FiShare2 />
                                        Share Journey
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.035]
                                            px-6
                                            py-3
                                            text-sm
                                            font-medium
                                            text-slate-300
                                            transition
                                            hover:bg-white/[0.07]
                                            hover:text-white
                                        "
                                    >
                                        Keep exploring
                                        <FiArrowRight />
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
            <JourneySharePreview
                open={sharePreviewOpen}
                recap={recap}
                onClose={() => {
                    setSharePreviewOpen(false);
                }}
            />
        </>
    );
}

type StatProps = {
    value: string | number;
    label: string;
    icon?: ReactNode;
};

function Stat({
                  value,
                  label,
                  icon,
              }: StatProps) {
    return (
        <div
            className="
                rounded-[20px]
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
                text-center
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-2xl
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
                    text-[10px]
                    font-medium
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