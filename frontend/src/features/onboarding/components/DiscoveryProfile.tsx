import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import type {
    OnboardingProfile,
} from "../types/onboarding";

type DiscoveryProfileProps = {
    profile: OnboardingProfile;
    onContinue: () => void;
};

export default function DiscoveryProfile({
                                             profile,
                                             onContinue,
                                         }: DiscoveryProfileProps) {
    return (
        <div
            className="
                mx-auto
                flex
                w-full
                max-w-[920px]
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
                    text-violet-300/70
                "
            >
                Your discovery profile
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
                We found your sound.
            </motion.h1>

            <motion.p
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.18,
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
                This is the listening world
                Spotinder will use as the starting
                point for everything you discover.
            </motion.p>

            {/* Music fingerprint */}

            <div
                className="
                    relative
                    mt-10
                    h-[230px]
                    w-full
                    max-w-[620px]
                "
            >
                {/* Ambient glow */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[180px]
                        w-[440px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-violet-500/[0.10]
                        blur-[90px]
                    "
                />

                {profile.topTracks
                    .slice(0, 5)
                    .map(
                        (
                            track,
                            index,
                        ) => {
                            const positions = [
                                `
                                    left-1/2
                                    top-[4px]
                                    z-30
                                    h-[140px]
                                    w-[140px]
                                    -translate-x-1/2
                                `,
                                `
                                    left-[15%]
                                    top-[45px]
                                    z-10
                                    h-[120px]
                                    w-[120px]
                                    -rotate-6
                                `,
                                `
                                    right-[15%]
                                    top-[45px]
                                    z-10
                                    h-[120px]
                                    w-[120px]
                                    rotate-6
                                `,
                                `
                                    left-[31%]
                                    top-[90px]
                                    z-20
                                    h-[112px]
                                    w-[112px]
                                    -rotate-3
                                `,
                                `
                                    right-[31%]
                                    top-[90px]
                                    z-20
                                    h-[112px]
                                    w-[112px]
                                    rotate-3
                                `,
                            ];

                            return (
                                <motion.div
                                    key={
                                        track.spotifyTrackId
                                    }
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        y: 24,
                                    }}
                                    animate={{
                                        opacity:
                                            index === 0
                                                ? 1
                                                : 0.82,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay:
                                            0.2 +
                                            index *
                                            0.07,
                                        duration: 0.6,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    whileHover={{
                                        y: -4,
                                        scale:
                                            index === 0
                                                ? 1.02
                                                : 1.04,
                                    }}
                                    className={`
                                        absolute
                                        overflow-hidden
                                        rounded-[22px]
                                        border
                                        border-white/[0.10]
                                        bg-[#111827]
                                        shadow-[0_24px_70px_rgba(0,0,0,0.38)]
                                        ${positions[index]}
                                    `}
                                >
                                    {track.albumImage ? (
                                        <img
                                            src={
                                                track.albumImage
                                            }
                                            alt=""
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <div
                                            className="
                                                h-full
                                                w-full
                                                bg-white/[0.04]
                                            "
                                        />
                                    )}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/20
                                            to-transparent
                                        "
                                    />
                                </motion.div>
                            );
                        },
                    )}
            </div>

            {/* Artist label */}

            <motion.p
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.48,
                    duration: 0.45,
                }}
                className="
                    mt-2
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-slate-600
                "
            >
                Artists in your rotation
            </motion.p>

            {/* Artists */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.55,
                    duration: 0.5,
                }}
                className="
                    mt-3
                    flex
                    max-w-[720px]
                    flex-wrap
                    items-center
                    justify-center
                    gap-2
                "
            >
                {profile.topArtists.map(
                    (artist) => (
                        <span
                            key={artist}
                            className="
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.025]
                                px-4
                                py-2
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            {artist}
                        </span>
                    ),
                )}
            </motion.div>

            {/* Analysis summary */}

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.7,
                    duration: 0.5,
                }}
                className="
                    mt-7
                    flex
                    items-center
                    gap-3
                "
            >
                <span
                    className="
                        h-px
                        w-8
                        bg-gradient-to-r
                        from-transparent
                        to-violet-300/30
                    "
                />

                <p
                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-600
                    "
                >
                    <span className="text-slate-300">
                        {profile.songsAnalyzed}
                    </span>{" "}
                    songs analyzed
                </p>

                <span
                    className="
                        h-px
                        w-8
                        bg-gradient-to-l
                        from-transparent
                        to-violet-300/30
                    "
                />
            </motion.div>

            {/* CTA */}

            <motion.button
                type="button"
                onClick={onContinue}
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.8,
                    duration: 0.5,
                }}
                whileHover={{
                    y: -2,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                className="
                    group
                    mt-8
                    flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-violet-300/[0.16]
                    bg-violet-300/[0.08]
                    px-7
                    py-3
                    text-sm
                    font-medium
                    text-violet-100
                    transition
                    hover:border-violet-300/[0.26]
                    hover:bg-violet-300/[0.13]
                "
            >
                Shape my discovery

                <FiArrowRight
                    className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />
            </motion.button>
        </div>
    );
}