import {
    useEffect,
    useRef,
} from "react";

import {
    Outlet,
    useLocation,
} from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import {
    SpotifyPlayerProvider,
} from "@/features/player/context/SpotifyPlayerContext";
import MiniPlayer from "@/features/player/components/MiniPlayer";

export default function AppLayout() {
    const location =
        useLocation();

    const isDiscoverPage =
        location.pathname ===
        "/app/discover";

    const mainRef =
        useRef<HTMLElement>(null);

    useEffect(() => {
        mainRef.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [location.pathname]);

    return (
        <SpotifyPlayerProvider>
            <div
                className="
                    flex
                    h-screen
                    overflow-hidden
                    bg-[#0B0F17]
                    text-white
                "
            >
                <Sidebar />

                <main
                    ref={mainRef}
                    className={`
                        min-w-0
                        flex-1
                        overflow-x-hidden
                        p-6

                        ${
                        isDiscoverPage
                            ? `
                                    overflow-y-hidden
                                    pb-6
                                `
                            : `
                                    overflow-y-auto
                                    pb-28
                                `
                    }
                    `}
                >
                    <Outlet />
                </main>
            </div>

            <MiniPlayer />
        </SpotifyPlayerProvider>
    );
}