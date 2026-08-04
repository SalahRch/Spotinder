import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen bg-[#0B0F17] text-white">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <TopBar />

                <main className="flex-1 overflow-x-hidden p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}