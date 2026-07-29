import { motion } from "framer-motion";
import type {ReactNode} from "react";

type FadeInSectionProps = {
    children: ReactNode;
    delay?: number;
};

export default function FadeInSection({
                                          children,
                                          delay = 0,
                                      }: FadeInSectionProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}