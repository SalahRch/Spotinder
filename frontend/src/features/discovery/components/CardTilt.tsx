import type {
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from "react";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

type CardTiltProps = {
    children: ReactNode;
    disabled?: boolean;
};

export default function CardTilt({
                                     children,
                                     disabled = false,
                                 }: CardTiltProps) {
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    const rotateX = useSpring(
        useTransform(
            pointerY,
            [-0.5, 0.5],
            [3.5, -3.5],
        ),
        {
            stiffness: 180,
            damping: 24,
        },
    );

    const rotateY = useSpring(
        useTransform(
            pointerX,
            [-0.5, 0.5],
            [-3.5, 3.5],
        ),
        {
            stiffness: 180,
            damping: 24,
        },
    );

    const reflectionX = useTransform(
        pointerX,
        [-0.5, 0.5],
        ["-30%", "30%"],
    );

    const reflectionY = useTransform(
        pointerY,
        [-0.5, 0.5],
        ["-20%", "20%"],
    );

    const handleMouseMove = (
        event: ReactMouseEvent<HTMLDivElement>,
    ) => {
        if (disabled) {
            return;
        }

        const bounds =
            event.currentTarget.getBoundingClientRect();

        pointerX.set(
            (event.clientX - bounds.left) /
            bounds.width -
            0.5,
        );

        pointerY.set(
            (event.clientY - bounds.top) /
            bounds.height -
            0.5,
        );
    };

    const resetTilt = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={
                disabled
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        transformPerspective: 1200,
                        transformStyle: "preserve-3d",
                    }
            }
            className="
                relative
                w-full
                max-w-[460px]
                will-change-transform
            "
        >
            <motion.div
                aria-hidden="true"
                style={{
                    x: reflectionX,
                    y: reflectionY,
                }}
                className="
                    pointer-events-none
                    absolute
                    -inset-20
                    z-30
                    rotate-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.055]
                    to-transparent
                    opacity-70
                    blur-2xl
                "
            />

            {children}
        </motion.div>
    );
}