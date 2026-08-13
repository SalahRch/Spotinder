import api from "@/services/api";

import type {
    DailyDiscovery, DailyDiscoveryRecap,
    Recommendation,
} from "../types/discovery";

export const discoveryService = {
    async getRecommendations(): Promise<Recommendation[]> {
        const { data } =
            await api.get<Recommendation[]>(
                "/discover",
            );

        return data;
    },

    async getDailyDiscovery(): Promise<DailyDiscovery> {
        const { data } =
            await api.get<DailyDiscovery>(
                "/discover/daily",
            );

        return data;
    },
    async getDailyRecap(): Promise<DailyDiscoveryRecap> {
        const { data } =
            await api.get<DailyDiscoveryRecap>(
                "/discover/daily/recap",
            );

        return data;
    },
};