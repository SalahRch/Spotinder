import { motion } from "framer-motion";

type SwipeParticleProps = {

    x: number;

    y: number;

    size: number;

    color: string;

    delay: number;

};

export default function SwipeParticle({

                                          x,
                                          y,
                                          size,
                                          color,
                                          delay,

                                      }: SwipeParticleProps) {

    return (

        <motion.div

            initial={{

                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,

            }}

            animate={{

                x,
                y,
                scale: 1,
                opacity: 0,

            }}

            transition={{

                duration: .65,
                delay,
                ease: "easeOut",

            }}

            className="absolute pointer-events-none"

        >

            <div

                style={{

                    width: size,
                    height: size,
                    background: color,

                }}

                className="rounded-full blur-[1px]"

            />

        </motion.div>

    );

}