import { motion, useMotionValue, useSpring } from "framer-motion";
import type {ReactNode} from "react";

type MagneticProps = {
    children: ReactNode;
};

export default function Magnetic({
                                     children,
                                 }: MagneticProps) {

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, {
        stiffness: 180,
        damping: 18,
    });

    const springY = useSpring(y, {
        stiffness: 180,
        damping: 18,
    });

    function handleMouseMove(
        e: React.MouseEvent<HTMLDivElement>
    ) {

        const rect =
            e.currentTarget.getBoundingClientRect();

        const centreX =
            rect.left + rect.width / 2;

        const centreY =
            rect.top + rect.height / 2;

        x.set((e.clientX - centreX) * 0.22);
        y.set((e.clientY - centreY) * 0.22);

    }

    function handleLeave() {

        x.set(0);
        y.set(0);

    }

    return (

        <motion.div

            style={{
                x: springX,
                y: springY,
            }}

            onMouseMove={handleMouseMove}

            onMouseLeave={handleLeave}

            className="inline-block"

        >

            {children}

        </motion.div>

    );

}