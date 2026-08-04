import { motion } from "framer-motion";

type StepDotsProps = {
    total: number;
    current: number;
};

export default function StepDots({ total, current }: StepDotsProps) {

    return (

        <div className="mb-10 flex items-center justify-center gap-2">

            {Array.from({ length: total }).map((_, index) => (

                <motion.span
                    key={index}
                    initial={false}
                    animate={{
                        width: index === current ? 32 : 6,
                        opacity: index <= current ? 1 : 0.3,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
                        h-1.5
                        rounded-full
                        ${
                        index <= current
                            ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                            : "bg-white/15"
                    }
                    `}
                />

            ))}

        </div>

    );

}