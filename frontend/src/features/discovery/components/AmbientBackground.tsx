import { motion } from "framer-motion";

export default function AmbientBackground() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            "
        >
            <motion.div
                animate={{
                    x: [0, 80, -30, 0],
                    y: [0, -40, 70, 0],
                    scale: [1, 1.12, 0.96, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    left-[8%]
                    top-[12%]
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-cyan-400/10
                    blur-[160px]
                "
            />

            <motion.div
                animate={{
                    x: [0, -70, 40, 0],
                    y: [0, 60, -30, 0],
                    scale: [1, 0.94, 1.1, 1],
                }}
                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    bottom-[5%]
                    right-[5%]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-fuchsia-500/10
                    blur-[180px]
                "
            />

            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F17_72%)]
                "
            />

            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.035]
                    [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
                    [background-size:64px_64px]
                "
            />
        </div>
    );
}