import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import OnboardingLayout from "../components/layout/OnboardingLayout";
import AnalyzingPage from "../pages/onboarding/AnalyzingPage";
import DiscoveryProfilePage from "../pages/onboarding/DiscoveryProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/onboarding",
        element: <OnboardingLayout />,
        children: [
            {
                path: "analyzing",
                element: <AnalyzingPage />,
            },
            {
                path: "profile",
                element: <DiscoveryProfilePage />,
            },
        ],
    },
]);

export default router;