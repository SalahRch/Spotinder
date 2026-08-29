import { motion } from "framer-motion";
import {
    FiMusic,
    FiPause,
    FiPlay,
    FiRefreshCw,
    FiX,
} from "react-icons/fi";

import { usePlayer } from "../context/PlayerContext.ts";

function formatTime(milliseconds: number) {
    if (!milliseconds) {
        return "0:00";
    }

    const totalSeconds =
        Math.floor(milliseconds / 1000);

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

export default function DiscoverNowPlaying() {
    const player = usePlayer();

    if (!player.currentTrack) {
        return null;
    }

    const progress =
        player.duration > 0
            ? Math.min(
                (player.position /
                    player.duration) *
                100,
                100,
            )
            : 0;

    const handleTogglePlayback =
        async () => {
            if (player.isPlaying) {
                await player.pause();
            } else {
                await player.resume();
            }
        };

    return (
        <motion.aside
            initial={{
                opacity: 0,
                x: -16,
                y: 12,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                x: -16,
                y: 12,
                scale: 0.96,
            }}
            transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                fixed
                bottom-5
                left-28
                z-[100]
                w-[205px]
            "
        >
            <div
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/[0.08]
                    bg-[#111827]/92
                    p-3
                    shadow-[0_28px_90px_rgba(0,0,0,0.48)]
                    backdrop-blur-2xl
                    transition
                    duration-300
                    hover:border-violet-400/20
                    hover:shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_50px_rgba(139,92,246,0.07)]
                "
            >
                {/* Ambient glow */}

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
                        bg-violet-500/15
                        blur-[55px]
                    "
                />

                <div className="relative z-10">

                    {/* Artwork */}

                    <div
                        className="
                            relative
                            aspect-square
                            w-full
                            overflow-hidden
                            rounded-[18px]
                            border
                            border-white/[0.08]
                            bg-white/[0.04]
                            shadow-[0_18px_50px_rgba(0,0,0,0.32)]
                        "
                    >
                        {player.currentTrack.albumImage ? (
                            <img
                                src={
                                    player
                                        .currentTrack
                                        .albumImage
                                }
                                alt={`${player.currentTrack.title} cover`}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition
                                    duration-500
                                    group-hover:scale-[1.03]
                                    group-hover:brightness-[0.65]
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    text-3xl
                                    text-slate-500
                                    transition
                                    duration-300
                                    group-hover:bg-black/30
                                "
                            >
                                <FiMusic />
                            </div>
                        )}

                        {/* Hover overlay */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-black/10
                                opacity-0
                                transition
                                duration-300
                                group-hover:opacity-100
                            "
                        />

                        {/* Hover controls */}

                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                opacity-0
                                transition
                                duration-300
                                group-hover:opacity-100
                            "
                        >
                            <motion.button
                                type="button"
                                aria-label="Restart track"
                                title="Restart track"
                                whileHover={{
                                    scale: 1.08,
                                }}
                                whileTap={{
                                    scale: 0.94,
                                }}
                                onClick={() => {
                                    void player.restart();
                                }}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-black/40
                                    text-white
                                    shadow-lg
                                    backdrop-blur-md
                                "
                            >
                                <FiRefreshCw />
                            </motion.button>

                            <motion.button
                                type="button"
                                aria-label={
                                    player.isPlaying
                                        ? "Pause track"
                                        : "Resume track"
                                }
                                whileHover={{
                                    scale: 1.08,
                                }}
                                whileTap={{
                                    scale: 0.94,
                                }}
                                onClick={() => {
                                    void handleTogglePlayback();
                                }}
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white
                                    text-slate-950
                                    shadow-[0_10px_30px_rgba(0,0,0,0.28)]
                                "
                            >
                                {player.isPlaying ? (
                                    <FiPause className="text-lg" />
                                ) : (
                                    <FiPlay className="ml-0.5 text-lg" />
                                )}
                            </motion.button>

                            <motion.button
                                type="button"
                                aria-label="Stop playback"
                                title="Stop playback"
                                whileHover={{
                                    scale: 1.08,
                                }}
                                whileTap={{
                                    scale: 0.94,
                                }}
                                onClick={() => {
                                    void player.stopAndReset();
                                }}
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-black/40
                                    text-white/70
                                    shadow-lg
                                    backdrop-blur-md
                                "
                            >
                                <FiX />
                            </motion.button>
                        </div>
                        {/* Hover progress */}

                        <div
                            className="
        absolute
        bottom-3
        left-3
        right-3
        translate-y-1
        opacity-0
        transition-all
        duration-300
        group-hover:translate-y-0
        group-hover:opacity-100
    "
                        >
                            <div className="flex items-center gap-2">
        <span
            className="
                min-w-[24px]
                text-[9px]
                font-medium
                text-white/70
            "
        >
            {formatTime(player.position)}
        </span>

                                <div
                                    className="
                h-[3px]
                flex-1
                overflow-hidden
                rounded-full
                bg-white/20
                backdrop-blur
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
                    h-full
                    rounded-full
                    bg-white
                "
                                    />
                                </div>

                                <span
                                    className="
                min-w-[24px]
                text-right
                text-[9px]
                font-medium
                text-white/70
            "
                                >
            {formatTime(player.duration)}
        </span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}

                    <div className="px-1 pb-1 pt-4">
                        <h3
                            className="
                                truncate
                                text-base
                                font-semibold
                                tracking-tight
                                text-white
                            "
                        >
                            {player.currentTrack.title}
                        </h3>

                        <p
                            className="
                                mt-1
                                truncate
                                text-xs
                                text-slate-500
                            "
                        >
                            {player.currentTrack.artist}
                        </p>
                    </div>

                    {/* Hover playback details */}

                </div>
            </div>
        </motion.aside>
    );
}