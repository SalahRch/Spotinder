import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { songs } from "../../assets/songs";

import SwipeCard from "./SwipeCard";
import SwipeParticles from "./SwipeParticles";


// TODO:
// Refactor SwipeDeck into a persistent queue
// when Spotinder becomes a full application.
// Current implementation is sufficient for the landing page.
export default function SwipeDeck() {

    const [index, setIndex] = useState(0);

    const [particleDirection, setParticleDirection] =
        useState<"left" | "right" | null>(null);

    const flashColour =
        particleDirection === "right"
            ? "rgba(34,211,238,.22)"
            : "rgba(236,72,153,.22)";

    const currentSong =
        songs[index % songs.length];

    const nextSong =
        songs[(index + 1) % songs.length];

    function nextCard(
        direction: "left" | "right"
    ) {

        setParticleDirection(direction);

        setTimeout(() => {

            setParticleDirection(null);

        }, 650);

        setTimeout(() => {

            setIndex(prev => prev + 1);

        }, 40);

    }

    return (

        <div
            className="
                relative
                h-[640px]
                w-[400px]
            "
        >

            <motion.div

                key={particleDirection}

                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: particleDirection ? 1 : 0,
                }}

                exit={{
                    opacity: 0,
                }}

                transition={{
                    duration: .35,
                }}

                style={{
                    background: flashColour,
                }}

                className="
        absolute
        inset-0
        rounded-[40px]
        blur-[90px]
        pointer-events-none
    "

            />

            <AnimatePresence>

                {

                    particleDirection && (

                        <SwipeParticles
                            key={`${particleDirection}-${index}`}
                            direction={particleDirection}
                        />

                    )

                }

            </AnimatePresence>

            {/* Next Card */}

            <motion.div

                className="
                    absolute
                    inset-0
                "

                animate={{
                    scale: [0.93,0.95],
                    y:[10,0],
                    opacity:[0.45,0.55]
                }}

                transition={{
                    duration:.35,
                    ease:"easeOut"
                }}

            >

                <SwipeCard

                    song={nextSong}

                    draggable={false}

                />

            </motion.div>

            {/* Current Card */}

            <AnimatePresence mode="wait">

                <SwipeCard

                    key={currentSong.title}

                    song={currentSong}

                    draggable

                    onSwiped={nextCard}

                />

            </AnimatePresence>

        </div>

    );

}