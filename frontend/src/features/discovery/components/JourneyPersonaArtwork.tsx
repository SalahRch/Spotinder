import { motion } from "framer-motion";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";

type JourneyPersonaArtworkProps = {
    persona: DailyDiscoveryRecap["discoveryPersona"];
};

export default function JourneyPersonaArtwork({
                                                  persona,
                                              }: JourneyPersonaArtworkProps) {
    if (persona === "ROMANTIC") {
        return <RomanticArtwork />;
    }

    if (persona === "EXPLORER") {
        return <ExplorerArtwork />;
    }

    return <DefaultArtwork />;
}

function RomanticArtwork() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[270px]
                w-[330px]
                -translate-x-1/2
                -translate-y-1/2
            "
        >
            {/* Violet orbit */}

            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[125px]
                    w-[300px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-[18deg]
                    rounded-[50%]
                    border
                    border-violet-300/[0.10]
                    shadow-[0_0_35px_rgba(167,139,250,0.05)]
                "
            />

            {/* Cyan orbit */}

            <motion.div
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 34,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[125px]
                    w-[300px]
                    -translate-x-1/2
                    -translate-y-1/2
                    -rotate-[18deg]
                    rounded-[50%]
                    border
                    border-cyan-300/[0.11]
                    shadow-[0_0_35px_rgba(103,232,249,0.04)]
                "
            />

            {/* Inner pulse */}

            <motion.div
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.35, 0.8, 0.35],
                }}
                transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-2
                    w-2
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                    bg-violet-200
                    shadow-[0_0_24px_rgba(196,181,253,0.9)]
                "
            />

            {/* Tiny traveling points */}

            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    inset-0
                "
            >
                <div
                    className="
                        absolute
                        left-[18px]
                        top-1/2
                        h-1
                        w-1
                        rounded-full
                        bg-cyan-200
                        shadow-[0_0_12px_rgba(165,243,252,0.8)]
                    "
                />
            </motion.div>

            <motion.div
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    inset-0
                "
            >
                <div
                    className="
                        absolute
                        right-[22px]
                        top-1/2
                        h-1
                        w-1
                        rounded-full
                        bg-fuchsia-200
                        shadow-[0_0_12px_rgba(245,208,254,0.8)]
                    "
                />
            </motion.div>
        </div>
    );
}

function ExplorerArtwork() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[240px]
                w-[340px]
                -translate-x-1/2
                -translate-y-1/2
            "
        >
            {/* Outer boundary */}

            <motion.div
                initial={{
                    scale: 0.92,
                    opacity: 0.12,
                }}
                animate={{
                    scale: [0.92, 1.04, 0.92],
                    opacity: [0.10, 0.22, 0.10],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[155px]
                    w-[330px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-cyan-300/[0.10]
                "
            />

            {/* Middle orbit */}

            <motion.div
                initial={{
                    rotate: -10,
                }}
                animate={{
                    rotate: 350,
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[120px]
                    w-[290px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-violet-300/[0.08]
                "
            />

            {/* Inner path */}

            <motion.div
                initial={{
                    rotate: 16,
                }}
                animate={{
                    rotate: -344,
                }}
                transition={{
                    duration: 38,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[82px]
                    w-[245px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-fuchsia-300/[0.05]
                "
            />

            {/* Expanding center pulse */}

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1.5
                    w-1.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                    bg-cyan-200
                    shadow-[0_0_22px_rgba(165,243,252,0.8)]
                "
            />

            {/* Traveling particle 1 */}

            <motion.div
                animate={{
                    x: [
                        0,
                        52,
                        112,
                    ],
                    y: [
                        0,
                        -20,
                        -44,
                    ],
                    opacity: [
                        0,
                        1,
                        0,
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    rounded-full
                    bg-cyan-200
                    shadow-[0_0_12px_rgba(165,243,252,0.9)]
                "
            />

            {/* Traveling particle 2 */}

            <motion.div
                animate={{
                    x: [
                        0,
                        -60,
                        -125,
                    ],
                    y: [
                        0,
                        16,
                        38,
                    ],
                    opacity: [
                        0,
                        0.9,
                        0,
                    ],
                }}
                transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    delay: 0.8,
                    ease: "easeOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    rounded-full
                    bg-violet-200
                    shadow-[0_0_12px_rgba(196,181,253,0.9)]
                "
            />

            {/* Tiny edge markers */}

            <div
                className="
                    absolute
                    right-[6px]
                    top-[54px]
                    h-1
                    w-1
                    rounded-full
                    bg-cyan-200/70
                "
            />

            <div
                className="
                    absolute
                    bottom-[48px]
                    left-[14px]
                    h-1
                    w-1
                    rounded-full
                    bg-violet-200/60
                "
            />
        </div>
    );
}

function DefaultArtwork() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[160px]
                w-[290px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-[50%]
                border
                border-violet-300/[0.08]
            "
        />
    );
}