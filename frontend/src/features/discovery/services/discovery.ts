import api from "@/services/api";

import type { Recommendation } from "../types/discovery";

export const discoveryService = {
    async getRecommendations(): Promise<Recommendation[]> {
        const { data } = await api.get<Recommendation[]>("/discover");

        return data;
    },
};