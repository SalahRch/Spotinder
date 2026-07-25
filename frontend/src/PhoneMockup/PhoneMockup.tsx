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
            animate={{ y: [0, -12, 0] }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="relative flex justify-center"
        >
            {/* Ambient Glow */}

            <div className="absolute h-[760px] w-[420px] rounded-full bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-fuchsia-500/15 blur-[120px]" />

            <div className="absolute bottom-24 h-44 w-44 rounded-full bg-cyan-400/20 blur-[90px]" />
            {/* Phone Shadow */}

            <div className="absolute top-8 h-[690px] w-[340px] rounded-[44px] bg-black/40 blur-2xl" />


            {/* Phone */}

            <div
                className="
        relative
        h-[690px]
        w-[340px]
        rounded-[42px]
        border
        border-white/10
        bg-[#141A23]
        shadow-[0_60px_140px_rgba(0,0,0,0.75)]
        overflow-hidden
    "
            >
                {/* Reflection */}

                <div
                    className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.06]
          via-transparent
          to-transparent
          pointer-events-none
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