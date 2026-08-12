import { createBrowserRouter } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";

import ProtectedRoute from "@/app/guards/ProtectedRoute";
import AppLayout from "@/app/layouts/AppLayout";

import DiscoverPage from "@/features/discovery/pages/DiscoverPage";
import LikesPage from "@/features/likes/pages/LikesPage.tsx";
import InsightsPage from "@/features/insights/pages/InsightsPage.tsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.tsx";
import SettingsPage from "@/features/settings/pages/SettingsPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/app",
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <DiscoverPage />,
                    },
                    {
                        path: "discover",
                        element: <DiscoverPage />,
                    },
                    {
                        path: "likes",
                        element: <LikesPage/>,
                    },
                    {
                        path: "insights",
                        element: <InsightsPage/>,
                    },
                    {
                        path: "profile",
                        element: <ProfilePage/>,
                    },
                    {
                        path: "settings",
                        element: <SettingsPage/>,
                    },
                ],
            },
        ],
    },
]);