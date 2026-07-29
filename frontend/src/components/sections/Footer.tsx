import Logo from "../common/Logo";

import {
    FiGithub,
    FiLinkedin,
    FiMail,
} from "react-icons/fi";

export default function Footer() {

    return (

        <footer
            className="
                relative
                overflow-hidden
                border-t
                border-white/10
                bg-[#090D15]
            "
        >

            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    h-[500px]
                    w-[700px]
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-400/[0.02]
                    blur-[180px]
                    pointer-events-none
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    gap-12
                    px-6
                    py-20
                    md:flex-row
                    md:items-start
                    md:justify-between
                "
            >

                {/* Left */}

                <div className="max-w-md">

                    <Logo />

                    <p
                        className="
                            mt-7
                            leading-8
                            text-slate-400
                        "
                    >
                        Spotinder helps you discover music
                        beyond the algorithm.

                        Swipe.
                        Listen.
                        Build playlists you'll actually love.
                    </p>

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        items-center
                        gap-5
                    "
                >

                    <a

                        href="https://github.com/SalahRch"

                        target="_blank"

                        rel="noreferrer"

                        className="
                            group
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.04]
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-cyan-400/30
                            hover:bg-white/[0.08]
                            hover:text-cyan-400
                            hover:shadow-[0_20px_50px_rgba(34,211,238,.12)]
                        "

                    >

                        <FiGithub
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                    </a>

                    <a

                        href="https://linkedin.com/in/salaheddine-rouchdi"

                        target="_blank"

                        rel="noreferrer"

                        className="
                            group
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.04]
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-cyan-400/30
                            hover:bg-white/[0.08]
                            hover:text-cyan-400
                            hover:shadow-[0_20px_50px_rgba(34,211,238,.12)]
                        "

                    >

                        <FiLinkedin
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                    </a>

                    <a

                        href="mailto:adresselorem@gmail.com"

                        className="
                            group
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.04]
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-cyan-400/30
                            hover:bg-white/[0.08]
                            hover:text-cyan-400
                            hover:shadow-[0_20px_50px_rgba(34,211,238,.12)]
                        "

                    >

                        <FiMail
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                    </a>

                </div>

            </div>

            {/* Soft Divider */}

            <div
                className="
                    mx-auto
                    h-px
                    max-w-7xl
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                "
            />

            {/* Bottom */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    justify-between
                    gap-4
                    px-6
                    py-6
                    text-sm
                    text-slate-500
                    md:flex-row
                "
            >

                <span>

                    © 2026 Spotinder.
                    Built with React, Spring Boot & Spotify API.

                </span>

                <span>

                    Designed & engineered by Salah.

                </span>

            </div>

        </footer>

    );

}