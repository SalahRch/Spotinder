import { motion } from "framer-motion";
import {
    FiHeart,
    FiPlus,
} from "react-icons/fi";

import type { LikedSong } from "../types/likes";

type LikesHeroProps = {
    songs: LikedSong[];
    onCreatePlaylist?: () => void;
};

export default function LikesHero({
                                      songs,
                                      onCreatePlaylist,
                                  }: LikesHeroProps) {
    const featured =
        songs
            .filter(
                (song) =>
                    Boolean(song.albumImage),
            )
            .slice(0, 4);

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-8
                py-8
                shadow-[0_30px_100px_rgba(0,0,0,0.28)]
                backdrop-blur-2xl
                lg:px-10
                lg:py-10
            "
        >
            {/* Ambient hero glow */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-32
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/10
                    via-violet-500/15
                    to-fuchsia-500/10
                    blur-[110px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    grid
                    gap-10
                    lg:grid-cols-[1fr_340px]
                    lg:items-center
                "
            >
                {/* Copy */}

                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.28em]
                            text-violet-300/75
                        "
                    >
                        <FiHeart />

                        Your collection
                    </div>

                    <h1
                        className="
                            mt-5
                            max-w-xl
                            text-4xl
                            font-semibold
                            leading-[1.05]
                            tracking-tight
                            text-white
                            sm:text-5xl
                        "
                    >
                        Songs you couldn&apos;t
                        <br />
                        swipe past.
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-md
                            text-sm
                            leading-7
                            text-slate-400
                            sm:text-base
                        "
                    >
                        Every right swipe,
                        collected in one place.
                        Revisit the discoveries
                        that earned a permanent
                        spot in your rotation.
                    </p>

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.045]
                                px-4
                                py-2
                                text-sm
                                text-slate-300
                            "
                        >
                            <span
                                className="
                                    mr-1
                                    font-semibold
                                    text-white
                                "
                            >
                                {songs.length}
                            </span>

                            discoveries saved
                        </div>

                        <button
                            type="button"
                            onClick={
                                onCreatePlaylist
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-violet-400/20
                                bg-violet-400/[0.08]
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-violet-200
                                transition
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-violet-400/40
                                hover:bg-violet-400/[0.14]
                                hover:shadow-[0_0_28px_rgba(139,92,246,0.13)]
                            "
                        >
                            <FiPlus />

                            Create playlist
                        </button>
                    </div>
                </div>

                {/* Artwork stack */}

                <div
                    className="
                        relative
                        hidden
                        h-[250px]
                        lg:block
                    "
                >
                    {featured.map(
                        (song, index) => {
                            const positions = [
                                {
                                    x: 15,
                                    y: 24,
                                    rotate: -10,
                                    scale: 0.88,
                                    z: 10,
                                },
                                {
                                    x: 88,
                                    y: 2,
                                    rotate: 7,
                                    scale: 0.96,
                                    z: 20,
                                },
                                {
                                    x: 150,
                                    y: 54,
                                    rotate: 13,
                                    scale: 0.84,
                                    z: 15,
                                },
                                {
                                    x: 70,
                                    y: 80,
                                    rotate: -2,
                                    scale: 1,
                                    z: 30,
                                },
                            ];

                            const position =
                                positions[index];

                            return (
                                <motion.div
                                    key={
                                        song.id
                                    }
                                    initial={{
                                        opacity: 0,
                                        y:
                                            position.y +
                                            30,
                                        rotate:
                                        position.rotate,
                                        scale:
                                            position.scale *
                                            0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x:
                                        position.x,
                                        y:
                                        position.y,
                                        rotate:
                                        position.rotate,
                                        scale:
                                        position.scale,
                                    }}
                                    transition={{
                                        delay:
                                            0.1 +
                                            index *
                                            0.08,
                                        duration:
                                            0.55,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    whileHover={{
                                        y:
                                            position.y -
                                            8,
                                        scale:
                                            position.scale *
                                            1.04,
                                        rotate:
                                            position.rotate /
                                            2,
                                    }}
                                    style={{
                                        zIndex:
                                        position.z,
                                    }}
                                    className="
                                        absolute
                                        left-0
                                        top-0
                                        h-40
                                        w-40
                                        overflow-hidden
                                        rounded-[24px]
                                        border
                                        border-white/15
                                        bg-[#111827]
                                        p-1.5
                                        shadow-[0_28px_70px_rgba(0,0,0,0.5)]
                                    "
                                >
                                    <img
                                        src={
                                            song.albumImage!
                                        }
                                        alt={`${song.title} cover`}
                                        className="
                                            h-full
                                            w-full
                                            rounded-[19px]
                                            object-cover
                                        "
                                    />
                                </motion.div>
                            );
                        },
                    )}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            bottom-4
                            left-1/2
                            h-20
                            w-64
                            -translate-x-1/2
                            rounded-full
                            bg-violet-400/15
                            blur-[55px]
                        "
                    />
                </div>
            </div>
        </motion.section>
    );
}