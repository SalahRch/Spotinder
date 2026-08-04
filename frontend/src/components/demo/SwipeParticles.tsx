import { motion } from "framer-motion";

type SwipeParticlesProps = {
    direction: "left" | "right";
};

const particles = Array.from({ length: 24 });

export default function SwipeParticles({
                                           direction,
                                       }: SwipeParticlesProps) {

    const multiplier =
        direction === "right" ? 1 : -1;

    const colour =
        direction === "right"
            ? "#22d3ee"
            : "#ec4899";

    return (

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

            {

                particles.map((_, i) => {

                    const angle =
                        (Math.random() - 0.5) *
                        (Math.PI * 0.75);

                    const distance =
                        120 + Math.random() * 120;

                    const x =
                        Math.cos(angle) *
                        distance *
                        multiplier;

                    const y =
                        (Math.random() - .5) * 180;

                    const size =
                        6 + Math.random() * 12;

                    return (

                        <motion.div

                            key={i}

                            initial={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                            }}

                            animate={{
                                opacity: 0,
                                scale: 0,
                                x,
                                y,
                                rotate:
                                    Math.random() * 360,
                            }}

                            transition={{
                                duration: .55,
                                ease: "easeOut",
                            }}

                            style={{
                                background: colour,
                                width: size,
                                height: size,
                            }}

                            className="
                                absolute
                                left-1/2
                                top-1/2
                                rounded-full
                                blur-[1px]
                            "

                        />

                    );

                })

            }

        </div>

    );

}