import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import StatusBar from "./StatusBar";
import AlbumCard from "./AlbumCard";

import { songs } from "../assets/songs";

export default function PhoneMockup() {
    const [currentSong, setCurrentSong] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSong((prev) => (prev + 1) % songs.length);
        }, 4200);

        return () => clearInterval(interval);
    }, []);

    const song = songs[currentSong];

    return (
        <motion.div
            animate={{
                y: [0, -12, -8, 0],
                x: [0, 2, -2, 0],
                rotate: [-0.8, 0.8, -0.8],
                scale: [1, 1.01, 1],
            }}
            transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="relative flex justify-center will-change-transform"
        >
            {/* Ambient Glow */}

            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.75, 1, 0.75],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    h-[760px]
                    w-[420px]
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-500/15
                    via-violet-500/10
                    to-fuchsia-500/15
                    blur-[120px]
                "
            />

            {/* Bottom Glow */}

            <motion.div
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    bottom-24
                    h-44
                    w-44
                    rounded-full
                    bg-cyan-400/20
                    blur-[90px]
                "
            />

            {/* Phone Shadow */}

            <motion.div
                animate={{
                    scale: [1, 0.95, 1],
                    y: [0, 10, 0],
                    opacity: [0.45, 0.28, 0.45],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    top-8
                    h-[690px]
                    w-[340px]
                    rounded-[44px]
                    bg-black/40
                    blur-2xl
                "
            />

            {/* Phone */}

            <div
                className="
                    relative
                    h-[690px]
                    w-[340px]
                    overflow-hidden
                    rounded-[42px]
                    border
                    border-white/10
                    bg-[#141A23]
                    shadow-[0_60px_140px_rgba(0,0,0,0.75)]
                "
            >
                {/* Animated Reflection */}

                <motion.div
                    animate={{
                        opacity: [0.04, 0.09, 0.04],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/[0.08]
                        via-transparent
                        to-transparent
                    "
                />

                {/* Screen */}

                <div className="flex h-full flex-col bg-gradient-to-b from-[#1A2230] to-[#111827]">
                    <StatusBar />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={song.title}
                            initial={{
                                x: 180,
                                rotate: 12,
                                opacity: 0,
                                scale: 0.92,
                            }}
                            animate={{
                                x: 0,
                                rotate: 0,
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                x: -180,
                                rotate: -12,
                                opacity: 0,
                                scale: 0.92,
                            }}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                                transformOrigin: "center center",
                            }}
                        >
                            <AlbumCard
                                title={song.title}
                                artist={song.artist}
                                genre={song.genre}
                                cover={song.cover}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}