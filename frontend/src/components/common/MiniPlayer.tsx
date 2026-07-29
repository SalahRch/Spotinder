import { motion } from "framer-motion";
import {
    FiSkipBack,
    FiPlay,
    FiSkipForward,
} from "react-icons/fi";

import PromiseCover from "../../assets/albums/promise.jpg";

export default function MiniPlayer() {

    return (

        <motion.div

            animate={{
                y: [0, -2, 0],
            }}

            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            className="
                rounded-3xl
                border
                border-white/10
                bg-[#111827]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,.25)]
            "

        >

            <div className="flex items-center gap-4">

                <div className="relative">

                    <motion.img

                        src={PromiseCover}

                        alt="Promise"

                        animate={{
                            scale: [1, 1.04, 1],
                        }}

                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}

                        className="
                            h-16
                            w-16
                            rounded-2xl
                            object-cover
                            shadow-lg
                        "

                    />

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-2xl
                            bg-gradient-to-t
                            from-black/20
                            to-transparent
                        "
                    />

                </div>

                <div className="flex-1">

                    <p
                        className="
                            font-semibold
                            text-white
                        "
                    >
                        Promise
                    </p>

                    <p
                        className="
                            text-sm
                            text-slate-400
                        "
                    >
                        slayr
                    </p>

                </div>

            </div>

            {/* Time */}

            <div
                className="
                    mt-5
                    mb-2
                    flex
                    justify-between
                    text-[10px]
                    tracking-wide
                    text-slate-500
                "
            >

                <span>0:42</span>

                <span>2:58</span>

            </div>

            {/* Progress */}

            <div
                className="
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
                "
            >

                <motion.div

                    animate={{
                        width: [
                            "18%",
                            "76%",
                            "18%",
                        ],
                    }}

                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}

                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-violet-500
                    "

                />

            </div>

            {/* Controls */}

            <div
                className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-7
                    text-slate-500
                "
            >

                <button
                    className="
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:text-cyan-400
                    "
                >

                    <FiSkipBack size={15} />

                </button>

                <button
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.05]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-400/30
                        hover:bg-cyan-400/10
                        hover:text-cyan-300
                    "
                >

                    <FiPlay size={15} />

                </button>

                <button
                    className="
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:text-cyan-400
                    "
                >

                    <FiSkipForward size={15} />

                </button>

            </div>

        </motion.div>

    );

}