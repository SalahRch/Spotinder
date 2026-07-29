import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type FeatureCardProps = {
    icon: IconType;
    title: string;
    description: string;
    children?: React.ReactNode;
    delay?: number;
};

export default function FeatureCard({
                                        icon: Icon,
                                        title,
                                        description,
                                        children,
                                        delay = 0,
                                    }: FeatureCardProps) {

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
                duration:.65,
                ease:[0.22,1,0.36,1],
                delay,
            }}
            whileHover={{
                y: -10,
                scale: 1.015,
            }}
            className="
                group
                rounded-[30px]
                border
                border-white/[0.08]
                bg-white/[0.045]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/30
                hover:bg-white/[0.065]
                hover:shadow-[0_40px_110px_rgba(34,211,238,.10)]
            "
        >
            <motion.div

                whileHover={{
                    rotate: -8,
                    scale: 1.08,
                }}

                transition={{
                    type: "spring",
                    stiffness: 250,
                }}

                className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-cyan-400/15
        via-cyan-300/10
        to-violet-500/15
        text-cyan-300
    "

            >

                <Icon size={24}/>

            </motion.div>
            <h3
                className="
                    mt-6
                    text-2xl
                    font-semibold
                    text-white
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-4
                    leading-7
                    text-slate-400
                "
            >
                {description}
            </p>

            {children && (

                <div className="mt-8">

                    {children}

                </div>

            )}

        </motion.div>

    );

}