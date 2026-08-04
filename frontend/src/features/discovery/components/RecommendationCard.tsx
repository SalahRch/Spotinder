import { motion } from "framer-motion";
import {
    FiExternalLink,
    FiMusic,
    FiPlay,
} from "react-icons/fi";

import type { Recommendation } from "../types/discovery";

type RecommendationCardProps = {
    recommendation: Recommendation;
    blindMode?: boolean;
};

export default function RecommendationCard({
                                               recommendation,
                                               blindMode = false,
                                           }: RecommendationCardProps) {
    const {
        title,
        artist,
        albumImage,
    } = recommendation;

    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
            }}
            className="
                relative
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-[#111827]/75
                p-3
                shadow-[0_40px_100px_rgba(0,0,0,0.55)]
                backdrop-blur-2xl
            "
        >
            <div
                className="
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-[29px]
                    bg-gradient-to-br
                    from-violet-500/40
                    via-cyan-400/20
                    to-fuchsia-500/30
                "
            >
                {albumImage ? (
                    <img
                        src={albumImage}
                        alt={`${title} cover`}
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                        "
                    >
                        <div
                            className="
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/15
                                bg-white/10
                                backdrop-blur-xl
                            "
                        >
                            <FiMusic className="text-4xl text-white/80" />
                        </div>
                    </div>
                )}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-transparent
                        to-transparent
                    "
                />

                <button
                    type="button"
                    aria-label="Play song preview"
                    className="
                        absolute
                        bottom-5
                        right-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/35
                        text-white
                        shadow-xl
                        backdrop-blur-xl
                        transition
                        duration-300
                        hover:scale-105
                        hover:bg-white
                        hover:text-slate-950
                    "
                >
                    <FiPlay className="ml-1 text-xl" />
                </button>
            </div>

            <div className="px-4 pb-4 pt-6">
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <motion.h2
                            animate={{
                                opacity: blindMode ? 0.35 : 1,
                                filter: blindMode
                                    ? "blur(7px)"
                                    : "blur(0px)",
                            }}
                            className="
                                truncate
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-slate-100
                            "
                        >
                            {blindMode ? "Unknown track" : title}
                        </motion.h2>

                        <motion.p
                            animate={{
                                opacity: blindMode ? 0.25 : 1,
                                filter: blindMode
                                    ? "blur(6px)"
                                    : "blur(0px)",
                            }}
                            className="
                                mt-2
                                truncate
                                text-sm
                                text-slate-400
                            "
                        >
                            {blindMode
                                ? "Artist hidden until you swipe"
                                : `${artist}`}
                        </motion.p>
                    </div>

                    {!blindMode && (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Open song in Spotify"
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                                text-slate-400
                                transition
                                hover:border-white/20
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <FiExternalLink />
                        </a>
                    )}
                </div>

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            h-1
                            flex-1
                            overflow-hidden
                            rounded-full
                            bg-white/10
                        "
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "38%" }}
                            transition={{
                                duration: 1.1,
                                delay: 0.35,
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

                    <span className="text-xs text-slate-500">
                        Preview
                    </span>
                </div>
            </div>
        </motion.article>
    );
}