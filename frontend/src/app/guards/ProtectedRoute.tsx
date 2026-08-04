import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProtectedRoute() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    const location = useLocation();

    if (isLoading) {
        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-[#0B0F17]
                    text-white
                "
            >
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-2
                            border-white/10
                            border-t-violet-400
                        "
                    />

                    <p className="mt-5 text-sm text-slate-400">
                        Loading your music profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    return <Outlet />;
}