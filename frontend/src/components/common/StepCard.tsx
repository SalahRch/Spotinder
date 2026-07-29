import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type StepCardProps = {
    number: string;
    icon: IconType;
    title: string;
    description: string;
    delay?: number;
};

export default function StepCard({
                                     number,
                                     icon: Icon,
                                     title,
                                     description,
                                     delay = 0,
                                 }: StepCardProps) {

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
                amount: 0.3,
            }}
            transition={{
                duration: 0.6,
                delay,
            }}
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-10
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-3
                hover:scale-[1.02]
                hover:border-cyan-400/40
                hover:bg-white/10
                hover:shadow-[0_30px_80px_rgba(34,211,238,.12)]
            "
        >

            {/* Icon */}

            <motion.div
                whileHover={{
                    rotate: -6,
                    scale: 1.12,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="
                    relative
                    flex
                    h-[68px]
                    w-[68px]
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400/20
                    to-violet-500/20
                    text-cyan-400
                "
            >

                <Icon size={28} />

                <div
                    className="
                        absolute
                        inset-0
                        -z-10
                        rounded-2xl
                        bg-cyan-400/10
                        blur-xl
                    "
                />

            </motion.div>

            {/* Step Number */}

            <div className="mt-6 flex items-center gap-3">

                <span
                    className="
                        text-xs
                        font-bold
                        tracking-[0.35em]
                        text-cyan-400
                    "
                >
                    {number}
                </span>

                <div className="h-px flex-1 bg-cyan-400/20" />

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-cyan-300
                        shadow-[0_0_14px_rgba(34,211,238,.8)]
                    "
                />

            </div>

            {/* Title */}

            <h3
                className="
                    mt-5
                    text-2xl
                    font-semibold
                    text-slate-100
                "
            >
                {title}
            </h3>

            {/* Description */}

            <p
                className="
                    mt-5
                    leading-8
                    text-slate-400
                "
            >
                {description}
            </p>

        </motion.div>

    );
}