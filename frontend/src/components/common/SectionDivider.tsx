import { motion } from "framer-motion";

export default function SectionDivider() {

    return (

        <div
            className="
                relative
                mx-auto
                h-40
                w-full
                max-w-7xl
                overflow-hidden
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-52
                    w-[800px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-400/10
                    blur-[160px]
                "
            />

            {/* Gradient Line */}

            <motion.div

                initial={{
                    scaleX: 0,
                    opacity: 0,
                }}

                whileInView={{
                    scaleX: 1,
                    opacity: 1,
                }}

                viewport={{
                    once: true,
                    amount: .8,
                }}

                transition={{
                    duration: .8,
                }}

                className="
        absolute
        left-1/2
        top-1/2
        h-px
        w-[70%]
        origin-center
        -translate-x-1/2
        bg-gradient-to-r
        from-transparent
        via-cyan-400/40
        to-transparent
    "

            />

        </div>

    );

}