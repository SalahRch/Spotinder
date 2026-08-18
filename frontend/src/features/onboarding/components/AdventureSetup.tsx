import {
    motion,
} from "framer-motion";

import {
    useState,
} from "react";

import {
    onboardingService,
} from "../services/onboarding";

import api from "@/services/api";

type AdventureSetupProps = {
    onComplete: () => Promise<void>;
};

export default function AdventureSetup({
                                           onComplete,
                                       }: AdventureSetupProps) {
    const [
        adventureLevel,
        setAdventureLevel,
    ] = useState(50);

    const [
        isSaving,
        setIsSaving,
    ] = useState(false);

    const spread =
        35 +
        adventureLevel * 1.05;

    const glowStrength =
        0.08 +
        adventureLevel / 1000;

    const message =
        adventureLevel < 30
            ? "Stay close to the sounds you already love."
            : adventureLevel < 60
                ? "Blend familiar favorites with some new territory."
                : adventureLevel < 85
                    ? "Push beyond your usual taste and explore wider."
                    : "Go far. Surprise me with sounds I would never expect.";

    const handleComplete =
        async () => {
            try {
                setIsSaving(true);

                await api.patch(
                    "/users/me/preferences",
                    {
                        adventureLevel,
                    },
                );

                await onboardingService.complete();

                await onComplete();
            } finally {
                setIsSaving(false);
            }
        };

    return (
        <div
            className="
                mx-auto
                flex
                w-full
                max-w-[900px]
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
                    tracking-[0.32em]
                    text-cyan-300/70
                "
            >
                Adventure mode
            </motion.p>

            {/* Heading */}

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
                    delay: 0.08,
                    duration: 0.55,
                }}
                className="
                    mt-3
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
                How far should we go?
            </motion.h1>

            <motion.p
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.16,
                    duration: 0.5,
                }}
                className="
                    mt-4
                    max-w-xl
                    text-sm
                    leading-7
                    text-slate-500
                "
            >
                Choose how far Spotinder should
                push beyond your familiar listening world.
            </motion.p>

            {/* Reactive visual */}

            <div
                className="
        relative
        mt-6
        h-[200px]
        w-full
        max-w-[620px]
    "
            >
                {/* Background aura */}

                <motion.div
                    animate={{
                        scale:
                            0.85 +
                            adventureLevel /
                            180,
                        opacity:
                        glowStrength,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[200px]
                        w-[360px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        via-violet-500
                        to-fuchsia-500
                        blur-[90px]
                    "
                />

                {/* Comfort core */}

                <motion.div
                    animate={{
                        width:
                            110 +
                            adventureLevel *
                            0.35,
                        height:
                            70 +
                            adventureLevel *
                            0.2,
                        opacity:
                            0.18 +
                            adventureLevel /
                            700,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-[50%]
                        border
                        border-violet-300/[0.15]
                    "
                />

                {/* Discovery points */}

                {Array.from({
                    length: 12,
                }).map(
                    (
                        _,
                        index,
                    ) => {
                        const angle =
                            (index /
                                12) *
                            Math.PI *
                            2 +
                            index *
                            0.42;

                        const radius =
                            spread *
                            (0.55 +
                                ((index *
                                        19) %
                                    40) /
                                100);

                        const x =
                            Math.cos(
                                angle,
                            ) *
                            radius;

                        const y =
                            Math.sin(
                                angle,
                            ) *
                            radius *
                            0.58;

                        return (
                            <motion.span
                                key={
                                    index
                                }
                                animate={{
                                    x,
                                    y,
                                    opacity:
                                        0.3 +
                                        adventureLevel /
                                        170,
                                    scale:
                                        0.75 +
                                        adventureLevel /
                                        350,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-1.5
                                    w-1.5
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full

                                    ${
                                    index %
                                    3 ===
                                    0
                                        ? "bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.8)]"
                                        : index %
                                        3 ===
                                        1
                                            ? "bg-violet-200 shadow-[0_0_14px_rgba(196,181,253,0.8)]"
                                            : "bg-fuchsia-200 shadow-[0_0_14px_rgba(245,208,254,0.75)]"
                                }
                                `}
                            />
                        );
                    },
                )}

                {/* Center */}

                <motion.div
                    animate={{
                        scale:
                            1 +
                            adventureLevel /
                            500,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        flex
                        h-[72px]
                        w-[72px]
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
                    <div
                        className="
                            h-3
                            w-3
                            rotate-45
                            bg-gradient-to-br
                            from-cyan-200
                            via-violet-200
                            to-fuchsia-200
                            shadow-[0_0_24px_rgba(196,181,253,0.85)]
                        "
                    />
                </motion.div>
            </div>

            {/* Slider card */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 18,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.18,
                    duration: 0.55,
                }}
                className="
                    mt-1
                    w-full
                    max-w-[680px]
                    rounded-[28px]
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-6
                "
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >
                    <span
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-600
                        "
                    >
                        Comfort zone
                    </span>

                    <motion.span
                        key={
                            adventureLevel
                        }
                        initial={{
                            opacity: 0.6,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        className="
                            text-3xl
                            font-semibold
                            tracking-[-0.04em]
                            text-white
                        "
                    >
                        {adventureLevel}%
                    </motion.span>

                    <span
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-600
                        "
                    >
                        Explore everything
                    </span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                        adventureLevel
                    }
                    onChange={(
                        event,
                    ) =>
                        setAdventureLevel(
                            Number(
                                event
                                    .target
                                    .value,
                            ),
                        )
                    }
                    className="
                        mt-7
                        w-full
                        cursor-pointer
                        accent-violet-400
                    "
                />

                <motion.p
                    key={
                        message
                    }
                    initial={{
                        opacity: 0,
                        y: 4,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    className="
                        mt-5
                        text-sm
                        leading-6
                        text-slate-400
                    "
                >
                    {message}
                </motion.p>
            </motion.div>

            {/* CTA */}

            <motion.button
                type="button"
                onClick={
                    handleComplete
                }
                disabled={
                    isSaving
                }
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.28,
                    duration: 0.5,
                }}
                whileHover={{
                    y: -2,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                className="
                    mt-5
                    rounded-full
                    border
                    border-violet-300/[0.18]
                    bg-violet-300/[0.09]
                    px-8
                    py-3
                    text-sm
                    font-medium
                    text-violet-100
                    transition
                    hover:border-violet-300/[0.30]
                    hover:bg-violet-300/[0.15]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {isSaving
                    ? "Starting your journey..."
                    : "Start discovering"}
            </motion.button>
        </div>
    );
}