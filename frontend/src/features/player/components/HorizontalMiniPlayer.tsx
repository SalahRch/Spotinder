import { motion } from "framer-motion";
import {
    FiMusic,
    FiPause,
    FiPlay,
    FiRefreshCw, FiX,
} from "react-icons/fi";
import { usePlayer } from "../context/SpotifyPlayerContext";

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

export default function HorizontalMiniPlayer() {


    const player =
        usePlayer();

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
            if (!player.currentTrack) {
                return;
            }

            if (player.isPlaying) {
                await player.pause();
            } else {
                await player.resume();
            }
        };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 24,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                y: 24,
                scale: 0.96,
            }}
            transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
    fixed
    bottom-5
    left-1/2
    z-[100]
    w-[calc(100%-3rem)]
    max-w-[640px]
    -translate-x-1/2
"
        >
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/[0.09]
                    bg-[#111827]/90
                    px-3
                    py-2.5
                    shadow-[0_28px_90px_rgba(0,0,0,0.48)]
                    backdrop-blur-2xl
                "
            >
                {/* Ambient glow */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-20
                        h-44
                        w-44
                        rounded-full
                        bg-violet-500/15
                        blur-[60px]
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        flex
                        items-center
                        gap-4
                    "
                >
                    {/* Artwork */}

                    <div
                        className="
                            h-14
                            w-14
                            shrink-0
                            overflow-hidden
                            rounded-[16px]
                            border
                            border-white/[0.08]
                            bg-white/[0.04]
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
                    </div>

                    {/* Metadata + progress */}

                    <div className="min-w-0 flex-1">
                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >
                            <div className="min-w-0">
                                <p
                                    className="
                                        truncate
                                        text-sm
                                        font-medium
                                        text-white
                                    "
                                >
                                    {
                                        player
                                            .currentTrack
                                            .title
                                    }
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    {
                                        player
                                            .currentTrack
                                            .artist
                                    }
                                </p>
                            </div>

                            <span
                                className="
                                    hidden
                                    text-[11px]
                                    text-slate-500
                                    sm:block
                                "
                            >
                                {formatTime(
                                    player.position,
                                )}
                                {" / "}
                                {formatTime(
                                    player.duration,
                                )}
                            </span>
                        </div>

                        {/* Progress */}

                        <div
                            className="
                                mt-3
                                h-1
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
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-cyan-400
                                    via-violet-500
                                    to-fuchsia-500
                                "
                            />
                        </div>
                    </div>

                    {/* Controls */}

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                        "
                    >
                        <button
                            type="button"
                            aria-label="Restart track"
                            title="Restart track"
                            onClick={() => {
                                void player.restart();
                            }}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                text-slate-400
                                transition
                                duration-300
                                hover:border-violet-400/25
                                hover:bg-violet-400/[0.08]
                                hover:text-violet-200
                            "
                        >
                            <FiRefreshCw />
                        </button>

                        <motion.button
                            type="button"
                            aria-label={
                                player.isPlaying
                                    ? "Pause track"
                                    : "Resume track"
                            }
                            whileHover={{
                                scale: 1.06,
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
                                border
                                border-white/15
                                bg-white
                                text-slate-950
                                shadow-[0_10px_30px_rgba(255,255,255,0.08)]
                            "
                        >
                            {player.isPlaying ? (
                                <FiPause className="text-lg" />
                            ) : (
                                <FiPlay className="ml-0.5 text-lg" />
                            )}
                        </motion.button>

                        <button
                            type="button"
                            aria-label="Stop playback"
                            title="Stop playback"
                            onClick={() => {
                                void player.stopAndReset();
                            }}
                            className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        text-slate-500
        transition
        duration-300
        hover:bg-white/[0.06]
        hover:text-white
    "
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}