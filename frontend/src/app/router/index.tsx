import { createBrowserRouter } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";

import ProtectedRoute from "@/app/guards/ProtectedRoute";
import AppLayout from "@/app/layouts/AppLayout";

import DiscoverPage from "@/features/discovery/pages/DiscoverPage";

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
                ],
            },
        ],
    },
]);