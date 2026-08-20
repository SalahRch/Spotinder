import {
    createBrowserRouter,
} from "react-router-dom";

import LandingPage from "@/pages/LandingPage";

import ProtectedRoute from "@/app/guards/ProtectedRoute";
import OnboardingGuard from "@/app/guards/OnboardingGuard";
import OnboardingRoute from "@/app/guards/OnboardingRoute";

import AppLayout from "@/app/layouts/AppLayout";

import DiscoverPage from "@/features/discovery/pages/DiscoverPage";
import LikesPage from "@/features/likes/pages/LikesPage";
import InsightsPage from "@/features/insights/pages/InsightsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import JourneysPage from "@/features/Journeys/JourneysPage";

import OnboardingPage
    from "@/features/onboarding/pages/OnboardingPage";
import JourneyDetailPage from "@/features/discovery/components/JourneyDetailPage.tsx";

export const router =
    createBrowserRouter([
        {
            path: "/",
            element:
                <LandingPage />,
        },

        {
            element:
                <ProtectedRoute />,
            children: [
                /*
                 * Onboarding is authenticated,
                 * but lives outside AppLayout.
                 */
                {
                    element:
                        <OnboardingRoute />,
                    children: [
                        {
                            path:
                                "/onboarding",
                            element:
                                <OnboardingPage />,
                        },
                    ],
                },

                /*
                 * Main application requires
                 * onboarding completion.
                 */
                {
                    element:
                        <OnboardingGuard />,
                    children: [
                        {
                            path: "/app",
                            element:
                                <AppLayout />,
                            children: [
                                {
                                    index: true,
                                    element:
                                        <DiscoverPage />,
                                },
                                {
                                    path:
                                        "discover",
                                    element:
                                        <DiscoverPage />,
                                },
                                {
                                    path:
                                        "likes",
                                    element:
                                        <LikesPage />,
                                },
                                {
                                    path:
                                        "insights",
                                    element:
                                        <InsightsPage />,
                                },
                                {
                                    path:
                                        "journeys",
                                    element:
                                        <JourneysPage />,
                                },
                                {
                                    path: "journeys/:journeyId",
                                    element: <JourneyDetailPage />,
                                },
                                {
                                    path:
                                        "profile",
                                    element:
                                        <ProfilePage />,
                                },
                                {
                                    path:
                                        "settings",
                                    element:
                                        <SettingsPage />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);