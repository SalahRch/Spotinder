import { motion } from "framer-motion";

import {
    FiMoreHorizontal,
    FiMusic,
    FiPause,
    FiPlay,
} from "react-icons/fi";

import type { LikedSong } from "../types/likes";

type LikedSongRowProps = {
    song: LikedSong;
    index: number;

    isPlaying?: boolean;

    onPlay?: (
        song: LikedSong,
    ) => Promise<void> | void;
};

export default function LikedSongRow({
                                         song,
                                         index,
                                         isPlaying = false,
                                         onPlay,
                                     }: LikedSongRowProps) {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 12,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay:
                    Math.min(
                        index * 0.035,
                        0.35,
                    ),
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={`
    group
    relative
    flex
    items-center
    gap-4
    rounded-[20px]
    border
    px-3
    py-3
    transition
    duration-300

    ${
                isPlaying
                    ? `
                border-violet-400/20
                bg-violet-400/[0.045]
                shadow-[0_16px_45px_rgba(139,92,246,0.08)]
            `
                    : `
                border-transparent
                hover:border-white/[0.07]
                hover:bg-white/[0.035]
                hover:shadow-[0_16px_45px_rgba(0,0,0,0.18)]
            `
            }
`}
        >
            {/* Index */}

            <div
                className="
                    hidden
                    w-7
                    shrink-0
                    text-center
                    text-xs
                    text-slate-600
                    sm:block
                "
            >
                {index + 1}
            </div>

            {/* Artwork */}

            <div
                className="
                    relative
                    h-14
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-[14px]
                    border
                    border-white/[0.08]
                    bg-white/[0.04]
                "
            >
                {song.albumImage ? (
                    <img
                        src={
                            song.albumImage
                        }
                        alt={`${song.title} cover`}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-110
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
                            text-slate-500
                        "
                    >
                        <FiMusic />
                    </div>
                )}

                <button
                    type="button"
                    aria-label={
                        isPlaying
                            ? `Pause ${song.title}`
                            : `Play ${song.title}`
                    }
                    onClick={() => {
                        void onPlay?.(song);
                    }}
                    className={`
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-black/45
        text-white
        backdrop-blur-[2px]
        transition
        duration-300

        ${
                        isPlaying
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                    }
    `}
                >
                    {isPlaying ? (
                        <FiPause className="text-lg" />
                    ) : (
                        <FiPlay className="ml-0.5 text-lg" />
                    )}
                </button>
            </div>

            {/* Metadata */}

            <div className="min-w-0 flex-1">
                <h3
                    className="
                        truncate
                        text-sm
                        font-medium
                        text-slate-100
                        transition-colors
                        group-hover:text-white
                    "
                >
                    {song.title}
                </h3>

                <p
                    className="
                        mt-1
                        truncate
                        text-xs
                        text-slate-500
                    "
                >
                    {song.artist}
                </p>
            </div>

            {/* Status */}

            <div
                className="
                    hidden
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    px-3
                    py-1.5
                    text-[11px]
                    text-slate-500
                    md:flex
                "
            >
                <span
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400/80
                    "
                />

                Liked
            </div>

            {/* Actions */}

            <button
                type="button"
                aria-label={`More options for ${song.title}`}
                className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-slate-600
                    opacity-50
                    transition
                    duration-300
                    hover:bg-white/[0.06]
                    hover:text-white
                    group-hover:opacity-100
                "
            >
                <FiMoreHorizontal />
            </button>
        </motion.article>
    );
}