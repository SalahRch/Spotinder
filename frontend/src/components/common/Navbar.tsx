import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";

import Logo from "./Logo";
import SpotifyButton from "./SpotifyButton";

export default function Navbar() {

    const { scrollY } = useScroll();

    const opacity = useTransform(
        scrollY,
        [0, 120],
        [0.88, 1]
    );

    const y = useTransform(
        scrollY,
        [0, 120],
        [-10, 0]
    );

    const scale = useTransform(
        scrollY,
        [0, 120],
        [0.985, 1]
    );

    const width = useTransform(
        scrollY,
        [0, 120],
        ["96%", "92%"]
    );

    function scrollToSection(id: string) {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

    }

    return (

        <motion.header

            style={{
                opacity,
                y,
                scale,
                width,
            }}

            className="
                fixed
                left-1/2
                top-6
                z-50
                -translate-x-1/2
                pointer-events-none
            "

        >

            <div
                className="
                    relative
                    overflow-hidden
                    pointer-events-auto
                    flex
                    items-center
                    justify-between
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-7
                    py-4
                    backdrop-blur-3xl
                    shadow-[0_30px_90px_rgba(0,0,0,.55)]

                    before:absolute
                    before:inset-0
                    before:rounded-full
                    before:bg-gradient-to-b
                    before:from-white/10
                    before:to-transparent
                    before:pointer-events-none
                "
            >

                <div className="relative z-10">

                    <Logo small />

                </div>

                <nav
                    className="
                        relative
                        z-10
                        hidden
                        items-center
                        gap-10
                        md:flex
                    "
                >

                    <button

                        onClick={() => scrollToSection("how-it-works")}

                        className="
                            group
                            relative
                            text-sm
                            text-slate-300
                            transition-colors
                            duration-300
                            hover:text-cyan-400
                        "

                    >

                        Features

                        <span
                            className="
                                absolute
                                -bottom-1.5
                                left-1/2
                                h-[2px]
                                w-0
                                -translate-x-1/2
                                rounded-full
                                bg-cyan-400
                                transition-all
                                duration-300
                                group-hover:w-full
                            "
                        />

                    </button>

                    <button

                        onClick={() => scrollToSection("live-demo")}

                        className="
                            group
                            relative
                            text-sm
                            text-slate-300
                            transition-colors
                            duration-300
                            hover:text-cyan-400
                        "

                    >

                        Demo

                        <span
                            className="
                                absolute
                                -bottom-1.5
                                left-1/2
                                h-[2px]
                                w-0
                                -translate-x-1/2
                                rounded-full
                                bg-cyan-400
                                transition-all
                                duration-300
                                group-hover:w-full
                            "
                        />

                    </button>

                </nav>

                <div className="relative z-10">

                    <SpotifyButton small />

                </div>

            </div>

        </motion.header>

    );

}