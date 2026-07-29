import {
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion";

import DemoAlbumCard from "./DemoAlbumCard";

type Song = {
    title: string;
    artist: string;
    genre: string;
    cover: string;
};

type SwipeCardProps = {
    song: Song;
    draggable?: boolean;
    onSwiped?: (
        direction: "left" | "right"
    ) => Promise<void> | void;
};
export default function SwipeCard({

                                      song,
                                      draggable = false,
                                      onSwiped,

                                  }: SwipeCardProps) {

    const controls = useAnimation();

    const x = useMotionValue(0);

    const rotate = useTransform(
        x,
        [-250, 250],
        [-18, 18]
    );

    const likeOpacity = useTransform(
        x,
        [20, 120],
        [0, 1]
    );

    const likeScale = useTransform(
        x,
        [20, 120],
        [0.6, 1]
    );

    const passOpacity = useTransform(
        x,
        [-20, -120],
        [0, 1]
    );

    const passScale = useTransform(
        x,
        [-20, -120],
        [0.6, 1]
    );

    return (

        <motion.div

            className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                cursor-grab
                active:cursor-grabbing
            "

            animate={controls}

            drag={draggable ? "x" : false}

            style={{
                x,
                rotate,
            }}

            dragConstraints={{
                left: 0,
                right: 0,
            }}

            dragElastic={0.3}

            dragMomentum={false}

            whileDrag={{
                scale: 1.03,
            }}

            onDragEnd={async (_, info) => {

                if (!draggable) return;

                if (info.offset.x > 120) {

                    await controls.start({

                        x: 900,
                        rotate: 25,
                        opacity: 0,

                        transition: {
                            duration: .35,
                            ease: "easeOut",
                        }

                    });

                    await onSwiped?.("right");

                    controls.set({
                        x: 0,
                        rotate: 0,
                        opacity: 1,
                    });

                    return;
                }

                if (info.offset.x < -120) {

                    await controls.start({

                        x: -900,
                        rotate: -25,
                        opacity: 0,

                        transition: {
                            duration: .35,
                            ease: "easeOut",
                        }

                    });

                    await onSwiped?.("left");

                    controls.set({
                        x: 0,
                        rotate: 0,
                        opacity: 1,
                    });

                    return;
                }

                controls.start({

                    x: 0,
                    rotate: 0,

                    transition: {
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                    }

                });

            }}

        >

            <motion.div

                style={{
                    opacity: likeOpacity,
                    scale: likeScale,
                }}

                className="
                    absolute
                    top-16
                    right-10
                    z-30
                    rounded-xl
                    border-4
                    border-green-400
                    bg-green-400/10
                    backdrop-blur-md
                    px-5
                    py-2
                    text-3xl
                    font-black
                    tracking-widest
                    text-green-400
                    rotate-12
                    pointer-events-none
                "

            >

                LIKE

            </motion.div>

            <motion.div

                style={{
                    opacity: passOpacity,
                    scale: passScale,
                }}

                className="
                    absolute
                    top-16
                    left-10
                    z-30
                    rounded-xl
                    border-4
                    border-red-400
                    bg-red-400/10
                    backdrop-blur-md
                    px-5
                    py-2
                    text-3xl
                    font-black
                    tracking-widest
                    text-red-400
                    -rotate-12
                    pointer-events-none
                "

            >

                PASS

            </motion.div>

            <DemoAlbumCard
                title={song.title}
                artist={song.artist}
                genre={song.genre}
                cover={song.cover}
            />

        </motion.div>

    );

}