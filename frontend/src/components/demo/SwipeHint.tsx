import { motion } from "framer-motion";

export default function SwipeHint() {

    return (

        <motion.div

            animate={{
                x: [-8, 8, -8],
                opacity: [0.55, 1, 0.55],
            }}

            transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            className="
                mt-8
                flex
                items-center
                justify-center
                gap-3
                text-sm
                tracking-wide
                text-slate-400/80
                select-none
            "

        >

            <span>←</span>

            <span>Swipe left or right</span>

            <span>→</span>

        </motion.div>

    );

}