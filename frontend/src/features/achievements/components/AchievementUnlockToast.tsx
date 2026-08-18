import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    FiAward,
    FiX,
} from "react-icons/fi";

import type {
    AchievementUnlock,
} from "../types/achievement";

type AchievementUnlockToastProps = {
    achievement?: AchievementUnlock;
    onClose: () => void;
};

export default function AchievementUnlockToast({
                                                   achievement,
                                                   onClose,
                                               }: AchievementUnlockToastProps) {
    return (
        <AnimatePresence>
            {achievement && (
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 40,
                        scale: 0.96,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        x: 30,
                        scale: 0.97,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="
                        fixed
                        right-6
                        top-6
                        z-[200]
                        w-[340px]
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-violet-300/[0.14]
                        bg-[#0D131E]/95
                        p-5
                        shadow-[0_24px_80px_rgba(0,0,0,0.45)]
                        backdrop-blur-2xl
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-16
                            h-[160px]
                            w-[160px]
                            rounded-full
                            bg-violet-500/[0.12]
                            blur-[70px]
                        "
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-3
                            top-3
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            text-slate-600
                            transition
                            hover:bg-white/[0.05]
                            hover:text-white
                        "
                    >
                        <FiX />
                    </button>

                    <div
                        className="
                            relative
                            z-10
                            flex
                            gap-4
                        "
                    >
                        <motion.div
                            initial={{
                                rotate: -12,
                                scale: 0.8,
                            }}
                            animate={{
                                rotate: 0,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.08,
                                duration: 0.45,
                            }}
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-[14px]
                                border
                                border-violet-300/[0.14]
                                bg-violet-400/[0.08]
                                text-violet-200
                            "
                        >
                            <FiAward />
                        </motion.div>

                        <div className="pr-5">
                            <p
                                className="
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.22em]
                                    text-violet-300/60
                                "
                            >
                                Achievement unlocked
                            </p>

                            <h3
                                className="
                                    mt-1
                                    text-sm
                                    font-semibold
                                    text-white
                                "
                            >
                                {achievement.title}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                {achievement.description}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        initial={{
                            scaleX: 0,
                        }}
                        animate={{
                            scaleX: 1,
                        }}
                        transition={{
                            duration: 3.8,
                            ease: "linear",
                        }}
                        style={{
                            transformOrigin:
                                "left",
                        }}
                        className="
                            absolute
                            bottom-0
                            left-0
                            h-px
                            w-full
                            bg-gradient-to-r
                            from-cyan-300/60
                            via-violet-300/70
                            to-fuchsia-300/60
                        "
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}