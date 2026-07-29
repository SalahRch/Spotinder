import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {

    const mouseX = useMotionValue(window.innerWidth / 2);
    const mouseY = useMotionValue(window.innerHeight / 2);

    const x = useSpring(mouseX, {
        stiffness: 120,
        damping: 35,
    });

    const y = useSpring(mouseY, {
        stiffness: 120,
        damping: 35,
    });

    useEffect(() => {

        function handleMove(e: MouseEvent) {

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

        }

        window.addEventListener("mousemove", handleMove);

        return () =>
            window.removeEventListener(
                "mousemove",
                handleMove
            );

    }, []);

    return (

        <motion.div

            animate={{
                opacity: [0.92, 1, 0.92],
            }}

            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            className="
        fixed
        inset-0
        pointer-events-none
        z-0
        overflow-hidden
    "

        >

            {/* Cyan */}
            <motion.div

                style={{
                    left: x,
                    top: y,
                }}

                animate={{
                    scale: [1, 1.12, 1],
                    rotate: [0, 12, 0],
                }}

                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
        absolute
        h-[520px]
        w-[520px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400/8
        blur-[150px]
    "

            />
            {/* Purple */}
            <motion.div

                style={{
                    left: x,
                    top: y,
                }}

                animate={{
                    x: [0, 40, -20, 0],
                    y: [0, -35, 15, 0],
                    scale: [1, 1.08, 1],
                }}

                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                className="
        absolute
        h-[470px]
        w-[470px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-fuchsia-500/8
        blur-[170px]
    "

            />

        </motion.div>

    );

}