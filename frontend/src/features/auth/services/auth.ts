import api from "@/services/api";
import type { User } from "../types/user";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const authService = {
    login() {
        window.location.href =
            `${BACKEND_URL}/oauth2/authorization/spotify`;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get("/users/me");
        return response.data;
    },

    async logout() {
        await fetch(
            `${BACKEND_URL}/logout`,
            {
                method: "POST",
                credentials: "include",
            },
        );
    },
};