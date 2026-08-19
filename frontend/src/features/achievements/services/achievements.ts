import api from "@/services/api";

import type {
    Achievement,
} from "../types/achievement";

export const achievementService = {
    async getAchievements(): Promise<Achievement[]> {
        const { data } =
            await api.get<Achievement[]>(
                "/achievements",
            );

        return data;
    },
};