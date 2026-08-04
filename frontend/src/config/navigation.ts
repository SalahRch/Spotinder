import {
    FiCompass,
    FiHeart,
    FiBarChart2,
    FiUser,
    FiSettings,
} from "react-icons/fi";


export const navigation = [
    {
        name: "Discover",
        path: "/app/discover",
        icon: FiCompass,
    },
    {
        name: "Likes",
        path: "/app/likes",
        icon: FiHeart,
    },
    {
        name: "Insights",
        path: "/app/insights",
        icon: FiBarChart2,
    },
    {
        name: "Profile",
        path: "/app/profile",
        icon: FiUser,
    },
    {
        name: "Settings",
        path: "/app/settings",
        icon: FiSettings,
    },
];