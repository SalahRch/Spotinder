import api from "@/services/api";

import type {
    OnboardingProfile,
} from "../types/onboarding";

export const onboardingService = {
    async getProfile(): Promise<OnboardingProfile> {
        const { data } =
            await api.get<OnboardingProfile>(
                "/onboarding/profile",
            );

        return data;
    },

    async saveGenres(
        genres: string[],
    ): Promise<void> {
        await api.patch(
            "/users/me/genres",
            {
                genres,
            },
        );
    },

    async complete(): Promise<void> {
        await api.post(
            "/users/me/onboarding/complete",
        );
    },
};