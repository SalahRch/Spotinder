import { motion } from "framer-motion";

import FadeInSection from "../animations/FadeInSection";
import SwipeDeck from "../demo/SwipeDeck";
import SwipeHint from "../demo/SwipeHint";

export default function LiveDemo() {
    return (
        <section
            id="live-demo"
            className="
                relative
                mx-auto
                max-w-7xl
                overflow-hidden
                px-6
                py-44
            "
        >
            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-[58%]
                    h-[850px]
                    w-[850px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-400/[0.035]
                    blur-[190px]
                    pointer-events-none
                "
            />

            <FadeInSection>

                <div className="mx-auto max-w-3xl text-center">

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.38em]
                            text-cyan-400
                        "
                    >
                        LIVE DEMO
                    </p>

                    <h2
                        className="
                            mt-6
                            text-4xl
                            font-bold
                            tracking-tight
                            text-white
                            md:text-6xl
                        "
                    >
                        Discover your next
                        <br />
                        favourite song.
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-7
                            max-w-lg
                            text-lg
                            leading-8
                            text-slate-400
                        "
                    >
                        No screenshots.
                        No videos.
                        Just swipe exactly like you would inside Spotinder.
                    </p>

                </div>

            </FadeInSection>

            <FadeInSection>

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40,
                        scale: .97,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}

                    viewport={{
                        once: true,
                        amount: .3,
                    }}

                    transition={{
                        duration: .75,
                        ease: [0.22,1,0.36,1],
                    }}

                    className="
                        mt-14
                        flex
                        flex-col
                        items-center
                    "

                >

                    {/* UI Chips */}

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-4
                        "
                    >

                        <motion.div

                            animate={{
                                y:[0,-3,0],
                                opacity:[.7,1,.7],
                            }}

                            transition={{
                                duration:4,
                                repeat:Infinity,
                            }}

                            className="
                                rounded-full
                                border
                                border-red-400/10
                                bg-red-400/[0.04]
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-red-300
                            "

                        >

                            ✕ PASS

                        </motion.div>

                        <motion.div

                            animate={{
                                y:[0,-3,0],
                                opacity:[.7,1,.7],
                            }}

                            transition={{
                                duration:4,
                                delay:.5,
                                repeat:Infinity,
                            }}

                            className="
                                rounded-full
                                border
                                border-emerald-400/10
                                bg-emerald-400/[0.04]
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-emerald-300
                            "

                        >

                            ♥ LIKE

                        </motion.div>

                    </div>

                    {/* Phone */}

                    <div className="relative">

                        <SwipeDeck />

                    </div>

                    {/* Hint */}

                    <motion.div

                        animate={{
                            opacity:[.45,.9,.45],
                        }}

                        transition={{
                            duration:2.5,
                            repeat:Infinity,
                        }}

                        className="-mt-10"

                    >

                        <SwipeHint />

                    </motion.div>

                </motion.div>

            </FadeInSection>

        </section>
    );
}