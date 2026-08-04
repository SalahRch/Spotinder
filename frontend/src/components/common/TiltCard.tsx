import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

type TiltCardProps = {
    children: ReactNode;
    className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(
        useTransform(y, [-40, 40], [8, -8]),
        { stiffness: 200, damping: 20 }
    );

    const rotateY = useSpring(
        useTransform(x, [-40, 40], [-8, 8]),
        { stiffness: 200, damping: 20 }
    );

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {

        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);

    }

    function handleMouseLeave() {

        x.set(0);
        y.set(0);

    }

    return (

        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 600 }}
            className={className}
        >

            {children}

        </motion.div>

    );

}