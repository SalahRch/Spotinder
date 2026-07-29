import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiArrowRight,
    FiMusic,
} from "react-icons/fi";

export default function FloatingSwipeCard() {

    return (

        <div
            className="
                relative
                mt-10
                flex
                h-56
                items-center
                justify-center
                overflow-hidden
            "
        >

            {/* Back Card */}

            <motion.div

                animate={{
                    rotate: [-8, -6, -8],
                }}

                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
                    absolute
                    h-40
                    w-32
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                "

                style={{
                    left: "42%",
                }}

            />

            {/* Middle Card */}

            <motion.div

                animate={{
                    rotate: [6, 8, 6],
                }}

                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
                    absolute
                    h-40
                    w-32
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    backdrop-blur-xl
                "

                style={{
                    right: "42%",
                }}

            />

            {/* Front Card */}

            <motion.div

                animate={{
                    x: [-10, 12, -10],
                    rotate: [-6, 6, -6],
                }}

                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
                    relative
                    z-10
                    flex
                    h-44
                    w-36
                    flex-col
                    items-center
                    justify-center
                    rounded-[28px]
                    border
                    border-cyan-400/20
                    bg-[#111827]
                    shadow-[0_30px_70px_rgba(34,211,238,.12)]
                "

            >

                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-400
                        to-violet-500
                        text-white
                    "
                >

                    <FiMusic size={28} />

                </div>

                <p
                    className="
                        mt-5
                        font-semibold
                        text-white
                    "
                >
                    Discover
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    Swipe to explore
                </p>

            </motion.div>

            {/* Bottom Hint */}

            <div
                className="
                    absolute
                    bottom-2
                    flex
                    items-center
                    gap-8
                    text-xs
                    tracking-wide
                    text-slate-500
                "
            >

                <div className="flex items-center gap-1">

                    <FiArrowLeft />

                    Pass

                </div>

                <div className="flex items-center gap-1">

                    Like

                    <FiArrowRight />

                </div>

            </div>

        </div>

    );

}