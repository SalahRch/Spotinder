import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";

import Logo from "../components/common/Logo";
import SpotifyButton from "../components/common/SpotifyButton";
import PhoneMockup from "../PhoneMockup/PhoneMockup";
import FloatingAlbums from "../components/common/FloatingAlbums";

export default function LandingPage() {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, {
        stiffness: 50,
        damping: 20,
    });

    const y = useSpring(mouseY, {
        stiffness: 50,
        damping: 20,
    });

    return (

        <main
            className="relative min-h-screen overflow-hidden bg-[#0B0F17] text-white"
            onMouseMove={(e) => {

                const { innerWidth, innerHeight } = window;

                mouseX.set((e.clientX - innerWidth / 2) / 35);
                mouseY.set((e.clientY - innerHeight / 2) / 35);

            }}
        >

            {/* Background Glow */}

            <motion.div
                style={{
                    x,
                    y,
                }}
                className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[180px]"
            />

            <motion.div
                style={{
                    x,
                    y,
                }}
                className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/15 blur-[180px]"
            />

            <FloatingAlbums
                mouseX={x}
                mouseY={y}
            />

            <section
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-7xl
                    flex-col
                    items-center
                    justify-start
                    pt-12
                    px-6
                    pb-20
                    text-center
                "
            >

                <Logo />

                <div className="mt-8 max-w-2xl">

                    <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
                        Discover music beyond the algorithm.
                    </h2>

                    <p className="mt-8 text-lg leading-8 text-slate-400">
                        Swipe through songs you've never heard before.
                        <br />
                        No endless playlists.
                        <span className="text-slate-200">
                            {" "}Just discovery.
                        </span>
                    </p>

                </div>

                <div className="mt-12">

                    <SpotifyButton />

                </div>

                <div className="mt-10">

                    <PhoneMockup />

                </div>

                <p className="mt-5 text-sm text-slate-500">
                    No Spotify Premium required.
                </p>

            </section>

        </main>

    );

}