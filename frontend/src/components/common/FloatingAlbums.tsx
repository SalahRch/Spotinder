import { motion, MotionValue, useTransform } from "framer-motion";
import { songs } from "../../assets/songs";

type FloatingAlbumsProps = {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
};

const orbits = [
    { radius: 520, angle: 0, size: 185, speed: 60, opacity: 0.28 },
    { radius: 430, angle: 70, size: 145, speed: 45, opacity: 0.18 },
    { radius: 380, angle: 145, size: 130, speed: 38, opacity: 0.14 },
    { radius: 500, angle: 220, size: 170, speed: 55, opacity: 0.24 },
    { radius: 340, angle: 295, size: 115, speed: 34, opacity: 0.12 },
    { radius: 580, angle: 330, size: 200, speed: 72, opacity: 0.30 },
];

export default function FloatingAlbums({
                                           mouseX,
                                           mouseY,
                                       }: FloatingAlbumsProps) {

    const parallaxX = useTransform(mouseX, (v) => v * 0.45);
    const parallaxY = useTransform(mouseY, (v) => v * 0.45);

    return (
        <>
            {orbits.map((orbit, index) => {

                const song = songs[index % songs.length];

                return (

                    <motion.div
                        key={index}
                        className="absolute left-1/2 top-1/2"
                        style={{
                            x: parallaxX,
                            y: parallaxY,
                        }}
                    >

                        <motion.div
                            className="relative"
                            style={{
                                width: orbit.radius * 2,
                                height: orbit.radius * 2,
                                marginLeft: -orbit.radius,
                                marginTop: -orbit.radius,
                            }}
                            initial={{
                                rotate: orbit.angle,
                            }}
                            animate={{
                                rotate: orbit.angle + 360,
                            }}
                            transition={{
                                duration: orbit.speed,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >

                            <motion.img
                                src={song.cover}
                                alt={song.title}
                                draggable={false}
                                className="
                                    absolute
                                    rounded-3xl
                                    object-cover
                                    select-none
                                    will-change-transform
                                    shadow-[0_30px_80px_rgba(0,0,0,.55)]
                                "
                                style={{
                                    width: orbit.size,
                                    opacity: orbit.opacity,

                                    left: "50%",
                                    top: 0,

                                    marginLeft: -(orbit.size / 2),
                                }}
                                initial={{
                                    rotate: -orbit.angle,
                                }}
                                animate={{
                                    rotate: -(orbit.angle + 360),
                                    scale: [1, 1.035, 1],
                                }}
                                transition={{
                                    rotate: {
                                        duration: orbit.speed,
                                        repeat: Infinity,
                                        ease: "linear",
                                    },
                                    scale: {
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                    },
                                }}
                            />

                        </motion.div>

                    </motion.div>

                );

            })}
        </>
    );
}