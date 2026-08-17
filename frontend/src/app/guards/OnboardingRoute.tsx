import {
    Navigate,
    Outlet,
} from "react-router-dom";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";

export default function OnboardingRoute() {
    const {
        user,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return null;
    }

    if (
        user?.onboardingCompleted
    ) {
        return (
            <Navigate
                to="/app"
                replace
            />
        );
    }

    return <Outlet />;
}