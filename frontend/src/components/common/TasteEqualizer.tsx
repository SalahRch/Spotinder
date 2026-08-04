import { motion } from "framer-motion";

const BAR_COUNT = 24;

export default function TasteEqualizer() {

    return (

        <div className="mx-auto flex h-12 items-end justify-center gap-[3px]">

            {Array.from({ length: BAR_COUNT }).map((_, index) => {

                const peak = 30 + ((index * 37) % 60);

                return (

                    <motion.div
                        key={index}
                        animate={{
                            height: [`${peak * 0.3}%`, `${peak}%`, `${peak * 0.4}%`],
                        }}
                        transition={{
                            duration: 1.1 + (index % 5) * 0.15,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: (index % 7) * 0.08,
                        }}
                        className="w-[3px] rounded-full bg-gradient-to-t from-cyan-400 to-fuchsia-500"
                    />

                );

            })}

        </div>

    );

}