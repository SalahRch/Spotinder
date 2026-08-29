import { motion } from "framer-motion";
import {
    FiHeart,
    FiList,
    FiPlay,
} from "react-icons/fi";

type AlbumCardProps = {
    title: string;
    artist: string;
    genre: string;
    cover: string;
};

const bars = [1, 2, 3, 4, 5];

export default function AlbumCard({
                                      title,
                                      artist,
                                      genre,
                                      cover,
                                  }: AlbumCardProps) {
    return (
        <div className="mt-14 flex flex-col items-center px-8">

            {/* Album Cover */}

            <motion.img
                src={cover}
                alt={title}
                className="
                    h-60
                    w-60
                    rounded-3xl
                    object-cover
                    shadow-[0_25px_60px_rgba(59,130,246,.30)]
                "
                animate={{
                    scale: [1, 1.025, 1],
                    rotate: [0, 0.3, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Song */}

            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
                {title}
            </h2>

            {/* Artist */}

            <p className="mt-2 text-lg text-slate-300">
                {artist}
            </p>

            {/* Genre */}

            <span
                className="
                    mt-4
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-1.5
                    text-xs
                    tracking-wide
                    text-slate-400
                "
            >
                {genre}
            </span>

            {/* Progress */}

            <div className="mt-10 w-full">

                <div className="relative h-1 rounded-full bg-white/10">

                    <motion.div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                        animate={{
                            width: ["20%", "72%", "20%"],
                        }}
                        transition={{
                            duration: 8,
                            delay: 0.45,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        className="
                            absolute
                            top-1/2
                            h-3
                            w-3
                            -translate-y-1/2
                            rounded-full
                            bg-white
                            shadow-[0_0_18px_rgba(255,255,255,.8)]
                        "
                        animate={{
                            left: ["20%", "72%", "20%"],
                        }}
                        transition={{
                            duration: 8,
                            delay: 0.45,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-500">

                    <span>0:48</span>

                    <span>3:51</span>

                </div>

            </div>

            {/* Controls */}

            <div className="mt-10 flex w-full items-center justify-between">

                {/* Like */}

                <button
                    className="
                        rounded-full
                        p-3
                        text-slate-400
                        transition
                        hover:text-white
                    "
                >
                    <FiHeart size={22} />
                </button>

                {/* Play */}

                <div className="relative flex flex-col items-center">

                    <motion.button
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        animate={{
                            scale: [
                                1,
                                0.93,
                                1.08,
                                1,
                                1.03,
                                1,
                            ],
                            boxShadow: [
                                "0 15px 40px rgba(59,130,246,.35)",
                                "0 35px 80px rgba(139,92,246,.85)",
                                "0 15px 40px rgba(59,130,246,.35)",
                            ],
                        }}
                        transition={{
                            duration:2.8,
                            delay:0.15,
                            repeat:Infinity,
                            ease:"easeInOut",
                        }}
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-cyan-400
                            to-violet-500
                            text-white
                            shadow-[0_15px_40px_rgba(59,130,246,.45)]
                        "
                    >
                        <FiPlay
                            size={28}
                            className="ml-1"
                        />
                    </motion.button>

                    {/* Equalizer */}

                    <div className="mt-2 flex items-end gap-[3px]">

                        {bars.map((bar) => (

                            <motion.div
                                key={bar}
                                className="w-[3px] rounded-full bg-violet-400"
                                animate={{
                                    height: [
                                        6,
                                        14,
                                        8,
                                        18,
                                        6,
                                    ],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: 0.45 + bar * 0.12,
                                    ease: "easeInOut",
                                }}
                            />

                        ))}

                    </div>

                </div>

                {/* Playlist */}

                <button
                    className="
                        rounded-full
                        p-3
                        text-slate-400
                        transition
                        hover:text-white
                    "
                >
                    <FiList size={22} />
                </button>

            </div>

        </div>
    );
}