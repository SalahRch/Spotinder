import { motion } from "framer-motion";

type SwipeParticlesProps = {
    direction: "left" | "right";
};

type Particle = {
    angle: number;
    distance: number;
    y: number;
    size: number;
    rotation: number;
};

const PARTICLE_COUNT = 24;

const particles: Particle[] =
    Array.from(
        { length: PARTICLE_COUNT },
        (_, i) => {
            /*
             * Deterministic pseudo-random-looking values.
             *
             * These are calculated once when the module loads,
             * rather than using Math.random() during React render.
             */
            const normalized =
                (i * 0.61803398875) % 1;

            const secondary =
                (i * 0.38196601125 + 0.27) % 1;

            const tertiary =
                (i * 0.75487766625 + 0.41) % 1;

            const angle =
                (normalized - 0.5) *
                (Math.PI * 0.75);

            const distance =
                120 + secondary * 120;

            const y =
                (tertiary - 0.5) * 180;

            const size =
                6 + normalized * 12;

            const rotation =
                secondary * 360;

            return {
                angle,
                distance,
                y,
                size,
                rotation,
            };
        },
    );

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

            {particles.map((particle, i) => {

                const x =
                    Math.cos(particle.angle) *
                    particle.distance *
                    multiplier;

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
                            y: particle.y,
                            rotate: particle.rotation,
                        }}
                        transition={{
                            duration: 0.55,
                            ease: "easeOut",
                        }}
                        style={{
                            background: colour,
                            width: particle.size,
                            height: particle.size,
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
            })}

        </div>
    );
}