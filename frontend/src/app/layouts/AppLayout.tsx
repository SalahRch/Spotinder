import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import {SpotifyPlayerProvider} from "@/features/player/context/SpotifyPlayerContext.tsx";
import MiniPlayer from "@/features/player/components/MiniPlayer";

export default function AppLayout() {
    return (
        <SpotifyPlayerProvider>
        <div className="flex min-h-screen bg-[#0B0F17] text-white">
            <Sidebar />

            <main className="min-w-0 flex-1 overflow-x-hidden p-6 pb-28">
                <Outlet />
            </main>
        </div>
            <MiniPlayer />
        </SpotifyPlayerProvider>
    );
}