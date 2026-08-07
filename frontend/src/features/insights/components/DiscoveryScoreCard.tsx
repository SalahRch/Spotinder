import { motion } from "framer-motion";
import { FiCompass } from "react-icons/fi";

type DiscoveryScoreCardProps = {
    score: number;
};

function getScoreMessage(score: number) {
    if (score >= 80) {
        return "Your ears are wide open.";
    }

    if (score >= 60) {
        return "Curious taste. Keep exploring.";
    }

    if (score >= 40) {
        return "Selective, but adventurous.";
    }

    return "You know exactly what you like.";
}

export default function DiscoveryScoreCard({
                                               score,
                                           }: DiscoveryScoreCardProps) {
    const normalizedScore =
        Math.min(Math.max(score, 0), 100);

    const radius = 82;
    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (normalizedScore / 100) *
        circumference;

    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                relative
                min-h-[390px]
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-8
                backdrop-blur-xl
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-16
                    h-72
                    w-72
                    rounded-full
                    bg-violet-500/[0.09]
                    blur-[100px]
                "
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-[0.24em]
                                text-violet-300/70
                            "
                        >
                            Discovery score
                        </p>

                        <h2
                            className="
                                mt-2
                                text-xl
                                font-semibold
                                text-white
                            "
                        >
                            How open are your ears?
                        </h2>
                    </div>

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-violet-400/15
                            bg-violet-400/[0.07]
                            text-violet-300
                        "
                    >
                        <FiCompass />
                    </div>
                </div>

                <div
                    className="
                        mt-8
                        flex
                        items-center
                        justify-center
                    "
                >
                    <div
                        className="
                            relative
                            h-[210px]
                            w-[210px]
                        "
                    >
                        <svg
                            viewBox="0 0 200 200"
                            className="
                                h-full
                                w-full
                                -rotate-90
                            "
                        >
                            <circle
                                cx="100"
                                cy="100"
                                r={radius}
                                fill="none"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="9"
                            />

                            <motion.circle
                                cx="100"
                                cy="100"
                                r={radius}
                                fill="none"
                                stroke="url(#discoveryGradient)"
                                strokeWidth="9"
                                strokeLinecap="round"
                                strokeDasharray={
                                    circumference
                                }
                                initial={{
                                    strokeDashoffset:
                                    circumference,
                                }}
                                animate={{
                                    strokeDashoffset:
                                    offset,
                                }}
                                transition={{
                                    delay: 0.35,
                                    duration: 1.2,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                            />

                            <defs>
                                <linearGradient
                                    id="discoveryGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#67e8f9"
                                    />

                                    <stop
                                        offset="50%"
                                        stopColor="#a78bfa"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#e879f9"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                flex-col
                                items-center
                                justify-center
                            "
                        >
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    delay: 0.6,
                                    duration: 0.4,
                                }}
                                className="
                                    text-5xl
                                    font-semibold
                                    tracking-tight
                                    text-white
                                "
                            >
                                {normalizedScore}
                            </motion.span>

                            <span
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                out of 100
                            </span>
                        </div>
                    </div>
                </div>

                <p
                    className="
                        mt-3
                        text-center
                        text-sm
                        text-slate-400
                    "
                >
                    {getScoreMessage(
                        normalizedScore,
                    )}
                </p>
            </div>
        </motion.article>
    );
}