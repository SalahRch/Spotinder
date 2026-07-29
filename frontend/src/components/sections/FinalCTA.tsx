import { motion } from "framer-motion";

import SpotifyButton from "../common/SpotifyButton";
import AuroraText from "../animations/AuroraText";




export default function FinalCTA() {

    return (

        <section
            id="cta"
            className="
                relative
                overflow-hidden
                py-44
            "
        >

            {/* Ambient Background */}

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-transparent
                    via-cyan-500/[0.03]
                    to-violet-500/[0.05]
                "
            />

            <motion.div

                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [.55,.9,.55],
                }}

                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
        absolute
        left-1/2
        top-1/2
        h-[620px]
        w-[620px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400/10
        blur-[180px]
    "

            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-4xl
                    px-6
                    text-center
                "
            >

                <p
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.38em]
                        text-cyan-400
                    "
                >
                    START YOUR JOURNEY
                </p>

                <h2
                    className="
        mt-8
        text-5xl
        font-bold
        leading-[1.05]
        tracking-tight
        text-white
        md:text-7xl
    "
                >

                    Discover music

                    <br />

                    <AuroraText>

                        you would've never searched for.

                    </AuroraText>

                </h2>

                <p
                    className="
                        mx-auto
                        mt-10
                        max-w-2xl
                        text-xl
                        leading-9
                        text-slate-400
                    "
                >

                    Spotify already knows what you like.

                    <br />

                    Spotinder helps you discover what you'll love next.

                </p>

                <motion.div

                    whileHover={{
                        scale: 1.05,
                        y: -2,
                    }}

                    whileTap={{
                        scale: .98,
                    }}

                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 20,
                    }}

                    className="mt-14"

                >

                    <SpotifyButton />

                </motion.div>

                <p
                    className="
                        mt-8
                        text-sm
                        tracking-wide
                        text-slate-500
                    "
                >

                    Free forever • Connect with Spotify in seconds • Start discovering today

                </p>

            </div>

        </section>

    );

}