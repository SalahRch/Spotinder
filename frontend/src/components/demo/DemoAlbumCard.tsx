import { motion } from "framer-motion";
import {
    FiHeart,
    FiList,
    FiPlay,
} from "react-icons/fi";

type DemoAlbumCardProps = {
    title: string;
    artist: string;
    genre: string;
    cover: string;
};

const bars = [1, 2, 3, 4, 5];

export default function DemoAlbumCard({
                                          title,
                                          artist,
                                          genre,
                                          cover,
                                      }: DemoAlbumCardProps) {

    return (

        <motion.div

            whileHover={{
                y: -6,
            }}

            transition={{
                duration: .25,
            }}
            className="
                flex
                w-[340px]
                flex-col
                items-center
                rounded-[36px]
                border
                border-white/10
                bg-[#111827]/80
                p-8
                backdrop-blur-2xl
                shadow-[0_30px_80px_rgba(0,0,0,.55)]
            "
        >

            {/* Cover */}

            <motion.img
                src={cover}
                alt={title}
                className="
                    h-56
                    w-56
                    rounded-3xl
                    object-cover
                "
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Title */}

            <h2
                className="
                    mt-8
                    text-3xl
                    font-bold
                    text-white
                "
            >
                {title}
            </h2>

            {/* Artist */}

            <p
                className="
                    mt-2
                    text-lg
                    text-slate-300
                "
            >
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
                            width: ["20%", "70%", "20%"],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                </div>

            </div>

            {/* Controls */}

            <div
                className="
                    mt-10
                    flex
                    w-full
                    items-center
                    justify-between
                "
            >

                <FiHeart
                    size={22}
                    className="text-slate-400"
                />

                <div className="flex flex-col items-center">

                    <motion.button

                        animate={{
                            scale: [1, 1.05, 1],

                            boxShadow: [
                                "0 15px 35px rgba(34,211,238,.35)",
                                "0 30px 60px rgba(139,92,246,.55)",
                                "0 15px 35px rgba(34,211,238,.35)",
                            ],
                        }}

                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
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
        shadow-[0_20px_45px_rgba(34,211,238,.35)]
    "

                    >

                        <FiPlay
                            size={28}
                            className="ml-1"
                        />

                    </motion.button>

                    <div className="mt-2 flex gap-[3px]">

                        {bars.map((bar) => (

                            <motion.div

                                key={bar}

                                className="w-[3px] rounded-full bg-violet-400"

                                animate={{
                                    height: [
                                        6,
                                        16,
                                        8,
                                        14,
                                        6,
                                    ],
                                }}

                                transition={{
                                    duration: .8,
                                    repeat: Infinity,
                                    delay: bar * .1,
                                }}

                            />

                        ))}

                    </div>

                </div>

                <FiList
                    size={22}
                    className="text-slate-400"
                />

            </div>

        </motion.div>

    );

}