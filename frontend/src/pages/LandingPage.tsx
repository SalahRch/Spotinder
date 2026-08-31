import {
    useEffect,
    useState,
} from "react";
import RequestAccessModal
    from "@/features/access/components/RequestAccessModal";
import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Navbar from "../components/common/Navbar";
import SpotifyButton from "../components/common/SpotifyButton";
import FloatingAlbums from "../components/common/FloatingAlbums";
import FadeInSection from "../components/animations/FadeInSection";
import SectionDivider from "../components/common/SectionDivider";

import PhoneMockup from "@/components/landing/PhoneMockup/PhoneMockup";

import HowItWorks from "../components/sections/HowItWorks";
import WhySpotinder from "../components/sections/WhySpotinder";
import LiveDemo from "../components/sections/LiveDemo";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/sections/Footer";
import CursorGlow from "../components/common/CursorGlow";

import { useAuth } from "@/features/auth/hooks/useAuth";
import toast from "react-hot-toast";

export default function LandingPage() {
    const navigate = useNavigate();
    const [accessModalOpen, setAccessModalOpen] =
        useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authError = params.get("authError");

        if (!authError) return;

        toast.error(
            "Couldn't connect to Spotify. Make sure your account has access to the Spotinder beta."
        );

        // Clean ?authError=... from the URL
        const url = new URL(window.location.href);
        url.searchParams.delete("authError");

        window.history.replaceState({}, "", url.toString());
    }, []);

    const {
        login,
        isAuthenticated,
        isLoading,
    } = useAuth();

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

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate("/app/discover", {
                replace: true,
            });
        }
    }, [
        isAuthenticated,
        isLoading,
        navigate,
    ]);

    const handleSpotifyContinue = () => {
        if (isLoading || isAuthenticated) {
            return;
        }

        login();
    };

    return (
        <main className="bg-[#0B0F17] text-white">
            <CursorGlow />

            {/* ================= HERO ================= */}

            <section
                id="hero"
                className="
                    relative
                    isolate
                    min-h-screen
                    overflow-hidden
                "
            >
                <Navbar />

                {/* Background Glow */}

                <motion.div
                    style={{ x, y }}
                    className="
                        absolute
                        -left-40
                        top-0
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-cyan-400/15
                        blur-[180px]
                    "
                />

                <motion.div
                    style={{ x, y }}
                    className="
                        absolute
                        -right-40
                        bottom-0
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-fuchsia-500/15
                        blur-[180px]
                    "
                />

                <FloatingAlbums
                    mouseX={x}
                    mouseY={y}
                />

                <FadeInSection>
                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            min-h-screen
                            max-w-7xl
                            flex-col
                            items-center
                            justify-center
                            px-6
                            pb-24
                            pt-24
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

                        <div
                            className="
        mt-12
        flex
        flex-col
        items-center
        gap-4
    "
                        >
                            <SpotifyButton
                                onClick={handleSpotifyContinue}
                                disabled={isLoading || isAuthenticated}
                            />

                            <button
                                type="button"
                                onClick={() => setAccessModalOpen(true)}
                                className="
            text-sm
            text-slate-500
            transition-colors
            hover:text-violet-300
        "
                            >
                                Don't have access?{" "}
                                <span
                                    className="
                underline
                decoration-white/20
                underline-offset-4
            "
                                >
            Request early access
        </span>
                            </button>
                        </div>

                        <div className="mt-10">
                            <PhoneMockup />
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            No Spotify Premium required.
                        </p>
                    </div>
                </FadeInSection>
            </section>

            {/* ================= HOW IT WORKS ================= */}

            <HowItWorks />

            <SectionDivider />

            {/* ================= WHY SPOTINDER ================= */}

            <WhySpotinder />

            <SectionDivider />

            {/* ================= LIVE DEMO ================= */}

            <LiveDemo />

            <SectionDivider />

            {/* ================= CTA ================= */}

            <FinalCTA />

            {/* ================= FOOTER ================= */}

            <Footer />
            <RequestAccessModal
                open={accessModalOpen}
                onClose={() => setAccessModalOpen(false)}
            />
        </main>
    );
}

