import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

import Logo from "../components/common/Logo";
import CursorGlow from "../components/common/CursorGlow";
import FloatingAlbums from "../components/common/FloatingAlbums";

export default function OnboardingLayout() {

    const location = useLocation();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const y = useSpring(mouseY, { stiffness: 50, damping: 20 });

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {

        mouseX.set(event.clientX - window.innerWidth / 2);
        mouseY.set(event.clientY - window.innerHeight / 2);

    }

    return (

        <div
            onMouseMove={handleMouseMove}
            className="relative min-h-screen overflow-x-hidden bg-[#0B0F17] text-white"
        >

            <CursorGlow />

            <div className="pointer-events-none absolute inset-0 opacity-40">

                <FloatingAlbums mouseX={x} mouseY={y} />

            </div>

            <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-6 pb-40 pt-16 text-center">

                <div className="mb-10">
                    <Logo small />
                </div>

                <AnimatePresence mode="wait">

                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >

                        <Outlet />

                    </motion.div>

                </AnimatePresence>

            </main>

        </div>

    );

}