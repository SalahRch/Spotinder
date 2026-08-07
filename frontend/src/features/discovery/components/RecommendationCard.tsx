import {
    FiMusic,
    FiPause,
    FiPlay,
} from "react-icons/fi";

import { motion } from "framer-motion";

import type { Recommendation } from "../types/discovery";

type RecommendationCardProps = {
    recommendation: Recommendation;
    blindMode?: boolean;
    backgroundCard?: boolean;

    onPlay?: (
        recommendation: Recommendation,
    ) => Promise<void> | void;

    currentTrackId?: string | null;
    isPlaying?: boolean;
    position?: number;
    duration?: number;
};

function formatTime(milliseconds: number) {
    if (!milliseconds) {
        return "0:00";
    }

    const totalSeconds = Math.floor(
        milliseconds / 1000,
    );

    const minutes = Math.floor(
        totalSeconds / 60,
    );

    const seconds =
        totalSeconds % 60;

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

export default function RecommendationCard({
                                               recommendation,
                                               blindMode = false,
                                               backgroundCard = false,

                                               onPlay,

                                               currentTrackId = null,
                                               isPlaying = false,
                                               position = 0,
                                               duration = 0,
                                           }: RecommendationCardProps) {
    const {
        id,
        title,
        artist,
        albumImage,
    } = recommendation;

    const isCurrentTrack =
        currentTrackId === id;

    const isThisTrackPlaying =
        isCurrentTrack && isPlaying;

    const playbackPosition =
        isCurrentTrack
            ? position
            : 0;

    const playbackDuration =
        isCurrentTrack
            ? duration
            : 0;

    const progress =
        playbackDuration > 0
            ? Math.min(
                (playbackPosition /
                    playbackDuration) *
                100,
                100,
            )
            : 0;

    return (
        <motion.article
            className="
                relative
                w-full
                max-w-[460px]
                overflow-hidden
                rounded-[36px]
                border
                border-white/[0.11]
                bg-[#111827]/78
                p-3
                shadow-[0_55px_140px_rgba(0,0,0,0.68)]
                backdrop-blur-2xl
                will-change-transform
            "
        >
            {/* Artwork */}

            <div
                className="
                    relative
                    z-10
                    aspect-square
                    w-full
                    overflow-hidden
                    rounded-[28px]
                    bg-gradient-to-br
                    from-violet-500/40
                    via-cyan-400/20
                    to-fuchsia-500/30
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.38)]
                "
            >
                {albumImage ? (
                    <motion.img
                        src={albumImage}
                        alt={`${title} cover`}
                        animate={{
                            scale: blindMode
                                ? 1.06
                                : isThisTrackPlaying
                                    ? 1.025
                                    : 1.015,

                            filter: blindMode
                                ? "blur(18px) brightness(0.62)"
                                : "blur(0px) brightness(1)",
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            h-full
                            w-full
                            object-cover
                            will-change-transform
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                        "
                    >
                        <div
                            className="
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/15
                                bg-white/10
                                backdrop-blur-xl
                            "
                        >
                            <FiMusic className="text-4xl text-white/80" />
                        </div>
                    </div>
                )}

                {/* Dark artwork overlay */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-transparent
                        to-transparent
                    "
                />

                {/* Artwork inner border */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[28px]
                        ring-1
                        ring-inset
                        ring-white/[0.08]
                    "
                />

                {/* Playback glow */}

                {isCurrentTrack && (
                    <motion.div
                        aria-hidden="true"
                        animate={{
                            opacity:
                                isThisTrackPlaying
                                    ? [0.18, 0.32, 0.18]
                                    : 0.12,
                        }}
                        transition={{
                            duration: 2.5,
                            repeat:
                                isThisTrackPlaying
                                    ? Infinity
                                    : 0,
                            ease: "easeInOut",
                        }}
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-tr
                            from-cyan-400/20
                            via-transparent
                            to-violet-500/20
                        "
                    />
                )}

                {/* Play / Pause */}

                {!backgroundCard && (
                    <motion.button
                        type="button"
                        aria-label={
                            isThisTrackPlaying
                                ? `Pause ${title}`
                                : `Play ${title}`
                        }
                        onClick={(event) => {
                            event.stopPropagation();

                            void onPlay?.(
                                recommendation,
                            );
                        }}
                        whileHover={{
                            scale: 1.07,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        className="
                            absolute
                            bottom-5
                            right-5
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-black/40
                            text-white
                            shadow-[0_14px_35px_rgba(0,0,0,0.35)]
                            backdrop-blur-xl
                            transition-colors
                            duration-300
                            hover:bg-white
                            hover:text-slate-950
                        "
                    >
                        {isThisTrackPlaying ? (
                            <FiPause className="text-xl" />
                        ) : (
                            <FiPlay className="ml-1 text-xl" />
                        )}
                    </motion.button>
                )}
            </div>

            {/* Only active card renders metadata */}

            {!backgroundCard && (
                <div className="px-4 pb-4 pt-5">
                    <div className="min-w-0">
                        <motion.h2
                            animate={{
                                opacity:
                                    blindMode
                                        ? 0.35
                                        : 1,

                                filter:
                                    blindMode
                                        ? "blur(7px)"
                                        : "blur(0px)",
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                                truncate
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {blindMode
                                ? "Unknown track"
                                : title}
                        </motion.h2>

                        <motion.p
                            animate={{
                                opacity:
                                    blindMode
                                        ? 0.25
                                        : 1,

                                filter:
                                    blindMode
                                        ? "blur(6px)"
                                        : "blur(0px)",
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                                mt-1.5
                                truncate
                                text-sm
                                text-slate-400
                            "
                        >
                            {blindMode
                                ? "Artist hidden until you swipe"
                                : artist}
                        </motion.p>
                    </div>

                    {/* Playback progress */}

                    <div className="mt-5">
                        <div
                            className="
                                relative
                                h-1.5
                                overflow-hidden
                                rounded-full
                                bg-white/10
                            "
                        >
                            <motion.div
                                animate={{
                                    width: `${progress}%`,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: "linear",
                                }}
                                className="
                                    absolute
                                    inset-y-0
                                    left-0
                                    rounded-full
                                    bg-gradient-to-r
                                    from-cyan-400
                                    to-violet-500
                                "
                            />
                        </div>

                        <div
                            className="
                                mt-2.5
                                flex
                                items-center
                                justify-between
                                text-[11px]
                                text-slate-500
                            "
                        >
                            <span>
                                {formatTime(
                                    playbackPosition,
                                )}
                            </span>

                            <span
                                className={
                                    isCurrentTrack
                                        ? "text-violet-300/70"
                                        : ""
                                }
                            >
                                {isCurrentTrack
                                    ? isThisTrackPlaying
                                        ? "Playing"
                                        : "Paused"
                                    : "Ready"}
                            </span>

                            <span>
                                {formatTime(
                                    playbackDuration,
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </motion.article>
    );
}