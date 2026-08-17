import {
    Navigate,
    Outlet,
} from "react-router-dom";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";

export default function OnboardingGuard() {
    const {
        user,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return null;
    }

    if (
        user &&
        !user.onboardingCompleted
    ) {
        return (
            <Navigate
                to="/onboarding"
                replace
            />
        );
    }

    return <Outlet />;
}