import {
    AnimatePresence,
    motion,
} from "framer-motion";
import { FiX } from "react-icons/fi";

import JourneyShareCard from "./JourneyShareCard";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";

type JourneySharePreviewProps = {
    open: boolean;
    recap?: DailyDiscoveryRecap;
    onClose: () => void;
};

export default function JourneySharePreview({
                                                open,
                                                recap,
                                                onClose,
                                            }: JourneySharePreviewProps) {
    return (
        <AnimatePresence>
            {open && recap && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-[120]
                        flex
                        items-center
                        justify-center
                        overflow-y-auto
                        bg-[#050810]/90
                        p-6
                        backdrop-blur-2xl
                    "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-6
                            top-6
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.04]
                            text-slate-400
                            transition
                            hover:bg-white/[0.08]
                            hover:text-white
                        "
                    >
                        <FiX />
                    </button>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 24,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 12,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        <JourneyShareCard
                            recap={recap}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}